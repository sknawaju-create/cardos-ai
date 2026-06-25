import express from "express";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Setup storage path for waitlist persistence
const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(WAITLIST_FILE);
    } catch {
      // Create empty collection if missing
      await fs.writeFile(WAITLIST_FILE, JSON.stringify([], null, 2));
    }
  } catch (err) {
    console.error("Failed to set up local waitlist storage infrastructure:", err);
  }
}

ensureDataDirectory();

// API: JOIN WAITLIST
app.post("/api/waitlist", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    await ensureDataDirectory();
    const fileContent = await fs.readFile(WAITLIST_FILE, "utf-8");
    const list = JSON.parse(fileContent);

    // Check duplicates
    const normalizedEmail = email.trim().toLowerCase();
    const exists = list.some((item: any) => item.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return res.json({
        success: true,
        alreadyExists: true,
        code: "EA200-CARDOS-VIP",
        message: "You are already joined with early access! Code: EA200-CARDOS-VIP"
      });
    }

    const newItem = {
      email: normalizedEmail,
      joinedAt: new Date().toISOString(),
      code: "EA200-CARDOS-VIP"
    };

    list.push(newItem);
    await fs.writeFile(WAITLIST_FILE, JSON.stringify(list, null, 2));

    return res.json({
      success: true,
      code: "EA200-CARDOS-VIP",
      totalCount: list.length,
      message: "Successfully added to early access list!"
    });
  } catch (err: any) {
    console.error("Waitlist Join Error:", err);
    return res.status(500).json({ success: false, error: "Unable to save waitlist reservation." });
  }
});

// API: GET WAITLIST STATS
app.get("/api/waitlist/stats", async (req, res) => {
  try {
    await ensureDataDirectory();
    const fileContent = await fs.readFile(WAITLIST_FILE, "utf-8");
    const list = JSON.parse(fileContent);
    
    // Default base offset as presented on original mockup (147)
    const baseSignupsCount = 147;
    return res.json({
      count: baseSignupsCount + list.length,
      realUsersJoined: list.length,
      recentSignups: list.slice(-5).reverse()
    });
  } catch (err) {
    return res.json({ count: 147, realUsersJoined: 0, recentSignups: [] });
  }
});

// API: LIVE EXECUTE CARD WITH GEMINI
app.post("/api/execute-card", async (req, res) => {
  try {
    const { promptText, cardId, cardTitle, customInstructions } = req.body;
    
    if (!promptText) {
      return res.status(400).json({ success: false, error: "Prompt template is empty." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return res.status(400).json({
        success: false,
        isMissingApiKey: true,
        error: "Google Gemini API key is not configured yet. Please configure the GEMINI_API_KEY in Settings > Secrets or inside your environment, and try again."
      });
    }

    // Initialize Gemini client lazily
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const fullPrompt = `Below is an executive AI Command representing Card ${cardId || 'Custom'} ("${cardTitle || 'Selected Card'}").

${promptText}

${customInstructions ? `\nADJUSTMENT CRITERIA PROVIDED BY BUILDER:\n${customInstructions}\n` : ""}

Generate a highly professional, ready-to-use business-level output. Frame your output inside beautiful, readable markdown. Focus on giving real tangible examples, specific vocabulary, scripts, or operational checklists. Do not output meta-commentary like "I have analyzed this" or "Here is what you requested". Start directly with the content.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        temperature: 0.8,
        systemInstruction: "You are CARDOS, the ultimate command operating engine built specifically for expert startup business founders, growth marketing directors, and automation architects."
      }
    });

    const resultText = response.text || "Empty response from Gemini.";
    
    return res.json({
      success: true,
      result: resultText
    });
  } catch (err: any) {
    console.error("Gemini Execution Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "An error occurred while communicating with Google Gemini AI engine."
    });
  }
});

// ==========================================
// GOOGLE FORMS INTEGRATION BACKEND ENGINE
// ==========================================

const GOOGLE_CREDENTIALS_FILE = path.join(DATA_DIR, "google-credentials.json");
const GOOGLE_FORM_CONFIG_FILE = path.join(DATA_DIR, "google-form-config.json");

// Helper to load OAuth credentials (client secret + client id) safely
async function getOAuthClientKeys() {
  let clientId = process.env.CLIENT_ID || process.env.OAUTH_CLIENT_ID || "";
  let clientSecret = process.env.CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET || "";

  try {
    const credsExist = await fs.access(GOOGLE_CREDENTIALS_FILE).then(() => true).catch(() => false);
    if (credsExist) {
      const data = JSON.parse(await fs.readFile(GOOGLE_CREDENTIALS_FILE, "utf-8"));
      if (data.client_id) clientId = data.client_id;
      if (data.client_secret) clientSecret = data.client_secret;
    }
  } catch (e) {
    // File reading or parsing issue
  }

  return { clientId, clientSecret };
}

// Durable Token Manager with automatic token refresh capabilities
async function getGoogleAccessToken() {
  const { clientId, clientSecret } = await getOAuthClientKeys();
  if (!clientId || !clientSecret) {
    throw new Error("Client ID or Client Secret has not been configured in Settings or Admin Panel.");
  }

  const credsExist = await fs.access(GOOGLE_CREDENTIALS_FILE).then(() => true).catch(() => false);
  if (!credsExist) {
    throw new Error("Google Workspace is not connected. Please Sign In first.");
  }

  const creds = JSON.parse(await fs.readFile(GOOGLE_CREDENTIALS_FILE, "utf-8"));
  if (!creds || !creds.refresh_token) {
    throw new Error("Google Workspace is not connected (no refresh token). Please Sign In again.");
  }

  const now = Date.now();
  // Refresh if missing token, expiry, or expiring in less than 2 minutes
  const isExpiring = !creds.access_token || !creds.expiry_date || (creds.expiry_date - now < 120 * 1000);

  if (isExpiring) {
    console.log("Access token is expired or expiring soon, refreshing now...");
    const url = "https://oauth2.googleapis.com/token";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: creds.refresh_token,
        grant_type: "refresh_token"
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Token refresh failed:", errorText);
      throw new Error(`Failed to refresh Google OAuth access token: ${errorText}`);
    }

    const data: any = await res.json();
    creds.access_token = data.access_token;
    creds.expiry_date = Date.now() + (data.expires_in * 1000);
    
    // Save updated credentials
    await fs.writeFile(GOOGLE_CREDENTIALS_FILE, JSON.stringify(creds, null, 2));
    console.log("Access token successfully refreshed.");
  }

  return creds.access_token;
}

// Redirect URI generator matching development and preview environments
function getRedirectUri(req: express.Request) {
  if (process.env.APP_URL) {
    return `${process.env.APP_URL.replace(/\/$/, "")}/auth/callback`;
  }
  const host = req.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/auth/callback`;
}

// GET /api/auth/url
app.get("/api/auth/url", async (req, res) => {
  try {
    const { clientId } = await getOAuthClientKeys();
    if (!clientId) {
      return res.status(400).json({ error: "Google OAuth Client ID is not configured. Please supply it in the Admin Console." });
    }

    const redirectUri = getRedirectUri(req);
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/forms.body",
        "https://www.googleapis.com/auth/forms.body.readonly",
        "https://www.googleapis.com/auth/forms.responses.readonly"
      ].join(" "),
      access_type: "offline",
      prompt: "consent"
    });

    res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /auth/callback and GET /auth/callback/
app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.send("Missing code parameter in OAuth redirect callback.");
    }

    const { clientId, clientSecret } = await getOAuthClientKeys();
    const redirectUri = getRedirectUri(req);

    const tokenUrl = "https://oauth2.googleapis.com/token";
    const tokenRes = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code as string,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      return res.status(400).send(`Token exchange failed: ${errorText}`);
    }

    const tokenData: any = await tokenRes.json();
    
    // Read existing credentials to preserve config details
    let savedCreds: any = {};
    try {
      const existing = await fs.readFile(GOOGLE_CREDENTIALS_FILE, "utf-8");
      savedCreds = JSON.parse(existing);
    } catch {}

    savedCreds.client_id = clientId;
    savedCreds.client_secret = clientSecret;
    savedCreds.access_token = tokenData.access_token;
    if (tokenData.refresh_token) {
      savedCreds.refresh_token = tokenData.refresh_token;
    }
    savedCreds.expiry_date = Date.now() + (tokenData.expires_in * 1000);

    await fs.writeFile(GOOGLE_CREDENTIALS_FILE, JSON.stringify(savedCreds, null, 2));

    // Update config status
    let formConfig: any = { connected: true, embedEnabled: false, formId: null, formUrl: null };
    try {
      const existingConfig = await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8");
      formConfig = { ...formConfig, ...JSON.parse(existingConfig), connected: true };
    } catch {}
    await fs.writeFile(GOOGLE_FORM_CONFIG_FILE, JSON.stringify(formConfig, null, 2));

    res.send(`
      <html>
        <body style="font-family: sans-serif; background: #FAF9F6; color: #1A1A18; text-align: center; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh;">
          <div style="background: white; border: 1px solid #E8E6DF; border-radius: 16px; padding: 32px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            <svg style="color: #34A853; width: 48px; height: 48px; margin-bottom: 20px; display: inline-block;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 style="margin-top: 0; font-weight: 600; font-size: 20px;">Connection Success!</h2>
            <p style="color: #5F5E5A; font-size: 14px; line-height: 1.5; margin-bottom: 0;">Google Workspace has been linked successfully. This pop-up will close automatically to synchronize your credentials.</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: "OAUTH_AUTH_SUCCESS" }, "*");
              setTimeout(() => {
                window.close();
              }, 1200);
            } else {
              window.location.href = "/";
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    res.status(500).send(`Authentication internal error: ${err.message}`);
  }
});

// GET /api/google-forms/status
app.get("/api/google-forms/status", async (req, res) => {
  try {
    const { clientId, clientSecret } = await getOAuthClientKeys();
    
    let connected = false;
    try {
      const credsExist = await fs.access(GOOGLE_CREDENTIALS_FILE).then(() => true).catch(() => false);
      if (credsExist) {
        const creds = JSON.parse(await fs.readFile(GOOGLE_CREDENTIALS_FILE, "utf-8"));
        if (creds.refresh_token) {
          connected = true;
        }
      }
    } catch {}

    let formConfig = { connected, embedEnabled: false, formId: null, formUrl: null };
    try {
      const configExist = await fs.access(GOOGLE_FORM_CONFIG_FILE).then(() => true).catch(() => false);
      if (configExist) {
        const parsed = JSON.parse(await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8"));
        formConfig = { ...formConfig, ...parsed, connected };
      }
    } catch {}

    return res.json({
      ...formConfig,
      keysStatus: {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        clientId: clientId ? `${clientId.substring(0, 10)}...` : ""
      }
    });
  } catch (err) {
    return res.json({ connected: false, embedEnabled: false, formId: null, formUrl: null });
  }
});

// POST /api/google-forms/configure-keys
app.post("/api/google-forms/configure-keys", async (req, res) => {
  try {
    const { clientId, clientSecret } = req.body;
    if (!clientId || !clientSecret) {
      return res.status(400).json({ error: "Client ID and Client Secret are both required." });
    }

    let savedCreds: any = {};
    try {
      const existing = await fs.readFile(GOOGLE_CREDENTIALS_FILE, "utf-8");
      savedCreds = JSON.parse(existing);
    } catch {}

    savedCreds.client_id = clientId.trim();
    savedCreds.client_secret = clientSecret.trim();

    await fs.writeFile(GOOGLE_CREDENTIALS_FILE, JSON.stringify(savedCreds, null, 2));
    return res.json({ success: true, message: "Google Keys configured successfully." });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/google-forms/disconnect
app.post("/api/google-forms/disconnect", async (req, res) => {
  try {
    await fs.unlink(GOOGLE_CREDENTIALS_FILE).catch(() => {});
    await fs.unlink(GOOGLE_FORM_CONFIG_FILE).catch(() => {});
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/google-forms/toggle-embed
app.post("/api/google-forms/toggle-embed", async (req, res) => {
  try {
    const { embedEnabled } = req.body;
    
    let formConfig: any = { connected: true, embedEnabled: false, formId: null, formUrl: null };
    try {
      const existingConfig = await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8");
      formConfig = JSON.parse(existingConfig);
    } catch {}

    formConfig.embedEnabled = !!embedEnabled;
    await fs.writeFile(GOOGLE_FORM_CONFIG_FILE, JSON.stringify(formConfig, null, 2));

    return res.json({ success: true, embedEnabled: formConfig.embedEnabled });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/google-forms/link
app.post("/api/google-forms/link", async (req, res) => {
  try {
    const { formId, formUrl } = req.body;
    if (!formId || !formUrl) {
      return res.status(400).json({ error: "Form ID and Form URL are required." });
    }

    let formConfig: any = { connected: true, embedEnabled: false, formId: null, formUrl: null };
    try {
      const existingConfig = await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8");
      formConfig = JSON.parse(existingConfig);
    } catch {}

    formConfig.formId = formId.trim();
    formConfig.formUrl = formUrl.trim();
    
    await fs.writeFile(GOOGLE_FORM_CONFIG_FILE, JSON.stringify(formConfig, null, 2));
    return res.json({ success: true, formId: formConfig.formId, formUrl: formConfig.formUrl });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/google-forms/create-form
app.post("/api/google-forms/create-form", async (req, res) => {
  try {
    const accessToken = await getGoogleAccessToken();

    console.log("Posting to Google Forms API to create form...");
    const createRes = await fetch("https://forms.googleapis.com/v1/forms", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        info: {
          title: "CARDOS Premium AI command deck - Early Access Waitlist",
          documentTitle: "CARDOS Waitlist Submission"
        }
      })
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      console.error("Failed to create Google Form:", errorText);
      return res.status(createRes.status).json({ error: `Could not create Google Form: ${errorText}` });
    }

    const formDetails: any = await createRes.json();
    const formId = formDetails.formId;
    const formUrl = formDetails.responderUri;

    console.log("Updating fields in Google Form...", formId);
    const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requests: [
          {
            createItem: {
              item: {
                title: "Email Address",
                description: "Primary email address to join early reservation.",
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {}
                  }
                }
              },
              location: {
                index: 0
              }
            }
          },
          {
            createItem: {
              item: {
                title: "What industry or commercial domain do you operate in?",
                description: "e.g. Freelance, Digital Agency, SaaS, Tech consulting, E-commerce",
                questionItem: {
                  question: {
                    required: false,
                    textQuestion: {}
                  }
                }
              },
              location: {
                index: 1
              }
            }
          },
          {
            createItem: {
              item: {
                title: "What is your primary commercial or workflow pain point?",
                description: "Describe what's slow, tedious, or leaks target leads in your weekly operation.",
                questionItem: {
                  question: {
                    required: false,
                    textQuestion: {}
                  }
                }
              },
              location: {
                index: 2
              }
            }
          }
        ]
      })
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      console.error("Batch update fields failed:", errorText);
    }

    let formConfig: any = { connected: true, embedEnabled: true, formId, formUrl };
    try {
      const existingConfig = await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8");
      formConfig = { ...JSON.parse(existingConfig), ...formConfig };
    } catch {}
    
    await fs.writeFile(GOOGLE_FORM_CONFIG_FILE, JSON.stringify(formConfig, null, 2));

    return res.json({
      success: true,
      formId,
      formUrl,
      message: "CARDOS Waitlist Google Form synchronized, configured, and created dynamically!"
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/google-forms/responses
app.get("/api/google-forms/responses", async (req, res) => {
  try {
    const accessToken = await getGoogleAccessToken();

    const configExist = await fs.access(GOOGLE_FORM_CONFIG_FILE).then(() => true).catch(() => false);
    if (!configExist) {
      return res.status(400).json({ error: "No active Google Form linked. Create or link one first." });
    }

    const config = JSON.parse(await fs.readFile(GOOGLE_FORM_CONFIG_FILE, "utf-8"));
    const formId = config.formId;
    if (!formId) {
      return res.status(400).json({ error: "No Google Form ID specified in configuration file." });
    }

    console.log("Fetching Google Form details map...", formId);
    const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });

    let questionIdToTitleMap: Record<string, string> = {};
    if (formRes.ok) {
      const formSchema: any = await formRes.json();
      if (formSchema && formSchema.items) {
        formSchema.items.forEach((item: any) => {
          if (item.questionItem && item.questionItem.question) {
            const questionId = item.questionItem.question.questionId;
            if (questionId) {
              questionIdToTitleMap[questionId] = item.title || "Question";
            }
          }
        });
      }
    }

    console.log("Fetching Google Form responses...", formId);
    const responsesRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });

    if (!responsesRes.ok) {
      const errorText = await responsesRes.text();
      return res.status(responsesRes.status).json({
        error: `Failed to fetch Google Form responses: ${errorText}`
      });
    }

    const rawData: any = await responsesRes.json();
    const responsesList = rawData.responses || [];

    const parsedEntries = responsesList.map((resp: any) => {
      const answersMap: Record<string, string> = {};
      
      if (resp.answers) {
        Object.keys(resp.answers).forEach((qId) => {
          const ansObj = resp.answers[qId];
          const questionTitle = questionIdToTitleMap[qId] || "Text Answer";
          
          if (ansObj.textAnswers && ansObj.textAnswers.answers && ansObj.textAnswers.answers.length > 0) {
            answersMap[questionTitle] = ansObj.textAnswers.answers[0].value;
          }
        });
      }

      return {
        responseId: resp.responseId,
        submittedAt: resp.lastSubmittedTime || resp.createTime,
        email: resp.respondentEmail || answersMap["Email Address"] || answersMap["email"] || "Anonymous",
        answers: answersMap
      };
    });

    return res.json({
      success: true,
      formId,
      responses: parsedEntries
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Start server
async function startServer() {
  // Vite integration middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Express + Vite server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Express server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CARDOS Server successfully running on http://localhost:${PORT}`);
  });
}

startServer();

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Trash2, 
  Mail, 
  Calendar, 
  Key, 
  RefreshCw, 
  X, 
  Database,
  Grid,
  FileText,
  Link2,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  Trash
} from "lucide-react";

interface AdminPanelProps {
  onClose?: () => void;
  triggerRefreshStats?: number;
}

export default function AdminPanel({ onClose, triggerRefreshStats }: AdminPanelProps) {
  // Tabs
  const [activeTab, setActiveTab] = useState<"local" | "google">("local");

  // Local registrar state
  const [emailsRaw, setEmailsRaw] = useState<any[]>([]);
  const [stats, setStats] = useState({ count: 147, realUsersJoined: 0 });
  const [localLoading, setLocalLoading] = useState(false);

  // Google Integration states
  const [googleStatus, setGoogleStatus] = useState<any>({
    connected: false,
    embedEnabled: false,
    formId: null,
    formUrl: null,
    keysStatus: { hasClientId: false, hasClientSecret: false, clientId: "" }
  });
  
  // Credentials custom config inputs
  const [customClientId, setCustomClientId] = useState("");
  const [customClientSecret, setCustomClientSecret] = useState("");
  const [showKeysConfig, setShowKeysConfig] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);

  // Manual Form linkage inputs
  const [manualFormId, setManualFormId] = useState("");
  const [manualFormUrl, setManualFormUrl] = useState("");
  const [showManualLink, setShowManualLink] = useState(false);

  // Google Responses view state
  const [responses, setResponses] = useState<any[]>([]);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleStatusMsg, setGoogleStatusMsg] = useState("");
  const [googleError, setGoogleError] = useState("");

  // Load stats & list elements
  const fetchStatsAndRegisters = async () => {
    setLocalLoading(true);
    try {
      const res = await fetch("/api/waitlist/stats");
      const data = await res.json();
      setStats({
        count: data.count || 147,
        realUsersJoined: data.realUsersJoined || 0
      });
      setEmailsRaw(data.recentSignups || []);
    } catch (err) {
      console.error("Could not load local waitlist metrics.");
    } finally {
      setLocalLoading(false);
    }
  };

  // Check Google connected status
  const checkGoogleStatus = async () => {
    try {
      const res = await fetch("/api/google-forms/status");
      const data = await res.json();
      setGoogleStatus(data);
      if (data.keysStatus) {
        if (!data.keysStatus.hasClientId && !data.keysStatus.hasClientSecret) {
          setShowKeysConfig(true); // Proactively help setup if missing
        }
      }
    } catch (err) {
      console.error("Error loading Google integration settings.");
    }
  };

  // Fetch responses from Linked Google Form
  const fetchGoogleResponses = async () => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      const res = await fetch("/api/google-forms/responses");
      const data = await res.json();
      if (res.ok && data.success) {
        setResponses(data.responses || []);
      } else {
        setGoogleError(data.error || "Could not retrieve form submissions.");
      }
    } catch {
      setGoogleError("Connection error while pulling Google Form info.");
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndRegisters();
    checkGoogleStatus();
  }, [triggerRefreshStats]);

  useEffect(() => {
    if (googleStatus.connected && googleStatus.formId) {
      fetchGoogleResponses();
    }
  }, [googleStatus.connected, googleStatus.formId]);

  // Handle keys configuration save
  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClientId.trim() || !customClientSecret.trim()) {
      alert("Please complete both Client ID and Client Secret fields.");
      return;
    }
    setConfigSaving(true);
    try {
      const res = await fetch("/api/google-forms/configure-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: customClientId,
          clientSecret: customClientSecret
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Credentials saved securely to local workspace. You can now connect your account!");
        setShowKeysConfig(false);
        checkGoogleStatus();
      } else {
        alert(data.error || "Failed to configure Google secrets.");
      }
    } catch {
      alert("Workspace network error during encryption.");
    } finally {
      setConfigSaving(false);
    }
  };

  // Trigger Auth Popup redirect
  const handleConnectGoogle = async () => {
    setGoogleError("");
    try {
      const res = await fetch("/api/auth/url");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate authorization session.");
      }

      // Clear existing listeners
      const authWindow = window.open(data.url, "google_oauth_popup", "width=600,height=750,location=no,menubar=no");
      if (!authWindow) {
        alert("Verification popup blocked by your browser! Please allow popups for Google verification.");
      }
    } catch (err: any) {
      setGoogleError(err.message || "Failed to authenticate Google. Ensure Client credentials are valid.");
    }
  };

  // Popup communication listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) {
        return;
      }
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        setGoogleStatusMsg("Google account synchronized successfully!");
        checkGoogleStatus();
        setTimeout(() => setGoogleStatusMsg(""), 3000);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Set Embed Toggle
  const handleToggleEmbed = async () => {
    try {
      const targetState = !googleStatus.embedEnabled;
      const res = await fetch("/api/google-forms/toggle-embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embedEnabled: targetState })
      });
      if (res.ok) {
        await checkGoogleStatus();
      }
    } catch {
      console.error("Toggle embed status error.");
    }
  };

  // 1-Click google form creator
  const handleCreateGoogleForm = async () => {
    setGoogleLoading(true);
    setGoogleError("");
    setGoogleStatusMsg("Triggering Forms API pipeline...");
    try {
      const res = await fetch("/api/google-forms/create-form", {
        method: "POST"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGoogleStatusMsg("Google Form successfully compiled!");
        await checkGoogleStatus();
        setTimeout(() => setGoogleStatusMsg(""), 4000);
      } else {
        setGoogleError(data.error || "Form automated builder encountered an error.");
        setGoogleStatusMsg("");
      }
    } catch {
      setGoogleError("Pipeline failure. Ensure refresh token yields access permissions.");
      setGoogleStatusMsg("");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Manual Form linkage
  const handleManualLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFormId.trim() || !manualFormUrl.trim()) {
      alert("Please supply both Google Form ID and Form Sharing Link.");
      return;
    }
    try {
      const res = await fetch("/api/google-forms/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: manualFormId,
          formUrl: manualFormUrl
        })
      });
      if (res.ok) {
        setShowManualLink(false);
        setManualFormId("");
        setManualFormUrl("");
        await checkGoogleStatus();
      } else {
        alert("Failed to manual link form configuration.");
      }
    } catch {
      alert("Manual mapping error.");
    }
  };

  // Disconnect Google Account
  const handleDisconnectGoogle = async () => {
    if (!window.confirm("Are you sure you want to disconnect Google Forms and unlink early access synchronization? This clears your connected credentials.")) {
      return;
    }
    try {
      const res = await fetch("/api/google-forms/disconnect", { method: "POST" });
      if (res.ok) {
        await checkGoogleStatus();
        setResponses([]);
      }
    } catch {
      console.error("Disconnect error.");
    }
  };

  return (
    <div className="bg-[#FDFCFB] border border-[#E8E6DF] rounded-2xl p-5 sm:p-6 shadow-xl relative" id="developer-admin-panel">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-[#F5F4F0] transition-all cursor-pointer z-10"
          title="Close config panel"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Title */}
      <div className="mb-4">
        <h4 className="text-sm font-sans font-bold text-[#1A1A18] tracking-tight flex items-center gap-2">
          <Database className="w-4.5 h-4.5 text-brand-orange" />
          <span>CARDOS Waitlist Database Controller</span>
        </h4>
        <p className="text-[11px] text-[#5F5E5A] font-light mt-0.5">
          Orchestrate lead tracking directly. Choose between local server file persistence and real-time Google Forms synchronization.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E6DF] mb-5 gap-1.5">
        <button
          onClick={() => setActiveTab("local")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "local"
              ? "border-[#1A1A18] text-[#1A1A18]"
              : "border-transparent text-[#888780] hover:text-[#1A1A18]"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Local Storage</span>
          <span className="bg-[#F5F4F0] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold text-[#5F5E5A]">
            {stats.realUsersJoined} Joined
          </span>
        </button>

        <button
          onClick={() => setActiveTab("google")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "google"
              ? "border-brand-orange text-[#1A1A18] font-semibold"
              : "border-transparent text-[#888780] hover:text-[#1A1A18]"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Google Forms Sync</span>
          {googleStatus.connected && (
            <span className="bg-emerald-100 text-[9px] px-1.5 py-0.5 rounded font-mono text-emerald-800 font-bold uppercase tracking-wider">
              ONLINE
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT: LOCAL persistence */}
      {activeTab === "local" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F4F0] border border-[#E8E6DF]/60 rounded-xl p-2 text-center">
              <span className="text-[9px] text-[#888780] uppercase font-mono tracking-wider">Waitlist Mock Social Total</span>
              <p className="text-lg font-serif font-bold text-[#1A1A18]">{stats.count}</p>
            </div>
            <div className="bg-[#F5F4F0] border border-[#E8E6DF]/60 rounded-xl p-2 text-center">
              <span className="text-[9px] text-[#888780] uppercase font-mono tracking-wider">Real Signups Saved on Disk</span>
              <p className="text-lg font-serif font-bold text-[#1A1A18]">{stats.realUsersJoined}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#888780] block mb-1">Recent 5 Signups on Server</span>
            {localLoading ? (
              <div className="text-center py-4 text-xs font-mono text-[#888780] animate-pulse">
                Accessing data/waitlist.json securely...
              </div>
            ) : emailsRaw.length > 0 ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {emailsRaw.map((item, i) => (
                  <div
                    key={i}
                    className="border border-[#E8E6DF]/60 bg-[#FDFCFB] rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-mono text-[#5F5E5A] hover:bg-[#F5F4F0] transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#888780] flex-shrink-0" />
                      <span className="font-semibold text-[#1A1A18] break-all">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#888780]">
                      <span>
                        {new Date(item.joinedAt).toLocaleDateString()} {new Date(item.joinedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                        <Key className="w-2.5 h-2.5" />
                        VIP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#888780] border border-dashed border-[#E8E6DF] bg-[#F5F4F0]/40 rounded-xl">
                No local emails signed up yet. Submit the waitlist form to see your emails populated here in real-time.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#E8E6DF]/60 flex items-center justify-between text-[10px] font-mono text-[#888780]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>data/waitlist.json active</span>
            </span>
            <button
              onClick={fetchStatsAndRegisters}
              className="flex items-center gap-1 hover:text-black underline active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh data</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GOOGLE FORMS INTEGRATION */}
      {activeTab === "google" && (
        <div className="space-y-4">
          
          {/* Status logs */}
          {googleStatusMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center gap-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{googleStatusMsg}</span>
            </div>
          )}

          {googleError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{googleError}</span>
              </div>
              <p className="text-[10px] leading-normal text-rose-700 font-light">
                Please verify your Google API client variables are configured below and that you authorize correctly using standard popups.
              </p>
            </div>
          )}

          {/* Configuration drawer */}
          <div className="border border-[#E8E6DF] rounded-xl p-3 bg-[#FDFCFB] space-y-2">
            <button
              onClick={() => setShowKeysConfig(!showKeysConfig)}
              className="w-full flex items-center justify-between text-xs text-[#1A1A18] font-mono font-medium hover:underline cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Google API App Keys Configuration</span>
              </span>
              <span className="text-[10px] text-[#888780] hover:text-black">
                {showKeysConfig ? "(Collapse ▴)" : "(Expand ▾)"}
              </span>
            </button>

            {showKeysConfig && (
              <form onSubmit={handleSaveKeys} className="space-y-2.5 pt-2 border-t border-[#E8E6DF]/60 animate-fadeIn text-xs">
                <p className="text-[10px] text-[#888780] leading-relaxed">
                  Configure the OAuth Client ID and Secret generated on your Google Cloud Platform Console (Workspace APIs enabled: Google Drive API, Google Forms API). This is saved under <code className="bg-[#F5F4F0] px-1 py-0.2 rounded text-black font-semibold font-mono">data/google-credentials.json</code>.
                </p>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#888780] block font-semibold">Google OAuth Client ID</label>
                  <input
                    type="text"
                    value={customClientId}
                    onChange={(e) => setCustomClientId(e.target.value)}
                    placeholder="e.g. 12345-abcde.apps.googleusercontent.com"
                    className="w-full bg-[#F5F4F0] border border-[#E8E6DF] rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-black placeholder:text-[#888780]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#888780] block font-semibold">Google OAuth Client Secret</label>
                  <input
                    type="password"
                    value={customClientSecret}
                    onChange={(e) => setCustomClientSecret(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    className="w-full bg-[#F5F4F0] border border-[#E8E6DF] rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-black placeholder:text-[#888780]"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowKeysConfig(false)}
                    className="border border-[#E8E6DF] text-[#5F5E5A] px-3 py-1 rounded-lg hover:bg-[#F5F4F0] transition active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={configSaving}
                    className="bg-brand-orange text-white px-3 py-1.5 rounded-lg font-medium hover:bg-opacity-80 transition active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{configSaving ? "Encrypting..." : "Save Secrets"}</span>
                  </button>
                </div>
              </form>
            )}

            {!showKeysConfig && (
              <div className="text-[10px] font-mono text-[#888780] flex justify-between items-center bg-[#F5F4F0]/40 p-1.5 rounded-lg">
                <span>Secret Credentials Status:</span>
                <span className="flex items-center gap-1 font-semibold text-zinc-700">
                  {googleStatus.keysStatus?.hasClientId ? (
                    <>
                      <Unlock className="w-3 h-3 text-emerald-500" />
                      <span>Configured Block ({googleStatus.keysStatus.clientId})</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-amber-500" />
                      <span>Keys Unfilled</span>
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Connection card */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-xl p-4.5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div>
                <span className="text-[9px] font-mono uppercase font-bold text-amber-600 block">STEP 1: CONNECTION SEEDS</span>
                <h5 className="font-semibold text-xs text-[#1A1A18] mt-0.5">Google account Linkage</h5>
                <p className="text-[10px] text-[#5F5E5A] font-light leading-normal">
                  Grant permission to access Google Drive & Forms securely to create customer waitlist resources.
                </p>
              </div>

              {!googleStatus.connected ? (
                <button
                  onClick={handleConnectGoogle}
                  className="bg-[#1A1A18] hover:bg-neutral-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 shrink-0"
                >
                  <Key className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Connect Google</span>
                </button>
              ) : (
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-emerald-600 font-mono text-xs font-bold flex items-center gap-1 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Connected Link</span>
                  </span>
                  <button
                    onClick={handleDisconnectGoogle}
                    className="text-[10px] font-mono text-rose-500 hover:text-rose-700 flex items-center gap-1 underline cursor-pointer"
                  >
                    <span>Disconnect google info</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sync configuration options shown once connected */}
            {googleStatus.connected && (
              <div className="border-t border-[#E8E6DF] pt-3.5 space-y-4 animate-fadeIn">
                <span className="text-[9px] font-mono uppercase font-bold text-amber-600 block">STEP 2: FORM BLUEPRINT DETAILS</span>

                {/* Main buttons - Auto creates form or manual linkage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleCreateGoogleForm}
                    disabled={googleLoading}
                    className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-opacity-80 disabled:opacity-50 text-white font-medium text-xs rounded-xl p-3.5 cursor-pointer shadow-sm transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{googleLoading ? "Compiling Form..." : "1-Click Create Waitlist Google Form"}</span>
                  </button>

                  <button
                    onClick={() => setShowManualLink(!showManualLink)}
                    className="flex items-center justify-center gap-2 border border-[#E8E6DF] hover:bg-[#F5F4F0] text-[#1A1A18] font-medium text-xs rounded-xl p-3.5 cursor-pointer transition-all"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Link Existing Google Form</span>
                  </button>
                </div>

                {/* Manual Link Input Overlay */}
                {showManualLink && (
                  <form onSubmit={handleManualLink} className="border border-[#E8E6DF] bg-white rounded-xl p-3 space-y-2.5 animate-fadeIn text-xs">
                    <p className="text-[10px] font-mono text-zinc-500">Provide details to directly map are pre-created Google Form to Cardos:</p>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-[#888780] block font-semibold">Google Form ID</label>
                      <input
                        type="text"
                        value={manualFormId}
                        onChange={(e) => setManualFormId(e.target.value)}
                        placeholder="e.g. 1FAIpQLSfB2Nsz_999fMDF..."
                        className="w-full bg-[#F5F4F0] border border-[#E8E6DF] rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-black placeholder:text-[#5F5E5A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-[#888780] block font-semibold">Form Respondent URL (Viewing URL)</label>
                      <input
                        type="text"
                        value={manualFormUrl}
                        onChange={(e) => setManualFormUrl(e.target.value)}
                        placeholder="e.g. https://docs.google.com/forms/d/e/.../viewform"
                        className="w-full bg-[#F5F4F0] border border-[#E8E6DF] rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-black placeholder:text-[#5F5E5A]"
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setShowManualLink(false)}
                        className="border border-[#E8E6DF] px-3 py-1 rounded-lg hover:bg-[#F5F4F0] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-brand-orange text-white px-3 py-1 rounded-lg font-medium cursor-pointer hover:bg-opacity-85"
                      >
                        Map Form
                      </button>
                    </div>
                  </form>
                )}

                {/* Connected Form display */}
                {googleStatus.formId ? (
                  <div className="border border-[#E8E6DF] rounded-xl p-3 bg-white space-y-2.5 animate-fadeIn">
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wide">
                          ACTIVE GOOGLE FORM LINKED
                        </span>
                        <h6 className="text-xs font-semibold text-[#1A1A18] break-all">{googleStatus.formId}</h6>
                      </div>
                      <a
                        href={googleStatus.formUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-[#E8E6DF] text-[#1A1A18] hover:bg-[#F5F4F0] transition flex items-center justify-center"
                        title="Open Form Live on Google"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Embedding Config Toggle */}
                    <div className="flex items-center justify-between border-t border-[#E8E6DF]/50 pt-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#1A1A18] block">Embed Iframe in waitlist</span>
                        <p className="text-[10px] text-[#888780] font-light leading-snug">
                          Activate to trade the default form for your live embedded Google Form.
                        </p>
                      </div>
                      <button
                        onClick={handleToggleEmbed}
                        className="transition-all cursor-pointer hover:scale-105 active:scale-95"
                      >
                        {googleStatus.embedEnabled ? (
                          <ToggleRight className="w-8 h-8 text-emerald-500 fill-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-[#888780]" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 bg-white border border-dashed border-[#E8E6DF] rounded-xl text-[11px] text-[#888780] leading-normal font-light">
                    No active Google Form mapped yet. Please 1-Click Create or link your existing form above.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* LIVE FORMS RESPONSES VIEWER SPREADSHEET */}
          {googleStatus.connected && googleStatus.formId && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#888780] block font-bold">
                  LIVE GOOGLE FORM RESPONSES ({responses.length})
                </span>
                <button
                  onClick={fetchGoogleResponses}
                  disabled={googleLoading}
                  className="text-[10px] font-mono text-[#888780] hover:text-black flex items-center gap-1 underline"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${googleLoading ? "animate-spin" : ""}`} />
                  <span>Sync live responses</span>
                </button>
              </div>

              {googleLoading ? (
                <div className="text-center py-8 text-xs font-mono text-[#888780] animate-pulse">
                  Querying live Forms API responses...
                </div>
              ) : responses.length > 0 ? (
                <div className="border border-[#E8E6DF] bg-[#FDFCFB] rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-[11px] font-mono text-[#5F5E5A]">
                    <thead className="bg-[#FAF9F6] border-b border-[#E8E6DF] text-[#1A1A18] font-bold">
                      <tr>
                        <th className="p-2 sm:p-2.5">Email</th>
                        <th className="p-2 sm:p-2.5 hidden md:table-cell">Submitted</th>
                        <th className="p-2 sm:p-2.5">Business Needs Map</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E6DF]/60">
                      {responses.map((resp, i) => (
                        <tr key={i} className="hover:bg-[#FAF9F6] transition-colors">
                          <td className="p-2 sm:p-2.5 font-semibold text-[#1A1A18] break-all max-w-[140px]">
                            {resp.email}
                          </td>
                          <td className="p-2 sm:p-2.5 text-[9px] text-[#888780] hidden md:table-cell">
                            {new Date(resp.submittedAt).toLocaleDateString([], { month: "short", day: "2-digit" })}{" "}
                            {new Date(resp.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="p-2 sm:p-2.5">
                            <div className="space-y-0.5 text-[10px] text-zinc-600">
                              {Object.keys(resp.answers).map((qTitle, subI) => (
                                <div key={subI} className="leading-tight">
                                  <span className="text-[8px] font-serif uppercase tracking-wider text-brand-orange block font-bold leading-none mt-1">
                                    {qTitle}:
                                  </span>
                                  <span className="block font-sans text-neutral-800 italic mt-0.5 ml-1">
                                    "{resp.answers[qTitle]}"
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-[#888780] border border-dashed border-[#E8E6DF] bg-[#F5F4F0]/40 rounded-xl">
                  No submissions recorded on this Google Form yet. Submit a test form on the main page to check live sync.
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

import { CardCategory, CardCommand } from "../types";

export const CARDOS_DECK: CardCommand[] = [
  // --- SALES ---
  {
    id: "SALE-01",
    code: "01",
    category: CardCategory.SALES,
    title: "Uncover the Real Pain",
    description: "Understand your prospect's true pain points, secret concerns, and triggers before you pitch anything.",
    promptTemplate: `You are an elite enterprise sales psychologist. I am selling a [ServiceOrProduct] to a prospect who is a [ProspectRole] in the [ProspectNiche] industry. Their surface-level problem is [SurfaceLevelProblem], but they are hesitant to move forward.

Analyze their role, industry pressures, and psychology to:
1. Identify the 3 deep, unspoken emotional drivers (fear of status loss, overwhelm, board criticism, etc.) behind this surface problem.
2. Outline a 3-step conversational line of questioning (The "Pain Funnel") to guide them into self-discovering and articulating these deep pains.
3. Draft a verbal positioning statement that frames my product as the ultimate reliever of these specific, deep pains.

Adopt an objective, practical, highly polished enterprise sales consultant tone. Avoid generic advice.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you selling?",
        defaultValue: "SaaS automation software"
      },
      {
        key: "ProspectRole",
        label: "Prospect Role",
        description: "Who are you speaking to?",
        defaultValue: "VP of Marketing"
      },
      {
        key: "ProspectNiche",
        label: "Prospect Niche/Industry",
        description: "What industry are they in?",
        defaultValue: "E-commerce & retail"
      },
      {
        key: "SurfaceLevelProblem",
        label: "Surface Problem",
        description: "What problem do they claim to have?",
        defaultValue: "Low email conversion rates"
      }
    ],
    scanMessage: "SCAN BACK TO UNLOCK THE OBJECTION CRUSHER"
  },
  {
    id: "SALE-02",
    code: "02",
    category: CardCategory.SALES,
    title: "The High-Ticket Bracket",
    description: "Reframe a budget objection into a strategic partnership. Positions premium pricing correctly.",
    promptTemplate: `You are an expert high-ticket sales trainer. I need to handle a severe price objection for my luxury/premium service, [PremiumService], priced at [PriceRange]. The prospect is representing [ProspectCompany] and says they are comparing us to cheaper competitors.

Provide a premium objection handling framework:
1. **The Context Reset**: A script to gracefully accept their budget stance without conceding value, demonstrating complete confidence.
2. **The "Cost-of-Inaction" Costing**: Walk through a simulated calculation showing how choosing a budget provider is actually more expensive due to [RisksOrInefficiencies].
3. **The Premium Reframing Call**: A direct closing prompt that highlights the strategic ROI difference of choosing a top-tier partner rather than a vendor.`,
    placeholders: [
      {
        key: "PremiumService",
        label: "Premium Service",
        description: "The name or type of your premium service",
        defaultValue: "B2B Fractional CMO Advisory"
      },
      {
        key: "PriceRange",
        label: "Price Points",
        description: "What does it cost?",
        defaultValue: "₹1,50,000 / month"
      },
      {
        key: "ProspectCompany",
        label: "Prospect Company Size",
        description: "Describe the prospect's company",
        defaultValue: "Series-A tech startup with 40 employees"
      },
      {
        key: "RisksOrInefficiencies",
        label: "Competitor Risks",
        description: "The risks of cheap low-quality alternatives",
        defaultValue: "broken communication, missed deadlines, poor quality traffic"
      }
    ],
    scanMessage: "SCAN FOR PARTNERSHIP FRAMING"
  },
  {
    id: "SALE-03",
    code: "03",
    category: CardCategory.SALES,
    title: "The Friction-Free Close",
    description: "Constructs a proposal summary and mutual action plan that minimizes buyer's signing anxiety.",
    promptTemplate: `You are a luxury closing counsel. I need to send a summarizing Close Document to my high-value lead. Our project goal is [ProjectGoal], and the core deliverables are [Deliverables]. 

Draft a minimalist, direct final deal page containing:
1. **One-Sentence Vision**: Highlighting the impact of the transformation, not features.
2. **The 3 Joint Milestones**: Lay out a clear Timeline of Co-responsibility.
3. **The Micro-Action Step**: The next simple 2-minute task they need to do to begin (e.g. 'Approve proposal', 'Intro to PM'). Avoid formal legalese and heavy friction.`,
    placeholders: [
      {
        key: "ProjectGoal",
        label: "Core Goal of Project",
        description: "What main result will the prospect get?",
        defaultValue: "Increasing outbound response rate by 3x"
      },
      {
        key: "Deliverables",
        label: "Deliverables",
        description: "What are you shipping them?",
        defaultValue: "Custom CRM Setup + 10 written outbound sequences"
      }
    ]
  },

  // --- LEADS ---
  {
    id: "LEAD-01",
    code: "04",
    category: CardCategory.LEADS,
    title: "The 3-Sentence Hook",
    description: "Write ultra-personalized, short cold emails with double-digit reply rates.",
    promptTemplate: `You are an elite cold outreach copywriter. I am targeting decision-makers with the title of [TargetTitle] in the [TargetIndustry] niche. Our offering is [OfferValue], and our primary social proof is [CaseStudySocialProof].

Draft 3 highly distinct variations of an ultra-short, maximum 3-sentence cold email that contains:
- Sentence 1: A zero-fluff, hyper-targeted observation of their niche (not fake flattery).
- Sentence 2: The low-friction offer stating exactly what we solved for another customer.
- Sentence 3: A low-friction, interest-based CTA (e.g., "Open to seeing a quick 45-second loom on how to do this?")

Rules to maintain: Zero hype words (no "delighted", "revolutionary", "game-changer"), double line breaks between sentences, lower-case style elements, absolute punchy readability.`,
    placeholders: [
      {
        key: "TargetTitle",
        label: "Decision Maker Title",
        description: "Who is the ideal buyer?",
        defaultValue: "Founder & CEO"
      },
      {
        key: "TargetIndustry",
        label: "Industry/Niche",
        description: "What specific industry are they in?",
        defaultValue: "SaaS Agencies"
      },
      {
        key: "OfferValue",
        label: "Core Offer",
        description: "What value or result do you bring?",
        defaultValue: "Automated qualified lead generation onautopilot"
      },
      {
        key: "CaseStudySocialProof",
        label: "Social Proof",
        description: "What's your best result?",
        defaultValue: "Helped 'BrandX' secure 14 booked client calls in 21 days"
      }
    ],
    scanMessage: "SCAN BACK TO INJECT RELEVANCY"
  },
  {
    id: "LEAD-02",
    code: "05",
    category: CardCategory.LEADS,
    title: "The Loom Script Generator",
    description: "Get a high-impact, custom 55-second recorded video audit script that hooks cold clients.",
    promptTemplate: `You are a cold video audit wizard. I am recording a short Loom screen-recording to pitch to a potential client, [ClientName], who works in [ClientSector]. I will display their [WebsiteOrProfile] on screen. 

Compose a fast-paced, highly engaging 60-second video speaking script:
- **0s-15s (The Screen Shock)**: What to show on their site is broken/suboptimal to immediately grab attention. No hello/introduction platitudes.
- **15s-35s (The Contrast Peek)**: Show them what a highly optimized visual flow looks like, highlighting the missing results on their side.
- **35s-50s (The Strategy Tease)**: Hint at how we solved this technical funnel leak for a peer.
- **50s-60s (The Clean Out)**: Call to Action that invites a response without booking pressure.`,
    placeholders: [
      {
        key: "ClientName",
        label: "Target Client Name",
        description: "Individual or business name",
        defaultValue: "Nova Design Labs"
      },
      {
        key: "ClientSector",
        label: "Target Sector",
        description: "Niche description",
        defaultValue: "High-end interior design studio"
      },
      {
        key: "WebsiteOrProfile",
        label: "What's on Screen?",
        description: "What page are you pulling up to audit?",
        defaultValue: "Their laggy mobile project portfolio page"
      }
    ]
  },

  // --- MARKETING ---
  {
    id: "MKTG-01",
    code: "06",
    category: CardCategory.MARKETING,
    title: "The Scroll-Stopper Hook",
    description: "Generate 5 high-converting, viral narrative hooks for LinkedIn, X, and newsletters.",
    promptTemplate: `You are a world-class growth-marketing writer. I need to write a post about [CoreTopic] targeted at [TargetAudience]. The message of the post is: [PostMessage].

Generate 5 high-impact, scroll-stopping, psychological headline formats based on these proven architectures:
1. **The Contra-Intuitive Insight**: Challenge a widely held belief or common advice.
2. **The "Zero to Hero" Numbers**: Side-by-side metric comparison over a specific timeframe.
3. **The Stealth Process**: Reveal an behind-the-scenes methodology.
4. **The High-Ticket Regret**: A mistake that cost serious capital or time.
5. **The Open-Loop Story**: Introduce a high-stakes challenge, withholding the climax.

Rules: Keep every card hook under 80 characters. Use crisp, punchy vocabulary. Provide a one-sentence breakdown of why each hook works.`,
    placeholders: [
      {
        key: "CoreTopic",
        label: "Core Topic",
        description: "What is your post about?",
        defaultValue: "Delegating operations to an agency partner"
      },
      {
        key: "TargetAudience",
        label: "Your Target Audience",
        description: "Who are you trying to hook?",
        defaultValue: "busy agency founders working 70hr weeks"
      },
      {
        key: "PostMessage",
        label: "Key Message/Takeaway",
        description: "The core advice you want to teach them",
        defaultValue: "Doing client work yourself stops you from scaling, hire an operator"
      }
    ],
    scanMessage: "SCAN FOR NARRATIVE MULTIPLIERS"
  },
  {
    id: "MKTG-02",
    code: "07",
    category: CardCategory.MARKETING,
    title: "The Anti-Benefit Stack",
    description: "A dark-horse copywriting framework that focuses on cost-of-neglect over positive highlights.",
    promptTemplate: `You are an elite conversion psychologist. Redraft the product value proposition for [ProductOrService]. Instead of listing happy benefits, I want to deploy the 'Anti-Benefit Stack' to appeal to their loss aversion.

Analyze:
1. **The Cost of Complacency**: What happens to their business if they do nothing for another 6 months of [CurrentNegativeState]?
2. **The Invisible Leak**: The small day-to-day wastes in [InefficientProcess] that accumulate to costing serious cash.
3. **The Pivot Point**: Rewrite their hero-section subtitle to switch from 'Save time with automation' to a sharp, high-contrast headline highlighting the preventable waste.`,
    placeholders: [
      {
        key: "ProductOrService",
        label: "Product or Service",
        description: "What are you copy-optimizing?",
        defaultValue: "No-code workflow setup services"
      },
      {
        key: "CurrentNegativeState",
        label: "The Complacent State",
        description: "What bad habit are they currently ignoring?",
        defaultValue: "manually pasting billing data from email to Excel"
      },
      {
        key: "InefficientProcess",
        label: "Inefficient Process",
        description: "The specific workflow that has the issue",
        defaultValue: "the invoicing and bookkeeping intake"
      }
    ]
  },

  // --- PRODUCTIVITY & STRATEGY ---
  {
    id: "PROD-01",
    code: "08",
    category: CardCategory.PRODUCTIVITY,
    title: "The 4-Hour Leverage Audit",
    description: "Pinpoint where the business owner is losing hours to low-leverage work. Maps delegate vectors.",
    promptTemplate: `You are an operational scale consultant for fast-growth startups. I am currently spending [WeeklyHours] hours per week on [LowLeverageTasks]. My business generates revenue via [BusinessRevenueEngine]. 

Run a highly tactical leverage audit:
1. **The Dollar-Per-Hour Breakdown**: Quantify the cost of me executing these tasks versus outsourcing them.
2. **The Delegation Protocol**: Create an exact SOP (Standard Operating Procedure) template for a remote virtual assistant to takeover [LowLeverageTasks] with zero hand-holding.
3. **The High-Leverage Vector**: Outline the exact 2 strategic initiatives I should reallocate these [WeeklyHours] freed hours into to grow [BusinessRevenueEngine].`,
    placeholders: [
      {
        key: "WeeklyHours",
        label: "Hours Diverted",
        description: "How many hours are lost to grunt work?",
        defaultValue: "15"
      },
      {
        key: "LowLeverageTasks",
        label: "Grunt Work Tasks",
        description: "What repetitive tasks eat your week?",
        defaultValue: "formatting invoices, scheduling client calls, and posting social media content"
      },
      {
        key: "BusinessRevenueEngine",
        label: "Business Model",
        description: "How does your business actually make money?",
        defaultValue: "Selling high-ticket website design audits at ₹2,50,000 each"
      }
    ],
    scanMessage: "SCAN FOR OPERATIONAL DELEGATES"
  },
  {
    id: "PROD-02",
    code: "09",
    category: CardCategory.PRODUCTIVITY,
    title: "The 80/20 Profit Squeeze",
    description: "Identify the top 20% of clients producing 80% of revenue and find the toxic margin leaks.",
    promptTemplate: `You are an elite business auditor. My business offers [ServicesOffered] to multiple types of clients. My primary headache is [TopBusinessHeadache]. 

Teach me how to squeeze profits:
1. **The Client Quadrant Analysis**: Provide a classification rubric to isolate High-Profit, Low-Friction clients ("Angels") from Low-Profit, High-Friction clients ("Vampires").
2. **The Firing Script**: Give me a comfortable, ultra-elegant script to gracefully offload or double the prices of our 2 worst-performing clients without bridges being burned.
3. **The Expansion Angle**: How to repackage our [ServicesOffered] to sell exclusively to the top 20% client segment.`,
    placeholders: [
      {
        key: "ServicesOffered",
        label: "Your Services",
        description: "What products or retainer lines do you sell?",
        defaultValue: "Custom front-end coding and web maintenance"
      },
      {
        key: "TopBusinessHeadache",
        label: "Main Headache",
        description: "What's the biggest drain on your peace of mind?",
        defaultValue: "Clients asking for unlimited out-of-scope revisions over WhatsApp"
      }
    ]
  },

  // --- AUTOMATION & OPS ---
  {
    id: "AUTO-01",
    code: "10",
    category: CardCategory.AUTOMATION,
    title: "The Zapier Blueprint Architect",
    description: "Map out automated client onboarding that syncs custom data without a custom backend.",
    promptTemplate: `You are an automation master. I want to build a frictionless onboarding pipeline. When a new client purchases [ServicePurchased], I need to automatically link [SourcePlatform] in real-time, push data to [DestinationPlatform], and open a communication channel in [ChatTool].

Draft an absolute step-by-step Zapier/Make.com automation flow config:
1. **Trigger Definition**: Exact data fields to capture from the intake hook.
2. **Intermediate Data Transformation**: How to cleanly format the inputs (e.g. converting currency, cleaning trailing spaces).
3. **Multi-Action Outputs**: Detailed webhook mapping to set up folders, send the intro template, and ping my team. Include actual placeholder JSON blueprints.
4. **Error Guardrails**: What to do if the payment metadata lacks vital account info.`,
    placeholders: [
      {
        key: "ServicePurchased",
        label: "Purchased Package",
        description: "What high-level service was booked?",
        defaultValue: "Premium Brand Reduplicative Package"
      },
      {
        key: "SourcePlatform",
        label: "Trigger Platform",
        description: "Where does the checkout occur?",
        defaultValue: "Stripe Checkout Page"
      },
      {
        key: "DestinationPlatform",
        label: "Database / CRM",
        description: "Where does client metadata get stored?",
        defaultValue: "Airtable CRM workspace"
      },
      {
        key: "ChatTool",
        label: "Onboarding Chat",
        description: "Where do you welcome them?",
        defaultValue: "Discord Private client salon"
      }
    ],
    scanMessage: "SCAN FOR COMPREHENSIVE AUTOMATION PATHS"
  },
  {
    id: "AUTO-02",
    code: "11",
    category: CardCategory.AUTOMATION,
    title: "The System-Level Retainer funnel",
    description: "Turn irregular project work into recurring automated retainers using specific touchpoint workflows.",
    promptTemplate: `You are an agency efficiency advisor. I want to convert project-based clients from [TypeOfProject] to a recurring automated retainer service, [RetainerOffer]. 

Provide:
1. **The Post-Project Transition Trigger**: When and how, on absolute autopilot, to pitch the retainer at the precise peak of customer satisfaction.
2. **The Retainer Scope Guardrail**: An automated weekly status email checklist template that sets clear, strict boundaries so we prevent scope creep.
3. **The Value-Visibility System**: A framework to prove our monthly ROI without demanding status review meetings, generating automated metrics report structures.`,
    placeholders: [
      {
        key: "TypeOfProject",
        label: "Onetime Project",
        description: "What did you build for them?",
        defaultValue: "A custom Webflow design and backend integration"
      },
      {
        key: "RetainerOffer",
        label: "Retainer Package",
        description: "What is your automated recurring package?",
        defaultValue: "Technical maintenance, conversion rate CRO reporting, or continuous SEO updates"
      }
    ]
  }
,

  // --- SALES (continued — completing 10/10) ---
  {
    id: "SALE-04",
    code: "12",
    category: CardCategory.SALES,
    title: "The Multi-Decision Maker Consensus Script",
    description: "Get every stakeholder aligned when a deal has more than one decision-maker, so it doesn't stall in internal debate.",
    promptTemplate: `You are a senior enterprise sales strategist who specializes in multi-stakeholder deals. I'm selling [ServiceOrProduct] into [ProspectCompany], and the buying committee includes these roles: [StakeholderRoles]. Each of them likely cares about something different, and the deal is at risk of stalling because no single person owns the final yes.

Give me:
1. A breakdown of what each stakeholder role in [StakeholderRoles] is silently optimizing for (cost, risk, status, ease of implementation) and how to speak to each one differently in the same room.
2. A one-page "consensus document" structure I can send after the meeting that gives every stakeholder their own reason to say yes.
3. A script for surfacing the one hidden objector in the group — the person who won't speak up in the meeting but can quietly kill the deal afterward.

Keep the tone direct and consultative, like someone who has closed enterprise deals for years — not generic sales-training language.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you selling?",
        defaultValue: "B2B marketing automation platform"
      },
      {
        key: "ProspectCompany",
        label: "Prospect Company",
        description: "Who's the company/account?",
        defaultValue: "A 200-person logistics company"
      },
      {
        key: "StakeholderRoles",
        label: "Buying Committee Roles",
        description: "Who's in the room?",
        defaultValue: "VP Operations, CFO, and Head of IT"
      }
    ],
    scanMessage: "SCAN TO ALIGN THE WHOLE ROOM"
  },
  {
    id: "SALE-05",
    code: "13",
    category: CardCategory.SALES,
    title: "The B2B Silent Pitch Deck Checklist",
    description: "Build a pitch deck that closes deals even when you're not in the room to present it — for forwarded, async decisions.",
    promptTemplate: `You are a deck consultant who has reviewed hundreds of B2B sales decks that closed six and seven-figure deals without the seller present. I'm building a pitch deck for [ServiceOrProduct], targeting [TargetBuyer], and it will often be forwarded internally without me there to narrate it.

Give me:
1. A slide-by-slide outline (8-10 slides max) optimized to be understood with zero verbal explanation — what each slide must say on its own.
2. The 3 most common reasons a "silent" deck gets misread or rejected internally, and how to preempt each one directly on the slide.
3. One closing slide structure that gives the internal forwarder an easy way to champion it to their own boss, in their own words.

Be specific and tactical — this is for someone who needs to actually build the deck this week, not a theory lesson on storytelling.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you pitching?",
        defaultValue: "Fractional CFO services for startups"
      },
      {
        key: "TargetBuyer",
        label: "Target Buyer",
        description: "Who receives/forwards this deck?",
        defaultValue: "Series A founders without a finance lead"
      }
    ],
    scanMessage: "SCAN FOR A DECK THAT SELLS ITSELF"
  },
  {
    id: "SALE-06",
    code: "14",
    category: CardCategory.SALES,
    title: "The 'Why Now' Event-Based Urgency Closer",
    description: "Build genuine urgency tied to a real trigger event in the prospect's world — not a fake countdown timer.",
    promptTemplate: `You are a sales consultant who specializes in trigger-event selling. I'm working a deal for [ServiceOrProduct] with a prospect at [ProspectCompany]. There's a real event happening in their world right now: [TriggerEvent]. I want to use this as genuine urgency, not manufactured pressure.

Give me:
1. A breakdown of exactly why [TriggerEvent] makes solving this problem more expensive to delay than to act on now — in their language, not mine.
2. A short "why now" message I can send that connects the trigger event directly to the cost of inaction, without sounding opportunistic or pushy.
3. A fallback angle if they say "this isn't really urgent for us" — a way to test whether the urgency is real or whether I should deprioritize this deal.

The tone should feel like a trusted advisor pointing out a real risk, not a salesperson manufacturing pressure.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you selling?",
        defaultValue: "Cybersecurity audit and remediation"
      },
      {
        key: "ProspectCompany",
        label: "Prospect Company",
        description: "Who's the account?",
        defaultValue: "A mid-size fintech company"
      },
      {
        key: "TriggerEvent",
        label: "Real Trigger Event",
        description: "What's actually happening for them right now?",
        defaultValue: "They just raised Series B and are scaling headcount fast"
      }
    ],
    scanMessage: "SCAN FOR REAL URGENCY, NOT FAKE PRESSURE"
  },
  {
    id: "SALE-07",
    code: "15",
    category: CardCategory.SALES,
    title: "The Price-Increase Transition Plan",
    description: "Tell existing clients about a price increase without losing them — frame it as growth, not extraction.",
    promptTemplate: `You are a client retention strategist who has managed price increases for service businesses without losing key accounts. I need to raise prices on [ServiceOrProduct] from [OldPrice] to [NewPrice] for existing clients, effective [Timeframe].

Give me:
1. A client communication script that frames the increase around the value/scope that's grown since they signed (not just "costs went up").
2. A short list of the 3 client objections most likely to come up, and a calm, non-defensive response to each.
3. One optional retention lever I could offer to my highest-value clients only (without offering it to everyone) to protect the relationships that matter most.

Keep the tone confident and respectful — not apologetic, not aggressive.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Service",
        description: "What service is increasing in price?",
        defaultValue: "Monthly social media management retainer"
      },
      {
        key: "OldPrice",
        label: "Old Price",
        description: "Current price",
        defaultValue: "₹25,000/month"
      },
      {
        key: "NewPrice",
        label: "New Price",
        description: "New price",
        defaultValue: "₹35,000/month"
      },
      {
        key: "Timeframe",
        label: "Effective From",
        description: "When does this kick in?",
        defaultValue: "Next billing cycle, 30 days notice"
      }
    ],
    scanMessage: "SCAN TO RAISE PRICES WITHOUT LOSING CLIENTS"
  },
  {
    id: "SALE-08",
    code: "16",
    category: CardCategory.SALES,
    title: "The Competitive War-Room Rubric",
    description: "Build a sharp, honest comparison against a specific named competitor without sounding defensive or petty.",
    promptTemplate: `You are a competitive positioning strategist. A prospect evaluating [ServiceOrProduct] is also seriously considering [CompetitorName]. I need to win this comparison without trash-talking them.

Give me:
1. A structured comparison framework covering the 4 dimensions buyers actually care about when comparing us to [CompetitorName] — likely price, depth, speed, and support, but adjust based on context.
2. A short, confident way to address [CompetitorName] directly if the prospect brings them up by name — respectful, factual, not defensive.
3. One sharp question I can ask the prospect that naturally surfaces where [CompetitorName] tends to fall short, without me having to say anything negative about them directly.

Avoid generic "we're better because we care more" language — make every point concrete and specific.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you selling?",
        defaultValue: "Project management SaaS for agencies"
      },
      {
        key: "CompetitorName",
        label: "Named Competitor",
        description: "Who are they comparing you to?",
        defaultValue: "A well-known generic PM tool"
      }
    ],
    scanMessage: "SCAN FOR A WIN, NOT A FIGHT"
  },
  {
    id: "SALE-09",
    code: "17",
    category: CardCategory.SALES,
    title: "The Settle-or-Slay Demo Framework",
    description: "Structure a product demo around the prospect's specific use case instead of a generic feature tour that loses attention.",
    promptTemplate: `You are a demo strategist who has watched hundreds of B2B sales demos fail because they were generic feature tours instead of targeted proof. I'm demoing [ServiceOrProduct] to a prospect whose primary use case is [PrimaryUseCase], and their biggest hesitation is [MainHesitation].

Give me:
1. A demo flow (in order) that opens with [PrimaryUseCase] solved live in the first 2 minutes — not a feature-by-feature walkthrough.
2. The 2-3 features I should deliberately NOT show, because they're impressive but irrelevant to this specific prospect and will dilute focus.
3. A closing moment in the demo designed to directly address [MainHesitation] before they have to ask about it.

The goal is a demo that feels built specifically for them, not a rehearsed script.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you demoing?",
        defaultValue: "An AI-powered customer support tool"
      },
      {
        key: "PrimaryUseCase",
        label: "Their Primary Use Case",
        description: "What do they actually need to see solved?",
        defaultValue: "Reducing first-response time on support tickets"
      },
      {
        key: "MainHesitation",
        label: "Main Hesitation",
        description: "What's holding them back?",
        defaultValue: "Worried it will feel robotic to their customers"
      }
    ],
    scanMessage: "SCAN FOR A DEMO BUILT FOR THEM"
  },
  {
    id: "SALE-10",
    code: "18",
    category: CardCategory.SALES,
    title: "The Retrospective Hand-Off Protocol",
    description: "Turn a freshly closed deal into a smooth onboarding handoff and a future referral, instead of a dropped baton.",
    promptTemplate: `You are a client experience consultant who specializes in the critical first 14 days after a deal closes — the window where trust is either built or lost. I just closed a deal for [ServiceOrProduct] with a new client, and they're about to be handed off to [HandoffTeamOrPerson] for delivery.

Give me:
1. A handoff checklist that makes sure nothing the client told me during the sales process gets lost or repeated awkwardly during onboarding.
2. A short message I can send the client personally during week one, after the handoff, that keeps trust intact even though I'm stepping back.
3. A natural, non-pushy way to plant the seed for a referral or case study request — timed for week 2-3, not immediately after signing.

Keep this human and specific, not a generic onboarding email template.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "What You Sold",
        description: "What did the client just buy?",
        defaultValue: "A full website redesign and SEO package"
      },
      {
        key: "HandoffTeamOrPerson",
        label: "Who They're Handed Off To",
        description: "Who delivers the work after the sale?",
        defaultValue: "The design and dev delivery team"
      }
    ],
    scanMessage: "SCAN TO CLOSE THE LOOP, NOT JUST THE DEAL"
  },

  // --- LEADS & OUTREACH (continued — completing 10/10) ---
  {
    id: "LEAD-03",
    code: "19",
    category: CardCategory.LEADS,
    title: "The LinkedIn High-Signal Intent Scraper",
    description: "Find prospects who are actively showing buying signals on LinkedIn right now, instead of cold-blasting a static list.",
    promptTemplate: `You are a LinkedIn prospecting strategist who specializes in intent-based outreach. I sell [ServiceOrProduct] to [TargetRole] in the [TargetIndustry] space. I want to find people who are showing real signals of need right now, not just match a static job title.

Give me:
1. A list of 5 specific "high-signal" triggers I should search for on LinkedIn (e.g. recent promotion, company hiring spree, posted about a relevant pain point, job change, company funding news) that suggest someone is more likely to need [ServiceOrProduct] right now.
2. For each trigger, the exact LinkedIn search approach or place to look (search terms, Sales Navigator filters, or what to watch in the feed).
3. A short opening line template for each trigger type that references the signal naturally, without sounding like a stalker.

Make this practical enough to start using today, not a theoretical framework.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you selling?",
        defaultValue: "Recruitment process outsourcing"
      },
      {
        key: "TargetRole",
        label: "Target Role",
        description: "Who are you trying to reach?",
        defaultValue: "Head of Talent / HR Director"
      },
      {
        key: "TargetIndustry",
        label: "Target Industry",
        description: "What industry are they in?",
        defaultValue: "Fast-growing tech startups"
      }
    ],
    scanMessage: "SCAN TO FIND WHO'S READY RIGHT NOW"
  },
  {
    id: "LEAD-04",
    code: "20",
    category: CardCategory.LEADS,
    title: "The Multi-Step Cold Gift Drop Pitch",
    description: "Use a small, thoughtful physical or digital gift as a pattern-interrupt to open doors that cold email can't.",
    promptTemplate: `You are a creative outbound strategist who specializes in pattern-interrupt prospecting. I want to reach [TargetRole] at [TargetCompanyType] using a small gift or gesture before my actual pitch for [ServiceOrProduct], to stand out from typical cold outreach.

Give me:
1. 3 specific, low-cost gift or gesture ideas appropriate for this audience that feel thoughtful and relevant, not gimmicky or try-hard.
2. A 3-touch sequence: the gift/gesture moment, the follow-up message referencing it, and the actual pitch — with timing between each step.
3. The single biggest mistake people make with gift-based outreach that makes it feel like bribery instead of genuine interest, and how to avoid it.

Keep this realistic for someone doing outbound manually, not assuming a big budget or a fulfillment team.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you ultimately pitching?",
        defaultValue: "Executive coaching for founders"
      },
      {
        key: "TargetRole",
        label: "Target Role",
        description: "Who are you reaching?",
        defaultValue: "First-time startup founders"
      },
      {
        key: "TargetCompanyType",
        label: "Target Company Type",
        description: "What kind of company?",
        defaultValue: "Recently funded seed-stage startups"
      }
    ],
    scanMessage: "SCAN FOR A DOOR-OPENER, NOT A BRIBE"
  },
  {
    id: "LEAD-05",
    code: "21",
    category: CardCategory.LEADS,
    title: "The Podcast Guest Booking Sequence",
    description: "Get booked as a guest on relevant podcasts to build authority and reach a warm, pre-qualified audience.",
    promptTemplate: `You are a podcast booking strategist. I want to get booked as a guest on podcasts relevant to [MyExpertiseArea], to reach an audience of [TargetAudience]. My most compelling talking point or story is [KeyStoryOrAngle].

Give me:
1. A short, compelling guest pitch (under 150 words) that a podcast host would actually want to say yes to — built around [KeyStoryOrAngle], not a generic bio.
2. 3 specific angles or episode topic ideas I could offer hosts, tailored to what their audience ([TargetAudience]) actually wants to hear.
3. A simple follow-up message template if I don't hear back within a week, that doesn't sound needy or pushy.

Make the pitch sound like a human who has something genuinely useful to say, not a generic PR template.`,
    placeholders: [
      {
        key: "MyExpertiseArea",
        label: "Your Area of Expertise",
        description: "What do you talk about?",
        defaultValue: "Bootstrapping SaaS products to $1M ARR"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who listens to these podcasts?",
        defaultValue: "Indie hackers and solo SaaS founders"
      },
      {
        key: "KeyStoryOrAngle",
        label: "Your Key Story/Angle",
        description: "What's your most compelling hook?",
        defaultValue: "Grew a SaaS product to $50K MRR with zero paid ads"
      }
    ],
    scanMessage: "SCAN TO GET BOOKED, NOT IGNORED"
  },
  {
    id: "LEAD-06",
    code: "22",
    category: CardCategory.LEADS,
    title: "The Offline Direct-Mail Premium Shock-Box",
    description: "Cut through inbox fatigue entirely with a physical mail piece that high-value prospects can't ignore.",
    promptTemplate: `You are a direct-mail strategist who designs premium physical outreach for high-value B2B prospects. I want to reach [TargetRole] at [TargetCompanyType] who are too senior and too busy to respond to cold email, using a physical mail piece related to [ServiceOrProduct].

Give me:
1. A concept for a small, premium physical mail piece (not a generic letter) that feels worth opening and matches the seniority of [TargetRole].
2. The exact copy for the card or note that goes inside — short, intriguing, and tied to a single follow-up action (like scanning a QR code or replying to an email).
3. A follow-up email template to send 3-4 days after the mail piece should have arrived, referencing it naturally.

This is for a small number of high-value targets, not a mass mailer — keep the cost and effort proportional to that.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you ultimately offering?",
        defaultValue: "Enterprise data security consulting"
      },
      {
        key: "TargetRole",
        label: "Target Role",
        description: "Who are you trying to reach?",
        defaultValue: "Chief Information Security Officer"
      },
      {
        key: "TargetCompanyType",
        label: "Target Company Type",
        description: "What kind of company?",
        defaultValue: "Mid-to-large enterprise companies"
      }
    ],
    scanMessage: "SCAN FOR MAIL THEY CAN'T IGNORE"
  },
  {
    id: "LEAD-07",
    code: "23",
    category: CardCategory.LEADS,
    title: "The Pitch-Deck Lead Magnet Architecture",
    description: "Turn a piece of free, genuinely useful content into a steady stream of inbound leads instead of cold outreach.",
    promptTemplate: `You are a lead generation strategist who specializes in content-led inbound. I want to create a lead magnet for [TargetAudience] that's relevant to [ServiceOrProduct], something genuinely useful enough that people will trade their email for it.

Give me:
1. 3 specific lead magnet concepts (templates, checklists, mini-audits, calculators — pick what fits) that [TargetAudience] would actually want, tied naturally to [ServiceOrProduct] without being a thinly-veiled ad.
2. An outline for the strongest of the three concepts — what it actually contains, section by section.
3. A simple 3-email follow-up sequence to send after someone downloads it, moving them naturally toward a conversation without being pushy.

The lead magnet should be something that builds trust on its own, even if the person never buys anything.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you ultimately offering?",
        defaultValue: "Email marketing management for e-commerce brands"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who's downloading this?",
        defaultValue: "Shopify store owners doing $50K-500K/month"
      }
    ],
    scanMessage: "SCAN TO BUILD A LEAD MAGNET THAT ACTUALLY PULLS"
  },
  {
    id: "LEAD-08",
    code: "24",
    category: CardCategory.LEADS,
    title: "The 'Lost-Cart' Retargeting Reactivator",
    description: "Win back prospects who showed interest, went quiet, and never gave a clear no.",
    promptTemplate: `You are a re-engagement strategist who specializes in reviving stalled leads. I have a list of prospects for [ServiceOrProduct] who showed real interest — [PastInterestSignal] — but went quiet and never explicitly said no.

Give me:
1. A short reactivation message that doesn't apologize for following up or sound desperate, referencing [PastInterestSignal] naturally.
2. 2 alternative angles to use if the first message gets no response — each one offering a genuinely different reason to re-engage, not just "just checking in."
3. A clear, low-pressure way to get a final yes/no if there's still no response after the sequence, so I can move them off my active list with dignity.

Keep the tone warm and direct — not guilt-trippy, not overly formal.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What were they interested in?",
        defaultValue: "Website redesign package"
      },
      {
        key: "PastInterestSignal",
        label: "Past Interest Signal",
        description: "What did they actually do/say before going quiet?",
        defaultValue: "Asked for a proposal, then went silent for 3 weeks"
      }
    ],
    scanMessage: "SCAN TO REVIVE A STALLED LEAD"
  },
  {
    id: "LEAD-09",
    code: "25",
    category: CardCategory.LEADS,
    title: "The Joint-Venture Warm Intro Pipeline",
    description: "Build a referral pipeline with complementary businesses who already serve your exact audience.",
    promptTemplate: `You are a partnership strategist who builds referral pipelines between complementary (non-competing) businesses. I offer [ServiceOrProduct] to [TargetAudience]. I want to find and approach businesses who already serve the same audience with a different, complementary offering.

Give me:
1. A list of 4-5 types of complementary businesses (not competitors) who likely already have my exact target audience, [TargetAudience], as their clients.
2. An outreach message to propose a simple, mutual referral relationship with one of these businesses — framed around mutual benefit, not asking for a favor.
3. A lightweight way to track and reward referrals between us without needing a formal contract or complex commission structure, at least to start.

Make this feel like a genuine partnership pitch between equals, not a desperate ask.`,
    placeholders: [
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What do you offer?",
        defaultValue: "Bookkeeping and tax prep for freelancers"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who do you both serve?",
        defaultValue: "Freelance designers and creative professionals"
      }
    ],
    scanMessage: "SCAN TO BUILD A REFERRAL ENGINE"
  },
  {
    id: "LEAD-10",
    code: "26",
    category: CardCategory.LEADS,
    title: "The Multi-Channel Event Sequence Sync",
    description: "Turn one industry event or webinar into a coordinated, multi-touch outreach campaign instead of a single follow-up email.",
    promptTemplate: `You are an event-based outbound strategist. I'm attending or hosting [EventName], where I'll meet or connect with [AttendeeProfile] who are good-fit prospects for [ServiceOrProduct]. I want a coordinated outreach plan around this event, not just one follow-up email.

Give me:
1. A pre-event touchpoint to send before [EventName] that increases the chance of a real conversation happening there (not a cold pitch, a warm-up).
2. A same-day or next-day follow-up message template that references the specific event/conversation context, sent while it's still fresh.
3. A final touchpoint for 1-2 weeks later for anyone who didn't respond to the first follow-up, with a different angle than "just following up."

This should feel like a natural extension of meeting someone in person, not a generic event-leads spreadsheet blast.`,
    placeholders: [
      {
        key: "EventName",
        label: "Event Name/Type",
        description: "What event is this?",
        defaultValue: "A regional SaaS founders meetup"
      },
      {
        key: "AttendeeProfile",
        label: "Attendee Profile",
        description: "Who are you meeting there?",
        defaultValue: "Early-stage B2B SaaS founders"
      },
      {
        key: "ServiceOrProduct",
        label: "Your Product/Service",
        description: "What are you offering?",
        defaultValue: "Fractional growth marketing services"
      }
    ],
    scanMessage: "SCAN TO TURN ONE EVENT INTO A FULL PIPELINE"
  },

  // --- MARKETING & COPY (continued — completing 10/10) ---
  {
    id: "MKTG-03",
    code: "27",
    category: CardCategory.MARKETING,
    title: "The Content Multiplication Machine",
    description: "Turn one piece of original content into a week's worth of platform-specific posts without sounding copy-pasted.",
    promptTemplate: `You are a content repurposing strategist. I have one piece of long-form content — [OriginalContentSummary] — and I want to turn it into a full week of distinct content for [TargetPlatforms], without it feeling like the same post copy-pasted everywhere.

Give me:
1. A breakdown of 5 different angles hidden inside this one piece of content, each strong enough to be its own standalone post.
2. For each angle, which platform format it's best suited to (short post, thread, carousel, story) and why.
3. One rule of thumb for how much to rewrite vs. reuse so it doesn't feel recycled to someone who follows me on multiple platforms.

Keep this practical for someone doing this themselves weekly, not requiring a content team.`,
    placeholders: [
      {
        key: "OriginalContentSummary",
        label: "Original Content Summary",
        description: "What's the source piece about?",
        defaultValue: "A blog post on how I scaled my agency from 2 to 8 clients"
      },
      {
        key: "TargetPlatforms",
        label: "Target Platforms",
        description: "Where are you repurposing this?",
        defaultValue: "LinkedIn, Twitter/X, and Instagram"
      }
    ],
    scanMessage: "SCAN TO TURN ONE POST INTO A WEEK OF CONTENT"
  },
  {
    id: "MKTG-04",
    code: "28",
    category: CardCategory.MARKETING,
    title: "The High-Ticket Webinar Funnel Map",
    description: "Structure a webinar that actually converts attendees into high-ticket buyers, not just a free info dump.",
    promptTemplate: `You are a webinar conversion strategist who has run webinars that convert at well above industry average. I'm hosting a webinar to sell [HighTicketOffer], priced around [PriceRange], to an audience of [TargetAudience].

Give me:
1. A full webinar structure (with rough time allocations) that delivers genuine value early while building toward the offer, not a bait-and-switch.
2. The exact moment and method to transition from teaching content into the pitch, without losing the room.
3. 2 objection-handling segments to weave into the presentation itself (not just the Q&A) that preempt the most likely reasons people won't buy [HighTicketOffer].

The structure should feel generous and genuinely useful even to someone who doesn't buy.`,
    placeholders: [
      {
        key: "HighTicketOffer",
        label: "High-Ticket Offer",
        description: "What are you selling on the webinar?",
        defaultValue: "A 12-week business coaching program"
      },
      {
        key: "PriceRange",
        label: "Price Range",
        description: "What does it cost?",
        defaultValue: "₹75,000"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who's attending?",
        defaultValue: "Service-based business owners doing ₹5-15L/month"
      }
    ],
    scanMessage: "SCAN TO BUILD A WEBINAR THAT SELLS"
  },
  {
    id: "MKTG-05",
    code: "29",
    category: CardCategory.MARKETING,
    title: "The 'Problem First' VSL Video Outline",
    description: "Script a video sales letter that leads with the prospect's problem, not your product, to hold attention longer.",
    promptTemplate: `You are a direct-response video scriptwriter. I need a Video Sales Letter (VSL) outline for [ProductOrService], targeting [TargetAudience] whose core problem is [CoreProblem]. The script must lead with their problem, not my product.

Give me:
1. A full VSL outline broken into sections (Hook, Problem Agitation, Mechanism, Proof, Offer, Close) with what each section needs to accomplish.
2. The opening 10-second hook line, written word-for-word, designed to stop someone from scrolling past.
3. One specific technique to keep someone watching through the "boring middle" of the video where most people drop off.

Write this in a natural spoken voice, not formal marketing copy — it needs to sound like a real person talking on camera.`,
    placeholders: [
      {
        key: "ProductOrService",
        label: "Product/Service",
        description: "What are you selling?",
        defaultValue: "An online course on freelance copywriting"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who's watching this?",
        defaultValue: "Aspiring freelancers stuck under ₹30K/month"
      },
      {
        key: "CoreProblem",
        label: "Core Problem",
        description: "What's their main pain point?",
        defaultValue: "Can't find clients willing to pay well"
      }
    ],
    scanMessage: "SCAN FOR A SCRIPT THAT HOLDS ATTENTION"
  },
  {
    id: "MKTG-06",
    code: "30",
    category: CardCategory.MARKETING,
    title: "The Micro-Case Study Formula",
    description: "Turn a single client result into a compact, credible case study you can post anywhere in under 150 words.",
    promptTemplate: `You are a case study copywriter who specializes in short-form social proof. I have a client result I want to turn into a compact case study: [ClientResult], achieved for [ClientType] using [ServiceOrProduct].

Give me:
1. A micro-case study (under 150 words) structured as: starting situation, what we did, the specific result — written to be posted directly on social media or a website.
2. A one-line "punch" version of the same result, short enough for a headline or a slide.
3. 2 follow-up questions I should ask this client to make the next case study even more specific and credible (numbers, quotes, timelines).

Avoid vague claims like "great results" — push for specificity even with placeholder data.`,
    placeholders: [
      {
        key: "ClientResult",
        label: "Client Result",
        description: "What did you achieve for them?",
        defaultValue: "Increased qualified leads by 3x in 60 days"
      },
      {
        key: "ClientType",
        label: "Client Type",
        description: "What kind of client was this?",
        defaultValue: "A B2B SaaS company in the HR tech space"
      },
      {
        key: "ServiceOrProduct",
        label: "Your Service/Product",
        description: "What did you do for them?",
        defaultValue: "LinkedIn ads management and landing page optimization"
      }
    ],
    scanMessage: "SCAN TO TURN ONE RESULT INTO PROOF"
  },
  {
    id: "MKTG-07",
    code: "31",
    category: CardCategory.MARKETING,
    title: "The Soap-Opera Email Sequence Map",
    description: "Build a narrative-driven welcome email sequence that keeps new subscribers opening every email, not just the first.",
    promptTemplate: `You are an email marketing strategist who specializes in narrative-driven sequences. I want to build a 5-email "soap opera" welcome sequence for new subscribers to [BrandOrNewsletter], targeting [TargetAudience], to build toward [EndGoal].

Give me:
1. A 5-email outline using open-loop storytelling — each email should end with a reason to open the next one, not just deliver standalone value.
2. The subject line and core story beat for each of the 5 emails.
3. Where and how [EndGoal] gets naturally introduced by email 4 or 5, without it feeling like a sudden pitch after 3 "free" emails.

The tone should feel like a person telling a real story, not a marketing sequence template.`,
    placeholders: [
      {
        key: "BrandOrNewsletter",
        label: "Brand/Newsletter Name",
        description: "What are people subscribing to?",
        defaultValue: "A newsletter about building a personal brand"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who's subscribing?",
        defaultValue: "Consultants wanting to build an audience"
      },
      {
        key: "EndGoal",
        label: "End Goal",
        description: "What should this sequence lead to?",
        defaultValue: "Booking a call for 1:1 coaching"
      }
    ],
    scanMessage: "SCAN FOR A SEQUENCE THEY ACTUALLY OPEN"
  },
  {
    id: "MKTG-08",
    code: "32",
    category: CardCategory.MARKETING,
    title: "The Contrast-Based Pricing Table",
    description: "Design a pricing page structure that makes your ideal tier the obvious choice, instead of confusing people into picking the cheapest.",
    promptTemplate: `You are a pricing page conversion strategist. I have [NumberOfTiers] pricing tiers for [ProductOrService], and I want the [TargetTier] tier to be the obvious, natural choice for most visitors — without making the other tiers feel like decoys.

Give me:
1. A framework for how to position and label all [NumberOfTiers] tiers so that [TargetTier] feels like the "smart middle ground," not just cheap or expensive.
2. 3 specific contrast techniques (what to highlight, omit, or visually emphasize) that nudge attention toward [TargetTier] without dishonest tactics.
3. A short headline and one-line description for [TargetTier] that makes its value obvious at a glance.

Keep the psychology honest — this should help people choose well, not trick them.`,
    placeholders: [
      {
        key: "ProductOrService",
        label: "Product/Service",
        description: "What are you pricing?",
        defaultValue: "A project management SaaS tool"
      },
      {
        key: "NumberOfTiers",
        label: "Number of Tiers",
        description: "How many pricing tiers?",
        defaultValue: "3"
      },
      {
        key: "TargetTier",
        label: "Target Tier",
        description: "Which tier should most people pick?",
        defaultValue: "The middle 'Pro' tier"
      }
    ],
    scanMessage: "SCAN TO MAKE THE RIGHT TIER OBVIOUS"
  },
  {
    id: "MKTG-09",
    code: "33",
    category: CardCategory.MARKETING,
    title: "The Authority Newsletter Checklist",
    description: "Structure a recurring newsletter that builds genuine authority over time instead of feeling like a sales drip.",
    promptTemplate: `You are a newsletter strategist who builds authority-driven publications. I write a recurring newsletter about [NewsletterTopic] for [TargetAudience], and I want every issue to build my authority and trust, not just deliver tips.

Give me:
1. A repeatable issue structure (sections, in order) that balances genuine insight with enough personality to make it feel like it's written by one specific person, not a content team.
2. 3 recurring "signature" elements I could include in every issue that make it instantly recognizable as mine (a regular segment, a consistent sign-off, a running theme).
3. A simple rule for how often to mention my own offers vs. give pure value, so the newsletter doesn't slowly turn into an ad feed.

This should help build a publication people actually look forward to, not just tolerate.`,
    placeholders: [
      {
        key: "NewsletterTopic",
        label: "Newsletter Topic",
        description: "What's the newsletter about?",
        defaultValue: "Practical AI tools for small business owners"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who reads it?",
        defaultValue: "Small business owners curious about AI but not technical"
      }
    ],
    scanMessage: "SCAN TO BUILD A NEWSLETTER PEOPLE TRUST"
  },
  {
    id: "MKTG-10",
    code: "34",
    category: CardCategory.MARKETING,
    title: "The Social Retaining Creative Hook Sheet",
    description: "Generate a batch of visual and copy hook ideas for ads or organic posts designed to stop the scroll in the first second.",
    promptTemplate: `You are a creative strategist for paid and organic social content. I'm creating content for [ProductOrService], targeting [TargetAudience], and I need a batch of strong opening hooks (visual concept + first line of copy) designed to stop someone scrolling in under 1 second.

Give me:
1. 5 distinct hook concepts, each pairing a visual idea (what's on screen in the first frame) with an opening line of copy or text overlay.
2. For each hook, a one-sentence note on which psychological trigger it uses (curiosity gap, pattern interrupt, bold claim, relatable pain, social proof).
3. A short note on which 2 of the 5 hooks are strongest for organic content vs. paid ads, since the goals differ slightly.

Keep the visual concepts realistic to film or design without a big production budget.`,
    placeholders: [
      {
        key: "ProductOrService",
        label: "Product/Service",
        description: "What are you promoting?",
        defaultValue: "A skincare brand for sensitive skin"
      },
      {
        key: "TargetAudience",
        label: "Target Audience",
        description: "Who's the content for?",
        defaultValue: "Women 25-40 with sensitive or acne-prone skin"
      }
    ],
    scanMessage: "SCAN FOR HOOKS THAT STOP THE SCROLL"
  },

  // --- PRODUCTIVITY & STRATEGY (continued — completing 10/10) ---
  {
    id: "PROD-03",
    code: "35",
    category: CardCategory.PRODUCTIVITY,
    title: "The Energy-Level Time Boxing Ledger",
    description: "Schedule your work around your real energy patterns instead of an arbitrary calendar grid.",
    promptTemplate: `You are a productivity consultant who designs schedules around energy management, not just time management. My natural energy pattern through the day is [EnergyPattern], and my most important, hardest work is [HighValueWork]. My calendar is currently scheduled [CurrentSchedulingHabit].

Give me:
1. An ideal weekly time-boxing structure that places [HighValueWork] during my actual peak energy windows based on [EnergyPattern], not just "first thing in the morning" by default.
2. A short list of what should fill my low-energy windows instead — the kind of work that doesn't need peak focus.
3. One simple rule for protecting these energy-matched blocks from meeting requests and interruptions without seeming inflexible to clients or teammates.

Make this realistic for someone running a business day-to-day, not a theoretical ideal schedule.`,
    placeholders: [
      {
        key: "EnergyPattern",
        label: "Your Energy Pattern",
        description: "When are you naturally sharpest?",
        defaultValue: "Sharp 7-11am, foggy after lunch, second wind 4-6pm"
      },
      {
        key: "HighValueWork",
        label: "Highest-Value Work",
        description: "What's your most important work?",
        defaultValue: "Strategy calls and proposal writing"
      },
      {
        key: "CurrentSchedulingHabit",
        label: "Current Scheduling Habit",
        description: "How is your calendar structured today?",
        defaultValue: "Meetings booked randomly throughout the day"
      }
    ],
    scanMessage: "SCAN TO WORK WITH YOUR ENERGY, NOT AGAINST IT"
  },
  {
    id: "PROD-04",
    code: "36",
    category: CardCategory.PRODUCTIVITY,
    title: "The Absolute Focus-Block Architecture",
    description: "Design deep work blocks that actually survive contact with a busy, interruption-heavy workday.",
    promptTemplate: `You are a deep work consultant. I want to build real, protected focus blocks into my week for [DeepWorkTask], but my biggest obstacle is [MainInterruptionSource]. My current week looks like [CurrentWeekStructure].

Give me:
1. A realistic focus-block structure (how many, how long, when) for [DeepWorkTask] that fits around [CurrentWeekStructure] rather than ignoring reality.
2. A specific tactic for neutralizing [MainInterruptionSource] during these blocks — concrete, not just "turn off notifications."
3. A short recovery protocol for what to do when a focus block gets broken anyway, so one interruption doesn't wreck the whole day.

Keep this grounded in how real workdays actually go wrong, not an idealized productivity-guru version.`,
    placeholders: [
      {
        key: "DeepWorkTask",
        label: "Deep Work Task",
        description: "What needs real focus time?",
        defaultValue: "Writing proposals and strategic planning"
      },
      {
        key: "MainInterruptionSource",
        label: "Main Interruption Source",
        description: "What breaks your focus most?",
        defaultValue: "Slack messages from the team and client WhatsApp pings"
      },
      {
        key: "CurrentWeekStructure",
        label: "Current Week Structure",
        description: "What does your week actually look like?",
        defaultValue: "Back-to-back client calls most mornings, open afternoons"
      }
    ],
    scanMessage: "SCAN FOR FOCUS THAT SURVIVES THE DAY"
  },
  {
    id: "PROD-05",
    code: "37",
    category: CardCategory.PRODUCTIVITY,
    title: "The 'No-Meeting' Operational Standard",
    description: "Design a team or client communication standard that replaces unnecessary meetings without losing alignment.",
    promptTemplate: `You are an operations consultant who helps small teams cut meeting overload without losing clarity. My team/clients currently have [CurrentMeetingLoad], and I suspect [MeetingPercentageWaste]% of it could be replaced with something async.

Give me:
1. A simple framework for deciding which of our recurring meetings genuinely need to stay live vs. which can become async updates instead.
2. A template structure for an async status update that replaces a typical status meeting, covering what it must include to actually work.
3. A short script for proposing this change to a team or client who's used to the old meeting cadence, framed as an upgrade, not a cutback.

This needs to work for a small team or solo operator with clients, not a 200-person company.`,
    placeholders: [
      {
        key: "CurrentMeetingLoad",
        label: "Current Meeting Load",
        description: "What recurring meetings exist today?",
        defaultValue: "Daily 15-min standup plus weekly client check-in calls"
      },
      {
        key: "MeetingPercentageWaste",
        label: "Estimated Waste %",
        description: "Roughly how much feels unnecessary?",
        defaultValue: "50"
      }
    ],
    scanMessage: "SCAN TO REPLACE MEETINGS WITH CLARITY"
  },
  {
    id: "PROD-06",
    code: "38",
    category: CardCategory.PRODUCTIVITY,
    title: "The Founder's Sunday Night Blueprint",
    description: "Build a weekly reset ritual that sets up the coming week instead of starting Monday already behind.",
    promptTemplate: `You are a founder productivity coach. I want a structured Sunday-night (or end-of-week) reset ritual to walk into Monday with clarity instead of chaos. My business is [BusinessType], and my biggest source of Monday-morning overwhelm is [MondayOverwhelmSource].

Give me:
1. A step-by-step Sunday reset checklist (45-60 minutes max) covering reviewing the past week, planning the next one, and clearing mental clutter.
2. A short set of 3-5 questions to ask myself during this ritual that surface what actually matters for the coming week, not just task-list grooming.
3. One way to directly address [MondayOverwhelmSource] specifically within this ritual, so it's solved before Monday starts, not during it.

Keep this realistic — something a busy founder will actually do weekly, not an idealized 2-hour ritual.`,
    placeholders: [
      {
        key: "BusinessType",
        label: "Business Type",
        description: "What kind of business do you run?",
        defaultValue: "A 5-person digital marketing agency"
      },
      {
        key: "MondayOverwhelmSource",
        label: "Monday Overwhelm Source",
        description: "What makes Mondays feel chaotic?",
        defaultValue: "Waking up to a backlog of unanswered client emails"
      }
    ],
    scanMessage: "SCAN TO WALK INTO MONDAY ALREADY AHEAD"
  },
  {
    id: "PROD-07",
    code: "39",
    category: CardCategory.PRODUCTIVITY,
    title: "The Quarter-Scale OKR Target Squeeze",
    description: "Cut down an overloaded quarterly goal list into the few targets that will actually move the business.",
    promptTemplate: `You are a strategy consultant who specializes in ruthless prioritization. For this quarter, I currently have this list of goals I want to hit: [CurrentGoalsList]. My business's single biggest constraint right now is [BiggestConstraint].

Give me:
1. An honest assessment of which 2-3 goals from [CurrentGoalsList] would actually move the needle on [BiggestConstraint], and which ones are just busywork in disguise.
2. A simplified OKR structure (1 objective, 3 key results max) built only around the goals that survived the cut.
3. A short list of what I should explicitly NOT do this quarter, so the team or I don't quietly drift back into the discarded goals.

Be direct, even if it means telling me most of my list isn't actually a priority right now.`,
    placeholders: [
      {
        key: "CurrentGoalsList",
        label: "Current Goals List",
        description: "What are you trying to do this quarter?",
        defaultValue: "Launch new service line, hire 2 people, redo the website, get 10 new clients"
      },
      {
        key: "BiggestConstraint",
        label: "Biggest Constraint",
        description: "What's actually limiting growth right now?",
        defaultValue: "Inconsistent lead flow"
      }
    ],
    scanMessage: "SCAN TO CUT THE LIST DOWN TO WHAT MATTERS"
  },
  {
    id: "PROD-08",
    code: "40",
    category: CardCategory.PRODUCTIVITY,
    title: "The High-Leverage Inbox Zero Protocol",
    description: "Process email in a way that protects deep work time instead of becoming a full-time reactive job.",
    promptTemplate: `You are an email systems consultant. I get roughly [DailyEmailVolume] emails a day, and checking/responding to them is eating into my real work. My business is [BusinessType].

Give me:
1. A specific email processing protocol (when to check, how many times a day, how long each session should take) that fits [DailyEmailVolume] without leaving me anxious about missing something urgent.
2. A simple triage framework (categories or labels) for instantly sorting incoming email so I'm not re-reading the same message multiple times before acting.
3. A short list of email types I should template, delegate, or simply stop replying to personally, to cut volume at the source.

This needs to work for someone who can't just "ignore email," since client communication matters — but it shouldn't run their day.`,
    placeholders: [
      {
        key: "DailyEmailVolume",
        label: "Daily Email Volume",
        description: "Roughly how many emails per day?",
        defaultValue: "60-80"
      },
      {
        key: "BusinessType",
        label: "Business Type",
        description: "What kind of business?",
        defaultValue: "A freelance web design business with 8 active clients"
      }
    ],
    scanMessage: "SCAN TO STOP LIVING IN YOUR INBOX"
  },
  {
    id: "PROD-09",
    code: "41",
    category: CardCategory.PRODUCTIVITY,
    title: "The Asynchronous Status Slack Matrix",
    description: "Design a lightweight async update system that keeps a remote team aligned without constant check-in messages.",
    promptTemplate: `You are a remote operations consultant. My team of [TeamSize] communicates mainly over [CommTool], and right now alignment relies on constant ad-hoc messages and "quick questions" that interrupt deep work. We work on [TeamFunction].

Give me:
1. A simple async status matrix — what to share, how often, and in what format — that replaces most ad-hoc check-ins for a team doing [TeamFunction].
2. A specific structure for a daily or weekly async update message that gives real visibility without requiring a live meeting.
3. A short policy for what genuinely warrants an interruption (a real-time message) versus what should always go through the async system instead.

Keep this lightweight enough that a small team will actually stick to it, not a heavy enterprise process.`,
    placeholders: [
      {
        key: "TeamSize",
        label: "Team Size",
        description: "How many people on the team?",
        defaultValue: "6"
      },
      {
        key: "CommTool",
        label: "Communication Tool",
        description: "What do you use to communicate?",
        defaultValue: "Slack"
      },
      {
        key: "TeamFunction",
        label: "Team Function",
        description: "What does this team actually do?",
        defaultValue: "Client delivery for a digital marketing agency"
      }
    ],
    scanMessage: "SCAN FOR ALIGNMENT WITHOUT THE NOISE"
  },
  {
    id: "PROD-10",
    code: "42",
    category: CardCategory.PRODUCTIVITY,
    title: "The Founder Burnout Early-Warning Sentry",
    description: "Catch the early signs of burnout before they force a crisis-mode slowdown, with a simple weekly self-check.",
    promptTemplate: `You are a founder wellbeing consultant who focuses on sustainable performance, not hustle-culture productivity. I want a simple, honest weekly self-check to catch early signs of burnout before it becomes a real problem. My current warning signs (if any) are: [CurrentWarningSigns].

Give me:
1. A short weekly self-check (5-7 questions) covering energy, motivation, sleep, and resentment toward the work — written so it's quick and honest, not therapy-speak.
2. A clear, specific threshold for what answers should genuinely trigger action (slowing down, delegating, taking real time off) versus normal week-to-week variation.
3. One small, concrete recovery action for each major warning sign in [CurrentWarningSigns], scaled to something a busy founder could realistically do without stopping the business.

Keep this grounded and practical, not generic "practice self-care" advice. If something here sounds like it needs more than a self-check, say so plainly.`,
    placeholders: [
      {
        key: "CurrentWarningSigns",
        label: "Current Warning Signs",
        description: "Any signs you've noticed already?",
        defaultValue: "Trouble sleeping and dreading client calls I used to enjoy"
      }
    ],
    scanMessage: "SCAN FOR AN HONEST WEEKLY CHECK-IN"
  },

  // --- AUTOMATION & OPS (continued — completing 10/10, final category) ---
  {
    id: "AUTO-03",
    code: "43",
    category: CardCategory.AUTOMATION,
    title: "The Cold Outreach Auto-Pilot Scraping Engine",
    description: "Design a semi-automated pipeline for building fresh prospect lists without manually searching every week.",
    promptTemplate: `You are an automation consultant who builds lightweight prospecting pipelines for small teams. I need a recurring way to find new prospects matching [IdealCustomerProfile], currently I do this manually via [CurrentManualMethod], and it takes too long every week.

Give me:
1. A step-by-step semi-automated workflow (using accessible no-code tools, not custom dev) to source and filter prospects matching [IdealCustomerProfile] on a recurring schedule.
2. The specific data fields I should be capturing for each prospect so the list is immediately usable for outreach, not just a pile of names.
3. One quality-control checkpoint to catch bad or stale data before it gets used, so automation doesn't quietly degrade list quality over time.

Keep tool recommendations realistic for someone without a developer on the team.`,
    placeholders: [
      {
        key: "IdealCustomerProfile",
        label: "Ideal Customer Profile",
        description: "Who are you trying to find?",
        defaultValue: "Marketing directors at 50-200 person SaaS companies"
      },
      {
        key: "CurrentManualMethod",
        label: "Current Manual Method",
        description: "How do you find prospects today?",
        defaultValue: "Manually searching LinkedIn and copying names into a spreadsheet"
      }
    ],
    scanMessage: "SCAN TO AUTOMATE YOUR PROSPECT PIPELINE"
  },
  {
    id: "AUTO-04",
    code: "44",
    category: CardCategory.AUTOMATION,
    title: "The Client Reporting Dashboard Synchronizer",
    description: "Automate recurring client reports so you stop manually compiling the same numbers every month.",
    promptTemplate: `You are a reporting automation consultant. I currently spend [HoursOnReporting] hours each month manually pulling data from [DataSources] to build client reports. I need this automated into a synced, recurring dashboard or report.

Give me:
1. A recommended approach (no-code dashboard tool or simple automation) to pull data automatically from [DataSources] into one place, with the actual setup logic.
2. A report structure outline showing exactly which 4-6 metrics actually matter to clients, so the report stays useful and not just data dumped onto a page.
3. A simple recurring delivery system (scheduled email or shared dashboard link) so clients get it automatically without me sending it manually each time.

Make this practical for a solo operator or small team to set up in a weekend, not a multi-week dev project.`,
    placeholders: [
      {
        key: "HoursOnReporting",
        label: "Hours Spent Monthly",
        description: "How many hours go into this each month?",
        defaultValue: "6"
      },
      {
        key: "DataSources",
        label: "Data Sources",
        description: "Where does the report data live today?",
        defaultValue: "Google Analytics, Meta Ads Manager, and a spreadsheet"
      }
    ],
    scanMessage: "SCAN TO STOP BUILDING REPORTS BY HAND"
  },
  {
    id: "AUTO-05",
    code: "45",
    category: CardCategory.AUTOMATION,
    title: "The Slack-to-Task PM Direct Link",
    description: "Stop tasks from getting lost in chat by automatically turning flagged messages into tracked project tasks.",
    promptTemplate: `You are a workflow automation consultant. My team uses [ChatTool] for daily communication and [PMTool] for task tracking, but important action items mentioned in chat regularly get lost and never become tracked tasks.

Give me:
1. A specific automation setup (using common no-code connectors) that turns a flagged or reacted-to message in [ChatTool] into a new task in [PMTool], with the right fields populated automatically.
2. A simple team convention for which messages should get flagged this way, so the system doesn't get cluttered with non-actionable chatter.
3. One safeguard to make sure duplicate tasks don't get created if the same item gets flagged twice by different people.

Keep the setup realistic for tools most small teams already use, not enterprise-only software.`,
    placeholders: [
      {
        key: "ChatTool",
        label: "Chat Tool",
        description: "What do you use for team chat?",
        defaultValue: "Slack"
      },
      {
        key: "PMTool",
        label: "Project Management Tool",
        description: "What do you use for tasks?",
        defaultValue: "Asana"
      }
    ],
    scanMessage: "SCAN TO STOP LOSING TASKS IN CHAT"
  },
  {
    id: "AUTO-06",
    code: "46",
    category: CardCategory.AUTOMATION,
    title: "The Instant Guest Screener Booking Pipeline",
    description: "Automate the screening and qualification of inbound call requests before they ever hit your calendar.",
    promptTemplate: `You are a booking systems consultant. People request calls with me for [CallPurpose], but right now anyone can book directly onto my calendar, including people who aren't actually a good fit, wasting [WastedHoursPerWeek] hours a week.

Give me:
1. A pre-booking screening flow (form questions or automated qualifier) that filters out poor-fit requests before they can book a slot, specific to qualifying someone for [CallPurpose].
2. The exact 3-4 questions this screener should ask to separate serious, qualified requests from time-wasters.
3. A simple automated routing logic — what happens to people who pass the screener (auto-book) versus those who don't (polite auto-decline or redirect).

This should reduce wasted calls without making the booking process feel like a gatekeeping hassle for genuinely good-fit people.`,
    placeholders: [
      {
        key: "CallPurpose",
        label: "Purpose of the Call",
        description: "What are these calls for?",
        defaultValue: "Sales discovery calls for a consulting service"
      },
      {
        key: "WastedHoursPerWeek",
        label: "Wasted Hours/Week",
        description: "Roughly how many hours go to poor-fit calls?",
        defaultValue: "4"
      }
    ],
    scanMessage: "SCAN TO STOP BAD-FIT CALLS BEFORE THEY BOOK"
  },
  {
    id: "AUTO-07",
    code: "47",
    category: CardCategory.AUTOMATION,
    title: "The AI-Powered PDF Intake Parser",
    description: "Automatically extract structured data from incoming PDFs (invoices, applications, forms) instead of typing it in by hand.",
    promptTemplate: `You are a document automation consultant. I regularly receive [DocumentType] as PDFs from [SourceOfDocuments], and I currently manually type the key information from each one into [DestinationSystem], which is slow and error-prone.

Give me:
1. A practical approach (using accessible AI/no-code tools) to automatically extract the key fields from incoming [DocumentType] PDFs without custom-coding an OCR pipeline.
2. The specific fields I should be extracting and validating from each document, based on what [DocumentType] typically contains.
3. A fallback process for documents the automation can't confidently parse, so nothing important gets silently dropped or misread.

Keep the recommended tools realistic for a non-technical small business owner to set up.`,
    placeholders: [
      {
        key: "DocumentType",
        label: "Document Type",
        description: "What kind of PDFs come in?",
        defaultValue: "Vendor invoices"
      },
      {
        key: "SourceOfDocuments",
        label: "Source of Documents",
        description: "Where do these come from?",
        defaultValue: "Email attachments from suppliers"
      },
      {
        key: "DestinationSystem",
        label: "Destination System",
        description: "Where does the data need to end up?",
        defaultValue: "A bookkeeping spreadsheet"
      }
    ],
    scanMessage: "SCAN TO STOP RETYPING PDFS BY HAND"
  },
  {
    id: "AUTO-08",
    code: "48",
    category: CardCategory.AUTOMATION,
    title: "The Multi-Source Review Auto-Publisher",
    description: "Automatically collect and republish customer reviews across platforms without manually copying testimonials.",
    promptTemplate: `You are a reputation automation consultant. I collect customer reviews on [ReviewSource] but rarely get around to manually featuring the good ones on [PublishDestinations], so a lot of strong social proof goes unused.

Give me:
1. An automated workflow to detect new high-rating reviews on [ReviewSource] and route them for republishing on [PublishDestinations], including any manual approval step needed to avoid embarrassing mistakes.
2. A simple formatting template for turning a raw review into a polished testimonial graphic or post-ready quote.
3. A safeguard to make sure only reviews with explicit permission or public visibility get republished, to avoid any privacy issues.

Keep this achievable with common no-code tools, not a custom-built review pipeline.`,
    placeholders: [
      {
        key: "ReviewSource",
        label: "Review Source",
        description: "Where do reviews come in?",
        defaultValue: "Google Reviews"
      },
      {
        key: "PublishDestinations",
        label: "Publish Destinations",
        description: "Where do you want them featured?",
        defaultValue: "Instagram and the website testimonials page"
      }
    ],
    scanMessage: "SCAN TO PUT YOUR REVIEWS TO WORK"
  },
  {
    id: "AUTO-09",
    code: "49",
    category: CardCategory.AUTOMATION,
    title: "The Automated Inactive-Client Sentry Alert",
    description: "Get automatically notified when a client goes quiet, before they churn silently.",
    promptTemplate: `You are a client retention systems consultant. I manage [NumberOfClients] active clients, and historically I've only noticed a client is at risk of churning after [WarningSignal] — often too late to save the relationship.

Give me:
1. A simple automated monitoring approach to flag a client as "at risk" based on signals like [WarningSignal], using whatever tools already track client activity (email, project tool, billing system).
2. A specific internal alert format — what it should tell me the moment a client is flagged, so I can act fast and not just get a vague warning.
3. A short, genuine first outreach message template to send a flagged client that re-engages them without sounding like a customer-retention bot caught them slipping away.

This should feel like a safety net, not a surveillance system on clients.`,
    placeholders: [
      {
        key: "NumberOfClients",
        label: "Number of Active Clients",
        description: "How many clients do you manage?",
        defaultValue: "18"
      },
      {
        key: "WarningSignal",
        label: "Typical Warning Signal",
        description: "What usually signals a client going quiet?",
        defaultValue: "They stop responding to emails for 2+ weeks"
      }
    ],
    scanMessage: "SCAN TO CATCH CHURN BEFORE IT HAPPENS"
  },
  {
    id: "AUTO-10",
    code: "50",
    category: CardCategory.AUTOMATION,
    title: "The Dynamic Lead Assign Pitch Router",
    description: "Automatically route new inbound leads to the right person or pitch based on what they actually need.",
    promptTemplate: `You are a lead-routing systems consultant. New leads come in through [LeadSources], but right now they all get the same generic response regardless of what they actually need, which is [LeadVarietyDescription].

Give me:
1. A simple routing logic (based on form answers or lead source) that sorts incoming leads from [LeadSources] into 2-3 distinct categories based on [LeadVarietyDescription].
2. A tailored first-response message template for each category, so each lead feels like the response was written specifically for their situation.
3. A fallback rule for leads that don't clearly fit any category, so nobody falls through the cracks of an overly rigid system.

Keep this achievable with form logic and basic automation tools, not a custom CRM build.`,
    placeholders: [
      {
        key: "LeadSources",
        label: "Lead Sources",
        description: "Where do leads come from?",
        defaultValue: "Website contact form and Instagram DMs"
      },
      {
        key: "LeadVarietyDescription",
        label: "Lead Variety",
        description: "What different needs do leads actually have?",
        defaultValue: "Some want a quick quote, others want a full custom proposal"
      }
    ],
    scanMessage: "SCAN TO ROUTE EVERY LEAD TO THE RIGHT PITCH"
  }
];

export const OTHER_DECKS_PREVIEW: string[] = [
  "SALE-04: The Multi-Decision Maker Consensus Script",
  "SALE-05: The B2B Silent Pitch Deck Checklist",
  "SALE-06: The 'Why Now' Event-Based Urgency Closer",
  "SALE-07: The Price-Increase Transition Plan",
  "SALE-08: The Competitive War-Room Rubric",
  "SALE-09: The Settle-or-Slay Demo Framework",
  "SALE-10: The Retrospective Hand-Off Protocol",
  "LEAD-03: The LinkedIn High-Signal Intent Scraper",
  "LEAD-04: The Multi-Step Cold Gift Drop Pitch",
  "LEAD-05: The Podcast Guest Booking Sequence",
  "LEAD-06: The Offline Direct-Mail Premium Shock-Box",
  "LEAD-07: The Pitch-Deck Lead Magnet Architecture",
  "LEAD-08: The 'Lost-Cart' Retargeting Reactivator",
  "LEAD-09: The Joint-Venture Warm Intro Pipeline",
  "LEAD-10: The Multi-Channel Event Sequence Sync",
  "MKTG-03: The Content Multiplication Machine",
  "MKTG-04: The High-Ticket Webinar Funnel Map",
  "MKTG-05: The 'Problem First' VSL Video Outline",
  "MKTG-06: The Micro-Case Study Formula",
  "MKTG-07: The Soap-Opera Email Sequence Map",
  "MKTG-08: The Contrast-Based Pricing Table",
  "MKTG-09: The Authority Newsletter Checklist",
  "MKTG-10: The Social Retaining Creative Hook Sheet",
  "PROD-03: The Energy-Level Time Boxing Ledger",
  "PROD-04: The Absolute Focus-Block Architecture",
  "PROD-05: The 'No-Meeting' Operational Standard",
  "PROD-06: The Founder's Sunday Night Blueprint",
  "PROD-07: The Quarter-Scale OKR Target Squeeze",
  "PROD-08: The High-Leverage Inbox Zero Protocol",
  "PROD-09: The Asynchronous Status Slack Matrix",
  "PROD-10: The Founder Burnout early Warning Sentry",
  "AUTO-03: The Cold Outreach Auto-Pilot Scraping Engine",
  "AUTO-04: The Client Reporting Dashboard Synchronizer",
  "AUTO-05: The Slack-to-Task PM Direct Link",
  "AUTO-06: The Instant Guest Screener Booking Pipeline",
  "AUTO-07: The AI-Powered PDF Intake Parser",
  "AUTO-08: The Multi-Source Review Auto-Publisher",
  "AUTO-09: The Automated Inactive client Sentry Alert",
  "AUTO-10: The Dynamic Lead Assign Pitch Router"
];

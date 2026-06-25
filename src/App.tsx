import { useState, useRef, useEffect, RefObject } from "react";
import { CARDOS_DECK } from "./data/cards";
import { CardCommand, CardCategory } from "./types";
import CardGrid from "./components/CardGrid";
import CardDetail from "./components/CardDetail";
import BorderGlow from "./components/BorderGlow";
import WaitlistForm from "./components/WaitlistForm";
import VideoDemoPlayer from "./components/VideoDemoPlayer";
import PillNav from "./components/PillNav";
import GooeyNav from "./components/GooeyNav";
import Folder from "./components/Folder";
import PixelTransition from "./components/PixelTransition";
import CircularGallery from "./components/CircularGallery";
import { generateCardTexture } from "./utils/cardTexture";
import ScrollReveal from "./components/ScrollReveal";
import BlurText from "./components/BlurText";

const galleryItems = [
  {
    image: generateCardTexture({
      id: "SALE-01",
      code: "01",
      category: "Sales",
      title: "Uncover the Real Pain",
      description: "Understand your prospect's true pain points, secret concerns, and triggers before you pitch anything.",
      themeColor: "#E15A20",
      scanMessage: "SCAN BACK TO UNLOCK THE OBJECTION CRUSHER"
    }),
    text: "01 / Sales"
  },
  {
    image: generateCardTexture({
      id: "LEAD-01",
      code: "04",
      category: "Leads & Outreach",
      title: "The 3-Sentence Hook",
      description: "Write ultra-personalized, short cold emails with double-digit reply rates and zero hype.",
      themeColor: "#2563EB",
      scanMessage: "SCAN BACK TO INJECT RELEVANCY"
    }),
    text: "04 / Leads & Outreach"
  },
  {
    image: generateCardTexture({
      id: "MKTG-01",
      code: "06",
      category: "Marketing & Copy",
      title: "The Scroll-Stopper Hook",
      description: "Generate 5 high-converting, viral narrative hooks for LinkedIn, X, and newsletters.",
      themeColor: "#7C3AED",
      scanMessage: "SCAN FOR NARRATIVE MULTIPLIERS"
    }),
    text: "06 / Marketing"
  },
  {
    image: generateCardTexture({
      id: "PROD-01",
      code: "08",
      category: "Productivity & Strategy",
      title: "The 4-Hour Leverage Audit",
      description: "Pinpoint where the business owner is losing hours to low-leverage work. Maps delegate vectors.",
      themeColor: "#0D9488",
      scanMessage: "SCAN FOR OPERATIONAL DELEGATES"
    }),
    text: "08 / Productivity"
  },
  {
    image: generateCardTexture({
      id: "AUTO-01",
      code: "10",
      category: "Automation & Ops",
      title: "The Zapier Blueprint Architect",
      description: "Map out automated client onboarding that syncs custom data without a custom backend.",
      themeColor: "#0284C7",
      scanMessage: "SCAN TO STREAMLINE WORKFLOWS"
    }),
    text: "10 / Automation"
  }
];

const logoSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%23111110"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="monospace" font-size="44" font-weight="bold">%3E_</text></svg>`;

import AdminPanel from "./components/AdminPanel";
import { 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldAlert, 
  Code, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  Plus, 
  Search, 
  Check, 
  Lock, 
  Package, 
  QrCode, 
  Compass, 
  Target, 
  ExternalLink,
  Cpu,
  Bookmark,
  Hourglass,
  Youtube,
  Shuffle,
  Users,
  Eye,
  Settings,
  Scale,
  Award,
  X,
  PlayCircle
} from "lucide-react";

function getCardFromPath(deck: CardCommand[]): CardCommand {
  const path = window.location.pathname.replace(/^\/+/, "").toLowerCase();
  if (!path) return deck[0];
  const match = deck.find((c) => c.id.toLowerCase() === path);
  return match || deck[0];
}

export default function App() {
  const [deck, setDeck] = useState<CardCommand[]>(CARDOS_DECK);
  const [activeCard, setActiveCard] = useState<CardCommand>(
    () => getCardFromPath(CARDOS_DECK)
  );
  const [refreshStatsCount, setRefreshStatsCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Custom interactive showcase tabs
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'cards' | 'front' | 'back' | 'mobile'>('cards');
  
  // Collapsible FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Frustration active check
  const [activeFrustrationIndex, setActiveFrustrationIndex] = useState<number>(0);

  // Simulated Watch Demo play state
  const [videoOpen, setVideoOpen] = useState(false);

  const commandStationRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPopState = () => setActiveCard(getCardFromPath(deck));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [deck]);

  const handleSelectCard = (card: CardCommand) => {
    setActiveCard(card);
    const newPath = `/${card.id.toLowerCase()}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
    if (commandStationRef.current) {
      commandStationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddCustomCard = (newCard: CardCommand) => {
    setDeck((prev) => [newCard, ...prev]);
    setActiveCard(newCard);
    if (commandStationRef.current) {
      commandStationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  const handleJoinSuccess = () => {
    setRefreshStatsCount((prev) => prev + 1);
  };

  // Scroll to targeted block
  const scrollTo = (elementRef: RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FAQs
  const faqs = [
    {
      q: "Do I need ChatGPT Plus?",
      a: "No, you do not need any paid accounts. CARDOS prompt pages compile context-rich prompts that run perfectly on the free versions of ChatGPT, Gemini, Claude, or any open-source models."
    },
    {
      q: "Does it work with Claude?",
      a: "Absolutely. The physical deck's workflows are model-agnostic. They are structured using systemic business logic that excels in Claude, GPT-4o, and Llama 3."
    },
    {
      q: "Can I use Gemini?",
      a: "Yes! In fact, the dynamic command simulation console on this landing page runs off Gemini 3.5 Flash live to let you brainstorm, modify, and preview your cards immediately."
    },
    {
      q: "Are updates included?",
      a: "Every physical deck comes with lifetime access to its matching digital prompt page. If we optimize proposed parameters or structures for newer frontier models, your scanned QR code automatically redirects to the updated version."
    },
    {
      q: "Can teams use it?",
      a: "CARDOS is an exceptional tool for collaborative workshops. Teams use them to lay out marketing funnels physically on tables, brainstorm agency pitches, and delegate tasks physically."
    },
    {
      q: "Do you ship worldwide?",
      a: "Yes. Premium batch shipments ship worldwide from our automated European and Indian fulfillment spaces with tracked global logistics codes."
    },
    {
      q: "What industries is it for?",
      a: "The deck is tailored specifically for agencies, SaaS founders, marketers, digital consultants, high-ticket freelancers, and content creators looking to multiply their commercial velocity."
    }
  ];

  // Frustrations list
  const frustrations = [
    {
      title: "Thousands of generic prompts online",
      details: "An overwhelming pile of static copy-paste lines found in cheap internet lists that lack context and produce robotic, generic responses.",
      fix: "CARDOS provides hyper-targeted business challenges with physical card parameters that lock in your industry niche before processing."
    },
    {
      title: "Endless YouTube tutorials & courses",
      details: "Four-hour video essays teaching basic prompting terms, promising everything but wasting hours of valuable execution time.",
      fix: "Skip learning syntax. Pick a card, fill in the concrete blanks on your screen, copy, and execute immediately."
    },
    {
      title: "Severe information overload",
      details: "Bookmarks, Notion documents, and browser tabs stuffed with prompts you forget you owned and never return to.",
      fix: "Tactile card systems sit on your work desk as physical visual triggers, serving as immediate, daily action systems."
    },
    {
      title: "No sustainable execution framework",
      details: "No logical flow or structure. Prompting is treated like a lottery ticket where you guess inputs and hope for lucky outputs.",
      fix: "Every command is designed around proven business framework steps (e.g. pain funnel analysis, price psychology structures)."
    },
    {
      title: "Massive amounts of wasted time",
      details: "Spending half your morning arguing with an AI model trying to explain your business size, budget constraints, or niche.",
      fix: "Standardized parameters package this metadata cleanly so your LLM understands your perspective perfectly on the first run."
    }
  ];

  const getExpectedResults = (category: string) => {
    switch (category) {
      case 'Sales':
        return [
          "Deeper, honest discovery calls",
          "Higher close rates from qualified leads",
          "Stronger trust before you pitch"
        ];
      case 'Leads & Outreach':
        return [
          "Ultra-targeted personalized copy",
          "Higher response rates on outreach",
          "Bypassing generic spam filters"
        ];
      case 'Marketing & Copy':
        return [
          "Direct high-conversion hook variants",
          "Polished narrative frameworks",
          "Emotionally resonant marketing"
        ];
      case 'Productivity & Strategy':
        return [
          "Laser focus on leverage activities",
          "Actionable roadmap with execution",
          "Removal of decision fatigue & anxiety"
        ];
      case 'Automation & Ops':
        return [
          "Optimized system flows & checklists",
          "Reduced manual developer friction",
          "Robust and error-tolerant pipelines"
        ];
      default:
        return [
          "Accelerated operational capability",
          "Elite execution output",
          "Maximized conversion metrics"
        ];
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A18] font-sans antialiased selection:bg-black selection:text-white pb-24">
      
      {/* Top Banner - Sleek bar */}
      <header className="border-b border-[#E8E6DF] bg-[#FDFCFB]/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10 relative flex-shrink-0">
              <div className="absolute inset-0 bg-[#E8E6DF] rounded-md translate-x-1.5 translate-y-1.5"></div>
              <div className="absolute inset-0 bg-[#888780] rounded-md translate-x-0.5 translate-y-0.5"></div>
              <div className="absolute inset-0 bg-[#111110] rounded-md flex items-center justify-center text-white text-base font-light italic">&gt;_</div>
            </div>
            <div>
              <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase block">CARDOS</span>
              <span className="text-[9px] font-mono tracking-widest text-[#888780] block -mt-1">THE TACTILE OPERATING SYSTEM</span>
            </div>
          </div>

          <PillNav
            items={[
              { label: 'Interactive Demo', href: '#demo', onClick: () => scrollTo(commandStationRef) },
              { label: 'How It Works', href: '#how-it-works', onClick: () => scrollTo(howItWorksRef) },
              { label: 'Get CARDOS', href: '#get-cardos', onClick: () => scrollTo(waitlistRef) }
            ]}
            baseColor="#ffffff"
            pillColor="#111110"
            pillTextColor="#ffffff"
            hoveredPillTextColor="#111110"
            initialLoadAnimation={true}
          />
        </div>
      </header>

      {/* Developer Live Registrar view */}
      {showAdmin && (
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="animate-slideDown">
            <AdminPanel onClose={() => setShowAdmin(false)} triggerRefreshStats={refreshStatsCount} />
          </div>
        </div>
      )}

      {/* LANDING PAGE HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
            <span>PHYSICAL AI COMMAND SYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight">
            STOP SEARCHING <br />
            FOR PROMPTS. <br />
            <span className="italic font-serif">START EXECUTING.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#5F5E5A] leading-relaxed max-w-xl font-light">
            CARDOS transforms proven high-ticket business workflows into a desk-bound physical deck of 50 command cards. Pick a challenge. Scan. Execute instantly. No subscription required.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => scrollTo(waitlistRef)}
              className="bg-[#1A1A18] text-[#FDFCFB] hover:opacity-95 active:scale-[0.98] px-7 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>RESERVE YOUR DECK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setVideoOpen(true)}
              className="bg-white hover:bg-[#F5F4F0] text-[#1A1A18] border border-[#E8E6DF] active:scale-[0.98] px-7 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-[#888780]" />
              <span>Watch Demo video</span>
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-[#E8E6DF]/60 max-w-lg mt-8">
            <div>
              <span className="text-xs text-[#888780] uppercase tracking-wider block font-mono font-bold">LIMITED SIZE</span>
              <span className="text-sm font-semibold text-[#1A1A18]">Only 100 sets per batch</span>
            </div>
            <div className="h-8 w-[1px] bg-[#E8E6DF]"></div>
            <div>
              <span className="text-xs text-[#888780] uppercase tracking-wider block font-mono font-bold">MATERIAL STOCK</span>
              <span className="text-sm font-semibold text-[#1A1A18]">350gsm Soft-touch Matte</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Cards Stack rendering (Luxurious mock setup in pure CSS) */}
        <div className="lg:col-span-5 h-[420px] relative flex items-center justify-center bg-radial from-[#F5F4F0] to-[#FDFCFB] rounded-3xl border border-[#E8E6DF]/40 shadow-inner">
          
          {/* Animated overlapping 3D cards */}
          <div className="relative w-72 h-96 group perspective">
            
            {/* Card 3 (Lowest - Marketing) */}
            <div 
              className="absolute inset-0 bg-[#FDFCFB] border-2 border-[#111110]/10 rounded-2xl p-6 shadow-xl transition-all duration-700 ease-out transform pointer-events-none group-hover:translate-x-12 group-hover:translate-y-4 group-hover:rotate-12 hover:scale-105"
              style={{ transform: 'translateY(16px) rotate(-6deg) translateZ(-20px)' }}
            >
              <span className="text-[8px] font-mono tracking-wider text-rose-700 uppercase bg-rose-50 px-2 py-0.5 border border-rose-100 rounded-full font-semibold">Marketing · MK-03</span>
              <h3 className="text-lg font-serif italic mt-6 text-neutral-800">The Hook Architect</h3>
              <p className="text-[10px] text-neutral-500 mt-2 font-light">Structure three hook formats for raw audience conversion.</p>
              <div className="absolute bottom-6 right-6 w-9 h-9 bg-neutral-200 rounded flex items-center justify-center">
                <QrCode className="w-5 h-5 text-neutral-800" />
              </div>
            </div>

            {/* Card 2 (Middle - Leads) */}
            <div 
              className="absolute inset-0 bg-[#FDFCFB] border-2 border-[#111110]/10 rounded-2xl p-6 shadow-2xl transition-all duration-700 ease-out transform pointer-events-none group-hover:-translate-x-12 group-hover:-translate-y-8 group-hover:-rotate-12 hover:scale-105"
              style={{ transform: 'translateY(6px) rotate(4deg) translateZ(-10px)' }}
            >
              <span className="text-[8px] font-mono tracking-wider text-blue-700 uppercase bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-full font-semibold">Outreach · LE-02</span>
              <h3 className="text-lg font-serif italic mt-6 text-neutral-800">The Frictionless Pitch</h3>
              <p className="text-[10px] text-neutral-500 mt-2 font-light">Build structured cold emails focusing on micro-impact triggers.</p>
              <div className="absolute bottom-6 right-6 w-9 h-9 bg-neutral-200 rounded flex items-center justify-center">
                <QrCode className="w-5 h-5 text-neutral-800" />
              </div>
            </div>

            {/* Card 1 (Top active card - Sales) with PixelTransition */}
            <div 
              className="absolute inset-0 bg-transparent rounded-2xl shadow-[0px_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out transform group-hover:-translate-y-4 group-hover:rotate-1 hover:scale-105"
              style={{ transform: 'rotate(-1deg) translateZ(0)' }}
            >
              <PixelTransition
                gridSize={10}
                pixelColor="#F4A340"
                once={false}
                animationStepDuration={0.4}
                aspectRatio="0%"
                className="w-full h-full"
                firstContent={
                  <div className="w-full h-full bg-[#111110] text-[#FDFCFB] p-6 flex flex-col justify-between rounded-2xl border border-white/5 select-none">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">SALES COMMAND</span>
                        <span className="text-[9px] font-mono text-[#888780]">01/50</span>
                      </div>
                      <h3 className="text-xl font-normal text-white mt-12 leading-snug">
                        Get your <span className="text-brand-orange font-medium animate-pulse">first client</span>
                      </h3>
                      <p className="text-[11px] text-[#888780] mt-3 font-light leading-relaxed">
                        Generate a complete outreach system tailored to your niche.
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-[9px] font-mono text-[#888780]">TACTILE INTERFACE SYSTEM</span>
                      <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center">
                        <QrCode className="w-10 h-10 text-[#111110]" />
                      </div>
                    </div>
                  </div>
                }
                secondContent={
                  <div className="w-full h-full bg-[#F4A340] text-[#111110] p-6 flex flex-col justify-between rounded-2xl border border-brand-orange/10 select-none">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono tracking-wider text-[#111110] bg-white/30 border border-white/40 px-2.5 py-0.5 rounded-full font-semibold uppercase">CardOS</span>
                        <span className="text-[9px] font-mono text-[#111110]/80">01/50</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#111110] mt-12 leading-snug tracking-tight">
                        Are You Ready To Get Your Card?
                      </h3>
                      <p className="text-[11px] text-[#111110]/95 mt-3 font-semibold leading-relaxed">
                        Unlock CARDOS and discover 50 AI-powered systems for sales, content, marketing, and growth.
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-[9px] font-mono text-[#111110] tracking-wider bg-white/40 px-2 py-1 rounded border border-white/30 animate-pulse font-bold flex items-center gap-1">
                        <span className="inline-block animate-bounce">↓</span> UNLOCK YOUR FIRST AI CARD
                      </span>
                      <div className="w-12 h-12 bg-[#111110] text-brand-orange rounded-lg p-1.5 shadow-md flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-brand-orange fill-brand-orange" />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

          </div>

          <span className="absolute bottom-4 text-[10px] font-mono text-[#888780] flex items-center gap-1">
            <Shuffle className="w-3.5 h-3.5 animate-pulse" /> Hover card deck to scatter
          </span>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM SECTION */}
      <section className="bg-[#111110] text-white py-20 border-y border-[#E8E6DF]/15">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">THE CONFLAGRATION OF DUST</span>
            <h2 className="text-3.5xl sm:text-5xl font-display font-medium tracking-tight mt-1 leading-[1.05]">
              AI is powerful. <br />
              <span className="text-[#888780] italic font-serif">Most people still don't know what to ask.</span>
            </h2>
            <p className="text-sm text-[#888780] max-w-xl font-light">
              Browsing passive folders, bookmarking generic prompts, and watching self-proclaimed experts fails to build actual business execution habits.
            </p>
          </div>

          {/* Interactive Pitfalls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List selectors */}
            <div className="lg:col-span-5 space-y-3">
              {frustrations.map((frust, index) => {
                const isActive = activeFrustrationIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFrustrationIndex(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'border-transparent text-[#888780] hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-60">0{index + 1}.</span>
                      <span className="text-xs font-semibold">{frust.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Outcome window */}
            <div className="lg:col-span-7 bg-[#1C1C1A] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block font-bold mb-1">Traditional Pitfall Details</span>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {frustrations[activeFrustrationIndex].details}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">The CARDOS System Solution</span>
                </div>
                <p className="text-sm text-[#FDFCFB] font-medium leading-relaxed">
                  {frustrations[activeFrustrationIndex].fix}
                </p>
              </div>
            </div>

          </div>

          <div className="text-center pt-8">
            <span className="text-lg font-serif italic text-brand-orange">CARDOS solves that.</span>
          </div>

        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section ref={howItWorksRef} className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">THE EXECUTION TRIPLET</span>
          <h2 className="text-3xl sm:text-5xl font-normal leading-tight tracking-tight">
            How it works
          </h2>
          <p className="text-sm text-[#5F5E5A] max-w-lg mx-auto font-light leading-relaxed">
            The simplest, most reliable loop constructed to convert thinking directly into finished business files.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-6">
          <div className="space-y-4 p-6 bg-[#F5F4F0]/40 rounded-2xl border border-[#E8E6DF]/60">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#111110] text-[#FDFCFB] rounded-full text-lg font-serif font-bold italic mb-2">1</div>
            <h4 className="text-base font-semibold text-[#1A1A18]">Pick a tactical Card</h4>
            <p className="text-xs text-[#5F5E5A] leading-relaxed font-light">
              Filter and grab the precise challenge card from the physical tray—such as lead scripts, objection crunches, or outreach funnels.
            </p>
          </div>

          <div className="space-y-4 p-6 bg-[#F5F4F0]/40 rounded-2xl border border-[#E8E6DF]/60">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#111110] text-[#FDFCFB] rounded-full text-lg font-serif font-bold italic mb-2">2</div>
            <h4 className="text-base font-semibold text-[#1A1A18]">Scan the QR overlay</h4>
            <p className="text-xs text-[#5F5E5A] leading-relaxed font-light">
              Point your phone camera or tablet at the QR code on the back. Instantly loads the tailored parameter page on your screen.
            </p>
          </div>

          <div className="space-y-4 p-6 bg-[#F5F4F0]/40 rounded-2xl border border-[#E8E6DF]/60">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#111110] text-[#FDFCFB] rounded-full text-lg font-serif font-bold italic mb-2">3</div>
            <h4 className="text-base font-semibold text-[#1A1A18]">Execute automatically</h4>
            <p className="text-xs text-[#5F5E5A] leading-relaxed font-light">
              Fill in context-specific inputs, click Compile, and copy the robust prompt block to ChatGPT or Claude. Enjoy elite output logic.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRODUCT SHOWCASE SECTION WITH DYNAMIC INTERACTIVE SWITCHES */}
      <section className="bg-[#F5F4F0] py-20 border-y border-[#E8E6DF]">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">TACTILE AND DIGITAL DETAIL DESIGN</span>
              <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1A18] tracking-tight">
                Inside the CARDOS System
              </h2>
            </div>

            {/* Showcase Tabs selectors with GooeyNav */}
            <GooeyNav
              items={[
                { label: "cards", href: "#cards", onClick: () => setActiveShowcaseTab("cards") },
                { label: "front", href: "#front", onClick: () => setActiveShowcaseTab("front") },
                { label: "back", href: "#back", onClick: () => setActiveShowcaseTab("back") },
                { label: "mobile", href: "#mobile", onClick: () => setActiveShowcaseTab("mobile") }
              ]}
              activeHref={`#${activeShowcaseTab}`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Display Graphic side */}
            <div className={`lg:col-span-6 bg-[#FDFCFB] border border-[#E8E6DF] rounded-2xl h-[450px] flex items-center justify-center relative overflow-hidden shadow-2xl ${activeShowcaseTab === 'cards' ? 'p-0' : 'p-8'}`}>
              
              {/* Tab 2: Individual Cards Array */}
              {activeShowcaseTab === 'cards' && (
                <div className="w-full h-full relative bg-[#FDFCFB]">
                  <CircularGallery
                    items={galleryItems}
                    bend={3}
                    textColor="#111110"
                    borderRadius={0.05}
                    scrollEase={0.03}
                  />
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
                    <span className="text-[10px] font-mono text-[#888780] bg-[#FDFCFB]/90 px-2.5 py-1 rounded-full border border-[#E8E6DF] shadow-sm animate-pulse">
                      &larr; Drag or use Wheel to inspect deck &rarr;
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 3: Card Front */}
              {activeShowcaseTab === 'front' && (
                <div className="cardos-physical-card cardos-physical-front text-left text-[#FDFCFB] h-[377px] w-[220px]">
                  <div className="flex items-center gap-2">
                    {/* Logo mark SVG */}
                    <svg width="18" height="20" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <rect x="4"  y="18" width="60" height="72" rx="9" fill="rgba(255,255,255,0.08)"/>
                      <rect x="12" y="9"  width="60" height="72" rx="9" fill="rgba(255,255,255,0.18)"/>
                      <rect x="20" y="0"  width="60" height="72" rx="9" fill="#FDFCFB"/>
                      <text x="50" y="33" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="24" fontWeight="200" fill="#111110" textAnchor="middle" dominantBaseline="central" letterSpacing="-1">&gt;_</text>
                    </svg>
                    <span className="text-[10px] font-light tracking-[0.26em] text-neutral-400 uppercase font-sans">CARDOS</span>
                  </div>

                  <div className="flex-1"></div>

                  <div className="pb-0.5">
                    <div className="text-[9px] font-medium tracking-[0.14em] text-neutral-400 uppercase font-sans mb-1">
                      {activeCard.category}
                    </div>
                    <div className="text-[10px] font-extralight tracking-wider text-neutral-400 font-mono mb-3">
                      {activeCard.id}
                    </div>
                    {/* Dynamic Mission heading */}
                    <div className="text-[24px] font-light text-[#FDFCFB] leading-[1.15] tracking-[-0.02em] mb-3 font-sans capitalize break-words">
                      {activeCard.title}
                    </div>
                    {/* Dynamic Objective description */}
                    <div className="text-[10px] font-light text-neutral-400 leading-[1.65] font-sans mb-5 max-w-[168px]">
                      {activeCard.description}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[8.5px] font-normal tracking-[0.1em] text-neutral-400 uppercase border border-neutral-800 bg-neutral-900 rounded-full px-[11px] py-[5px] font-sans">
                      <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                      Scan back to execute
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Card Back */}
              {activeShowcaseTab === 'back' && (
                <div className="cardos-physical-card cardos-physical-back text-left text-[#FDFCFB] h-[377px] w-[220px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-light tracking-[0.26em] text-neutral-400 font-sans uppercase">CARDOS</span>
                    <span className="text-[9px] font-normal tracking-wide text-neutral-400 font-mono">{activeCard.id}</span>
                  </div>

                  {/* QR code */}
                  <div className="flex flex-col items-center mb-3.5">
                    <div className="w-[96px] h-[96px] bg-white rounded-[9px] flex items-center justify-center p-1.5 shadow-inner">
                      <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        {/* Finder TL */}
                        <rect x="4"  y="4"  width="22" height="22" rx="3" fill="#111110"/>
                        <rect x="7"  y="7"  width="16" height="16" rx="2" fill="white"/>
                        <rect x="10" y="10" width="10" height="10" rx="1.5" fill="#111110"/>
                        {/* Finder TR */}
                        <rect x="54" y="4"  width="22" height="22" rx="3" fill="#111110"/>
                        <rect x="57" y="7"  width="16" height="16" rx="2" fill="white"/>
                        <rect x="60" y="10" width="10" height="10" rx="1.5" fill="#111110"/>
                        {/* Finder BL */}
                        <rect x="4"  y="54" width="22" height="22" rx="3" fill="#111110"/>
                        <rect x="7"  y="57" width="16" height="16" rx="2" fill="white"/>
                        <rect x="10" y="60" width="10" height="10" rx="1.5" fill="#111110"/>
                        {/* Timing pattern H */}
                        <rect x="30" y="26" width="4" height="4" fill="#111110"/>
                        <rect x="38" y="26" width="4" height="4" fill="#111110"/>
                        <rect x="46" y="26" width="4" height="4" fill="#111110"/>
                        {/* Timing pattern V */}
                        <rect x="26" y="30" width="4" height="4" fill="#111110"/>
                        <rect x="26" y="38" width="4" height="4" fill="#111110"/>
                        <rect x="26" y="46" width="4" height="4" fill="#111110"/>
                        {/* Data modules */}
                        <rect x="30" y="30" width="4" height="4" fill="#111110"/>
                        <rect x="38" y="30" width="4" height="4" fill="#111110"/>
                        <rect x="30" y="38" width="4" height="4" fill="#111110"/>
                        <rect x="46" y="38" width="4" height="4" fill="#111110"/>
                        <rect x="38" y="46" width="4" height="4" fill="#111110"/>
                        <rect x="46" y="46" width="4" height="4" fill="#111110"/>
                        <rect x="30" y="46" width="4" height="4" fill="#111110"/>
                        <rect x="54" y="30" width="4" height="4" fill="#111110"/>
                        <rect x="62" y="30" width="4" height="4" fill="#111110"/>
                        <rect x="54" y="38" width="4" height="4" fill="#111110"/>
                        <rect x="62" y="46" width="4" height="4" fill="#111110"/>
                        <rect x="54" y="54" width="4" height="4" fill="#111110"/>
                        <rect x="62" y="54" width="4" height="4" fill="#111110"/>
                        <rect x="30" y="54" width="4" height="4" fill="#111110"/>
                        <rect x="38" y="54" width="4" height="4" fill="#111110"/>
                        <rect x="46" y="54" width="4" height="4" fill="#111110"/>
                        <rect x="30" y="62" width="4" height="4" fill="#111110"/>
                        <rect x="46" y="62" width="4" height="4" fill="#111110"/>
                        <rect x="38" y="62" width="4" height="4" fill="#111110"/>
                        <rect x="54" y="62" width="4" height="4" fill="#111110"/>
                        <rect x="62" y="62" width="4" height="4" fill="#111110"/>
                        {/* Alignment mark */}
                        <rect x="52" y="52" width="6" height="6" rx="1" fill="#111110"/>
                      </svg>
                    </div>
                    <span className="text-[8.5px] font-light tracking-[0.1em] text-neutral-400 mt-1.5 font-mono">
                      cardos.ai/{activeCard.id.toLowerCase()}
                    </span>
                  </div>

                  <div className="h-[1px] bg-neutral-800 mb-3.5"></div>

                  {/* Prompt preview */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-[7px] p-2.5 mb-3.5 flex-1 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="text-[7.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase font-sans mb-1.5">Prompt preview</div>
                      <div className="text-[8px] font-light leading-[1.65] text-neutral-300 font-mono line-clamp-4">
                        {activeCard.promptTemplate.split(/(\[[^\]]+\])/g).map((part, idx) => {
                          if (part.startsWith('[') && part.endsWith(']')) {
                            return <em key={idx} className="not-italic text-amber-600 font-medium">{part}</em>;
                          }
                          return part;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Expected results */}
                  <div>
                    <div className="text-[7.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase font-sans mb-1.5">Expected result</div>
                    <div className="space-y-1">
                      {getExpectedResults(activeCard.category).map((result, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="w-[3px] h-[3px] rounded-full bg-neutral-700 mt-1.5 flex-shrink-0"></span>
                          <span className="text-[8.5px] font-light text-neutral-400 font-sans leading-[1.5]">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Mobile prompt */}
              {activeShowcaseTab === 'mobile' && (
                <div className="w-56 h-[320px] bg-neutral-950 border-4 border-neutral-800 rounded-3xl p-3.5 relative shadow-lg flex flex-col overflow-hidden">
                  <div className="w-20 h-3 bg-neutral-800 rounded-full mx-auto mb-2.5"></div>
                  <div className="bg-[#FDFCFB] flex-1 rounded-2xl p-3 flex flex-col justify-between text-neutral-900 overflow-y-auto">
                    <div>
                      <span className="text-[8px] font-mono text-rose-700 uppercase bg-rose-50 px-1.5 py-0.5 rounded-full">{activeCard.id} Generator</span>
                      <h5 className="text-[11px] font-bold mt-1 text-black">Configure Hooks Parameters</h5>
                    </div>
                    <div className="space-y-1.5 my-2">
                      <div className="text-[8px] space-y-0.5">
                        <label className="font-semibold block text-zinc-700">Product Focus</label>
                        <input type="text" value={activeCard.placeholders[0]?.defaultValue || "Premium enterprise solution"} className="bg-[#F5F4F0] border border-neutral-200 outline-none text-[8px] px-1.5 py-0.5 w-full rounded" disabled />
                      </div>
                      <div className="text-[8px] space-y-0.5">
                        <label className="font-semibold block text-zinc-700">Target Segment</label>
                        <input type="text" value={activeCard.placeholders[1]?.defaultValue || "Core strategic audience"} className="bg-[#F5F4F0] border border-neutral-200 outline-none text-[8px] px-1.5 py-0.5 w-full rounded" disabled />
                      </div>
                    </div>
                    <button className="w-full bg-zinc-950 text-white text-[8px] py-1.5 rounded-md font-semibold font-mono tracking-wide mt-auto uppercase shadow">Compile Prompt Code</button>
                  </div>
                </div>
              )}

            </div>

            {/* Explanatory parameters side */}
            <div className="lg:col-span-6 space-y-6">
              {activeShowcaseTab === 'cards' && (
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full font-mono font-bold">Physical Engineering</span>
                  <h3 className="text-2xl font-normal text-zinc-900 leading-tight">Premium 350gsm Tactile Cards</h3>
                  <p className="text-sm text-[#5F5E5A] leading-relaxed font-light">
                    Every card is printed on premium high-density stock with beautiful rounded corners and individual categorization coordinates. Zero cheap paper textures—engineered specifically to withstand daily scanning, drafting, and sharing.
                  </p>
                  <ul className="text-xs text-[#5F5E5A] space-y-1.5 font-light">
                    <li className="flex items-center gap-2">&bull; Anti-reflective and anti-smudge coated</li>
                    <li className="flex items-center gap-2">&bull; 3D rounded edges prevents fiber splitting</li>
                    <li className="flex items-center gap-2">&bull; Matte silver and deep carbon ink selections</li>
                  </ul>
                </div>
              )}

              {activeShowcaseTab === 'front' && (
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full font-mono font-bold">Anatomy of the Face</span>
                  <h3 className="text-2xl font-normal text-zinc-900 leading-tight">Logical Challenge Front Panels</h3>
                  <p className="text-sm text-[#5F5E5A] leading-relaxed font-light">
                    The front of each card identifies its specific code and category. It displays a minimalist title, a core tactical summary of what the template delivers, and labels specifying the structured variables/placeholders you will control on the digital prompt screen.
                  </p>
                  <ul className="text-xs text-[#5F5E5A] space-y-1.5 font-light">
                    <li className="flex items-center gap-2">&bull; High-contrast legibility in low light</li>
                    <li className="flex items-center gap-2">&bull; Clear representation of inputs expected</li>
                  </ul>
                </div>
              )}

              {activeShowcaseTab === 'back' && (
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-600 bg-zinc-300/30 px-2 py-0.5 rounded-full font-mono font-bold">The Reverse Overlay</span>
                  <h3 className="text-2xl font-normal text-neutral-800 leading-tight">QR Integration and Framework Outline</h3>
                  <p className="text-sm text-[#5F5E5A] leading-relaxed font-light">
                    The back has the QR link that is hardcoded to its respective premium parameters page. It also breaks down the underlying psychological business framework (e.g. Pain Point Reframing) so you learn the tactical logic behind every prompt.
                  </p>
                  <ul className="text-xs text-[#5F5E5A] space-y-1.5 font-light">
                    <li className="flex items-center gap-2">&bull; Direct physical-digital bridge</li>
                    <li className="flex items-center gap-2">&bull; Dynamic redirection mapping (updates free & live)</li>
                  </ul>
                </div>
              )}

              {activeShowcaseTab === 'mobile' && (
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full font-mono font-bold">The Interface</span>
                  <h3 className="text-2xl font-normal text-zinc-900 leading-tight">Responsive Prompt Parameters Desk</h3>
                  <p className="text-sm text-[#5F5E5A] leading-relaxed font-light">
                    Once page is loaded, you get a clean desktop or mobile terminal interface. Simply type in your customized variable fields. The platform automatically compiles them into an advanced, cohesive prompt block ready to copy and run.
                  </p>
                  <ul className="text-xs text-[#5F5E5A] space-y-1.5 font-light">
                    <li className="flex items-center gap-2">&bull; Universal browser compatible</li>
                    <li className="flex items-center gap-2">&bull; Zero account setup or credentials necessary</li>
                  </ul>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5 — CATEGORIES SECTION WITH EVENT BRIDGE */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">THE FIVE CATEGORIES CORE</span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight">Explore the Command Deck</h2>
          <p className="text-sm text-[#5F5E5A] max-w-lg mx-auto font-light leading-relaxed">
            Every business challenge is cataloged into one of five vital operational pillars. Select to filter cards below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Category I — Sales */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-5 shadow-xs hover:border-[#1A1A18] hover:shadow-md transition-all flex flex-col items-center justify-between min-h-[380px] text-center group">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
              <span>Category I</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            </div>

            <div className="py-6 my-1 flex items-center justify-center relative z-20 h-28">
              <Folder 
                color="#F4A340" 
                size={0.9} 
                items={[
                  <button
                    key="sale01"
                    onClick={(e) => {
                      e.stopPropagation();
                      const c = CARDOS_DECK.find(x => x.id === "SALE-01");
                      if (c) handleSelectCard(c);
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-[#111110] text-[#FDFCFB] hover:bg-neutral-800 transition-colors cursor-pointer select-none"
                  >
                    <span className="text-[6px] font-mono text-brand-orange font-bold">SALE-01</span>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2 text-white">Real Pain</span>
                    <span className="text-[5px] font-mono text-neutral-400 font-bold">Free Sample</span>
                  </button>,
                  <div
                    key="sale02"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">SALE-02</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">High Ticket</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="sale03"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">SALE-03</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Frictionless Close</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>
                ]}
              />
            </div>

            <div className="w-full space-y-1 mt-auto">
              <h4 className="text-sm font-serif italic text-[#1A1A18] font-semibold">Sales & pricing</h4>
              <p className="text-[11px] text-[#5F5E5A] font-light leading-snug">Price objection reframers, tactical proposals, and deal packaging systems.</p>
            </div>

            <button 
              onClick={() => handleSelectCard(CARDOS_DECK.find(c => c.id === "SALE-01") || CARDOS_DECK[0])}
              className="text-[10px] font-mono tracking-wider uppercase text-[#1A1A18] hover:underline font-bold mt-4 cursor-pointer"
            >
              Test Sales Card &rarr;
            </button>
          </div>

          {/* Category II — Leads & Outreach */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-5 shadow-xs hover:border-[#1A1A18] hover:shadow-md transition-all flex flex-col items-center justify-between min-h-[380px] text-center group">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
              <span>Category II</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </div>

            <div className="py-6 my-1 flex items-center justify-center relative z-20 h-28">
              <Folder 
                color="#3B82F6" 
                size={0.9} 
                items={[
                  <div
                    key="lead01"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">LEAD-01</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">3-Sentence Hook</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="lead02"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">LEAD-02</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Loom Script</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="leadLocked"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">LEAD-03</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Intent Scraper</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>
                ]}
              />
            </div>

            <div className="w-full space-y-1 mt-auto">
              <h4 className="text-sm font-serif italic text-[#1A1A18] font-semibold">Leads & Outreach</h4>
              <p className="text-[11px] text-[#5F5E5A] font-light leading-snug">Warm connection triggers, cold funnel builders, and email campaigns.</p>
            </div>

            <button 
              onClick={() => {
                const c = CARDOS_DECK.find(x => x.id === "LEAD-01");
                if (c) handleSelectCard(c);
              }}
              className="text-[10px] font-mono tracking-wider uppercase text-[#1A1A18] hover:underline font-bold mt-4 cursor-pointer"
            >
              Test Outreach Card &rarr;
            </button>
          </div>

          {/* Category III — Marketing & Copy */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-5 shadow-xs hover:border-[#1A1A18] hover:shadow-md transition-all flex flex-col items-center justify-between min-h-[380px] text-center group">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
              <span>Category III</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            </div>

            <div className="py-6 my-1 flex items-center justify-center relative z-20 h-28">
              <Folder 
                color="#F43F5E" 
                size={0.9} 
                items={[
                  <div
                    key="mktg01"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">MKTG-01</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Scroll-Stopper</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="mktg02"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">MKTG-02</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Anti-Benefit</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="mktgLocked"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">MKTG-03</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Multiplication</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>
                ]}
              />
            </div>

            <div className="w-full space-y-1 mt-auto">
              <h4 className="text-sm font-serif italic text-[#1A1A18] font-semibold">Marketing & Copy</h4>
              <p className="text-[11px] text-[#5F5E5A] font-light leading-snug">Landing pages psychological audits, dynamic hook frames, sales angles.</p>
            </div>

            <button 
              onClick={() => {
                const c = CARDOS_DECK.find(x => x.id === "MKTG-01");
                if (c) handleSelectCard(c);
              }}
              className="text-[10px] font-mono tracking-wider uppercase text-[#1A1A18] hover:underline font-bold mt-4 cursor-pointer"
            >
              Test Copy Card &rarr;
            </button>
          </div>

          {/* Category IV — Productivity & Strategy */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-5 shadow-xs hover:border-[#1A1A18] hover:shadow-md transition-all flex flex-col items-center justify-between min-h-[380px] text-center group">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
              <span>Category IV</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            </div>

            <div className="py-6 my-1 flex items-center justify-center relative z-20 h-28">
              <Folder 
                color="#14B8A6" 
                size={0.9} 
                items={[
                  <div
                    key="prod01"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">PROD-01</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">4-Hour Audit</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="prod02"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">PROD-02</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">80/20 Profit</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="prodLocked"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">PROD-03</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Time Boxing</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>
                ]}
              />
            </div>

            <div className="w-full space-y-1 mt-auto">
              <h4 className="text-sm font-serif italic text-[#1A1A18] font-semibold">Productivity & Strategy</h4>
              <p className="text-[11px] text-[#5F5E5A] font-light leading-snug">Strategic framework models, priority planning matrix, bottleneck analyzer.</p>
            </div>

            <button 
              onClick={() => {
                const c = CARDOS_DECK.find(x => x.id === "PROD-01");
                if (c) handleSelectCard(c);
              }}
              className="text-[10px] font-mono tracking-wider uppercase text-[#1A1A18] hover:underline font-bold mt-4 cursor-pointer"
            >
              Test Strategy Card &rarr;
            </button>
          </div>

          {/* Category V — Automation & Ops */}
          <div className="bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-5 shadow-xs hover:border-[#1A1A18] hover:shadow-md transition-all flex flex-col items-center justify-between min-h-[380px] text-center group">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
              <span>Category V</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            </div>

            <div className="py-6 my-1 flex items-center justify-center relative z-20 h-28">
              <Folder 
                color="#6366F1" 
                size={0.9} 
                items={[
                  <div
                    key="auto01"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">AUTO-01</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Zapier Blueprint</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="auto02"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">AUTO-02</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">System Retainer</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>,
                  <div
                    key="autoLocked"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-full flex flex-col justify-between p-1.5 text-left bg-zinc-100/40 text-[#1a1a18]/40 border border-dashed border-zinc-300 rounded-lg select-none cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-mono text-zinc-400 font-bold">AUTO-03</span>
                      <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <span className="text-[7.5px] font-medium leading-tight font-sans line-clamp-2">Auto-Scraper</span>
                    <span className="text-[5px] font-mono text-zinc-400">Locked</span>
                  </div>
                ]}
              />
            </div>

            <div className="w-full space-y-1 mt-auto">
              <h4 className="text-sm font-serif italic text-[#1A1A18] font-semibold">Automation & Ops</h4>
              <p className="text-[11px] text-[#5F5E5A] font-light leading-snug">SOP planners, systems audit compilers, scaling playbooks.</p>
            </div>

            <button 
              onClick={() => {
                const c = CARDOS_DECK.find(x => x.id === "AUTO-01");
                if (c) handleSelectCard(c);
              }}
              className="text-[10px] font-mono tracking-wider uppercase text-[#1A1A18] hover:underline font-bold mt-4 cursor-pointer"
            >
              Test Automation Card &rarr;
            </button>
          </div>

        </div>

      </section>

      {/* SECTION 6 — INTERACTIVE DEMO AND FREE SAMPLE WORKSPACE (The heart of the app) */}
      <section 
        ref={commandStationRef} 
        className="max-w-6xl mx-auto px-6 py-20 border-t border-[#E8E6DF] space-y-12 scroll-mt-12"
      >
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">SECTION 6 & 13 — THE PORTAL CO-STATION</span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">
              Interactive Command Station <span className="text-[#888780] italic font-serif">&amp; Free Samples</span>
            </h2>
            <p className="text-xs text-[#5F5E5A] font-light">
              Experience the workflow free right now. Fill parameters, inspect the live composed markup block, and run prompts against our unified Gemini endpoint.
            </p>
          </div>
        </div>

        {/* ACTIVE EXECUTOR PANEL */}
        <div className="bg-[#FDFCFB] rounded-3xl border border-[#E8E6DF] p-2 hover:border-[#1A1A18] shadow-xs duration-300">
          <CardDetail card={activeCard} onBack={() => {}} />
        </div>

        {/* DYNAMIC CARDS Grid CATALOG */}
        <div className="space-y-4 pt-6">
          <div className="border-b border-[#E8E6DF] pb-2 flex justify-between items-center">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#1A1A18] flex items-center gap-2 font-bold">
              <Layers className="w-4 h-4 text-[#888780]" />
              <span>CARDOS interactive Catalog tray (Select Card to Load)</span>
            </h3>
          </div>
          <CardGrid onSelectCard={handleSelectCard} activeCardId={activeCard.id} deck={deck} />
        </div>

      </section>

      {/* SECTION 7 — WHAT'S INSIDE THE PACK */}
      <section className="bg-neutral-950 text-white py-20 border-y border-[#E8E6DF]/20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block font-bold">UNBOXING PRODUCT INVENTORY</span>
            <BlurText
              text="Everything you need to execute"
              delay={60}
              animateBy="words"
              direction="bottom"
              className="text-3xl sm:text-5xl font-normal leading-tight tracking-tight text-white justify-center"
            />
            <p className="text-sm text-[#888780] max-w-lg mx-auto font-light leading-relaxed">
              We ship an absolute physical blueprint tray. Zero digital friction. Instant, lifetime access.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Package className="w-6 h-6 text-brand-orange mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">50</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Physical Cards</p>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Smartphone className="w-6 h-6 text-blue-400 mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">50</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Prompt Pages</p>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Target className="w-6 h-6 text-rose-400 mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">50</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Challenges</p>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Compass className="w-6 h-6 text-teal-400 mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">50</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Workflows</p>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Cpu className="w-6 h-6 text-indigo-400 mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">Infinite</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Usage limit</p>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-center hover:bg-white/[0.04] transition-all">
              <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
              <h5 className="text-lg font-serif italic text-white leading-none">Lifetime</h5>
              <p className="text-[10px] font-mono text-[#888780] uppercase tracking-wider">Free Access</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8 — WHO IT'S FOR */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">SUCH TARGET AUDIMENTS</span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight">Built for elite operators</h2>
          <p className="text-sm text-[#5F5E5A] max-w-lg mx-auto font-light leading-relaxed">
            Skip generic tutorials. Acquire context-centered outputs for your exact operational seat.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">01</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Agency Owners</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Systemize campaign launches and draft proposal scopes instantly with clients on-site.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">02</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Freelancers</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Unpack high-ticket objection logic to charge 3x rates and handle onboarding stresslessly.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">03</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Startup Founders</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Synthesize pricing structures and draft product positioning maps without hiring agencies.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">04</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Consultants</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Outline corporate client diagnostic questions and organize structural execution routes.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">05</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Creators</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Deploy structured, highly engaging content hooks and scale distribution funnels.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">06</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Small Businesses</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Execute advanced automation maps and email marketing strategies without complex apps.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">07</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Startups</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Accelerate iteration speeds, construct marketing matrices and map developer pipelines.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={30}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={['#f4a340', '#c084fc', '#38bdf8']}
            className="h-full border-[#E8E6DF] hover:border-black transition-all"
          >
            <div className="p-6 space-y-3 h-full flex flex-col justify-start">
              <span className="text-xs uppercase tracking-widest font-mono text-[#888780] block font-bold">08</span>
              <h5 className="text-lg font-serif italic text-zinc-900 leading-tight">Marketers</h5>
              <p className="text-xs text-[#5F5E5A] font-light leading-relaxed">Execute elite copywriting structures, run conversion assessments, and map outreach.</p>
            </div>
          </BorderGlow>
        </div>

      </section>

      {/* SECTION 9 — WHY PHYSICAL CARDS? */}
      <section className="bg-[#FAF9F6] border-y border-[#E8E6DF] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block font-bold">PSYCHOLOGY OF ACTION</span>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="m-0"
              textClassName="text-3xl sm:text-5xl font-normal leading-tight tracking-tight text-neutral-900"
            >
              Why not just a PDF?
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={0}
              blurStrength={4}
              containerClassName="m-0 mt-2"
              textClassName="text-[#5F5E5A] font-light leading-relaxed text-base"
            >
              Digital files disappear into deep download directories. Physical triggers resting side-by-side on your desktop block distraction and prompt systematic daily execution.
            </ScrollReveal>
            <div className="space-y-4 pt-3 font-light text-[#5F5E5A] leading-relaxed text-sm">
              <p>
                <strong>You don't scroll.</strong> Scroll state creates mental passivity. tactile contact activates high decisiveness.
              </p>
              <p>
                <strong>You don't search.</strong> Searching drives anxiety. Pulling a card from the casing establishes instant strategic focus.
              </p>
              <p>
                <strong>You execute.</strong> Once variables are configured, copying completes the task in seconds.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111110] text-[#FDFCFB] rounded-3xl p-6 sm:p-8 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange block font-bold">CARDOS DESKTOP BENEFITS</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <h5 className="text-base text-white font-medium">Faster Decision Loops</h5>
                <p className="text-xs text-[#888780] leading-relaxed font-light">Eliminate bookmark folders. Instantly grab cards during customer calls to guide conversations.</p>
              </div>
              <div className="space-y-1.5">
                <h5 className="text-base text-white font-medium">Elevated Retention</h5>
                <p className="text-xs text-[#888780] leading-relaxed font-light">By viewing visual frameworks, understand the actual systemic logic behind professional AI commands.</p>
              </div>
              <div className="space-y-1.5">
                <h5 className="text-base text-white font-medium">Higher Team Alignment</h5>
                <p className="text-xs text-[#888780] leading-relaxed font-light">Brainstorm projects visually. Physically lay cards out during agency or advisory planning sessions.</p>
              </div>
              <div className="space-y-1.5">
                <h5 className="text-base text-white font-medium">Better Desk Organization</h5>
                <p className="text-xs text-[#888780] leading-relaxed font-light">Arrange columns of cards physically on your desk space to represent active task priorities.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <span className="text-xs text-brand-orange font-mono tracking-widest uppercase">REAL ACTIONS OVER DISCONNECTED METADATA</span>
            </div>
          </div>

        </div>
      </section>



      {/* SECTION 11 — COMPARISON TABLE */}
      <section className="bg-[#111110] text-[#FDFCFB] border-y border-[#E8E6DF]/20 py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block">SYSTEM RETRIEVAL METRICS</span>
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-tight">CARDOS vs Prompt PDFs</h2>
            <p className="text-xs text-[#888780] font-light">Why tactile execution blocks bypass digital files under any criteria.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1C1C1A]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 uppercase tracking-wider font-mono text-[#888780] font-bold">Capabilities</th>
                  <th className="p-4 uppercase tracking-wider font-mono text-brand-orange font-bold text-center bg-brand-orange/5">CARDOS Deck</th>
                  <th className="p-4 uppercase tracking-wider font-mono text-[#888780] font-bold text-center">Prompt PDFs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                <tr>
                  <td className="p-4 font-medium text-white">Physical Desktop Experience</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Standard</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Disappears in downloads</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Instant Scannable Access</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Standard (QR Redirection)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Manual folder find</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Interactive Parameter Customizer</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Standard (On-Screen fields)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Static text only</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Action-Centered Behavioral Loops</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ High (Visually Sitting on Desk)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Out of sight, out of mind</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Premium Swiss Minimailst design</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Standard (350gsm matte)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Raw Google Docs text</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Model Redirection Optimization</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Standard (Automated)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Becomes stale easily</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Enterprise ROI business focus</td>
                  <td className="p-4 text-center text-emerald-400 font-bold bg-brand-orange/5">✓ Advanced (Tested frameworks)</td>
                  <td className="p-4 text-center text-rose-500 font-mono">X Casual 'Hello' requests</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* SECTION 12 — COLLAPSIBLE FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#888780] font-mono block font-bold">REVOLUTION PROTOCOL QUERY</span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A18]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#5F5E5A] font-light">Immediate documentation answers on batch shipments, usages, and dependencies.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div 
                key={i} 
                className="border border-[#E8E6DF] rounded-2xl bg-[#FDFCFB] transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center transition-all hover:bg-[#F5F4F0]/30 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-[#1A1A18] font-sans">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-[#5F5E5A] border-t border-[#E8E6DF]/40 bg-[#FAF9F6] leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 14 — FINAL HIGH CONVERSION CTA SECTION WITH DECK RENDER */}
      <section 
        ref={waitlistRef} 
        id="waitlist-section"
        className="max-w-6xl mx-auto px-6 py-12 scroll-mt-12"
      >
        <div className="bg-[#111110] text-[#FDFCFB] rounded-[32px] p-8 md:p-14 relative overflow-hidden border border-white/5 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#E8E6DF]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:col-span-7 space-y-6 relative">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888780] block">RESERVE BATCH ENTRY</span>
            
            <h2 className="text-3xl sm:text-5xl font-normal leading-tight tracking-tight">
              Your next breakthrough <br />
              prompt is already <span className="italic font-serif text-brand-orange">in the deck.</span>
            </h2>

            <p className="text-sm text-[#888780] leading-relaxed max-w-lg font-light">
              Stop endless bookmark search sequences. Standardize your operations desk today with premium physical cards. Reserved items include ₹200 launch tier voucher and free trackable shipment.
            </p>

            <div className="border-t border-white/10 pt-6 max-w-sm flex items-center gap-6">
              <button 
                onClick={() => scrollTo(commandStationRef)}
                className="text-xs text-white underline font-mono hover:text-[#888780] cursor-pointer"
              >
                &larr; Browse Free Command Catalog First
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Embedded priority Waitlist form directly inside the CTA card */}
            <WaitlistForm onJoinSuccess={handleJoinSuccess} triggerRefreshStats={refreshStatsCount} />
          </div>

        </div>
      </section>

      {/* VIDEO DEMO MODAL SCREEN PLAY */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setVideoOpen(false)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-zinc-300 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer flex items-center gap-1.5 text-xs font-mono tracking-wider z-50"
            >
              <X className="w-4 h-4" />
              <span>CLOSE VIEW</span>
            </button>
            <VideoDemoPlayer onClose={() => setVideoOpen(false)} />
          </div>
        </div>
      )}

      {/* FOOTER SECTION */}
      <footer className="max-w-6xl mx-auto px-6 pt-16 border-t border-[#E8E6DF] grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xs tracking-[0.2em] text-[#1A1A18] uppercase">CARDOS</span>
          </div>
          <p className="text-xs text-[#5F5E5A] leading-relaxed font-light">
            Designed cards and physical packaging crafted with premium Swiss minimalist aesthetic. Standardizing business command architectures in 40+ countries.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#888780] font-bold block">RESOURCES</span>
          <ul className="text-xs space-y-1 text-[#5F5E5A] font-light">
            <li><button onClick={() => scrollTo(commandStationRef)} className="hover:text-black">Interactive Station</button></li>
            <li><button onClick={() => scrollTo(commandStationRef)} className="hover:text-black">Browse Free Samples</button></li>
            <li><button onClick={() => setVideoOpen(true)} className="hover:text-black">Watch Demonstration</button></li>
            <li className="pt-1"><button onClick={() => { setShowAdmin(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1">Waitlist Database 🔑</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#888780] font-bold block">LEGAL FILES</span>
          <ul className="text-xs space-y-1 text-[#5F5E5A] font-light">
            <li><a href="#" className="hover:text-black">Terms of Service</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy Directive</a></li>
            <li><a href="#" className="hover:text-black">Batch Deliveries tracker</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#888780] font-bold block">COMMERCIAL SOC METRICS</span>
          <span className="text-xs text-[#5F5E5A] font-light block leading-relaxed">
            Follow our design process on Instagram or follow live enterprise strategic breakdowns via LinkedIn.
          </span>
          <div className="text-[10px] font-mono text-[#888780] flex gap-3">
            <a href="https://www.instagram.com/cardos.ai/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="hover:text-black font-semibold">INSTAGRAM</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-black font-semibold">LINKEDIN</a>
          </div>
        </div>

        <div className="md:col-span-4 border-t border-[#E8E6DF]/60 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-[#888780] font-light">
          <span>&copy; {new Date().getFullYear()} CARDOS Industries Inc. All rights reserved physically &amp; digitally.</span>
        </div>
      </footer>

    </div>
  );
}

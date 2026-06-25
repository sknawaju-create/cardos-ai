import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Smartphone, 
  QrCode, 
  Clipboard, 
  Zap, 
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Sliders
} from "lucide-react";

interface VideoDemoPlayerProps {
  onClose: () => void;
}

const SCENES = [
  {
    id: 0,
    startTime: 0,
    endTime: 1,
    title: "Introducing CARDOS",
    subtitle: "AI Commands. Real Results.",
    tag: "BRAND INTRO"
  },
  {
    id: 1,
    startTime: 1,
    endTime: 3,
    title: "Step 1: Pick a Challenge",
    subtitle: "CARD SALES 01 — Uncover the Real Pain",
    tag: "PHYSICAL DECK"
  },
  {
    id: 2,
    startTime: 3,
    endTime: 4,
    title: "Step 2: Scan the Card",
    subtitle: "Instant parameter routing via back QR code",
    tag: "MOBILE SCAN"
  },
  {
    id: 3,
    startTime: 4,
    endTime: 6,
    title: "Step 3: Personalize Variables",
    subtitle: "Tweak variables (e.g. Website Design, Marketing)",
    tag: "DYNAMIC BLUEPRINT"
  },
  {
    id: 4,
    startTime: 6,
    endTime: 8,
    title: "Step 4: Copy & Execute",
    subtitle: "Copy compiled prompt block & paste directly in LLM",
    tag: "INSTANT COPIED"
  },
  {
    id: 5,
    startTime: 8,
    endTime: 9,
    title: "50 Premium AI Cards",
    subtitle: "For founders, freelancers, and agency leaders.",
    tag: "THE COMPLETE DECK"
  }
];

export default function VideoDemoPlayer({ onClose }: VideoDemoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 90 (0.0 to 9.0s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 90) {
            return 0; // Loop around
          }
          return prev + 1; // 100ms ticks
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const activeScene = SCENES.find(
    (s) => currentTime >= (s.startTime * 10) && currentTime < (s.endTime * 10)
  ) || SCENES[SCENES.length - 1];

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    setCurrentTime(Math.min(90, Math.max(0, Math.floor(pct * 90))));
  };

  const formattedTime = (currentTime / 10).toFixed(1);

  return (
    <div className="bg-[#111110] border border-white/10 rounded-2xl p-5 sm:p-6 w-full text-[#FDFCFB] flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Player header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase text-brand-orange tracking-widest font-black">
            CARDOS WORKFLOW SHOWCASE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
            {formattedTime}s / 9.0s
          </span>
        </div>
      </div>

      {/* Screen container */}
      <div className="relative aspect-video w-full bg-black border border-white/5 rounded-xl overflow-hidden flex flex-col items-center justify-center select-none group shadow-inner">
        {/* Dynamic Backgrounds matching timestamps */}
        
        {/* SCENE 0: INTRO */}
        {activeScene.id === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 animate-fade-in text-center">
            {/* Hexagonal premium logo simulation */}
            <div className="w-16 h-16 border-2 border-white/10 bg-white/5 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 mb-4 animate-bounce relative">
              <div className="absolute inset-0 border border-white/20 rounded-2xl animate-ping opacity-20"></div>
              <span className="text-xl font-mono text-white font-black tracking-tighter">C</span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-sans font-bold tracking-tight text-white mb-2 leading-none">
              CARDOS
            </h2>
            <p className="text-xs text-brand-orange font-mono uppercase tracking-widest font-semibold tracking-tight">
              AI Commands. Real Results.
            </p>
          </div>
        )}

        {/* SCENE 1: STEP 1 */}
        {activeScene.id === 1 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-950 animate-fade-in">
            <span className="text-[9px] font-mono text-brand-orange border border-brand-orange/20 bg-brand-orange/5 px-2 py-0.5 rounded-full mb-3">
              PICK A CHALLENGE CARD
            </span>
            {/* Physical card mock */}
            <div className="w-48 h-28 bg-[#1A1A18] border border-white/25 rounded-xl p-3 flex flex-col justify-between shadow-2xl relative transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-brand-orange font-bold tracking-wider block">SALES 01</span>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-tight mt-0.5">UNCOVER THE REAL PAIN</h3>
                </div>
                <div className="w-5 h-5 border border-white/10 rounded-xs flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-brand-orange rounded-full"></div>
                </div>
              </div>
              <p className="text-[8px] text-zinc-400 font-light leading-relaxed">
                Guards psychological buying triggers to surface immediate high-ticket pain points.
              </p>
              <div className="flex justify-between items-center border-t border-white/5 pt-1.5 mt-1.5">
                <span className="text-[7px] font-mono text-zinc-500">CATEGORY: DECK SALES</span>
                <span className="text-[7px] text-brand-orange font-mono font-medium">SCAN QR</span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 2: MOBILE SCAN */}
        {activeScene.id === 2 && (
          <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-zinc-900/90 animate-fade-in">
            <div className="relative">
              {/* Back card with QR code mockup */}
              <div className="w-32 h-20 bg-neutral-950 border border-white/10 rounded-lg p-2.5 flex flex-col justify-between relative shadow-lg">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
                  <QrCode className="w-2.5 h-2.5 text-zinc-400" />
                  <span className="text-[6px] font-mono text-zinc-500">VERIFY REGISTRAR CONNECTION</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="w-8 h-1 bg-zinc-700 rounded-xs"></div>
                    <div className="w-12 h-1 bg-zinc-800 rounded-xs"></div>
                  </div>
                  {/* QR square */}
                  <div className="w-10 h-10 bg-white p-1 rounded-sm flex items-center justify-center shadow-lg">
                    <div className="w-full h-full bg-[#1A1A18] rounded-xs flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-[5px] font-mono text-brand-orange">CARDOS.COM/S01</div>
              </div>
              {/* Pulse scan wave */}
              <div className="absolute -inset-1 border border-brand-orange/40 rounded-xl animate-ping opacity-60"></div>
            </div>

            {/* Smart Phone Simulator */}
            <div className="w-28 h-28 border-4 border-zinc-700 bg-black rounded-xl p-1.5 flex flex-col justify-between relative shadow-2xl">
              <div className="w-1/2 h-1.5 bg-zinc-700 mx-auto rounded-full mb-1"></div>
              <div className="flex-1 bg-[#FAF9F6] text-zinc-900 rounded-md p-1.5 flex flex-col items-center justify-center text-center space-y-1">
                <Smartphone className="w-4 h-4 text-brand-orange animate-bounce" />
                <span className="text-[7px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1 rounded-xs">
                  Routing QR link...
                </span>
                <p className="text-[6px] text-zinc-600 font-sans tracking-tight">Opened prompt draft page immediately.</p>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: CUSTOMIZE PARAMETERS */}
        {activeScene.id === 3 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#F5F4F0] animate-fade-in text-zinc-900">
            <span className="text-[9px] font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
              STEP 3: PERSONALISE ON SCREEN
            </span>
            {/* Laptop Console Simulator */}
            <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl shadow-xl p-3 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[7px] font-mono text-zinc-400">CARDOS COMPILER v2.5</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-0.5">
                  <label className="text-[7px] font-mono uppercase text-zinc-400 block font-semibold">INDUSTRY</label>
                  <div className="bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 text-[8px] font-medium rounded-xs text-zinc-800 flex justify-between items-center">
                    <span>Digital Marketing</span>
                    <Sliders className="w-2 h-2 text-zinc-400" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[7px] font-mono uppercase text-zinc-400 block font-semibold">TARGET PRODUCT</label>
                  <div className="bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 text-[8px] font-medium rounded-xs text-zinc-800 flex justify-between items-center">
                    <span>Website Design</span>
                    <Sliders className="w-2 h-2 text-zinc-400" />
                  </div>
                </div>
              </div>
              <div className="bg-zinc-950 text-emerald-400 font-mono text-[7px] p-2 rounded-md leading-relaxed whitespace-pre font-light select-all text-left">
                {"Role: Experienced business coach.\nRequest: Deep dive website pain points under Marketing..."}
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: COPY & PASTE TO LLM */}
        {activeScene.id === 4 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-950 animate-fade-in text-white text-center">
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mb-3 animate-pulse">
              COPIED CONSOLE PROMPT BLOCK
            </span>
            <div className="flex gap-4 items-center justify-center max-w-sm">
              <div className="w-1/2 p-3 bg-white/5 border border-white/10 rounded-xl relative flex flex-col items-center space-y-1">
                <Clipboard className="w-6 h-6 text-brand-orange bg-brand-orange/10 p-1 rounded" />
                <span className="text-[9px] font-semibold text-zinc-200 uppercase mt-1">CARDOS SYSTEM</span>
                <p className="text-[7px] text-zinc-400">Variables Composed</p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-brand-orange text-white p-1 rounded-full shadow-lg">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
              <div className="w-1/2 p-3 bg-white/5 border border-emerald-500/10 rounded-xl flex flex-col items-center space-y-1">
                <Sparkles className="w-6 h-6 text-emerald-400 bg-emerald-500/10 p-1 rounded" />
                <span className="text-[9px] font-semibold text-zinc-200 uppercase mt-1">ChatGPT / CLAUDE</span>
                <p className="text-[7px] text-zinc-400">Executed instantly</p>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 5: COMPLETE THE DECK */}
        {activeScene.id === 5 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-neutral-950 via-zinc-900 to-neutral-900 animate-fade-in text-center">
            <span className="text-[9px] font-mono text-[#888780] mb-2 uppercase tracking-wide">
              OVERVIEW
            </span>
            <h3 className="text-sm font-semibold text-white mb-1.5 uppercase font-mono tracking-widest text-brand-orange">
              50 Premium AI Cards
            </h3>
            <p className="text-[10px] text-zinc-300 max-w-xs mx-auto leading-relaxed font-light mb-4 text-center">
              Tailor-made playbook sections mapping Sales, Leads, Marketing, Content creation, and complex Automation maps. Out of the screen, into your hands.
            </p>
            <div className="flex gap-1.5 justify-center">
              {["Sales", "Leads", "Marketing", "Content", "Automations"].map((category, idx) => (
                <span key={idx} className="text-[7px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controller Controls */}
      <div className="space-y-4 shadow-sm pt-4">
        {/* Seek timeline */}
        <div 
          onClick={handleProgressClick}
          className="h-1.5 w-full bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden group hover:h-2 duration-150"
        >
          <div 
            className="h-full bg-brand-orange relative duration-100" 
            style={{ width: `${(currentTime / 90) * 100}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-xl opacity-0 group-hover:opacity-100"></div>
          </div>
        </div>

        {/* Playback Controls & Chapter list */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white text-black active:scale-[0.9] hover:bg-neutral-200 transition-all rounded-full flex items-center justify-center cursor-pointer shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            </button>
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Reset Workout Clip"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="text-[10px] font-mono text-zinc-400 font-medium">
              Active Chapter: <span className="text-white font-semibold">{activeScene.title}</span>
            </div>
          </div>

          {/* Interactive Selector Tabs */}
          <div className="flex items-center gap-1">
            {SCENES.map((scene) => {
              const isActive = currentTime >= (scene.startTime * 10) && currentTime < (scene.endTime * 10);
              return (
                <button
                  key={scene.id}
                  onClick={() => setCurrentTime(scene.startTime * 10)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    isActive 
                      ? "bg-brand-orange scale-125" 
                      : "bg-neutral-800 hover:bg-neutral-600"
                  }`}
                  title={`${scene.tag}: ${scene.title}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono uppercase text-zinc-500 font-bold block">PROTOTYPE HIGHLIGHT</span>
          <p className="text-[11px] leading-relaxed text-zinc-400">
            Beautiful rigid black tray designed to coordinate prompts perfectly for founders, freelancers, and growth innovators. Keep it beside your keyboard.
          </p>
        </div>
        <div className="bg-[#1A1A18]/50 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1">
            ✓ COMPLETE CLIENT PERSISTENCE
          </span>
          <p className="text-[10px] text-zinc-400 leading-tight">
            Fill template inputs, compose customized prompts, copy instantly, and see direct results on your local device.
          </p>
        </div>
      </div>
    </div>
  );
}

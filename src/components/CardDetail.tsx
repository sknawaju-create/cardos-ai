import { useState, useEffect } from "react";
import { CardCommand } from "../types";
import { Clipboard, Check, Undo2, LayoutTemplate, Lock } from "lucide-react";

interface CardDetailProps {
  card: CardCommand;
  onBack?: () => void;
}

export default function CardDetail({ card, onBack }: CardDetailProps) {
  // Store values inputted for each placeholder
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [composedPrompt, setComposedPrompt] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  // Initialize placeholder default values whenever active card changes
  useEffect(() => {
    const initialConfig: Record<string, string> = {};
    card.placeholders.forEach((param) => {
      initialConfig[param.key] = param.defaultValue;
    });
    setValues(initialConfig);
    setCustomInstructions("");
  }, [card]);

  // Substitute values into template whenever placeholders change
  useEffect(() => {
    let replacedText = card.promptTemplate;
    Object.entries(values).forEach(([key, val]) => {
      // Replace [Key] with val
      const stringVal = String(val);
      replacedText = replacedText.replaceAll(`[${key}]`, stringVal || `[${key}]`);
    });
    setComposedPrompt(replacedText);
  }, [values, card]);

  const handleInputChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopyPrompt = () => {
    const fullCopiedText = customInstructions 
      ? `${composedPrompt}\n\nADJUSTMENT CRITERIA:\n${customInstructions}`
      : composedPrompt;
      
    navigator.clipboard.writeText(fullCopiedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="card-detail-console">
      {/* Detail header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FDFCFB] p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 px-2.5 rounded-md hover:bg-[#F5F4F0] flex items-center gap-1.5 text-xs text-[#5F5E5A] font-mono transition-all border border-[#E8E6DF] cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Back to Deck</span>
            </button>
          )}
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold border px-2.5 py-1 bg-[#111110] text-[#FDFCFB] rounded-full">
            {card.category} · {card.code}
          </span>
          <span className="font-mono text-xs text-[#888780] font-medium">{card.id}</span>
        </div>

        <div className="text-xs text-[#5F5E5A] font-mono flex items-center gap-1.5">
          <LayoutTemplate className="w-4 h-4 text-[#888780]" />
          <span>Active Command Station</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT COLUMN: Input Variables Configuration */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#111110] rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col h-full text-white relative overflow-hidden">
            {card.id !== "SALE-01" && (
              <>
                <div className="absolute top-3 right-3 bg-brand-orange/10 border border-brand-orange/20 rounded-lg px-2 py-1 flex items-center gap-1 z-20">
                  <Lock className="w-3 h-3 text-brand-orange" />
                  <span className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-wider">Premium</span>
                </div>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center z-10 animate-fadeIn">
                  <div className="bg-[#111110]/95 border border-white/10 rounded-xl p-5 max-w-[240px] sm:max-w-xs space-y-3 shadow-xl">
                    <Lock className="w-5 h-5 text-brand-orange mx-auto" />
                    <p className="text-xs font-mono text-zinc-200 font-semibold uppercase tracking-wider">Configuration Locked</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                      Parameter variables and custom adjustments are locked for this premium command card.
                    </p>
                    <button 
                      onClick={() => document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="bg-brand-orange text-[#111110] hover:bg-brand-orange/90 active:scale-95 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer inline-block"
                    >
                      Unlock parameters &rarr;
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-normal text-white tracking-tight mb-1">{card.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{card.description}</p>
            </div>

            <div className="border-t border-white/10 my-2"></div>

            {/* Parameter configuration input controls */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                Configure Card Parameters {card.id !== "SALE-01" && " (Locked)"}
              </span>

              {card.placeholders.map((param) => (
                <div key={param.key} className={`space-y-1 ${card.id !== "SALE-01" ? "opacity-60" : ""}`}>
                  <div className="flex justify-between items-baseline">
                     <label className="text-xs font-semibold text-zinc-200">{param.label}</label>
                    <span className="text-[9px] font-mono text-brand-orange font-bold">[{param.key}]</span>
                  </div>
                  <input
                    type="text"
                    disabled={card.id !== "SALE-01"}
                    value={values[param.key] || ""}
                    onChange={(e) => handleInputChange(param.key, e.target.value)}
                    placeholder={param.defaultValue}
                    className="w-full bg-white/5 text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 focus:border-brand-orange focus:bg-white/10 focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
                  />
                  <p className="text-[10px] text-zinc-500 leading-none font-light">{param.description}</p>
                </div>
              ))}

              {/* Extra sandbox adjustments */}
              <div className={`space-y-1 pt-2 ${card.id !== "SALE-01" ? "opacity-60" : ""}`}>
                <label className="text-xs font-semibold text-zinc-200 font-sans">Extra Niche Directives (Optional)</label>
                <textarea
                  rows={2}
                  disabled={card.id !== "SALE-01"}
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Keep sentences extremely brief under 100 words, translate to German..."
                  className="w-full bg-white/5 text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 focus:border-brand-orange focus:bg-white/10 focus:outline-none transition-all placeholder:text-zinc-600 resize-none font-sans"
                />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-4 border-t border-white/10 space-y-2 mt-auto">
              {card.id === "SALE-01" ? (
                <button
                  onClick={handleCopyPrompt}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-[#111110] border-none rounded-xl py-3.5 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse hover:animate-none"
                >
                  {copied ? <Check className="w-4 h-4 text-[#111110]" /> : <Clipboard className="w-4 h-4 text-[#111110]" />}
                  {copied ? "Prompt Saved!" : "Copy System Prompt"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-750 text-brand-orange border border-brand-orange/30 rounded-xl py-3.5 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Unlock Blueprint in Premium Deck</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Code Composition */}
        <div className="lg:col-span-3">
          {/* Full height Prompt Composition */}
          <div className="bg-[#111110] border border-white/10 rounded-2xl p-6 shadow-2xl relative text-white flex flex-col h-full min-h-[460px]">
            <div className="absolute right-4 top-4 text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Live Prompt Draft
            </div>
            <div className="flex flex-col h-full overflow-hidden">
              <h4 className="text-xs font-mono font-semibold text-zinc-200 mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                Active Blueprint
              </h4>
              <div className="bg-black/40 border border-white/5 rounded-xl p-5 flex-1 overflow-y-auto relative min-h-[320px]">
                {card.id !== "SALE-01" && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex items-center justify-center p-4 text-center z-10">
                    <div className="bg-[#111110] border border-white/10 rounded-xl p-6 max-w-sm space-y-3 shadow-xl">
                      <Lock className="w-6 h-6 text-brand-orange mx-auto" />
                      <p className="text-xs font-mono text-zinc-200 font-semibold uppercase tracking-wider">Premium Access Required</p>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                        Complete blueprints and direct system prompt drafts are restricted to premium cardholders.
                      </p>
                      <button 
                        onClick={() => document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-brand-orange text-[#111110] hover:bg-brand-orange/90 active:scale-95 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer inline-block"
                      >
                        Reserve physical deck &rarr;
                      </button>
                    </div>
                  </div>
                )}
                <pre className={`text-xs font-mono leading-relaxed whitespace-pre-wrap text-zinc-300 font-light ${card.id !== "SALE-01" ? "select-none" : ""}`}>
                  {composedPrompt}
                  {customInstructions && `\n\n[Adjustment Directives]\n${customInstructions}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

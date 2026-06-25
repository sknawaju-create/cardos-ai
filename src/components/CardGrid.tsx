import { useState, useMemo } from "react";
import { CardCategory, CardCommand } from "../types";
import { CARDOS_DECK, OTHER_DECKS_PREVIEW } from "../data/cards";
import { Search, BookOpen, Layers, Lock, Columns, Layers3, Sparkles } from "lucide-react";
import Stack from "./Stack";

interface CardGridProps {
  onSelectCard: (card: CardCommand) => void;
  activeCardId: string;
  deck?: CardCommand[];
}

// Function to build the complete 50-card unboxed deck (5 categories * 10 cards)
export function buildFullDeck(): CardCommand[] {
  const categories = Object.values(CardCategory);
  const fullDeck: CardCommand[] = [];

  categories.forEach((cat) => {
    // Get existing cards in CARDOS_DECK for this category
    const existing = CARDOS_DECK.filter((c) => c.category === cat);
    
    // Determine prefix for this category
    let prefix = "SALE";
    if (cat === CardCategory.LEADS) prefix = "LEAD";
    else if (cat === CardCategory.MARKETING) prefix = "MKTG";
    else if (cat === CardCategory.PRODUCTIVITY) prefix = "PROD";
    else if (cat === CardCategory.AUTOMATION) prefix = "AUTO";

    // Create exactly 10 cards for this category
    for (let i = 1; i <= 10; i++) {
      const codeStr = i < 10 ? `0${i}` : `${i}`;
      const id = `${prefix}-${codeStr}`;

      // Check if we have a real implementation
      const foundReal = existing.find((c) => c.id === id);
      if (foundReal) {
        // Only keep SALE-01 open (as per user request: "And only keep one card open")
        // If it is another real card, we treat it as locked in our catalog list
        fullDeck.push(foundReal);
      } else {
        // Find title from OTHER_DECKS_PREVIEW or generate a placeholder
        const previewStr = OTHER_DECKS_PREVIEW.find((s) => s.startsWith(id + ":"));
        let title = "";
        if (previewStr) {
          title = previewStr.replace(`${id}: `, "").trim();
        } else {
          // Fallback if not found
          if (prefix === "SALE") title = `Enterprise Sales Protocol ${codeStr}`;
          else if (prefix === "LEAD") title = `Warm Intent Hook ${codeStr}`;
          else if (prefix === "MKTG") title = `Conversion Optimization ${codeStr}`;
          else if (prefix === "PROD") title = `Founder Leverage Matrix ${codeStr}`;
          else title = `Connected Action Pipeline ${codeStr}`;
        }

        fullDeck.push({
          id,
          code: codeStr,
          category: cat,
          title,
          description: "This physical command card is pre-packaged in the physical catalog tray.",
          promptTemplate: "",
          placeholders: []
        });
      }
    }
  });

  return fullDeck;
}

export default function CardGrid({ onSelectCard, activeCardId, deck = CARDOS_DECK }: CardGridProps) {
  const [viewMode, setViewMode] = useState<"STACK" | "COLUMNS">("STACK");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track the active top card index for each of the 5 categories in Stack view
  const [topIndices, setTopIndices] = useState<Record<string, number>>({
    [CardCategory.SALES]: 0,
    [CardCategory.LEADS]: 0,
    [CardCategory.MARKETING]: 0,
    [CardCategory.PRODUCTIVITY]: 0,
    [CardCategory.AUTOMATION]: 0,
  });

  // Build the complete 50-card array
  const fullDeck = useMemo(() => buildFullDeck(), []);

  // Filter full deck based on search query (if any is entered)
  const filteredDeck = useMemo(() => {
    if (!searchQuery) return fullDeck;
    return fullDeck.filter(
      (card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fullDeck, searchQuery]);

  // Group cards by category
  const categoriesList = Object.values(CardCategory);
  
  const cardsByCategory = useMemo(() => {
    const grouped: Record<string, CardCommand[]> = {};
    categoriesList.forEach((cat) => {
      grouped[cat] = filteredDeck.filter((c) => c.category === cat);
    });
    return grouped;
  }, [filteredDeck, categoriesList]);

  // Color mapping for columns
  const colorMap: Record<string, { light: string; border: string; bg: string; text: string }> = {
    [CardCategory.SALES]: { light: "bg-brand-orange", border: "border-brand-orange/30", bg: "bg-brand-orange/10", text: "text-brand-orange" },
    [CardCategory.LEADS]: { light: "bg-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-500" },
    [CardCategory.MARKETING]: { light: "bg-rose-500", border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-500" },
    [CardCategory.PRODUCTIVITY]: { light: "bg-teal-500", border: "border-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-500" },
    [CardCategory.AUTOMATION]: { light: "bg-indigo-500", border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "text-indigo-500" },
  };

  const handleStackTopChange = (category: string, topIndex: number) => {
    setTopIndices((prev) => ({
      ...prev,
      [category]: topIndex,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="bg-[#FDFCFB] rounded-2xl border border-[#E8E6DF] p-4 shadow-sm md:flex md:items-center md:justify-between md:gap-4 space-y-3 md:space-y-0">
        
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888780]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands (e.g. pain funnel, outreach, loom...)"
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E8E6DF] bg-[#F5F4F0]/40 focus:bg-white focus:border-[#1A1A18] focus:outline-none transition-all placeholder:text-[#888780] text-[#1A1A18]"
          />
        </div>

        {/* Counters & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5F5E5A] font-mono">
            <BookOpen className="w-3.5 h-3.5 text-[#888780]" />
            <span>5 Columns &bull; 10 Cards Each &bull; 1 Open, 49 Locked</span>
          </div>

          <div className="bg-[#F5F4F0] p-1 rounded-xl border border-[#E8E6DF] flex items-center gap-1">
            <button
              onClick={() => setViewMode("STACK")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "STACK"
                  ? "bg-white text-[#1A1A18] shadow-xs"
                  : "text-[#5F5E5A] hover:text-[#1A1A18]"
              }`}
            >
              <Layers3 className="w-3.5 h-3.5" />
              <span>3D Stacks</span>
            </button>
            <button
              onClick={() => setViewMode("COLUMNS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "COLUMNS"
                  ? "bg-white text-[#1A1A18] shadow-xs"
                  : "text-[#5F5E5A] hover:text-[#1A1A18]"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Column Lists</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main categories container: 5 Columns Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" id="cards-grid">
        {categoriesList.map((category, catIndex) => {
          const catCards = cardsByCategory[category] || [];
          const colors = colorMap[category] || { light: "bg-zinc-500", border: "border-zinc-300", bg: "bg-zinc-100", text: "text-zinc-600" };
          
          // Identify top card index for stack view
          const currentTopIndex = topIndices[category] ?? 0;
          const currentTopCard = catCards[currentTopIndex] || catCards[0];

          return (
            <div 
              key={category} 
              className={`bg-[#FAF9F6] border border-[#E8E6DF] rounded-2xl p-4 flex flex-col justify-between relative hover:shadow-md transition-all duration-300 group/col ${
                viewMode === "STACK" ? "h-[490px]" : "h-[570px]"
              }`}
            >
              {/* Category Column Header */}
              <div className="space-y-2 pb-3 border-b border-[#E8E6DF] mb-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#888780] uppercase tracking-widest">
                  <span>Category {["I", "II", "III", "IV", "V"][catIndex]}</span>
                  <span className={`w-2 h-2 rounded-full ${colors.light} animate-pulse`} />
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A18] tracking-tight truncate">
                  {category}
                </h3>
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${colors.bg} ${colors.text}`}>
                    {category === CardCategory.SALES ? "1/10 Unlocked" : "0/10 Unlocked"}
                  </span>
                </div>
              </div>

              {/* Category Column Content based on Selected ViewMode */}
              {viewMode === "STACK" ? (
                /* 3D DECK STACK VIEW */
                <div className="flex flex-col flex-1 justify-between gap-4">
                  {/* Interactive Stack Deck Container */}
                  <div className="h-[210px] w-full flex items-center justify-center relative py-4 px-2">
                    {catCards.length > 0 ? (
                      <Stack
                        randomRotation={true}
                        sensitivity={140}
                        sendToBackOnClick={true}
                        cards={catCards.map((card) => {
                          const isUnlocked = card.id === "SALE-01";
                          const isActiveSelected = activeCardId === card.id;

                          return (
                            <div
                              key={card.id}
                              className={`w-full h-[160px] rounded-xl border p-4 text-left flex flex-col justify-between shadow-sm relative overflow-hidden select-none select-none ${
                                isUnlocked 
                                  ? "bg-[#111110] text-[#FDFCFB] border-zinc-700" 
                                  : "bg-white text-zinc-800 border-[#E8E6DF] hover:border-zinc-400"
                              }`}
                            >
                              {/* Visual card chip */}
                              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                {isUnlocked ? (
                                  <span className="text-[7px] font-mono tracking-widest text-[#F4A340] font-bold uppercase bg-brand-orange/20 px-1 py-0.5 rounded">Active</span>
                                ) : (
                                  <div className="flex items-center gap-1 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                    <Lock className="w-2.5 h-2.5 text-zinc-400" />
                                    <span>Premium</span>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1.5">
                                <span className={`text-[8px] font-mono ${isUnlocked ? "text-brand-orange" : "text-zinc-400"} font-bold tracking-wider`}>
                                  {card.id}
                                </span>
                                <h4 className={`text-[11px] leading-snug font-bold line-clamp-2 ${isUnlocked ? "text-white" : "text-zinc-900"}`}>
                                  {card.title}
                                </h4>
                              </div>

                              <div className="flex items-center justify-between border-t border-zinc-500/20 pt-2 mt-auto">
                                <span className="text-[8px] font-mono text-zinc-400">
                                  {isUnlocked ? "Unlocked" : "Locked"}
                                </span>
                                <span className={`text-[8px] font-mono ${isUnlocked ? "text-brand-orange font-bold animate-pulse" : "text-zinc-400"}`}>
                                  {isUnlocked ? "Open sample &rarr;" : "Closed"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        onTopCardChange={(index) => handleStackTopChange(category, index)}
                      />
                    ) : (
                      <div className="text-[10px] text-zinc-400 font-mono">No matching cards</div>
                    )}
                  </div>

                  {/* Top Card Readout and Selector */}
                  {currentTopCard && (
                    <div className="bg-[#F5F4F0] rounded-xl p-3 border border-[#E8E6DF] space-y-2 mt-auto text-center flex flex-col justify-between min-h-[110px]">
                      <div className="text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono font-bold text-zinc-500">{currentTopCard.id}</span>
                          {currentTopCard.id === "SALE-01" ? (
                            <span className="text-[7px] bg-emerald-500/10 text-emerald-600 px-1 py-0.5 rounded uppercase font-mono font-bold">Free Sample</span>
                          ) : (
                            <span className="text-[7px] bg-zinc-400/10 text-zinc-500 px-1 py-0.5 rounded uppercase font-mono font-bold">Premium</span>
                          )}
                        </div>
                        <h5 className="text-[10px] font-bold text-[#1A1A18] line-clamp-2 mt-1 leading-snug">
                          {currentTopCard.title}
                        </h5>
                      </div>

                      {currentTopCard.id === "SALE-01" ? (
                        <button
                          onClick={() => onSelectCard(currentTopCard)}
                          className="w-full bg-[#111110] text-[#FDFCFB] hover:bg-neutral-800 text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Load Terminal &rarr;
                        </button>
                      ) : (
                        <button
                          onClick={() => document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" })}
                          className="w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-600 text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Lock className="w-2.5 h-2.5" />
                          <span>Unlock Blueprint</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* COLUMNS VERTICAL LIST VIEW */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 overflow-y-auto h-[380px] pr-1 scrollbar-thin scrollbar-thumb-zinc-300">
                    {catCards.map((card) => {
                      const isUnlocked = card.id === "SALE-01";
                      const isActive = activeCardId === card.id;

                      return (
                        <div
                          key={card.id}
                          onClick={() => {
                            if (isUnlocked) {
                              onSelectCard(card);
                            } else {
                              document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-1 relative group/card ${
                            isActive
                              ? "bg-[#111110] border-[#111110] text-white shadow-xs"
                              : isUnlocked
                                ? "bg-white border-[#E8E6DF] hover:border-zinc-400 text-zinc-800"
                                : "bg-white/60 border-dashed border-[#E8E6DF] hover:bg-white text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[8px] font-mono font-semibold ${isActive ? "text-brand-orange" : "text-zinc-400"}`}>
                              {card.id}
                            </span>
                            {!isUnlocked ? (
                              <div className="flex items-center gap-1 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                <Lock className="w-2 h-2 text-zinc-400" />
                                <span>Premium</span>
                              </div>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                          </div>
                          
                          <h4 className="text-[10px] font-bold leading-tight line-clamp-2">
                            {card.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-[#E8E6DF]/50 mt-4">
                    {category === CardCategory.SALES ? (
                      <button
                        onClick={() => {
                          const saleCard = catCards.find(c => c.id === "SALE-01");
                          if (saleCard) onSelectCard(saleCard);
                        }}
                        className="w-full text-center text-[10px] font-mono uppercase tracking-wider text-brand-orange hover:underline font-bold cursor-pointer"
                      >
                        Run Sales Demo &rarr;
                      </button>
                    ) : (
                      <button
                        onClick={() => document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" })}
                        className="w-full text-center text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Unlock Entire Column</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

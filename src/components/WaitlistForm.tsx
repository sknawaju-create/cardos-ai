import { useState, useEffect, FormEvent } from "react";
import { Mail, CheckCircle2, Ticket, Users, AlertCircle, ArrowRight, Share2, Clipboard } from "lucide-react";

interface WaitlistFormProps {
  onJoinSuccess?: () => void;
  triggerRefreshStats?: number;
}

export default function WaitlistForm({ onJoinSuccess, triggerRefreshStats }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ count: 147, realUsersJoined: 0 });
  const [copied, setCopied] = useState(false);
  
  // Google Form synchronization features
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [googleEmbedEnabled, setGoogleEmbedEnabled] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/waitlist/stats");
      const data = await res.json();
      setStats({
        count: data.count || 147,
        realUsersJoined: data.realUsersJoined || 0
      });
    } catch {
      // Fallback
    }
  };

  const checkGoogleFormStatus = async () => {
    try {
      const res = await fetch("/api/google-forms/status");
      const data = await res.json();
      if (data.connected && data.embedEnabled && data.formUrl) {
        setGoogleFormUrl(data.formUrl);
        setGoogleEmbedEnabled(true);
      } else {
        setGoogleEmbedEnabled(false);
      }
    } catch (e) {
      setGoogleEmbedEnabled(false);
    }
  };

  useEffect(() => {
    fetchStats();
    checkGoogleFormStatus();
  }, [triggerRefreshStats]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        fetchStats();
        if (onJoinSuccess) onJoinSuccess();
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const copyPromo = () => {
    navigator.clipboard.writeText("EA200-CARDOS-VIP");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hard deadline June 30th 2026. Calculate days left
  const getDaysRemaining = () => {
    const targetDate = new Date("2026-06-30T00:00:00");
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();
  // Percentage sold-out calculation (capped at 100 decks, say we have 78 + real signups)
  const decksPreordered = Math.min(78 + stats.realUsersJoined, 100);
  const percentPreordered = Math.round((decksPreordered / 100) * 100);

  return (
    <div className="bg-[#111110] text-[#FDFCFB] rounded-3xl p-8 shadow-xl relative overflow-hidden border border-[#E8E6DF]/15" id="waitlist-container">
      {/* Subtle editorial glow */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#E8E6DF]/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888780]">Registrations: Active</span>
        </div>

        {googleEmbedEnabled && googleFormUrl ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-normal leading-tight text-white mb-2">
              Join the <span className="italic font-serif">Google Waitlist Form</span>
            </h3>
            <p className="text-sm text-[#888780] leading-relaxed mb-4 font-light">
              We have synced our registration workflow to our official Google Workspace form to manage submissions securely.
            </p>
            <div className="w-full h-[400px] bg-white rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
              <iframe
                src={googleFormUrl.includes("/viewform") ? googleFormUrl.replace("/viewform", "/viewform?embedded=true") : `${googleFormUrl}?embedded=true`}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-2xl"
              >
                Loading synchronized Google Form...
              </iframe>
            </div>
            <div className="text-[10px] font-mono text-[#5F5E5A] text-center mt-2 flex justify-center items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Submissions logged directly to administrator Google Form</span>
            </div>
          </div>
        ) : !success ? (
          <div>
            <h3 className="text-2xl font-normal leading-tight text-white mb-3">
              Join the <span className="italic font-serif">priority waitlist</span>
            </h3>
            <p className="text-sm text-[#888780] leading-relaxed mb-6 font-light">
              Be the first to see the complete deck, receive launch pricing, and access exclusive bonuses.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888780]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={loading}
                    className="w-full bg-[#1C1C1A] text-[#FDFCFB] text-sm rounded-xl pl-10 pr-4 py-3.5 border border-[#E8E6DF]/15 focus:border-white focus:outline-none transition-all placeholder:text-[#5F5E5A]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black font-medium hover:bg-[#E8E6DF] active:scale-[0.98] transition-all text-sm rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  {loading ? "Joining..." : "Get access"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-xs mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </form>

            <p className="text-xs text-[#5F5E5A] mt-4 flex items-center gap-1.5 font-light">
              <Ticket className="w-3.5 h-3.5 text-[#888780]" />
              Early reservation gets ₹200 off + priority dispatch code.
            </p>
          </div>
        ) : (
          <div className="text-center py-4 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 ">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-normal leading-tight text-white mb-2">
              You are <span className="italic font-serif">registered</span>
            </h3>
            <p className="text-sm text-[#888780] max-w-sm mx-auto mb-6 font-light">
              We've logged your priority tier and code. Here is your reservation receipt:
            </p>

            <div className="bg-[#1C1C1A] border border-[#E8E6DF]/10 rounded-xl p-4 max-w-xs mx-auto mb-6 relative overflow-hidden flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-semibold">Priority Code</span>
                <p className="font-mono text-sm tracking-wider font-semibold text-white">EA200-CARDOS-VIP</p>
              </div>
              <button
                onClick={copyPromo}
                className="p-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-mono transition-all flex items-center gap-1 text-white cursor-pointer"
                title="Copy launch code"
              >
                {copied ? (
                  <span className="text-emerald-400">Copied!</span>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp community CTA */}
            <a
              href="https://chat.whatsapp.com/JM7nVcP7sB54J8yv3qQNCh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full max-w-xs mx-auto mb-5 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] transition-all text-white font-semibold text-sm rounded-xl px-6 py-3.5 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join the CARDOS WhatsApp Community
            </a>

            <div className="text-xs text-[#5F5E5A] border-t border-[#E8E6DF]/15 pt-4 flex justify-between items-center max-w-md mx-auto">
              <span>Benefits:</span>
              <span className="text-emerald-400 font-semibold">• ₹200 discount applied</span>
              <span className="text-emerald-400 font-semibold">• Free shipping enabled</span>
            </div>
          </div>
        )}

        {/* ✓ Benefit list */}
        <div className="mt-8 pt-6 border-t border-[#E8E6DF]/15 space-y-2.5 bg-transparent">
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#C8C6BF] font-light">
            <span className="text-emerald-400 font-semibold font-sans">✓</span>
            <span>₹200 Launch Discount</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#C8C6BF] font-light">
            <span className="text-emerald-400 font-semibold font-sans">✓</span>
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#C8C6BF] font-light">
            <span className="text-emerald-400 font-semibold font-sans">✓</span>
            <span>First Access to Batch 1</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#C8C6BF] font-light">
            <span className="text-emerald-400 font-semibold font-sans">✓</span>
            <span>Bonus Digital Prompt Library</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#C8C6BF] font-light">
            <span className="text-emerald-400 font-semibold font-sans">✓</span>
            <span>Product Updates & New Deck Releases</span>
          </div>
        </div>
      </div>
    </div>
  );
}

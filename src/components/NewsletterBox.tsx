import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

interface NewsletterBoxProps {
  variant?: 'prominent' | 'compact' | 'post-footer';
}

export const NewsletterBox: React.FC<NewsletterBoxProps> = ({ variant = 'prominent' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div className="bg-[#FFDCE3] border-2 border-[#24201D] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-[5px_5px_0px_0px_#24201D] animate-in fade-in zoom-in-95 duration-300">
        <div className="w-12 h-12 rounded-full bg-[#27F2E4] border-2 border-[#24201D] mx-auto flex items-center justify-center text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
          <CheckCircle2 className="w-6 h-6 text-[#24201D]" />
        </div>
        <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
          You are on the list!
        </h3>
        <p className="font-instrument text-lg text-[#5A524B] max-w-md mx-auto">
          Thank you for joining. The Sunday Dispatch will arrive in your inbox each week at 08:00 AM with fresh essays and quiet inspiration.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setEmail('');
          }}
          className="text-xs font-fredoka font-bold text-[#24201D] underline hover:text-[#91735E] cursor-pointer"
        >
          Subscribe another address
        </button>
      </div>
    );
  }

  if (variant === 'post-footer') {
    return (
      <div className="bg-[#FFDCE3] border-2 border-[#24201D] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[5px_5px_0px_0px_#24201D]">
        <div className="flex items-center gap-2 text-xs font-fredoka uppercase tracking-wider text-[#24201D]">
          <span className="px-2 py-0.5 bg-[#27F2E4] border border-[#24201D] rounded font-bold text-[10px]">
            DISPATCH
          </span>
          <span className="font-bold">Never miss an essay</span>
        </div>
        <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#24201D]">
          Enjoyed this reading? Subscribe to the weekly letter.
        </h3>
        <p className="font-instrument text-base text-[#5A524B]">
          Quiet reflections on slow craft, typography, mindful tech, and living with intentional cadence. Delivered every Sunday morning.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="email"
            required
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-white border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#27F2E4] hover:bg-[#1fe0d2] text-[#24201D] font-fredoka font-bold text-sm rounded-xl border-2 border-[#24201D] transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_#24201D] hover:shadow-[3px_3px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <div className="flex items-center gap-1.5 text-xs text-[#6B625B] font-body-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#24201D]" />
          <span>No algorithms, zero marketing spam. Unsubscribe in one click.</span>
        </div>
      </div>
    );
  }

  // Prominent homepage hero/banner style with blush background from reference design
  return (
    <div className="relative bg-[#FFDCE3] border-2 border-[#24201D] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[6px_6px_0px_0px_#24201D]">
      <div className="relative max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#27F2E4] border border-[#24201D]" />
          <span>The Sunday Dispatch</span>
        </div>

        <h3 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24201D] tracking-tight leading-tight">
          Thoughtful letters for curious, mindful minds.
        </h3>

        <p className="font-instrument text-xl text-[#4A403A] leading-relaxed max-w-xl mx-auto">
          Every Sunday morning, join 4,200+ writers, designers, and quiet thinkers exploring intentional living, tangible craft, and calm technology.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            required
            placeholder="Type your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3.5 bg-white border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 bg-[#27F2E4] hover:bg-[#1be0d2] text-[#24201D] font-fredoka font-bold text-sm rounded-xl border-2 border-[#24201D] transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_#24201D] hover:shadow-[4px_4px_0px_0px_#24201D] flex items-center justify-center gap-2 shrink-0 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>{loading ? 'Subscribing...' : 'Get the Dispatch'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 text-xs font-fredoka font-semibold text-[#6B625B]">
          <span>Free forever</span>
          <span>·</span>
          <span>Read in 4 minutes</span>
          <span>·</span>
          <span>Zero spam</span>
        </div>
      </div>
    </div>
  );
};

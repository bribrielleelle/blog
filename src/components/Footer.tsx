import React, { useState } from 'react';
import { ArrowUpRight, Heart, Send, Check } from 'lucide-react';
import { categories } from '../data/posts';

interface FooterProps {
  onNavigate: (tab: string, categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleQuickSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#FAF7F2] border-t-2 border-[#24201D] mt-24 text-[#24201D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-fredoka text-2xl font-bold tracking-tight text-[#24201D]">
                Brielle Davis
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#27F2E4] border border-[#24201D] inline-block"></span>
            </div>
            <p className="font-instrument text-lg text-[#5A524B] leading-relaxed max-w-sm">
              An independent journal exploring quiet craft, architectural light, intentional habits, and timeless typography. Writing slowly from the Pacific Northwest.
            </p>
            <div className="pt-2 text-xs font-fredoka font-bold uppercase tracking-wider text-[#91735E]">
              Published Bi-Weekly · Edition 2026
            </div>
          </div>

          {/* Column 2: Navigation & Topics */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-fredoka text-sm font-bold uppercase tracking-wider text-[#24201D]">
              Explore Topics
            </h4>
            <ul className="space-y-2.5 font-fredoka text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('categories', cat.slug)}
                    className="text-[#6B625B] hover:text-[#24201D] font-medium transition-colors cursor-pointer flex items-center justify-between w-full text-left group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {cat.name}
                    </span>
                    <span className="text-xs text-[#24201D] font-bold font-mono">
                      ({cat.count})
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('archive')}
                  className="text-[#24201D] hover:text-[#91735E] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  Full Archive Index <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Dispatch & Connect */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-fredoka text-sm font-bold uppercase tracking-wider text-[#24201D]">
              The Sunday Dispatch
            </h4>
            <p className="font-instrument text-base text-[#5A524B]">
              A quiet letter delivered directly to your inbox every Sunday morning. No spam, ever.
            </p>

            <form onSubmit={handleQuickSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-white border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="px-4 py-2.5 bg-[#27F2E4] hover:bg-[#1ce3d5] text-[#24201D] font-fredoka font-bold text-xs rounded-xl border-2 border-[#24201D] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Join</span>
                    </>
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#2E7D32] font-fredoka font-bold animate-in fade-in">
                  Welcome to the circle! First dispatch arrives Sunday.
                </p>
              )}
            </form>

            <div className="pt-2 flex items-center gap-4 text-xs font-fredoka font-semibold text-[#6B625B]">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#24201D] transition-colors"
              >
                X / Twitter
              </a>
              <span>·</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#24201D] transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#24201D] transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#24201D] transition-colors cursor-pointer"
              >
                Colophon
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="mt-14 pt-8 border-t-2 border-[#24201D] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B625B] font-body-sans gap-4">
          <p>© {new Date().getFullYear()} Brielle Davis. Handcrafted with care and deliberate slowness.</p>
          <div className="flex items-center gap-2">
            <span>Typefaces: Fredoka & Instrument Serif</span>
            <span>·</span>
            <span className="flex items-center gap-1 font-fredoka">
              Made with <Heart className="w-3 h-3 text-[#24201D] fill-current" /> for thoughtful readers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

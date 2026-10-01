import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, ArrowUpRight, Mail } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNewsletter: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenNewsletter,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'archive', label: 'Archive' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b-2 border-[#24201D] ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs'
            : 'bg-[#FAF7F2]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-1.5 text-left cursor-pointer focus:outline-hidden"
          >
            <span className="font-fredoka text-2xl font-bold tracking-tight text-[#24201D] group-hover:text-[#91735E] transition-colors">
              Brielle Davis
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#27F2E4] border border-[#24201D] inline-block shadow-xs"></span>
          </button>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-fredoka text-sm font-semibold text-[#6B625B]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 hover:text-[#24201D] ${
                    isActive ? 'text-[#24201D] font-bold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#27F2E4] rounded-full animate-in fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Bookmarks, Subscribe) */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#24201D] bg-white border-2 border-[#24201D] hover:bg-[#F2ECE1] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              aria-label="Search articles"
              title="Search articles (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={() => handleNavClick('bookmarks')}
              className={`p-2 rounded-xl transition-colors cursor-pointer relative border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                activeTab === 'bookmarks'
                  ? 'bg-[#27F2E4] text-[#24201D]'
                  : 'bg-white text-[#24201D] hover:bg-[#F2ECE1]'
              }`}
              aria-label="View saved articles"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#27F2E4] border border-[#24201D] text-[#24201D] text-[10px] font-fredoka font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Newsletter CTA Button */}
            <button
              onClick={onOpenNewsletter}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#27F2E4] hover:bg-[#1ce3d5] text-[#24201D] font-fredoka text-xs font-bold rounded-xl border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D] hover:shadow-[3px_3px_0px_0px_#24201D] transition-all duration-200 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Newsletter</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#24201D] bg-white border-2 border-[#24201D] hover:bg-[#F2ECE1] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#24201D]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E1D5] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 font-fredoka text-base">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    activeTab === link.id
                      ? 'bg-[#F2ECE1] text-[#24201D] font-semibold'
                      : 'text-[#6B625B] hover:text-[#24201D] hover:bg-[#F7F2EB]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.id && (
                    <span className="w-2 h-2 rounded-full bg-[#27F2E4]" />
                  )}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('bookmarks')}
                className={`text-left py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  activeTab === 'bookmarks'
                    ? 'bg-[#F2ECE1] text-[#24201D] font-semibold'
                    : 'text-[#6B625B] hover:text-[#24201D] hover:bg-[#F7F2EB]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Saved Articles
                </span>
                {savedCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#27F2E4] text-[#24201D] text-xs font-bold rounded-full">
                    {savedCount}
                  </span>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNewsletter();
                }}
                className="w-full py-3 bg-[#27F2E4] text-[#24201D] font-fredoka font-semibold rounded-lg flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Mail className="w-4 h-4" />
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

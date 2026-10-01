import React, { useEffect, useState } from 'react';
import { PostSection } from '../types';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TableOfContentsProps {
  sections: PostSection[];
  isMobileDrawer?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  isMobileDrawer = false,
}) => {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  // Collect all toc items (sections and subsections)
  const tocItems: { id: string; title: string; level: number }[] = [];
  sections.forEach((sec) => {
    tocItems.push({ id: sec.id, title: sec.title, level: 2 });
    if (sec.subsections) {
      sec.subsections.forEach((sub) => {
        tocItems.push({ id: sub.id, title: sub.title, level: 3 });
      });
    }
  });

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      if (isMobileDrawer) {
        setMobileExpanded(false);
      }
    }
  };

  if (tocItems.length === 0) return null;

  // Mobile Dropdown / Accordion View
  if (isMobileDrawer) {
    return (
      <div className="lg:hidden my-6 border-2 border-[#24201D] bg-white rounded-2xl p-4 shadow-[3px_3px_0px_0px_#24201D]">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between font-fredoka text-sm font-bold text-[#24201D] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-[#24201D]" />
            <span>Table of Contents</span>
          </div>
          {mobileExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#24201D]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#24201D]" />
          )}
        </button>

        {mobileExpanded && (
          <nav className="mt-3 pt-3 border-t-2 border-[#24201D] space-y-2">
            {tocItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left font-fredoka text-xs transition-colors cursor-pointer py-1 ${
                    item.level === 3 ? 'pl-4 text-[#8A8177]' : 'text-[#5A524B]'
                  } ${
                    isActive
                      ? 'text-[#24201D] font-bold'
                      : 'hover:text-[#24201D]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#27F2E4] border border-[#24201D] shrink-0" />
                    )}
                    <span>{item.title}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    );
  }

  // Desktop Sticky TOC Sidebar
  return (
    <aside className="sticky top-28 w-64 hidden lg:block space-y-4 bg-white border-2 border-[#24201D] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#24201D]">
      <div className="flex items-center gap-2 pb-2 border-b-2 border-[#24201D]">
        <List className="w-4 h-4 text-[#24201D]" />
        <h4 className="font-fredoka text-xs font-bold uppercase tracking-wider text-[#24201D]">
          Contents
        </h4>
      </div>

      <nav className="space-y-1 relative before:absolute before:top-1 before:bottom-1 before:left-1 before:w-[2px] before:bg-[#EAE2D6]">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group text-left block w-full text-xs font-fredoka transition-all cursor-pointer py-1.5 pl-4 relative ${
                item.level === 3 ? 'pl-7 text-[#8A8177]' : 'text-[#6B625B]'
              } ${
                isActive
                  ? 'text-[#24201D] font-bold translate-x-0.5'
                  : 'hover:text-[#24201D]'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#27F2E4] border-2 border-[#24201D]" />
              )}
              <span className="line-clamp-2 leading-relaxed">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

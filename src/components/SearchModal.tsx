import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../types';
import { Search, X, ArrowRight, Calendar, Clock, Bookmark } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const inTitle = post.title.toLowerCase().includes(q);
    const inExcerpt = post.excerpt.toLowerCase().includes(q);
    const inTags = post.tags.some((tag) => tag.toLowerCase().includes(q));
    const inSections = post.sections.some(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.content.some((para) => para.toLowerCase().includes(q))
    );

    return inTitle || inExcerpt || inTags || inSections;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-[#24201D] rounded-3xl shadow-[8px_8px_0px_0px_#24201D] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative border-b-2 border-[#24201D] p-4 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#24201D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search essays, craft notes, ideas, or topics..."
            className="flex-1 bg-transparent text-[#24201D] text-base placeholder-[#A0988E] focus:outline-hidden font-fredoka font-semibold"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#8A8177] hover:text-[#24201D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono font-bold bg-[#FAF7F2] text-[#24201D] border border-[#24201D] rounded shadow-2xs hover:bg-[#27F2E4] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category filters inside modal */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-b-2 border-[#24201D] flex items-center gap-2 overflow-x-auto text-xs font-fredoka">
          <span className="text-[#24201D] font-bold shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl capitalize transition-colors cursor-pointer shrink-0 border border-[#24201D] ${
                selectedCategory === cat
                  ? 'bg-[#27F2E4] text-[#24201D] font-bold shadow-[1.5px_1.5px_0px_0px_#24201D]'
                  : 'bg-white text-[#6B625B] hover:text-[#24201D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#FAF7F2]">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-fredoka text-base font-bold text-[#24201D]">
                No essays matched &ldquo;{query}&rdquo;
              </p>
              <p className="font-instrument text-sm text-[#8A8177]">
                Try searching for &quot;light&quot;, &quot;analog&quot;, &quot;tools&quot;, or &quot;workspace&quot;.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="group p-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] border-2 border-[#24201D] hover:shadow-[3px_3px_0px_0px_#24201D] transition-all cursor-pointer flex items-start gap-4"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-[#F2ECE1] border border-[#24201D] shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-fredoka text-[#6B625B]">
                    <span className="font-bold text-[#91735E]">{post.category}</span>
                    <span>·</span>
                    <span>{post.formattedDate}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-fredoka text-base font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="font-instrument text-sm text-[#6B625B] line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#24201D] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-white border-t-2 border-[#24201D] text-xs font-fredoka font-semibold text-[#8A8177] flex items-center justify-between">
          <span>Found {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { Bookmark, ArrowRight, BookOpen } from 'lucide-react';

interface BookmarksPageProps {
  savedPosts: Post[];
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryName: string) => void;
  onToggleSave: (post: Post) => void;
  onNavigateHome: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  savedPosts,
  onSelectPost,
  onSelectCategory,
  onToggleSave,
  onNavigateHome,
}) => {
  return (
    <div className="space-y-10">
      {/* Header Card */}
      <div className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#24201D] space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
          <Bookmark className="w-3.5 h-3.5 text-[#24201D]" />
          <span>Personal Reading Shelf</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24201D]">
            Saved Essays ({savedPosts.length})
          </h1>
          <span className="font-fredoka text-xs font-bold text-[#91735E]">
            Stored privately in your browser session
          </span>
        </div>
        <p className="font-instrument text-lg sm:text-xl text-[#5A524B] max-w-2xl leading-relaxed">
          Your bookmarked articles for deep, uninterrupted weekend reading. Pick up right where you left off.
        </p>
      </div>

      {savedPosts.length === 0 ? (
        <div className="py-20 text-center bg-white border-2 border-dashed border-[#24201D] rounded-3xl p-8 max-w-lg mx-auto space-y-4 shadow-[4px_4px_0px_0px_#24201D]">
          <div className="w-14 h-14 rounded-full bg-[#27F2E4] border-2 border-[#24201D] text-[#24201D] mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#24201D]">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
            Your reading shelf is empty
          </h3>
          <p className="font-instrument text-base text-[#6B625B]">
            Whenever you encounter an essay you wish to save for later, click the bookmark icon on any card or reading page.
          </p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#27F2E4] hover:bg-[#1fe0d2] text-[#24201D] font-fredoka font-bold text-xs rounded-xl border-2 border-[#24201D] transition-all cursor-pointer shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>Explore Essays</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              variant="grid"
              onSelectPost={onSelectPost}
              onSelectCategory={onSelectCategory}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};

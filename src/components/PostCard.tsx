import React from 'react';
import { Post } from '../types';
import { Bookmark, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onSelectPost: (post: Post) => void;
  onSelectCategory?: (category: string) => void;
  isSaved?: boolean;
  onToggleSave?: (post: Post) => void;
  variant?: 'grid' | 'lead' | 'compact';
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onSelectPost,
  onSelectCategory,
  isSaved = false,
  onToggleSave,
  variant = 'grid',
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(post);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectCategory) {
      onSelectCategory(post.category);
    }
  };

  if (variant === 'lead') {
    return (
      <article
        onClick={() => onSelectPost(post)}
        className="group relative bg-white border-2 border-[#24201D] rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[6px_6px_0px_0px_#24201D] hover:shadow-[9px_9px_0px_0px_#24201D] cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        <div className="lg:col-span-7 relative overflow-hidden bg-[#F2ECE1] aspect-16/10 lg:aspect-auto min-h-[340px] border-b-2 lg:border-b-0 lg:border-r-2 border-[#24201D]">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] text-[#24201D] font-fredoka font-bold text-xs uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_0px_#24201D]">
              {post.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            {/* Metadata line */}
            <div className="flex items-center justify-between text-xs font-fredoka text-[#6B625B]">
              <div className="flex items-center gap-2">
                <span>{post.formattedDate}</span>
                <span className="text-[#B5ADA4]">·</span>
                <span className="font-mono font-semibold">{post.readTime}</span>
              </div>

              {onToggleSave && (
                <button
                  onClick={handleSaveClick}
                  aria-label={isSaved ? 'Remove from saved' : 'Save article'}
                  className={`p-1.5 rounded-lg border-2 border-[#24201D] transition-all ${
                    isSaved ? 'bg-[#27F2E4] text-[#24201D]' : 'bg-white text-[#24201D] hover:bg-[#F2ECE1]'
                  } shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#24201D]' : ''}`} />
                </button>
              )}
            </div>

            {/* Headline */}
            <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors leading-tight">
              {post.title}
            </h3>

            {/* Excerpt in Instrument Serif */}
            <p className="font-instrument text-lg text-[#5A524B] leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t-2 border-[#24201D]">
            <div className="flex items-center gap-2.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border-2 border-[#24201D]"
              />
              <span className="font-fredoka text-xs font-bold text-[#24201D]">
                {post.author.name}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#27F2E4] border border-[#24201D] rounded-md font-fredoka text-xs font-bold text-[#24201D] shadow-[2px_2px_0px_0px_#24201D] group-hover:translate-x-0.5 transition-all">
              <span>Read Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelectPost(post)}
        className="group py-4 border-b-2 border-[#24201D] hover:bg-white transition-colors cursor-pointer px-3 rounded-xl"
      >
        <div className="flex items-baseline justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-fredoka text-[#6B625B]">
              <span className="text-[#91735E] font-bold">{post.category}</span>
              <span className="text-[#B5ADA4]">·</span>
              <span>{post.formattedDate}</span>
            </div>
            <h4 className="font-fredoka text-base font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors">
              {post.title}
            </h4>
          </div>
          <span className="font-fredoka text-xs text-[#8A8177] shrink-0 font-mono">
            {post.readTime}
          </span>
        </div>
      </article>
    );
  }

  // Standard Grid Card (Matches the clean Pinterest aesthetic with cream background, solid borders, and tactile drop shadow)
  return (
    <article
      onClick={() => onSelectPost(post)}
      className="group relative bg-white border-2 border-[#24201D] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0px_0px_#24201D] hover:shadow-[7px_7px_0px_0px_#24201D] cursor-pointer flex flex-col h-full"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#F2ECE1] border-b-2 border-[#24201D]">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
        />
        {/* Category tag sticker */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-fredoka font-bold text-[10px] uppercase tracking-wider rounded-md shadow-[1.5px_1.5px_0px_0px_#24201D]">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-2.5">
          {/* Unboxed Metadata Line */}
          <div className="flex items-center justify-between text-xs font-fredoka text-[#6B625B]">
            <div className="flex items-center gap-1.5">
              <span>{post.formattedDate}</span>
              <span className="text-[#B5ADA4]">·</span>
              <span className="font-mono text-[#8A8177]">{post.readTime}</span>
            </div>

            {onToggleSave && (
              <button
                onClick={handleSaveClick}
                aria-label={isSaved ? 'Remove from saved' : 'Save article'}
                className={`p-1 rounded-md border border-[#24201D] transition-colors cursor-pointer ${
                  isSaved ? 'bg-[#27F2E4] text-[#24201D]' : 'bg-[#FAF7F2] text-[#24201D] hover:bg-[#F2ECE1]'
                } shadow-[1.5px_1.5px_0px_0px_#24201D]`}
                title={isSaved ? 'Saved' : 'Save for later'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#24201D]' : ''}`} />
              </button>
            )}
          </div>

          {/* Heading */}
          <h3 className="font-fredoka text-xl font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt in Instrument Serif */}
          <p className="font-instrument text-base text-[#5A524B] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info: Read time & read link */}
        <div className="pt-3 border-t-2 border-[#EFE9DF] flex items-center justify-between text-xs font-fredoka text-[#6B625B]">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-full object-cover border border-[#24201D]"
            />
            <span className="font-semibold text-[#24201D]">{post.author.name}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-[#24201D] group-hover:text-[#91735E] font-bold transition-colors">
            Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};

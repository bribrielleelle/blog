import React, { useState } from 'react';
import { Post, Category } from '../types';
import { PostCard } from '../components/PostCard';
import { Compass, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface CategoriesPageProps {
  categories: Category[];
  posts: Post[];
  selectedCategorySlug?: string;
  onSelectPost: (post: Post) => void;
  savedPostIds: string[];
  onToggleSave: (post: Post) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  posts,
  selectedCategorySlug,
  onSelectPost,
  savedPostIds,
  onToggleSave,
}) => {
  const [activeSlug, setActiveSlug] = useState<string>(
    selectedCategorySlug || categories[0]?.slug || 'all'
  );

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  const filteredPosts = posts.filter((post) => {
    if (activeSlug === 'all') return true;
    return (
      post.category.toLowerCase() === activeCategory?.name.toLowerCase() ||
      activeCategory?.slug === post.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
    );
  });

  return (
    <div className="space-y-10">
      {/* Header Card */}
      <div className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#24201D] space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
          <Layers className="w-3.5 h-3.5 text-[#24201D]" />
          <span>Curated Disciplines</span>
        </div>
        <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24201D]">
          Thematic Collections
        </h1>
        <p className="font-instrument text-lg sm:text-xl text-[#5A524B] max-w-2xl leading-relaxed">
          Essays categorized by inquiry: from material spaces and stationery craft to slow living rituals and quiet computing.
        </p>
      </div>

      {/* Category Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = activeSlug === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveSlug(cat.slug)}
              className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 border-[#24201D] flex flex-col justify-between h-full space-y-3 ${
                isSelected
                  ? 'bg-[#27F2E4] shadow-[4px_4px_0px_0px_#24201D] -translate-y-1'
                  : 'bg-white hover:bg-[#FAF7F2] shadow-[3px_3px_0px_0px_#24201D]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#24201D]">
                    {cat.count} {cat.count === 1 ? 'Essay' : 'Essays'}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#24201D]" />
                  )}
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#24201D]">
                  {cat.name}
                </h3>
                <p className="font-instrument text-sm text-[#4A403A] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 text-xs font-fredoka font-bold text-[#24201D] flex items-center gap-1">
                <span>View collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Header & Posts Grid */}
      <div className="pt-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-2">
          <div>
            <h2 className="font-fredoka text-2xl font-bold text-[#24201D]">
              {activeCategory?.name || 'All Essays'}
            </h2>
            <p className="font-instrument text-base text-[#6B625B] mt-1">
              {activeCategory?.description}
            </p>
          </div>
          <span className="font-fredoka text-xs font-bold text-[#91735E]">
            {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              variant="grid"
              onSelectPost={onSelectPost}
              isSaved={savedPostIds.includes(post.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center text-[#6B625B] font-fredoka font-bold bg-white border-2 border-dashed border-[#24201D] rounded-3xl p-8 shadow-[4px_4px_0px_0px_#24201D]">
            No articles in this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

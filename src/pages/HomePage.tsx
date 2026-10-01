import React, { useState } from 'react';
import { Post, Category } from '../types';
import { PostCard } from '../components/PostCard';
import { NewsletterBox } from '../components/NewsletterBox';
import { Search, Sparkles, ArrowRight, BookOpen, Compass } from 'lucide-react';

interface HomePageProps {
  posts: Post[];
  categories: Category[];
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryName: string) => void;
  onOpenSearch: () => void;
  savedPostIds: string[];
  onToggleSave: (post: Post) => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  posts,
  categories,
  onSelectPost,
  onSelectCategory,
  onOpenSearch,
  savedPostIds,
  onToggleSave,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Featured lead post
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  
  // Filtered posts for the grid
  const gridPosts = posts.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Editorial Hero Intro Card */}
      <section className="pt-2 sm:pt-6">
        <div className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[6px_6px_0px_0px_#24201D]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
                <span className="w-2 h-2 rounded-full bg-[#24201D]" />
                <span>Editorial Journal · Vol. 2026</span>
              </div>

              <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#24201D] leading-[1.12]">
                Notes on living deliberately, thoughtful craft, & quiet spaces.
              </h1>

              <p className="font-instrument text-xl sm:text-2xl text-[#5A524B] leading-relaxed max-w-2xl">
                Essays exploring the friction between digital acceleration and tangible human rhythms. Written by Brielle Davis with a cup of sencha and a fountain pen.
              </p>

              {/* Quick action bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenSearch}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm font-fredoka font-bold text-[#24201D] hover:bg-[#27F2E4] shadow-[3px_3px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#24201D]" />
                  <span>Search essays...</span>
                  <span className="ml-2 px-1.5 py-0.5 bg-white text-[10px] font-mono text-[#24201D] rounded border border-[#24201D]">
                    ⌘K
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-fredoka font-bold text-[#24201D] hover:text-[#91735E] transition-colors cursor-pointer"
                >
                  <span>About the author</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right visual card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#24201D] bg-[#F2ECE1] shadow-[4px_4px_0px_0px_#24201D]">
                <img
                  src="/src/assets/images/hero_editorial_workspace_1790823223395.jpg"
                  alt="Minimalist sunlit workspace desk"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-4/3 object-cover"
                />
                <div className="p-3 bg-white border-t-2 border-[#24201D] flex items-center justify-between text-xs font-fredoka font-bold text-[#24201D]">
                  <span>Studio Casement · 08:30 AM</span>
                  <span className="px-2 py-0.5 bg-[#27F2E4] border border-[#24201D] rounded text-[10px]">FIELD NOTES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lead Story Showcase */}
      {featuredPost && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#27F2E4] border border-[#24201D]" />
              <h2 className="font-fredoka text-sm font-bold uppercase tracking-widest text-[#24201D]">
                Featured Essay
              </h2>
            </div>
            <span className="font-fredoka text-xs font-bold text-[#91735E]">
              Curator’s Choice
            </span>
          </div>

          <PostCard
            post={featuredPost}
            variant="lead"
            onSelectPost={onSelectPost}
            onSelectCategory={onSelectCategory}
            isSaved={savedPostIds.includes(featuredPost.id)}
            onToggleSave={onToggleSave}
          />
        </section>
      )}

      {/* Category Pills & Post Grid Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-fredoka uppercase tracking-widest text-[#91735E]">
              <Compass className="w-3.5 h-3.5 text-[#24201D]" />
              <span>Browse The Collection</span>
            </div>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#24201D] mt-1">
              Latest Observations & Essays
            </h2>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white border-2 border-[#24201D] rounded-2xl shadow-[3px_3px_0px_0px_#24201D] text-xs font-fredoka">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold shadow-[1.5px_1.5px_0px_0px_#24201D]'
                  : 'text-[#6B625B] hover:text-[#24201D]'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.name)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold shadow-[1.5px_1.5px_0px_0px_#24201D]'
                    : 'text-[#6B625B] hover:text-[#24201D]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Post Grid (Clean editorial grid cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              variant="grid"
              onSelectPost={onSelectPost}
              onSelectCategory={onSelectCategory}
              isSaved={savedPostIds.includes(post.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

        {gridPosts.length === 0 && (
          <div className="py-16 text-center bg-white border-2 border-dashed border-[#24201D] rounded-3xl p-8 space-y-2 shadow-[4px_4px_0px_0px_#24201D]">
            <p className="font-fredoka text-base font-bold text-[#24201D]">
              No posts found in this category yet.
            </p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="text-xs font-fredoka font-bold text-[#91735E] hover:underline cursor-pointer"
            >
              Reset filter to view all posts
            </button>
          </div>
        )}
      </section>

      {/* Curated Editorial Callout / Quote Box */}
      <section className="bg-[#FAF7F2] border-2 border-[#24201D] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-[5px_5px_0px_0px_#24201D]">
        <span className="px-3 py-1 bg-white border border-[#24201D] rounded-full font-fredoka text-xs uppercase tracking-widest text-[#24201D] font-bold shadow-[1.5px_1.5px_0px_0px_#24201D]">
          Studio Maxim
        </span>
        <blockquote className="font-instrument italic text-2xl sm:text-3xl text-[#24201D] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Simplicity is not the lack of clutter, that&apos;s a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and person.&rdquo;
        </blockquote>
        <div className="pt-2 font-fredoka text-xs font-semibold text-[#6B625B]">
          From the personal commonplace notebook of Brielle Davis
        </div>
      </section>

      {/* Prominent Newsletter Signup Section */}
      <section id="newsletter-signup">
        <NewsletterBox variant="prominent" />
      </section>
    </div>
  );
};

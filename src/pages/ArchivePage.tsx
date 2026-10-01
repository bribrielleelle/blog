import React, { useState, useMemo } from 'react';
import { Post, Category } from '../types';
import { Search, Calendar, Folder, ArrowRight, Clock, Filter } from 'lucide-react';

interface ArchivePageProps {
  posts: Post[];
  categories: Category[];
  initialCategory?: string;
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryName: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({
  posts,
  categories,
  initialCategory,
  onSelectPost,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Extract available years
  const availableYears = useMemo(() => {
    const years = new Set(
      posts.map((p) => new Date(p.date).getFullYear().toString())
    );
    return ['all', ...Array.from(years).sort().reverse()];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catMatch =
          post.category.toLowerCase() === selectedCategory.toLowerCase() ||
          categories
            .find((c) => c.slug === selectedCategory)
            ?.name.toLowerCase() === post.category.toLowerCase();
        if (!catMatch) return false;
      }

      // Year filter
      if (selectedYear !== 'all') {
        const postYear = new Date(post.date).getFullYear().toString();
        if (postYear !== selectedYear) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesTags) return false;
      }

      return true;
    });
  }, [posts, selectedCategory, selectedYear, searchQuery, categories]);

  // Group filtered posts by Year & Month
  const groupedPosts = useMemo(() => {
    const groups: { [key: string]: Post[] } = {};
    filteredPosts.forEach((post) => {
      const d = new Date(post.date);
      const key = `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(post);
    });
    return groups;
  }, [filteredPosts]);

  return (
    <div className="space-y-10">
      {/* Archive Header Card */}
      <div className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#24201D] space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
          <Folder className="w-3.5 h-3.5 text-[#24201D]" />
          <span>Chronological Index</span>
        </div>
        <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24201D]">
          Archive & Topic Index
        </h1>
        <p className="font-instrument text-lg sm:text-xl text-[#5A524B] max-w-2xl leading-relaxed">
          Explore all essays, observations, and field notes arranged chronologically and indexed by subject matter.
        </p>

        {/* Live Filter & Search Controls */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#24201D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all archive titles and tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8A8177] hover:text-[#24201D] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Year selector */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-xs font-fredoka font-bold text-[#24201D] shrink-0">Year:</span>
            <div className="flex items-center gap-1 bg-[#FAF7F2] border-2 border-[#24201D] p-1 rounded-xl text-xs font-fredoka shadow-[2px_2px_0px_0px_#24201D]">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                    selectedYear === yr
                      ? 'bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold shadow-2xs'
                      : 'text-[#6B625B] hover:text-[#24201D]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Match counter */}
          <div className="md:col-span-3 text-right text-xs font-fredoka font-bold text-[#24201D]">
            Showing <span className="px-2 py-0.5 bg-[#27F2E4] border border-[#24201D] rounded-md">{filteredPosts.length}</span> of {posts.length} entries
          </div>
        </div>

        {/* Category Topic Buttons */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto text-xs font-fredoka">
          <span className="text-[#24201D] font-bold shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Topic:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 border-2 border-[#24201D] ${
              selectedCategory === 'all'
                ? 'bg-[#27F2E4] text-[#24201D] font-bold shadow-[2px_2px_0px_0px_#24201D]'
                : 'bg-white text-[#6B625B] hover:text-[#24201D]'
            }`}
          >
            All Topics ({posts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 border-2 border-[#24201D] ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-[#27F2E4] text-[#24201D] font-bold shadow-[2px_2px_0px_0px_#24201D]'
                  : 'bg-white text-[#6B625B] hover:text-[#24201D]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-bold font-mono">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Post Groups */}
      <div className="space-y-10">
        {Object.keys(groupedPosts).length === 0 ? (
          <div className="py-16 text-center bg-white border-2 border-dashed border-[#24201D] rounded-3xl p-8 space-y-3 shadow-[4px_4px_0px_0px_#24201D]">
            <p className="font-fredoka text-lg font-bold text-[#24201D]">
              No articles match your current search and filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedYear('all');
              }}
              className="px-4 py-2 bg-[#27F2E4] text-[#24201D] font-fredoka text-xs font-bold rounded-xl border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D] hover:bg-[#1fe0d2] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          Object.entries(groupedPosts).map(([monthGroup, groupPosts]) => (
            <div key={monthGroup} className="space-y-3">
              {/* Month Group Header */}
              <div className="flex items-center gap-3 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#27F2E4] border border-[#24201D]" />
                <h3 className="font-fredoka text-lg font-bold text-[#24201D]">
                  {monthGroup}
                </h3>
                <span className="text-xs font-mono font-bold text-[#91735E]">
                  ({groupPosts.length} {groupPosts.length === 1 ? 'essay' : 'essays'})
                </span>
                <div className="flex-1 h-0.5 bg-[#24201D] ml-2" />
              </div>

              {/* Clean List Items inside Solid White Card */}
              <div className="bg-white border-2 border-[#24201D] rounded-2xl overflow-hidden divide-y-2 divide-[#24201D] shadow-[4px_4px_0px_0px_#24201D]">
                {groupPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className="group p-4 sm:p-5 hover:bg-[#FAF7F2] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 text-xs font-fredoka text-[#6B625B]">
                        <span className="px-2 py-0.5 bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold text-[10px] rounded">
                          {post.category}
                        </span>
                        <span>·</span>
                        <span>{post.formattedDate}</span>
                      </div>
                      <h4 className="font-fredoka text-lg font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <p className="font-instrument text-base text-[#6B625B] line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#24201D]">
                      <span className="text-xs font-mono font-bold text-[#6B625B]">
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 font-fredoka text-xs font-bold text-[#24201D] group-hover:text-[#91735E] transition-colors">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

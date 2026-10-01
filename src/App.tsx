import React, { useState, useEffect } from 'react';
import { Post, Category } from './types';
import { posts, categories } from './data/posts';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ArchivePage } from './pages/ArchivePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { BookmarksPage } from './pages/BookmarksPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('design-craft');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('brielle_blog_saved');
      return saved ? JSON.parse(saved) : ['1', '3']; // Pre-save 2 posts as delightful default
    } catch {
      return ['1', '3'];
    }
  });

  // Sync saved posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brielle_blog_saved', JSON.stringify(savedPostIds));
    } catch {
      // Ignore write errors
    }
  }, [savedPostIds]);

  // Global keyboard shortcuts (⌘K or / for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (post: Post) => {
    setSavedPostIds((prev) =>
      prev.includes(post.id) ? prev.filter((id) => id !== post.id) : [...prev, post.id]
    );
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setActiveTab('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryNameOrSlug: string) => {
    const matchedCategory = categories.find(
      (c) =>
        c.name.toLowerCase() === categoryNameOrSlug.toLowerCase() ||
        c.slug === categoryNameOrSlug.toLowerCase()
    );
    if (matchedCategory) {
      setSelectedCategorySlug(matchedCategory.slug);
    }
    setActiveTab('categories');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string, categorySlug?: string) => {
    setActiveTab(tab);
    setSelectedPost(null);
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewsletter = () => {
    if (activeTab === 'home') {
      const el = document.getElementById('newsletter-signup');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setActiveTab('home');
    setSelectedPost(null);
    setTimeout(() => {
      const el = document.getElementById('newsletter-signup');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col polka-bg text-[#24201D]">
      {/* Primary Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNewsletter={handleOpenNewsletter}
        savedCount={savedPostIds.length}
      />

      {/* Main Content Container (Baseline 1440px desktop with generous margin, no desert island collapse) */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'home' && (
          <HomePage
            posts={posts}
            categories={categories}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
            onOpenSearch={() => setSearchModalOpen(true)}
            savedPostIds={savedPostIds}
            onToggleSave={handleToggleSave}
            onNavigate={handleTabChange}
          />
        )}

        {activeTab === 'post' && selectedPost && (
          <PostDetailPage
            post={selectedPost}
            allPosts={posts}
            onBack={() => {
              setActiveTab('home');
              setSelectedPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
            isSaved={savedPostIds.includes(selectedPost.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'archive' && (
          <ArchivePage
            posts={posts}
            categories={categories}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesPage
            categories={categories}
            posts={posts}
            selectedCategorySlug={selectedCategorySlug}
            onSelectPost={handleSelectPost}
            savedPostIds={savedPostIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'bookmarks' && (
          <BookmarksPage
            savedPosts={savedPosts}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
            onToggleSave={handleToggleSave}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        posts={posts}
        onSelectPost={handleSelectPost}
      />

      {/* Editorial Footer */}
      <Footer onNavigate={handleTabChange} />
    </div>
  );
}

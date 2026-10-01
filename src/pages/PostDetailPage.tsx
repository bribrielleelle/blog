import React, { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { initialComments } from '../data/posts';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { NewsletterBox } from '../components/NewsletterBox';
import { PostCard } from '../components/PostCard';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Clock,
  Calendar,
  MessageSquare,
  Sparkles,
  Send,
  User,
  Share2,
} from 'lucide-react';

interface PostDetailPageProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryName: string) => void;
  isSaved: boolean;
  onToggleSave: (post: Post) => void;
}

export const PostDetailPage: React.FC<PostDetailPageProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  onSelectCategory,
  isSaved,
  onToggleSave,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    initialComments[post.id] || []
  );
  const [authorName, setAuthorName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Scroll to top on post change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      postId: post.id,
      author: authorName.trim(),
      avatarInitials: authorName
        .trim()
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      date: 'Just now',
      content: commentContent.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setCommentContent('');
    setAuthorName('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  // Related posts (excluding current)
  const relatedPosts = allPosts
    .filter(
      (p) => p.id !== post.id && (p.category === post.category || p.featured)
    )
    .slice(0, 2);

  return (
    <div className="relative">
      {/* Sticky Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#27F2E4] z-50 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="space-y-10">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-fredoka text-xs font-bold text-[#24201D] bg-white border-2 border-[#24201D] px-3.5 py-2 rounded-xl shadow-[2px_2px_0px_0px_#24201D] hover:bg-[#27F2E4] transition-all cursor-pointer group active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to essays</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(post)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-[#24201D] text-xs font-fredoka font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                isSaved
                  ? 'bg-[#27F2E4] text-[#24201D]'
                  : 'bg-white text-[#24201D] hover:bg-[#F2ECE1]'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#24201D]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save for later'}</span>
            </button>
          </div>
        </div>

        {/* Article Header Card */}
        <header className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#24201D] space-y-6 text-center">
          {/* Tag & Metadata line */}
          <div className="flex items-center justify-center gap-2 text-xs font-fredoka text-[#6B625B]">
            <button
              onClick={() => onSelectCategory(post.category)}
              className="px-3 py-1 bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-[1.5px_1.5px_0px_0px_#24201D] cursor-pointer hover:bg-[#1fe0d2]"
            >
              {post.category}
            </button>
            <span className="text-[#B5ADA4]">·</span>
            <span>{post.formattedDate}</span>
            <span className="text-[#B5ADA4]">·</span>
            <span className="font-mono font-bold text-[#24201D]">{post.readTime}</span>
          </div>

          {/* Main Title H1 (Fredoka) */}
          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#24201D] leading-tight text-balance">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="font-instrument text-xl sm:text-2xl text-[#6B625B] leading-relaxed max-w-2xl mx-auto italic">
            {post.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D]"
            />
            <div className="text-left font-fredoka text-xs">
              <div className="font-bold text-[#24201D]">{post.author.name}</div>
              <div className="text-[#8A8177]">{post.author.location}</div>
            </div>
          </div>
        </header>

        {/* Hero Cover Image Card */}
        <div className="space-y-3">
          <div className="rounded-3xl overflow-hidden border-2 border-[#24201D] bg-[#F2ECE1] shadow-[6px_6px_0px_0px_#24201D]">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full aspect-16/9 object-cover"
            />
          </div>
          {post.coverImageCaption && (
            <p className="text-center font-instrument text-sm text-[#8A8177] italic">
              {post.coverImageCaption}
            </p>
          )}
        </div>

        {/* Mobile Collapsible Table of Contents */}
        <TableOfContents sections={post.sections} isMobileDrawer={true} />

        {/* Main Reading Canvas & Sticky TOC Layout */}
        <div className="flex items-start justify-between gap-10 pt-2">
          {/* Main Reading Column inside Solid White Card */}
          <main className="flex-1 max-w-2xl mx-auto bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[6px_6px_0px_0px_#24201D] space-y-10">
            {/* Opening paragraph with drop cap */}
            {post.sections.length > 0 && post.sections[0].content.length > 0 && (
              <div className="space-y-6">
                <p className="editorial-drop-cap font-instrument text-xl sm:text-2xl text-[#24201D] leading-relaxed">
                  {post.sections[0].content[0]}
                </p>
                {post.sections[0].content.slice(1).map((para, idx) => (
                  <p
                    key={idx}
                    className="font-instrument text-xl text-[#362F2B] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                {post.sections[0].quote && (
                  <blockquote className="my-8 py-4 px-6 border-l-4 border-[#27F2E4] bg-[#F8F4EE] rounded-r-xl">
                    <p className="font-instrument italic text-xl sm:text-2xl text-[#24201D] leading-snug">
                      &ldquo;{post.sections[0].quote}&rdquo;
                    </p>
                  </blockquote>
                )}

                {/* Subsections if any */}
                {post.sections[0].subsections?.map((sub) => (
                  <div key={sub.id} id={sub.id} className="pt-6 space-y-4">
                    <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#24201D] tracking-tight">
                      {sub.title}
                    </h3>
                    {sub.content.map((p, idx) => (
                      <p
                        key={idx}
                        className="font-instrument text-xl text-[#362F2B] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Remaining Sections */}
            {post.sections.slice(1).map((section) => (
              <section key={section.id} id={section.id} className="space-y-6 pt-6">
                <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#24201D] tracking-tight border-t border-[#E8E1D5] pt-8">
                  {section.title}
                </h2>

                {section.content.map((para, idx) => (
                  <p
                    key={idx}
                    className="font-instrument text-xl text-[#362F2B] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-8 py-4 px-6 border-l-4 border-[#91735E] bg-[#F8F4EE] rounded-r-xl">
                    <p className="font-instrument italic text-xl sm:text-2xl text-[#24201D] leading-snug">
                      &ldquo;{section.quote}&rdquo;
                    </p>
                  </blockquote>
                )}

                {section.subsections?.map((sub) => (
                  <div key={sub.id} id={sub.id} className="pt-4 space-y-4">
                    <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#24201D] tracking-tight">
                      {sub.title}
                    </h3>
                    {sub.content.map((p, idx) => (
                      <p
                        key={idx}
                        className="font-instrument text-xl text-[#362F2B] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            {/* Tags line */}
            <div className="pt-8 border-t border-[#E8E1D5] flex items-center gap-2 flex-wrap">
              <span className="font-fredoka text-xs font-semibold text-[#8A8177]">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#F2ECE1] text-[#6B625B] hover:text-[#24201D] text-xs font-fredoka rounded-md transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Interactive Feedback & Social Sharing Bar */}
            <div className="py-6 px-6 bg-[#FAF7F2] border-2 border-[#24201D] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[3px_3px_0px_0px_#24201D]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-fredoka font-bold border-2 border-[#24201D] transition-all cursor-pointer shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                    hasLiked
                      ? 'bg-[#27F2E4] text-[#24201D]'
                      : 'bg-white text-[#24201D] hover:bg-[#27F2E4]'
                  }`}
                  title="Applaud essay"
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{likes} Applauds</span>
                </button>

                <span className="text-xs font-fredoka text-[#6B625B]">
                  Thank you for reading
                </span>
              </div>

              {/* Social sharing buttons */}
              <ShareButtons title={post.title} />
            </div>

            {/* Author Bio Box */}
            <div className="p-6 sm:p-8 bg-[#FAF7F2] border-2 border-[#24201D] rounded-3xl space-y-4 shadow-[4px_4px_0px_0px_#24201D]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D] shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-fredoka text-xl font-bold text-[#24201D]">
                      {post.author.name}
                    </h3>
                    <span className="font-fredoka text-xs text-[#91735E] font-bold">
                      {post.author.role}
                    </span>
                  </div>
                  <p className="font-instrument text-base text-[#4A403A] leading-relaxed">
                    {post.author.bio}
                  </p>
                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-4 font-fredoka text-xs font-semibold text-[#6B625B]">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#24201D] hover:underline"
                    >
                      Follow on X
                    </a>
                    <span>·</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#24201D] hover:underline"
                    >
                      GitHub
                    </a>
                    <span>·</span>
                    <span>Based in {post.author.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <NewsletterBox variant="post-footer" />

            {/* Reader Reflections & Comments Section */}
            <section className="space-y-6 pt-6 border-t-2 border-[#24201D]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#24201D]" />
                  <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
                    Reader Reflections ({comments.length})
                  </h3>
                </div>
                <span className="font-fredoka text-xs font-bold text-[#91735E]">
                  Civil & Thoughtful
                </span>
              </div>

              {/* Add comment form */}
              <form
                onSubmit={handleAddComment}
                className="bg-[#FAF7F2] border-2 border-[#24201D] rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#24201D]"
              >
                <h4 className="font-fredoka text-sm font-bold text-[#24201D]">
                  Leave a thought on this essay
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Clara)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="px-3.5 py-2.5 bg-white border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Share your perspective or experience..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B625B] font-body-sans">
                    Comments are moderated with kindness.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#27F2E4] hover:bg-[#1fe0d2] text-[#24201D] font-fredoka font-bold text-xs rounded-xl border-2 border-[#24201D] transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post reflection</span>
                  </button>
                </div>

                {commentSuccess && (
                  <p className="text-xs text-[#2E7D32] font-fredoka font-bold animate-in fade-in">
                    Thank you! Your reflection has been posted.
                  </p>
                )}
              </form>

              {/* Comment list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-5 bg-white border-2 border-[#24201D] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]"
                  >
                    <div className="flex items-center justify-between text-xs font-fredoka">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#27F2E4] border border-[#24201D] text-[#24201D] font-bold flex items-center justify-center text-xs shadow-2xs">
                          {comment.avatarInitials}
                        </span>
                        <span className="font-bold text-[#24201D]">
                          {comment.author}
                        </span>
                        <span className="text-[#8A8177]">· {comment.date}</span>
                      </div>
                    </div>
                    <p className="font-instrument text-base text-[#4A423B] leading-relaxed pl-9">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Table of Contents (Desktop Sidebar) */}
          <TableOfContents sections={post.sections} />
        </div>

        {/* Related Posts Recommendations */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
                Continue Reading
              </h3>
              <button
                onClick={onBack}
                className="font-fredoka text-xs font-bold text-[#91735E] hover:underline cursor-pointer"
              >
                View all essays →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relPost) => (
                <PostCard
                  key={relPost.id}
                  post={relPost}
                  variant="grid"
                  onSelectPost={onSelectPost}
                  onSelectCategory={onSelectCategory}
                  isSaved={false}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

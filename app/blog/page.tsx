"use client";

import { useState, useEffect, useCallback } from "react";
import { siteTitle } from "../data/content";
import { Lang } from "../data/content";

interface BlogVideo {
  platform: string;
  id: string;
  title: string;
  source: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary?: string;
  content: string;
  coverImage?: string;
  category: string;
  publishedAt: string;
  videos?: BlogVideo[];
  sources: { name: string; url: string }[];
  tags: string[];
}

const categoryEmoji: Record<string, string> = {
  "New AI Tools": "🛠️",
  "Use Cases": "💡",
  "Video Explainers": "🎬",
  "Hot Takes": "🔥",
  "Research & Papers": "📄",
  "AI Innovations": "🚀",
  "Industry News": "📰",
};

const categoryColor: Record<string, string> = {
  "New AI Tools": "bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-500/10 dark:text-blue-400",
  "Use Cases": "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Video Explainers": "bg-violet-50 text-violet-700 ring-violet-600/10 dark:bg-violet-500/10 dark:text-violet-400",
  "Hot Takes": "bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400",
  "Research & Papers": "bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400",
  "AI Innovations": "bg-indigo-50 text-indigo-700 ring-indigo-600/10 dark:bg-indigo-500/10 dark:text-indigo-400",
  "Industry News": "bg-cyan-50 text-cyan-700 ring-cyan-600/10 dark:bg-cyan-500/10 dark:text-cyan-400",
};

/* ─── Inline Video Player ─── */
function VideoPlayer({ video }: { video: BlogVideo }) {
  const [loaded, setLoaded] = useState(false);

  const isYouTube = video.platform !== "bilibili";

  if (video.platform === "bilibili" && video.id.startsWith("BV")) {
    return (
      <div className="rounded-lg overflow-hidden bg-black border border-[var(--card-border)]">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg)] z-10">
              <svg className="animate-spin h-8 w-8 text-[var(--muted)]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${video.id}&page=1&autoplay=0&high_quality=1`}
            scrolling="no"
            frameBorder="no"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="px-3 py-2 bg-[var(--card)] border-t border-[var(--card-border)]">
          <p className="text-[12px] text-[var(--muted)] truncate">{video.title}</p>
          <p className="text-[11px] text-[var(--muted-light)]">{video.source}</p>
        </div>
      </div>
    );
  }

  // YouTube
  return (
    <div className="rounded-lg overflow-hidden bg-black border border-[var(--card-border)]">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg)] z-10">
            <svg className="animate-spin h-8 w-8 text-[var(--muted)]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="px-3 py-2 bg-[var(--card)] border-t border-[var(--card-border)]">
        <p className="text-[12px] text-[var(--muted)] truncate">{video.title}</p>
        <p className="text-[11px] text-[var(--muted-light)]">{video.source}</p>
      </div>
    </div>
  );
}

/* ─── Expandable Video Widget ─── */
function VideoWidget({ videos }: { videos: BlogVideo[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!videos.length) return null;

  return (
    <div className={`mt-3 border-t border-[var(--divider)] transition-all duration-300 ${expanded ? "pb-4" : ""}`}>
      {/* Video list header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-[var(--section-bg)] transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-red-600 dark:text-red-400 text-sm">▶</span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">
            Watch videos ({videos.length})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded video area */}
      {expanded && (
        <div className="px-4 pt-3">
          {videos.length > 1 && (
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
              {videos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150 ${
                    i === activeIndex
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--section-bg)] text-[var(--muted)] hover:bg-[var(--section-bg)]/80"
                  }`}
                >
                  {v.platform === "bilibili" ? "🅱" : "▶"} {v.title.slice(0, 25)}{v.title.length > 25 ? "…" : ""}
                </button>
              ))}
            </div>
          )}
          <VideoPlayer video={videos[activeIndex]} />
          {videos.length > 1 && (
            <p className="text-[11px] text-[var(--muted-light)] mt-2">
              {activeIndex + 1} of {videos.length} videos
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [lang] = useState<Lang>("en");

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      try {
        const bundled = await import("../data/posts.json");
        setPosts(bundled.default);
      } catch {
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const categories = ["All", ...Object.keys(categoryEmoji)];
  const filteredPosts = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const videoCount = posts.reduce((acc, p) => acc + (p.videos?.length || 0), 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--divider)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)] text-white text-sm font-bold shadow-sm shadow-[var(--accent)]/20">AI</span>
            <span className="font-bold text-sm tracking-tight">{siteTitle[lang]}</span>
          </a>
          <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            ← Back to Cookbook
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500/[0.04] to-violet-500/[0.04] dark:from-indigo-500/[0.06] dark:to-violet-500/[0.06]">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent-subtle)]/30 px-3 py-1 text-xs font-medium text-[var(--accent)] mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
              </span>
              Updated daily
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
              <span className="text-gradient">AI Daily Digest</span>
            </h1>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">
              Curated AI news, tools, use cases, research breakthroughs, and video explanations — published every workday morning.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs text-[var(--muted-light)]">
                {posts.length} posts · {videoCount} embedded videos
              </span>
            </div>
          </div>
        </div>
        <div className="border border-[var(--divider)]" />
      </div>

      {/* Content */}
      {loading ? (
        <div className="mx-auto max-w-7xl px-6 py-20 flex items-center justify-center">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading posts...
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const isActive = filter === cat;
              const count = cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--section-bg)] border border-[var(--card-border)]"
                  }`}
                >
                  {categoryEmoji[cat]} {cat} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden transition-all duration-200 hover:border-[var(--accent-subtle)] hover:shadow-lg hover:shadow-[var(--accent)]/5"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <a href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-[var(--section-bg)]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${categoryColor[post.category] || "bg-gray-50 text-gray-700 ring-gray-600/10"}`}>
                        {categoryEmoji[post.category]} {post.category}
                      </span>
                    </div>
                  </a>
                )}

                <div className="p-5">
                  {/* No image: show category inline */}
                  {!post.coverImage && (
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${categoryColor[post.category] || "bg-gray-50 text-gray-700 ring-gray-600/10"}`}>
                        {categoryEmoji[post.category]} {post.category}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  )}

                  {/* Date for cards with images */}
                  {post.coverImage && (
                    <div className="flex items-center justify-between mt-3 mb-2">
                      <span className="text-[10px] text-[var(--muted)]">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      {post.videos && post.videos.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--muted)]">
                          ▶ {post.videos.length}v
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title & Link */}
                  <a href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-[17px] font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </a>

                  {/* Excerpt */}
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Sources */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.sources.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] text-[var(--muted-light)] bg-[var(--section-bg)] px-2 py-0.5 rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  {/* Inline Video Widget */}
                  <VideoWidget videos={post.videos || []} />
                </div>

                {/* Footer arrow */}
                <a href={`/blog/${post.slug}`} className="block px-5 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[var(--accent)] font-medium">Read more →</span>
                    <svg className="w-4 h-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-[var(--muted)]">No posts in this category yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-12 pt-8 border-t border-[var(--divider)]">
            <p className="text-[11px] text-[var(--muted-light)]">
              Posts are auto-curated from YouTube, Bilibili, Twitter/X, HackerNews, arXiv, and AI news sources.
              <br />
              Published weekdays at 8:00 AM Shanghai time (CST, UTC+8).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

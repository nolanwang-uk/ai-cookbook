"use client";

import { useState, useEffect, useCallback } from "react";
import { siteTitle, siteSubtitle } from "../data/content";
import { Lang } from "../data/content";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
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
      // Load bundled posts as fallback
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
                  {categoryEmoji[cat]} {cat}
                </button>
              );
            })}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-all duration-200 hover:border-[var(--accent-subtle)] hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-0.5 block"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${categoryColor[post.category] || "bg-gray-50 text-gray-700 ring-gray-600/10"}`}>
                    {categoryEmoji[post.category]} {post.category}
                  </span>
                  <span className="text-[10px] text-[var(--muted)]">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.sources.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] text-[var(--muted-light)] bg-[var(--section-bg)] px-2 py-0.5 rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>
                  <svg className="w-4 h-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
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

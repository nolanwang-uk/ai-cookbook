"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) fetchPost();
  }, [fetchPost, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--muted)]">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-[var(--muted)] mb-6">Post not found.</p>
          <button
            onClick={() => router.push("/blog")}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--divider)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)] text-white text-sm font-bold shadow-sm shadow-[var(--accent)]/20">AI</span>
            <span className="font-bold text-sm tracking-tight">AI Cookbook</span>
          </a>
          <a href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            ← Back to Blog
          </a>
        </div>
      </header>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-[12px] font-semibold ring-1 ring-inset ${categoryColor[post.category] || "bg-gray-50 text-gray-700 ring-gray-600/10"}`}>
            {categoryEmoji[post.category]} {post.category}
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-[var(--muted)] bg-[var(--section-bg)] px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.2] mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-8 pb-8 border-b border-[var(--divider)]">
          <span>AI Cookbook</span>
          <span>·</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
          <span>·</span>
          <span>{Math.ceil(post.content.split(/\s+/).length / 200)} min read</span>
        </div>

        {/* Content */}
        <div className="prose prose-[var(--foreground)] prose-lg max-w-none dark:prose-invert">
          {post.content.split("\n").map((paragraph, i) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("- ")) {
              return (
                <ul key={i} className="space-y-2 mb-4 ml-4">
                  {trimmed.split("\n").map((item, j) => (
                    <li key={j} className="text-[15px] leading-relaxed">{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            if (trimmed.startsWith("**") && trimmed.includes(":**")) {
              return <strong key={i} className="block text-lg mt-6 mb-2">{trimmed.replace(/\*\*:/g, ":").replace(/\*\*/g, "")}</strong>;
            }
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote key={i} className="border-l-4 border-[var(--accent)] pl-4 italic text-[var(--muted)] my-4">
                  {trimmed.slice(2)}
                </blockquote>
              );
            }
            if (trimmed.match(/^https?:\/\//)) {
              return (
                <a key={i} href={trimmed} target="_blank" rel="noopener noreferrer" className="block text-[var(--accent)] hover:underline my-2 text-sm">
                  {trimmed}
                </a>
              );
            }
            if (trimmed.startsWith("```")) {
              return null; // skip code fence lines for simplicity
            }
            return <p key={i} className="text-[15px] leading-relaxed mb-4">{trimmed}</p>;
          })}
        </div>

        {/* Sources */}
        {post.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--divider)]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-light)] mb-4">📚 Sources</h4>
            <div className="space-y-2">
              {post.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[13px] rounded-lg px-3 py-2 -mx-1 transition-colors hover:bg-[var(--section-bg)] group"
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">{source.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[var(--divider)] flex items-center justify-between">
          <button
            onClick={() => router.push("/blog")}
            className="text-[var(--accent)] hover:underline text-sm"
          >
            ← All Posts
          </button>
          <p className="text-[11px] text-[var(--muted-light)]">
            Auto-curated · Published at 8:00 AM CST
          </p>
        </div>
      </article>
    </div>
  );
}

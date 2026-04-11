"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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

/* ─── Inline renderer ─── */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;
  while (remaining.length > 0) {
    const bm = remaining.match(/\*\*(.+?)\*\*/);
    if (bm && (bm.index ?? -1) >= 0) {
      const idx = bm.index!;
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push(<strong key={k++}>{bm[1]}</strong>);
      remaining = remaining.slice(idx + bm[0].length);
      continue;
    }
    const cm = remaining.match(/`([^`]+)`/);
    if (cm && (cm.index ?? -1) >= 0) {
      const idx = cm.index!;
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push(
        <code key={k++} className="bg-[var(--section-bg)] px-1.5 py-0.5 rounded text-[13px] font-mono text-[var(--accent)]">
          {cm[1]}
        </code>
      );
      remaining = remaining.slice(idx + cm[0].length);
      continue;
    }
    parts.push(remaining);
    remaining = "";
  }
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

/* ─── Full content renderer ─── */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let listItems: string[] = [];
  let paraLines: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="space-y-1.5 mb-5 ml-4">
          {listItems.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed">{renderInline(item.replace(/^- |^# /, ""))}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushPara = () => {
    if (paraLines.length > 0) {
      const text = paraLines.join(" ");
      if (text.trim().match(/^https?:\/\//)) {
        elements.push(
          <a key={`link-${key++}`} href={text.trim()} target="_blank" rel="noopener noreferrer" className="block text-[var(--accent)] hover:underline my-3 text-sm break-all">
            {text.trim()}
          </a>
        );
      } else if (text.trim().startsWith("---")) {
        elements.push(<hr key={`hr-${key++}`} className="my-8 border-[var(--divider)]" />);
      } else {
        elements.push(
          <p key={`p-${key++}`} className="text-[15px] leading-relaxed mb-4">{renderInline(text)}</p>
        );
      }
      paraLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        const code = codeLines.join("\n");
        elements.push(
          <pre key={`code-${key++}`} className="bg-[var(--section-bg)] rounded-lg p-4 mb-5 overflow-x-auto text-sm font-mono text-[var(--foreground)] leading-relaxed">
            {code}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushPara();
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeLines.push(lines[i]);
      continue;
    }

    if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
      flushList();
      flushPara();
      elements.push(
        <h2 key={`h2-${key++}`} className="text-2xl font-bold mt-12 mb-4 text-[var(--foreground)]">{trimmed.slice(3)}</h2>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      flushPara();
      elements.push(
        <h3 key={`h3-${key++}`} className="text-xl font-semibold mt-8 mb-3 text-[var(--foreground)]">{trimmed.slice(4)}</h3>
      );
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushList();
      flushPara();
      elements.push(
        <blockquote key={`bq-${key++}`} className="border-l-4 border-[var(--accent)] pl-5 pr-4 py-3 my-5 bg-[var(--accent)]/5 rounded-r-lg italic text-[var(--muted)] text-[15px] leading-relaxed">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    if (trimmed.startsWith("**") && trimmed.includes("**") && (trimmed.endsWith("**") || trimmed.includes(":"))) {
      flushList();
      flushPara();
      const boldMatch = trimmed.match(/\*\*(.+?)\*\*/);
      if (boldMatch) {
        const rest = trimmed.replace(/\*\*(.+?)\*\*\s*/, "").trim();
        elements.push(
          <div key={`bold-${key++}`} className="mt-6 mb-2">
            <strong className="text-[16px] text-[var(--foreground)]">{boldMatch[1]}</strong>
            {rest && <span className="text-[15px] text-[var(--muted)] ml-2">{renderInline(rest)}</span>}
          </div>
        );
      }
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushPara();
      listItems.push(trimmed);
      continue;
    }

    if (!trimmed) {
      flushList();
      flushPara();
      continue;
    }

    flushList();
    paraLines.push(trimmed);
  }

  flushList();
  flushPara();
  return elements;
}

/* ─── Video Embed Component ─── */
function VideoEmbed({ video }: { video: BlogVideo }) {
  const [loaded, setLoaded] = useState(false);

  if (video.platform === "bilibili") {
    return (
      <div className="my-8 rounded-xl overflow-hidden border border-[var(--card-border)] bg-[var(--card)]">
        <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg)]">
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
        <div className="px-4 py-3 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--accent)]">📺 {video.source}</span>
          </div>
          <p className="text-sm text-[var(--muted)] mt-1">{video.title}</p>
        </div>
      </div>
    );
  }

  // YouTube
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[var(--card-border)] bg-[var(--card)]">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg)]">
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
      <div className="px-4 py-3 border-t border-[var(--card-border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">▶ YouTube</span>
          <span className="text-xs text-[var(--muted)]">{video.source}</span>
        </div>
        <p className="text-sm text-[var(--muted)] mt-1">{video.title}</p>
      </div>
    </div>
  );
}

/* ─── Video Section ─── */
function VideosSection({ videos }: { videos: BlogVideo[] }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-xl">🎬</span> Watch & Learn
      </h3>
      <div className="space-y-6">
        {videos.map((v, i) => (
          <VideoEmbed key={`${v.platform}-${v.id}-${i}`} video={v} />
        ))}
      </div>
    </div>
  );
}

const categoryEmoji: Record<string, string> = {
  "New AI Tools": "🛠️", "Use Cases": "💡", "Video Explainers": "🎬",
  "Hot Takes": "🔥", "Research & Papers": "📄", "AI Innovations": "🚀", "Industry News": "📰",
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

/* ─── Page Component ─── */
export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => { setPost(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching post:", err); setLoading(false); });
  }, [slug]);

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
          <button onClick={() => router.push("/blog")} className="text-sm text-[var(--accent)] hover:underline">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const wordCount = post.content.split(/\s+/).length;
  const readMin = Math.max(1, Math.ceil(wordCount / 200));
  const dateStr = new Date(post.publishedAt).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

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
            ← All Posts
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-8 lg:py-12">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-6 border border-[var(--card-border)] shadow-lg shadow-black/[0.04]">
            <img src={post.coverImage} alt={post.title} className="w-full aspect-[16/9] object-cover" />
          </div>
        )}

        {/* Summary card */}
        {(post.summary || post.excerpt) && (
          <div className="rounded-xl border border-[var(--accent-subtle)] bg-[var(--accent)]/5 p-5 mb-8">
            <p className="text-[15px] text-[var(--foreground)] leading-relaxed font-medium">
              {post.summary || post.excerpt}
            </p>
          </div>
        )}

        {/* Meta badges and video badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-[12px] font-semibold ring-1 ring-inset ${categoryColor[post.category] || "bg-gray-50"}`}>
            {categoryEmoji[post.category]} {post.category}
          </span>
          {post.videos && post.videos.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-semibold bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20">
              🎬 {post.videos.length} {post.videos.length === 1 ? "video" : "videos"}
            </span>
          )}
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-[var(--muted)] bg-[var(--section-bg)] px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] mb-5">
          {post.title}
        </h1>

        {/* Author line */}
        <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-10 pb-8 border-b border-[var(--divider)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <div>
              <div className="font-medium text-[var(--foreground)]">AI Cookbook</div>
              <div className="text-[var(--muted-light)] text-[12px]">{dateStr}</div>
            </div>
          </div>
          <span className="text-[var(--muted-light)]">·</span>
          <span className="text-[var(--muted-light)]">{readMin} min read</span>
        </div>

        {/* Video Embeds - shown right after author line */}
        <VideosSection videos={post.videos || []} />

        {/* Content */}
        <div className="leading-relaxed">
          {renderContent(post.content)}
        </div>

        {/* Sources */}
        {post.sources.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[var(--divider)]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-light)] mb-4">📚 Sources & References</h4>
            <div className="space-y-2">
              {post.sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[13px] rounded-lg px-3 py-2 -mx-1 transition-colors hover:bg-[var(--section-bg)] group"
                >
                  <svg className="w-4 h-4 shrink-0 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[var(--divider)] flex items-center justify-between">
          <button onClick={() => router.push("/blog")} className="text-[var(--accent)] hover:underline text-sm font-medium">
            ← All Posts
          </button>
          <p className="text-[11px] text-[var(--muted-light)]">Auto-curated · Published at 8:00 AM CST</p>
        </div>
      </article>
    </div>
  );
}

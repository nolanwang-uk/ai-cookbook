"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  sections,
  siteTitle,
  siteSubtitle,
  roadmapPhases,
  crossResources,
  mathDependency,
  type Lang,
  type Section,
  type Topic,
} from "./data/content";

/* ─── Language Toggle ─── */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="relative flex items-center rounded-full bg-[var(--section-bg)] p-0.5">
      <button
        onClick={() => setLang("zh")}
        className={`relative z-10 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
          lang === "zh"
            ? "bg-[var(--accent)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLang("en")}
        className={`relative z-10 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
          lang === "en"
            ? "bg-[var(--accent)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

/* ─── Difficulty Badge ─── */
function DifficultyBadge({ text }: { text: string }) {
  let cls =
    "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20";
  if (text.includes("中级") || text.includes("Intermediate")) {
    cls =
      "bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20";
  }
  if (text.includes("高级") || text.includes("Advanced")) {
    cls =
      "bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/20";
  }
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${cls}`}>
      {text}
    </span>
  );
}

/* ─── Topic Card ─── */
function TopicCard({ topic, lang }: { topic: Topic; lang: Lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group rounded-xl border transition-all duration-200 overflow-hidden ${
        open
          ? "border-[var(--accent-subtle)] bg-[var(--card)] shadow-lg shadow-[var(--accent)]/5"
          : "border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent-subtle)] hover:shadow-md hover:shadow-black/[0.03]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-semibold leading-snug">{topic.title[lang]}</h3>
            <DifficultyBadge text={topic.difficulty[lang]} />
            {topic.priority && (
              <span className="text-[11px] font-medium text-[var(--muted)]">{topic.priority[lang]}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
            {topic.prereqs && (
              <p className="text-[11px] text-[var(--muted-light)]">
                {lang === "zh" ? "前置：" : "Prereqs: "}
                <span className="text-[var(--muted)]">{topic.prereqs[lang]}</span>
              </p>
            )}
            {topic.duration && (
              <p className="text-[11px] text-[var(--muted-light)]">
                {lang === "zh" ? "周期：" : "Duration: "}
                <span className="text-[var(--muted)]">{topic.duration[lang]}</span>
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${open ? "bg-[var(--accent)] text-white" : "bg-[var(--section-bg)] text-[var(--muted)]"}`}>
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 space-y-5 border-t border-[var(--divider)] pt-4">
            {topic.why && (
              <div className="relative rounded-lg bg-[var(--accent-light)] p-4 pl-10 text-sm leading-relaxed">
                <svg className="absolute left-3.5 top-4 w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-[var(--accent)]">{lang === "zh" ? "为什么重要 " : "Why it matters "}</span>
                <span className="text-[var(--foreground)]/80">{topic.why[lang]}</span>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-light)] mb-3">
                {lang === "zh" ? "核心概念" : "Key Concepts"}
              </h4>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {topic.concepts[lang].map((c, i) => (
                  <div key={i} className="flex gap-2.5 text-[13px] leading-snug rounded-md px-2.5 py-1.5 bg-[var(--section-bg)]/60">
                    <span className="text-[var(--accent)] shrink-0 font-mono text-[10px] mt-0.5 opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-light)] mb-3">
                {lang === "zh" ? "推荐资源" : "Resources"}
              </h4>
              <div className="space-y-1">
                {topic.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-[13px] rounded-lg px-3 py-2 -mx-1 transition-colors hover:bg-[var(--section-bg)]">
                    <svg className="w-4 h-4 shrink-0 mt-0.5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span className="text-[var(--accent)] hover:text-[var(--accent-hover)]">{r.name[lang]}</span>
                  </a>
                ))}
              </div>
            </div>

            {lang === "zh" && topic.zhResources && topic.zhResources.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-500/70 dark:text-rose-400/70 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-rose-50 dark:bg-rose-500/10 text-[10px]">🇨🇳</span>
                  中文替代资源
                </h4>
                <div className="rounded-lg border border-rose-200/60 dark:border-rose-500/10 bg-rose-50/40 dark:bg-rose-500/5 p-3 space-y-1">
                  {topic.zhResources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-2.5 text-[13px] rounded-md px-2.5 py-1.5 transition-colors hover:bg-rose-100/60 dark:hover:bg-rose-500/10">
                      <svg className="w-4 h-4 shrink-0 mt-0.5 text-rose-500/70 dark:text-rose-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span className="text-rose-700 dark:text-rose-400">{r.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section View ─── */
function SectionView({ section, lang }: { section: Section; lang: Lang }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      {/* Section header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-light)] text-lg">{section.emoji}</span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] mb-0.5">{section.phase[lang]}</div>
            <h2 className="text-xl font-bold tracking-tight leading-tight">{section.title[lang]}</h2>
          </div>
        </div>
        <p className="text-[var(--muted)] text-sm leading-relaxed mt-2 pl-12">{section.description[lang]}</p>
        {section.tip && (
          <div className="mt-3 ml-12 rounded-lg bg-amber-50/80 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 px-4 py-2.5 text-[13px] text-amber-800 dark:text-amber-300 leading-relaxed">
            {section.tip[lang]}
          </div>
        )}
      </div>

      {/* Subgroups */}
      <div className="space-y-8">
        {section.subgroups.map((sg, gi) => (
          <div key={gi}>
            {section.subgroups.length > 1 && (
              <div className="flex items-center gap-3 mb-3 pl-1">
                <div className="h-px flex-1 bg-[var(--divider)]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-light)] shrink-0">
                  {sg.label[lang]}
                </span>
                <div className="h-px flex-1 bg-[var(--divider)]" />
              </div>
            )}
            <div className="space-y-2.5">
              {sg.topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} lang={lang} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Math dependency graph — inline after foundation section */}
      {section.id === "foundation" && <MathDependencyGraph lang={lang} />}
    </section>
  );
}

/* ─── Roadmap ─── */
const phaseColors: Record<string, string> = {
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/20",
  violet: "from-violet-500 to-violet-600 shadow-violet-500/20",
  blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
  amber: "from-amber-500 to-amber-600 shadow-amber-500/20",
};

function Roadmap({ lang }: { lang: Lang }) {
  return (
    <section id="roadmap" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-light)] text-lg">🗺️</span>
        <h2 className="text-xl font-bold tracking-tight">{roadmapPhases.title[lang]}</h2>
      </div>
      <p className="text-sm text-[var(--muted)] pl-12 mb-6">
        {lang === "zh"
          ? "先看全局，再逐步深入。每个阶段都可以点击左侧导航跳转到对应内容。"
          : "See the big picture first, then dive in step by step. Click the sidebar to jump to each phase."}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roadmapPhases.phases.map((p, i) => (
          <a
            key={i}
            href={`#${sections[i]?.id || "resources"}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all duration-200 hover:border-[var(--accent-subtle)] hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${phaseColors[p.color]} text-white text-xs font-bold shadow-md`}>
                {i + 1}
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[var(--muted-light)] uppercase tracking-wider">{p.phase[lang]}</div>
                <div className="text-sm font-semibold leading-tight">{p.label[lang]}</div>
              </div>
            </div>
            <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-3">{p.desc[lang]}</p>
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-[var(--section-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--muted)]">{p.duration[lang]}</span>
              <svg className="w-4 h-4 text-[var(--muted-light)] group-hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-5 rounded-lg bg-[var(--accent-light)] border border-[var(--accent-subtle)]/30 px-5 py-3 text-center text-sm font-medium text-[var(--accent)]">
        {roadmapPhases.total[lang]}
      </div>
    </section>
  );
}

/* ─── Math Dependency Graph (inline in foundation) ─── */
function MathDependencyGraph({ lang }: { lang: Lang }) {
  const nodes = [
    { zh: "线性代数", en: "Linear Algebra" },
    { zh: "微积分", en: "Calculus" },
    { zh: "概率与统计", en: "Probability & Statistics" },
  ];
  const leaves = [
    { zh: "最优化", en: "Optimization" },
    { zh: "信息论", en: "Info Theory" },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-3 pl-1">
        <div className="h-px flex-1 bg-[var(--divider)]" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-light)] shrink-0 flex items-center gap-1.5">
          🔗 {mathDependency.title[lang]}
        </span>
        <div className="h-px flex-1 bg-[var(--divider)]" />
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <div className="flex flex-col items-center gap-1">
          {nodes.map((n, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-white px-5 py-2 text-sm font-semibold shadow-md shadow-[var(--accent)]/15">
                {n[lang]}
              </div>
              {i < nodes.length - 1 && <div className="h-5 w-px bg-gradient-to-b from-[var(--accent)] to-[var(--accent-subtle)]" />}
            </div>
          ))}
          <div className="h-4 w-px bg-[var(--accent-subtle)]" />
          <div className="flex gap-4">
            {leaves.map((l, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-3 w-px bg-[var(--accent-subtle)]" />
                <div className="rounded-lg border border-[var(--accent-subtle)] bg-[var(--accent-light)] text-[var(--accent)] px-4 py-1.5 text-sm font-semibold">
                  {l[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[12px] text-[var(--muted)] leading-relaxed whitespace-pre-line text-center">
          {mathDependency.note[lang]}
        </p>
      </div>
    </div>
  );
}

/* ─── Resources ─── */
function Resources({ lang }: { lang: Lang }) {
  return (
    <section id="resources" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-light)] text-lg">🧰</span>
        <h2 className="text-xl font-bold tracking-tight">{crossResources.title[lang]}</h2>
      </div>
      <p className="text-sm text-[var(--muted)] pl-12 mb-5">{crossResources.subtitle[lang]}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {crossResources.items.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-all duration-200 hover:border-[var(--accent-subtle)] hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--section-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider">{item.type[lang]}</span>
              <p className="text-[12px] text-[var(--muted-light)] truncate">{item.desc[lang]}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Discussion (giscus) ─── */
function Discussion({ lang }: { lang: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "nolanwang-uk/ai-cookbook");
    script.setAttribute("data-repo-id", "R_kgDOR2wooA");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOR2wooM4C5ww1");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", lang === "zh" ? "zh-CN" : "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);
  }, [lang]);

  return (
    <section id="discussion" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-light)] text-lg">💬</span>
        <h2 className="text-xl font-bold tracking-tight">{lang === "zh" ? "讨论区" : "Discussion"}</h2>
      </div>
      <p className="text-sm text-[var(--muted)] pl-12 mb-5">
        {lang === "zh"
          ? "使用 GitHub 账号登录即可参与讨论，分享学习经验或提出问题。"
          : "Sign in with GitHub to join the discussion, share your experience, or ask questions."}
      </p>
      <div ref={containerRef} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 min-h-[200px]" />
    </section>
  );
}

/* ─── Sidebar ─── */
function Sidebar({ lang, activeId }: { lang: Lang; activeId: string }) {
  const navItems = [
    { id: "roadmap", label: `🗺️ ${lang === "zh" ? "学习旅程" : "Journey"}`, indent: false },
    ...sections.map((s) => ({ id: s.id, label: `${s.emoji} ${s.title[lang]}`, indent: false })),
    { id: "resources", label: `🧰 ${lang === "zh" ? "百宝箱" : "Toolbox"}`, indent: false },
    { id: "discussion", label: `💬 ${lang === "zh" ? "讨论区" : "Discussion"}`, indent: false },
  ];

  return (
    <nav className="hidden lg:flex flex-col gap-0.5 sticky top-20 self-start w-52 shrink-0">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-light)] mb-2 px-3">
        {lang === "zh" ? "目录" : "Contents"}
      </div>
      {navItems.map((item) => (
        <a key={item.id} href={`#${item.id}`}
          className={`rounded-lg px-3 py-1.5 text-[13px] transition-all duration-150 ${
            activeId === item.id
              ? "nav-active"
              : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--section-bg)]"
          }`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [activeId, setActiveId] = useState("roadmap");

  const allIds = ["roadmap", ...sections.map((s) => s.id), "resources", "discussion"];

  const handleScroll = useCallback(() => {
    const offsets = allIds
      .map((id) => { const el = document.getElementById(id); return el ? { id, top: el.getBoundingClientRect().top } : null; })
      .filter(Boolean) as { id: string; top: number }[];
    const active = offsets.reduce((best, cur) => (cur.top <= 120 && cur.top > (best?.top ?? -Infinity) ? cur : best), offsets[0]);
    if (active) setActiveId(active.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--divider)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)] text-white text-sm font-bold shadow-sm shadow-[var(--accent)]/20">AI</span>
            <span className="font-bold text-sm tracking-tight">{siteTitle[lang]}</span>
          </a>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Hero */}
      <div className="hero-gradient">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent-subtle)]/30 px-3 py-1 text-xs font-medium text-[var(--accent)] mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
              </span>
              {lang === "zh" ? "2026 版持续更新中" : "Continuously updated for 2026"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
              <span className="text-gradient">{siteTitle[lang]}</span>
            </h1>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">{siteSubtitle[lang]}</p>
            <p className="text-sm text-[var(--muted-light)] mt-3 max-w-xl leading-relaxed">
              {lang === "zh"
                ? "涵盖 5 大数学基础、10+ 研究与应用方向、100+ 精选资源。按学习阶段组织，适合从零开始到进阶研究。"
                : "Covering 5 math foundations, 10+ research & application areas, 100+ curated resources. Organized by learning phase, from beginner to advanced."}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--divider)]" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-14">
          <Sidebar lang={lang} activeId={activeId} />
          <main className="flex-1 min-w-0 space-y-24">
            {/* Roadmap first */}
            <Roadmap lang={lang} />

            {/* Sections by phase */}
            {sections.map((section) => (
              <SectionView key={section.id} section={section} lang={lang} />
            ))}

            {/* Toolbox & Discussion */}
            <Resources lang={lang} />
            <Discussion lang={lang} />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--divider)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--accent)] text-white text-xs font-bold">AI</span>
              <span className="text-sm font-semibold">{siteTitle[lang]}</span>
            </div>
            <p className="text-xs text-[var(--muted-light)]">
              {lang === "zh" ? "数据截至 2026 年 · 开源学习路线图" : "Data as of 2026 · Open-source learning roadmap"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

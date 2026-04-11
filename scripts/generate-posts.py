#!/usr/bin/env python3
"""AI Cookbook Blog Post Generator."""
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

SHANGHAI_TZ = timezone(timedelta(hours=8))

# Cover images for each post type
COVER_IMAGES = {
    "coding_tools": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&q=80",
    "karpathy": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&h=630&fit=crop&q=80",
    "fastai": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=630&fit=crop&q=80",
    "agents": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80",
    "routing": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80",
    "videos": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=630&fit=crop&q=80",
    "dlai": "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=630&fit=crop&q=80",
    "vibe": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop&q=80",
}


def today():
    return datetime.now(SHANGHAI_TZ).strftime("%Y-%m-%d")


def yesterday():
    return (datetime.now(SHANGHAI_TZ) - timedelta(days=1)).strftime("%Y-%m-%d")


def get_posts():
    t, y = today(), yesterday()
    return [
        post_coding_tools(t),
        post_karpathy(t),
        post_fastai(y),
        post_agents(y),
        post_routing(y),
        post_videos(t),
        post_dlai(t),
        post_vibe(t),
    ]


def post_coding_tools(t):
    return {
        "id": "010",
        "slug": f"ai-coding-tools-march-2026-{t}",
        "title": "The AI Coding Tool Landscape in March 2026",
        "excerpt": "From Cursor Agent Mode to Windsurf Cascade 2.0 and Claude Code CLI -- the AI IDE space has evolved dramatically. Here is what actually moved the needle.",
        "content": f"""## The AI Coding Tool Landscape in March 2026

The AI coding assistant space has reached an interesting inflection point. After a year of rapid innovation, tools are converging on similar capabilities while differentiating on UX.

### Cursor Agent Mode Goes Production-Ready

Cursor's Agent Mode graduated from preview to stable:
- **Plan review before execution** -- see proposed changes before applying
- **Multi-file refactoring** -- agents understand cross-file dependencies
- **Terminal integration** -- can run tests and iterate on failures automatically

### Windsurf Cascade 2.0

Codeium's Windsurf introduced Cascade 2.0:
- **Multi-step reasoning chains** -- break complex tasks into 10+ sub-steps
- **Session memory** -- remembers what you were working on across days
- **Codebase-wide awareness** -- now indexes your full project like Cursor

### Claude Code CLI Goes Mainstream

Anthropic's Claude Code CLI is the go-to for terminal-first developers:
- **Natural language to git operations** -- just type what you want
- **Deep codebase understanding** -- extended thinking handles large repos
- **Subagent spawning** -- delegate independent tasks to parallel workers

### The Verdict

- **Cursor wins** on full-stack web development workflows
- **Windsurf wins** on conversational debugging and learning
- **Claude Code wins** on terminal-native workflows and DevOps

### What's Next

- AI that writes specs before code
- Multi-agent code review (security, performance, accessibility)
- Voice-driven development

---
*Published: {t}*""",
        "category": "New AI Tools",
        "publishedAt": f"{t}T08:00:00+08:00",
        "sources": [
            {"name": "Cursor.sh", "url": "https://cursor.sh/"},
            {"name": "Windsurf", "url": "https://codeium.com/windsurf"},
            {"name": "Claude Code", "url": "https://www.anthropic.com/claude-code"},
        ],
        "tags": ["Cursor", "Windsurf", "Claude Code", "IDE", "Vibe Coding"],
        "coverImage": COVER_IMAGES["coding_tools"],
    }


def post_karpathy(t):
    return {
        "id": "011",
        "slug": f"karpathy-nn-zero-to-hero-{t}",
        "title": "Why Karpathy's Neural Networks Zero to Hero Still Reigns Supreme",
        "excerpt": "Andrej Karpathy's PyTorch-from-scratch series remains the best way to truly understand how LLMs work under the hood.",
        "content": f"""## Why Karpathy's 'Neural Networks: Zero to Hero' Still Reigns Supreme

In the age of one-click fine-tuning, it is tempting to skip the fundamentals. Here is why you should not.

### The Series

Karpathy builds a GPT-like model from scratch in PyTorch, from character-level tokenization to a full transformer.

### Why It Still Matters

#### 1. Intuition Over Incantation

Most LLM tutorials treat transformers as magic. Karpathy shows you every line of code.

#### 2. The Aha Moments

- Lecture 2: Building a bigram model from scratch
- Lecture 5: Building GPT from scratch (the legendary one)
- Lecture 7: The Transformer, component by component

#### 3. You Cannot Debug What You Do Not Understand

When your RAG pipeline hallucinates, developers who thrive understand what is happening under the hood.

### Watch It

- https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- https://www.bilibili.com/video/BV1Jz6SYbEiW/ (Chinese subtitles)

### Pro Tip

Watch the micrograd playlist first, then do the nn playlist. The payoff is enormous.

---
*Published: {t}*""",
        "category": "Video Explainers",
        "publishedAt": f"{t}T08:00:00+08:00",
        "sources": [
            {"name": "Andrej Karpathy (YouTube)", "url": "https://www.youtube.com/@AndrejKarpathy"},
            {"name": "micrograd", "url": "https://github.com/karpathy/micrograd"},
        ],
        "tags": ["Karpathy", "Education", "YouTube", "PyTorch", "LLM"],
        "coverImage": COVER_IMAGES["karpathy"],
    }


def post_fastai(y):
    return {
        "id": "012",
        "slug": f"fastai-practical-deep-learning-update-{y}",
        "title": "Fast.ai's Practical Deep Learning Gets a Major 2026 Update",
        "excerpt": "Jeremy Howard's legendary free course has been refreshed with LLM application engineering, RAG patterns, and agent design.",
        "content": f"""## Fast.ai Gets a Major 2026 Update

Jeremy Howard updated 'Practical Deep Learning for Coders' for 2026.

### What's New

#### LLM Application Engineering

- Prompt engineering patterns that work in production
- RAG design: chunking, retrieval, re-ranking
- Function calling and tool augmentation
- Evaluation: how to know if your LLM app is any good

#### Agent Design

New practical examples building agentic systems with lightweight frameworks.

### Why Fast.ai Is Different

Jeremy Howard's approach is **top-down** -- build something real first, understand the math later.

### Get Started

- https://course.fast.ai/
- https://forums.fast.ai/

---
*Published: {y}*""",
        "category": "AI Innovations",
        "publishedAt": f"{y}T08:00:00+08:00",
        "sources": [
            {"name": "Fast.ai", "url": "https://course.fast.ai/"},
            {"name": "Fast.ai Forums", "url": "https://forums.fast.ai/"},
        ],
        "tags": ["Fast.ai", "Deep Learning", "LLM", "Course"],
        "coverImage": COVER_IMAGES["fastai"],
    }


def post_agents(y):
    return {
        "id": "013",
        "slug": f"ai-agent-production-systems-{y}",
        "title": "AI Agents in Production: 5 Real Systems That Actually Ship Value",
        "excerpt": "Five production AI agent systems delivering measurable ROI today -- with architectures, tools, and lessons learned.",
        "content": f"""## AI Agents in Production: 5 Real Systems

### 1. Automated Customer Support Triage

- **What**: Reads tickets, classifies, routes, drafts responses
- **Tools**: Claude 3.7 + RAG on knowledge base
- **ROI**: 60% reduction in first-response time

### 2. Code Review Assistant

- **What**: Reviews every PR for security, performance, style
- **Tools**: AST parser + LLM analysis
- **ROI**: Catches ~25% of bugs before human review

### 3. Research Synthesis Agent

- **What**: Searches web, reads papers, synthesizes report with citations
- **Tools**: Browser automation + LLM + RAG
- **ROI**: Research time from days to hours

### 4. Data Pipeline Monitor

- **What**: Monitors data quality, detects anomalies, explains and suggests fixes
- **Tools**: Airflow + dbt + LLM explanation layer
- **ROI**: 80% reduction in data incident MTTR

### 5. Documentation Maintainer

- **What**: Reads PR diffs, updates affected docs automatically
- **Tools**: GitHub Actions + LLM with codebase context
- **ROI**: Docs stay current without manual effort

### Key Lessons

1. **Agents are great at reading, mediocre at writing**
2. **Give them tool access** -- function calling is the killer feature
3. **Human-in-the-loop always pays off**
4. **Evaluation is the hardest part**

---
*Published: {y}*""",
        "category": "Use Cases",
        "publishedAt": f"{y}T08:00:00+08:00",
        "sources": [
            {"name": "Hacker News", "url": "https://news.ycombinator.com/"},
            {"name": "Anthropic case studies", "url": "https://www.anthropic.com/customers"},
        ],
        "tags": ["AI Agents", "Production", "Case Studies", "ROI"],
        "coverImage": COVER_IMAGES["agents"],
    }


def post_routing(y):
    return {
        "id": "014",
        "slug": f"smart-model-routing-guide-{y}",
        "title": "Smart Model Routing: Save 80% on AI Costs with Intelligent Dispatching",
        "excerpt": "Stop paying for Claude Opus when Gemma 4 handles it. Here is a practical guide to 3-tier model routing.",
        "content": f"""## Smart Model Routing: The 3-Tier Approach

### The Problem

Most AI apps route every request to the most expensive model, wasting money on simple tasks.

### The Solution

- **Tier 1** -- Local model (Gemma4 on Ollama) = $0
- **Tier 2** -- Claude Sonnet / GPT-4o-mini = $0.03/request
- **Tier 3** -- Claude Opus / GPT-4o = $1.50/request

### How It Works

1. Try local Gemma4 first -- handles 70%+ of daily tasks at zero cost
2. If confidence is low, escalate to Sonnet
3. Only use Opus for the genuinely hardest problems

### Results

- **70-80% cost reduction** on routine tasks
- **Better response times** (local is instant)
- **Privacy wins** (sensitive data stays local)

### Key Insight

Your expensive model is wasted on formatting, summarization, and classification. Reserve it for genuine reasoning.

---
*Published: {y}*""",
        "category": "Hot Takes",
        "publishedAt": f"{y}T08:00:00+08:00",
        "sources": [
            {"name": "OpenRouter", "url": "https://openrouter.ai/"},
            {"name": "Ollama", "url": "https://ollama.com/"},
            {"name": "Anthropic Pricing", "url": "https://www.anthropic.com/pricing"},
        ],
        "tags": ["Cost Optimization", "Model Routing", "OpenRouter", "Ollama", "Gemma"],
        "coverImage": COVER_IMAGES["routing"],
    }


def post_videos(t):
    return {
        "id": "015",
        "slug": f"ai-video-explainers-picks-{t}",
        "title": "Top 5 AI Video Explainers This Week: YouTube + Bilibili",
        "excerpt": "The best AI explanation videos -- from Karpathy's latest to Chinese creators breaking down the newest techniques.",
        "content": f"""## Top 5 AI Video Explainers This Week

### 1. Karpathy: The State of LLM Agents

Andrej breaks down the LLM agent landscape -- what works, what does not.

- https://www.youtube.com/@AndrejKarpathy

### 2. AI Explained: The Truth About Cursor's Agent Mode

An honest teardown -- no marketing, just code analysis.

- https://www.youtube.com/@aiexplained-official

### 3. 李宏毅: LLM 微调最新方法综述

台大李宏毅老师综述了最新 LLM 微调方法 -- DPO、ORPO、SimPO。

- YouTube @HungyiLeeNTU / B站

### 4. Fireship: Vibe Coding Updated

Quick overview of Bolt.new, v0, Lovable.

- https://www.youtube.com/@Fireship

### 5. Theo: Why I Stopped Using AI Coding Tools (And Started Again)

A candid personal take on the AI coding tool journey.

- https://www.youtube.com/@t3dotgg

### Bilibili 特别推荐

- 李沐：最新大模型论文精读系列
- 同济子豪兄：AI 智能体实战教程
- 跟李沐学AI：每周更新深度学习前沿内容

---
*Published: {t}*""",
        "category": "Video Explainers",
        "publishedAt": f"{t}T08:00:00+08:00",
        "sources": [
            {"name": "YouTube - Karpathy", "url": "https://www.youtube.com/@AndrejKarpathy"},
            {"name": "Bilibili - 李宏毅", "url": "https://www.bilibili.com/video/BV1TAtwzTE1S/"},
            {"name": "Bilibili - 李沐", "url": "https://www.bilibili.com/video/BV1f5411P769/"},
        ],
        "tags": ["YouTube", "Bilibili", "Video", "Education", "Karpathy"],
        "coverImage": COVER_IMAGES["videos"],
    }


def post_dlai(t):
    return {
        "id": "016",
        "slug": f"deeplearning-ai-courses-review-{t}",
        "title": "DeepLearning.AI Course Review: Best Short Courses in 2026",
        "excerpt": "Andrew Ng's DeepLearning.AI has 50+ short courses. Here is our ranked list for practicing AI engineers.",
        "content": f"""## DeepLearning.AI: Best Short Courses for 2026

### Must-Take

#### 1. ChatGPT Prompt Engineering for Developers

- **Time**: ~1 hour -- Still the clearest introduction to prompt patterns

#### 2. Building Systems with the ChatGPT API

- **Time**: ~1 hour -- Covers chains, evaluation, production considerations

#### 3. LangChain for LLM Application Development

- **Time**: ~1 hour -- Practical patterns for real-world LLM apps

### Highly Recommended

#### 4. Finetuning Large Language Models

Covers LoRA, QLoRA, and when to fine-tune vs prompt

#### 5. Evaluating and Debugging LLM Applications

The only course that teaches systematic LLM evaluation

#### 6. Multi-AI Agent Systems with CrewAI

Practical multi-agent architecture patterns

### Where

- https://www.deeplearning.ai/short-courses/
- https://www.coursera.org/

---
*Published: {t}*""",
        "category": "AI Innovations",
        "publishedAt": f"{t}T08:00:00+08:00",
        "sources": [
            {"name": "DeepLearning.AI", "url": "https://www.deeplearning.ai/short-courses/"},
            {"name": "Coursera", "url": "https://www.coursera.org/"},
        ],
        "tags": ["DeepLearning.AI", "Coursera", "Course", "LLM"],
        "coverImage": COVER_IMAGES["dlai"],
    }


def post_vibe(t):
    return {
        "id": "017",
        "slug": f"vibe-coding-deep-dive-{t}",
        "title": "Vibe Coding Deep Dive: From Bolt.new to Production",
        "excerpt": "Vibe coding is incredible for prototypes, but what happens when you need to ship? We tested the entire pipeline.",
        "content": f"""## Vibe Coding Deep Dive

You describe what you want in natural language. An AI builds it. A few minutes later, you have a working web app.

### The Pipeline

1. **Bolt.new** -- Generate initial app from description
2. **Iterate** -- Refine with natural language feedback
3. **Export** -- Download the code
4. **Hand-off** -- Open in Cursor/VS Code for polish
5. **Deploy** -- Push to Vercel/Cloudflare

### What Works

- **Landing pages** -- 10/10, indistinguishable from hand-crafted
- **Dashboards with CRUD** -- 8/10, needs minor tweaks
- **Internal tools** -- 9/10, perfect use case
- **Prototypes** -- 10/10, the killer use case

### Where It Breaks

- **Complex state management** -- AI struggles with multi-component state
- **Authentication** -- security-critical code needs human review
- **Performance** -- AI generates code that works, not code that scales
- **Accessibility** -- AI does not think about a11y

### The Best Workflow

1. Vibe code the scaffold (80% done)
2. Hand-code critical paths (auth, payments, performance)
3. Vibe code the rest (forms, tables, static pages)
4. Human review everything

### The Verdict

> Vibe coding is to development what power tools are to carpentry.

---
*Published: {t}*""",
        "category": "Hot Takes",
        "publishedAt": f"{t}T08:00:00+08:00",
        "sources": [
            {"name": "Bolt.new", "url": "https://bolt.new/"},
            {"name": "Vercel v0", "url": "https://v0.dev/"},
            {"name": "Lovable", "url": "https://lovable.dev/"},
        ],
        "tags": ["Vibe Coding", "Bolt", "v0", "Lovable", "Development"],
        "coverImage": COVER_IMAGES["vibe"],
    }


def main():
    dry_run = "--dry-run" in sys.argv
    file_path = Path(__file__).parent.parent / "app" / "data" / "posts.json"

    new_posts = get_posts()

    if dry_run:
        print(f"Dry run -- would add {len(new_posts)} posts:")
        for p in new_posts:
            print(f"  [{p['category']}] {p['title']}")
        return

    if file_path.exists():
        with open(file_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
    else:
        existing = []

    existing_slugs = {p.get("slug") for p in existing}
    unique_new = [p for p in new_posts if p["slug"] not in existing_slugs]

    if not unique_new:
        print("All posts already exist (duplicate slugs)")
        return

    all_posts = unique_new + existing
    if len(all_posts) > 50:
        all_posts = all_posts[:50]

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(all_posts, f, ensure_ascii=False, indent=2)

    print(f"Added {len(unique_new)} new posts ({len(all_posts)} total)")
    for p in unique_new:
        print(f"  + [{p['category']}] {p['title'][:70]}...")


if __name__ == "__main__":
    main()

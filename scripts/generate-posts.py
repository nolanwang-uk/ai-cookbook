#!/usr/bin/env python3
"""
AI Cookbook Blog Post Generator
Automatically gathers AI news, tools, videos, and innovations from various sources
and generates daily blog posts.

Sources:
- YouTube: search for trending AI videos
- Bilibili: search for trending AI content
- GitHub trending: AI repositories
- HackerNews: AI-related front page posts
- RSS feeds from AI blogs
- arXiv: latest AI papers

Usage:
  python scripts/generate-posts.py --dry-run    # Preview without writing
  python scripts/generate-posts.py              # Generate and save posts
"""

import json
import os
import sys
import re
import hashlib
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Shanghai timezone (UTC+8)
SHANGHAI_TZ = timezone(timedelta(hours=8))

CATEGORIES = [
    "New AI Tools",
    "Use Cases", 
    "Video Explainers",
    "Hot Takes",
    "Research & Papers",
    "AI Innovations",
    "Industry News",
]

# Content sources configuration
SOURCES = {
    "youtube": {
        "channels": [
            "Andrej Karpathy",
            "Matthew Berman",
            "AI Jason",
            "Fireship",
            "Theo",
            "Nicholas Renotte",
            "Sentdex",
            "Machine Learning Street Talk",
            "Yannic Kilcher",
            "Two Minute Papers",
        ],
        "query_terms": [
            "AI news this week",
            "new AI tools",
            "AI agent tutorial",
            "LLM engineering",
            "AI coding assistant",
            "vibe coding",
        ],
    },
    "bilibili": {
        "query_terms": [
            "AI 工具",
            "大模型",
            "AI 助手",
            "LLM",
            "AI 编程",
        ],
    },
    "hackernews": {
        "url": "https://hacker-news.firebaseio.com/v0/topstories.json",
        "keywords": ["AI", "LLM", "OpenAI", "Anthropic", "Google", "DeepMind", "Machine Learning", "Language Model"],
    },
    "arxiv": {
        "categories": ["cs.AI", "cs.CL", "cs.LG", "cs.CV"],
    },
}


def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def generate_id() -> str:
    """Generate a unique post ID."""
    return datetime.now(SHANGHAI_TZ).strftime('%Y%m%d%H%M%S')


def fetch_hackernews_posts() -> list[dict]:
    """Fetch AI-related posts from Hacker News front page."""
    try:
        import urllib.request
        response = urllib.request.urlopen(SOURCES["hackernews"]["url"], timeout=30)
        top_ids = json.loads(response.read().decode())
        
        posts = []
        for item_id in top_ids[:30]:  # Check top 30 stories
            try:
                url = f"https://hacker-news.firebaseio.com/v0/item/{item_id}.json"
                resp = urllib.request.urlopen(url, timeout=10)
                item = json.loads(resp.read().decode())
                
                if item and item.get("title") and any(
                    kw.lower() in item["title"].lower() 
                    for kw in SOURCES["hackernews"]["keywords"]
                ):
                    posts.append({
                        "title": item["title"],
                        "url": item.get("url", f"https://news.ycombinator.com/item?id={item_id}"),
                        "score": item.get("score", 0),
                        "descendants": item.get("descendants", 0),
                    })
            except Exception:
                continue
        
        return sorted(posts, key=lambda x: x["score"], reverse=True)[:3]
    except Exception as e:
        print(f"⚠️  Failed to fetch Hacker News: {e}")
        return []


def fetch_arxiv_papers() -> list[dict]:
    """Fetch recent AI papers from arXiv."""
    try:
        import urllib.request
        import xml.etree.ElementTree as ET
        
        query = "cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG&sortBy=submittedDate&max_results=10"
        url = f"http://export.arxiv.org/api/query?search_query={query}"
        
        response = urllib.request.urlopen(url, timeout=30)
        data = response.read().decode()
        
        root = ET.fromstring(data)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        
        papers = []
        for entry in root.findall("atom:entry", ns):
            title = entry.find("atom:title", ns).text.strip()
            summary = entry.find("atom:summary", ns).text.strip()
            published = entry.find("atom:published", ns).text
            link = entry.find("atom:id", ns).text
            
            # Clean up title
            title = re.sub(r'\s+', ' ', title)
            
            papers.append({
                "title": title,
                "summary": summary[:300] + "...",
                "published": published,
                "url": link,
            })
        
        return papers[:3]
    except Exception as e:
        print(f"⚠️  Failed to fetch arXiv: {e}")
        return []


def generate_post_from_sources(
    hn_posts: list[dict],
    arxiv_papers: list[dict],
    date: datetime
) -> list[dict]:
    """Generate blog posts from collected sources."""
    posts = []
    
    # Generate posts from Hacker News
    for item in hn_posts[:2]:
        score = item["score"]
        comments = item["descendants"]
        
        post = {
            "id": generate_id() + f"hn{random.randint(100,999)}",
            "slug": slugify(item["title"]) + f"-{date.strftime('%Y%m%d')}",
            "title": f"HN Trending: {item['title']}",
            "excerpt": f"Trending on Hacker News with {score} points and {comments} comments. Click to read the full discussion.",
            "content": generate_hn_discussion_content(item),
            "category": random.choice(["Industry News", "Hot Takes"]),
            "publishedAt": date.strftime('%Y-%m-%dT08:00:00+08:00'),
            "sources": [
                {"name": "Hacker News", "url": item.get("url", "https://news.ycombinator.com/")},
                {"name": "HN Discussion", "url": f"https://news.ycombinator.com/item?id={item['id']}" if 'id' in item else ""},
            ],
            "tags": ["Hacker News", "Trending"] + extract_tags(item["title"]),
        }
        posts.append(post)
    
    # Generate posts from arXiv
    for paper in arxiv_papers[:1]:
        post = {
            "id": generate_id() + f"arxiv{random.randint(100,999)}",
            "slug": slugify(paper["title"].split(". ")[0])[:80] + f"-{date.strftime('%Y%m%d')}",
            "title": f"📄 New Paper: {paper['title']}",
            "excerpt": paper["summary"][:200] + "...",
            "content": generate_arxiv_content(paper),
            "category": "Research & Papers",
            "publishedAt": date.strftime('%Y-%m-%dT08:00:00+08:00'),
            "sources": [
                {"name": "arXiv", "url": paper["url"]},
            ],
            "tags": ["arXiv", "Research", "Paper"] + extract_categories_from_arxiv(paper),
        }
        posts.append(post)
    
    return posts


def generate_hn_discussion_content(item: dict) -> str:
    """Generate formatted content for a HN post."""
    return f"""## Hacker News Discussion Summary

**Title**: {item['title']}

**Score**: {item['score']} points · {item['descendants']} comments

## Why This Matters

This topic is trending on Hacker News, indicating strong community interest and technical significance.

## Key Discussion Points

The community discussion covers:
- Technical implications and trade-offs
- Real-world use cases and examples
- Comparisons with alternative approaches

## Community Sentiment

With {item['score']} upvotes, this post resonates strongly with the developer community.

## Continue Reading

- Full discussion: https://news.ycombinator.com/
- Original article: {item.get('url', 'N/A')}

---
*This post was auto-generated from HN trending data.*
"""


def generate_arxiv_content(paper: dict) -> str:
    """Generate formatted content for an arXiv paper."""
    return f"""## Paper Summary

**Title**: {paper['title']}

**Abstract**:

{paper['summary']}

## Key Contributions

Based on the abstract, this paper makes the following contributions:
- Novel approach to the problem
- Empirical evaluation on standard benchmarks
- Open-source implementation (if available)

## Why It Matters

This research represents the cutting edge of AI development and could influence future model architectures and training paradigms.

## How to Follow Up

1. Read the full paper: {paper['url']}
2. Check for code implementations on GitHub
3. Watch for related discussion on Reddit and HN
4. Look for video explanations on YouTube/Bilibili

## Video Explanations (Coming Soon)

- YouTube: Search for the paper title
- Bilibili: 搜索论文标题获取中文解读

---
*This post was auto-generated from arXiv API data.*
"""


def extract_tags(title: str) -> list[str]:
    """Extract tags from a title."""
    tags = []
    mapping = {
        "OpenAI": "OpenAI",
        "Anthropic": "Anthropic", 
        "Google": "Google",
        "Meta": "Meta",
        "GPT": "GPT",
        "Claude": "Claude",
        "Gemini": "Gemini",
        "LLaMA": "LLaMA",
        "agent": "Agents",
        "Agent": "Agents",
        "RAG": "RAG",
        "fine-tun": "Fine-tuning",
        "inference": "Inference",
        "coding": "Coding",
        "programming": "Coding",
    }
    for keyword, tag in mapping.items():
        if keyword in title:
            tags.append(tag)
    return list(set(tags[:3]))


def extract_categories_from_arxiv(paper: dict) -> list[str]:
    """Extract categories from arXiv paper."""
    cats = []
    text = paper.get("title", "").lower() + " " + paper.get("summary", "").lower()
    if "vision" in text or "image" in text:
        cats.append("Computer Vision")
    if "language" in text or "text" in text:
        cats.append("NLP")
    if "reinforcement" in text:
        cats.append("Reinforcement Learning")
    return cats


def load_existing_posts(filepath: str) -> list[dict]:
    """Load existing posts from JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_posts(posts: list[dict], filepath: str) -> None:
    """Save posts to JSON file."""
    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(posts)} posts to {filepath}")


def main():
    dry_run = "--dry-run" in sys.argv
    date = datetime.now(SHANGHAI_TZ)
    
    print(f"🤖 AI Cookbook Blog Generator")
    print(f"📅 Date: {date.strftime('%Y-%m-%d %H:%M CST')}")
    print(f"{'🔍 DRY RUN MODE' if dry_run else '📝 GENERATING POSTS'}")
    print("-" * 50)
    
    # Fetch from sources
    print("📡 Fetching Hacker News...")
    hn_posts = fetch_hackernews_posts()
    print(f"  Found {len(hn_posts)} AI-related HN posts")
    
    print("📡 Fetching arXiv papers...")
    arxiv_papers = fetch_arxiv_papers()
    print(f"  Found {len(arxiv_papers)} recent papers")
    
    # Generate posts
    new_posts = generate_post_from_sources(hn_posts, arxiv_papers, date)
    print(f"\n📝 Generated {len(new_posts)} new posts")
    
    for post in new_posts:
        print(f"  ✓ {post['category']}: {post['title'][:60]}...")
    
    if dry_run:
        print("\n🔍 Dry run - not saving changes")
        return
    
    # Load existing posts and prepend new ones
    posts_file = "app/data/posts.json"
    existing_posts = load_existing_posts(posts_file)
    
    # Avoid duplicates by checking slugs
    existing_slugs = {p.get("slug") for p in existing_posts}
    new_unique = [p for p in new_posts if p["slug"] not in existing_slugs]
    
    if not new_unique:
        print("⏭️  No new posts (all duplicates)")
        return
    
    # Prepend new posts
    all_posts = new_unique + existing_posts
    
    # Keep max 100 posts
    if len(all_posts) > 100:
        all_posts = all_posts[:100]
        print(f"📦 Trimmed to 100 most recent posts")
    
    save_posts(all_posts, posts_file)
    print(f"\n🎉 Added {len(new_unique)} new posts!")


if __name__ == "__main__":
    main()

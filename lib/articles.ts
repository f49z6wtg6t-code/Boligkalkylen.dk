import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: "solceller" | "badevaerelse" | "generelt";
  publishedAt: string;
  relatedCalculator?: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export function getAllArticles(): ArticleFrontmatter[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const today = new Date().toISOString().split("T")[0];

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return data as ArticleFrontmatter;
    })
    .filter((a) => a.publishedAt <= today)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return { ...(data as ArticleFrontmatter), content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

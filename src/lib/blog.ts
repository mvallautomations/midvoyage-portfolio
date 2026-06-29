export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  relatedWork?: string;
}

const posts: BlogPost[] = [
  {
    slug: "kuya-koks-brand-audit-first",
    title: "Kuya Kok's Brand Audit First: Why Automations Fail Without Identity Alignment",
    date: "2026-06-28",
    excerpt:
      "Dispatches on why we paused n8n automation deployment until Kuya-Kok's brand architecture and customer ordering flows were standardized.",
    tags: ["brand-audit", "systems-architecture", "n8n", "ai-agents"],
    relatedWork: "Kuya Kok's Griddle & Grill",
  },
  {
    slug: "zero-budget-build-stack",
    title: "My Zero-Budget Build Stack in 2026",
    date: "2026-03-27",
    excerpt:
      "The exact free tools and constraints I use to ship websites and AI workflows as a solo builder.",
    tags: ["stack", "solo-founder", "workflow"],
    relatedWork: "Kuya Kok's Griddle & Grill",
  },
  {
    slug: "why-mid-voyage-exists",
    title: "Why mid.voyage Exists",
    date: "2026-03-26",
    excerpt:
      "A working notebook for experiments, client constraints, and honest notes from building in public.",
    tags: ["notes", "portfolio", "build-in-public"],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

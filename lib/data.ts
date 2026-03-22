import { prisma } from "@/lib/db";

export type Project = {
  slug: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  hero: string;
  metrics: string[];
  challenge: string;
  solution: string;
  outcome: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  cover: string;
  content: string;
};

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  division?: string;
};

export type TeamDivision = {
  name: string;
  members: TeamMember[];
};

export type Testimonial = {
  name: string;
  company: string;
  quote: string;
};

export const metrics = [
  { label: "Enterprise launches", value: "48+" },
  { label: "AI workflows shipped", value: "120+" },
  { label: "Average performance gain", value: "3.2x" },
  { label: "Funding raised by clients", value: "$42M" }
];

export const services = [
  {
    title: "Web Development",
    description: "Performance-first product platforms built with modern frontend and backend architecture.",
    points: ["Next.js platforms", "API design", "Conversion systems"]
  },
  {
    title: "Mobile App Development",
    description: "Native-feeling applications that connect customer experience with internal operations.",
    points: ["Cross-platform UX", "Offline-ready flows", "Realtime sync"]
  },
  {
    title: "Artificial Intelligence",
    description: "Applied AI systems for analytics, automation, and domain-specific decision support.",
    points: ["LLM workflows", "RAG systems", "Predictive analytics"]
  },
  {
    title: "Cloud Engineering",
    description: "Resilient infrastructure for scale, observability, and secure delivery pipelines.",
    points: ["Platform engineering", "CI/CD", "Cost controls"]
  },
  {
    title: "Product Design",
    description: "Brand-aligned interfaces with systemized UX and strong conversion behavior.",
    points: ["Design systems", "UX strategy", "Prototyping"]
  },
  {
    title: "Enterprise Software",
    description: "Operational software for internal teams, multi-tenant products, and complex data domains.",
    points: ["Role-based portals", "Workflow tooling", "Data integrations"]
  }
];

export const projects: Project[] = [
  {
    slug: "ai-analytics-platform",
    name: "AI Analytics Platform",
    description: "A predictive intelligence suite turning fragmented operational data into executive insight.",
    category: "Artificial Intelligence",
    technologies: ["Next.js", "Python", "PostgreSQL", "OpenAI"],
    hero: "A decision intelligence control room for sales, forecasting, and customer health.",
    metrics: ["Forecast accuracy +37%", "Decision latency -62%", "Executive adoption in 3 weeks"],
    challenge:
      "The client had siloed revenue, CRM, and support data that made forecasting reactive and unreliable.",
    solution:
      "We built a unified analytics platform with AI-assisted scenario planning, anomaly detection, and a narrative insight layer.",
    outcome:
      "Leadership teams moved from spreadsheet reviews to live forecasting with trusted alerting and board-ready reporting."
  },
  {
    slug: "fintech-saas-dashboard",
    name: "FinTech SaaS Dashboard",
    description: "A multi-tenant financial operations workspace for compliance, payments, and client reporting.",
    category: "Financial Technology",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    hero: "Operational visibility for regulated finance teams managing risk and customer performance.",
    metrics: ["Onboarding time -55%", "Audit prep -70%", "CSAT 4.8/5"],
    challenge: "Legacy admin tooling slowed onboarding and introduced compliance reporting gaps.",
    solution:
      "Amolex delivered a modern dashboard with tenant-aware permissions, configurable widgets, and exportable audit trails.",
    outcome:
      "Operations teams reduced manual reconciliation and created a cleaner path from onboarding to expansion revenue."
  },
  {
    slug: "healthcare-data-system",
    name: "Healthcare Data System",
    description: "A secure data orchestration layer for clinical reporting and internal care operations.",
    category: "Healthcare",
    technologies: ["TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    hero: "Protected workflow infrastructure for distributed healthcare teams handling sensitive data.",
    metrics: ["Processing time -44%", "Reporting accuracy +29%", "Multi-site rollout in 6 weeks"],
    challenge:
      "The provider needed a structured system for intake, analysis, and reporting across separate facilities.",
    solution:
      "We built a role-based platform with automated validation, reporting templates, and secure data handling practices.",
    outcome:
      "Teams standardized operational reporting and eliminated repeated manual quality checks across the network."
  },
  {
    slug: "e-commerce-platform",
    name: "E-Commerce Platform",
    description: "A conversion-led commerce stack for merchandising, subscription flows, and lifecycle growth.",
    category: "Commerce",
    technologies: ["Next.js", "Stripe", "Framer Motion", "Vercel"],
    hero: "A premium storefront and customer account experience built for retention.",
    metrics: ["Conversion +24%", "Page speed +41%", "Average order value +18%"],
    challenge: "The brand had strong traffic but weak merchandising systems and limited lifecycle automation.",
    solution:
      "We designed a fast commerce platform with modular storytelling, subscription flows, and advanced retention funnels.",
    outcome:
      "The business gained stronger merchandising control while improving speed, retention, and launch velocity."
  },
  {
    slug: "logistics-ai-platform",
    name: "Logistics AI Platform",
    description: "An intelligent planning platform for routing, fleet visibility, and demand-aware optimization.",
    category: "Supply Chain",
    technologies: ["React", "Three.js", "Prisma", "PostgreSQL"],
    hero: "Live route orchestration and predictive capacity planning for modern logistics operators.",
    metrics: ["Fuel cost -16%", "ETA accuracy +31%", "Planner efficiency +52%"],
    challenge:
      "Manual planning and disconnected visibility tools limited route confidence and operational efficiency.",
    solution:
      "We shipped a command-center style product with predictive planning models, map intelligence, and fleet alerts.",
    outcome:
      "Dispatch teams coordinated faster and made better allocation decisions during peak demand windows."
  }
];

export const posts: Post[] = [
  {
    slug: "how-ai-workflows-change-enterprise-software",
    title: "How AI Workflows Change Enterprise Software",
    excerpt: "AI features are not enough. Durable enterprise products need workflow-level intelligence.",
    category: "Artificial Intelligence",
    publishedAt: "2026-02-18",
    readTime: "6 min read",
    featured: true,
    cover: "AI systems strategy",
    content: `## Workflow intelligence beats isolated features

Teams do not buy AI because a model exists. They buy it because it shortens the path between signal and action.

## What changes in practice

- AI should sit inside the operating flow, not beside it.
- Outputs need confidence, traceability, and review states.
- Product teams must design around handoff, not novelty.

## The operating model

The strongest enterprise AI products combine structured data, retrieval, model orchestration, and role-based controls. That stack creates trust and speed at the same time.`
  },
  {
    slug: "building-design-systems-that-scale-with-startups",
    title: "Building Design Systems That Scale With Startups",
    excerpt: "A good design system is not visual polish. It is operational leverage for product teams.",
    category: "Product Design",
    publishedAt: "2026-01-29",
    readTime: "5 min read",
    featured: true,
    cover: "Design systems",
    content: `## Start with decisions, not components

The first version of a design system should encode the product's real decisions: spacing, hierarchy, states, motion, and tone.

## What founders miss

Fast teams often skip system design because they assume it slows shipping. In practice, a clear system reduces churn, improves brand consistency, and makes experiments cheaper.`
  },
  {
    slug: "why-platform-engineering-matters-for-modern-startups",
    title: "Why Platform Engineering Matters for Modern Startups",
    excerpt: "Product velocity starts to stall when infrastructure decisions stay ad hoc for too long.",
    category: "Software Engineering",
    publishedAt: "2025-12-11",
    readTime: "7 min read",
    featured: false,
    cover: "Platform engineering",
    content: `## Engineering leverage

Platform engineering is the discipline of removing repeated friction from the delivery lifecycle.

## Practical outcomes

- Faster releases
- Better observability
- Lower operational risk
- More predictable costs`
  },
  {
    slug: "from-product-idea-to-investor-ready-platform",
    title: "From Product Idea to Investor-Ready Platform",
    excerpt: "Serious startup platforms need more than a landing page. They need proof of execution.",
    category: "Startup Innovation",
    publishedAt: "2025-11-02",
    readTime: "4 min read",
    featured: false,
    cover: "Startup execution",
    content: `## What investors actually see

Investors notice product maturity through clarity, system thinking, and execution detail.

## What that means for digital presence

Your site, product architecture, analytics, and operating dashboard should all tell the same story: this team can ship and scale.`
  }
];

export const teamMembers: TeamMember[] = [
  // Executive Leadership
  { name: "Tewodros Abrham", role: "General Manager & Co‑Founder", focus: "Provides overall leadership, strategic vision, and organizational direction", division: "Executive Leadership" },
  { name: "Natnael Kibatu", role: "Deputy Manager & Co‑Founder", focus: "Supports executive management, oversees operations, and ensures project execution", division: "Executive Leadership" },
  // Strategic Division
  { name: "Selamawit Tesfaye", role: "Head of Digital Strategy & Consulting", focus: "Leads digital transformation initiatives and aligns technology with business objectives", division: "Strategic Division" },
  { name: "Meron Yohannes", role: "Brand & Campaign Strategist", focus: "Develops brand positioning, manages integrated campaigns, and strengthens market presence", division: "Strategic Division" },
  // Creative Division
  { name: "Dawit Mekonnen", role: "Creative Director, Content & Storytelling", focus: "Directs content creation, brand narratives, and visual communication strategies", division: "Creative Division" },
  { name: "Samuel Getachew", role: "SEO & Digital Advertising Manager", focus: "Handles search engine optimization, paid advertising campaigns, and performance analytics", division: "Creative Division" },
  // Technical Division
  { name: "Hana Alemu", role: "Lead Developer, Mobile & Software Solutions", focus: "Manages mobile app development, custom software, ERP systems, and automation solutions", division: "Technical Division" },
  { name: "Yonatan Fikru", role: "UI/UX & System Integration Architect", focus: "Designs user‑centered experiences and ensures seamless integration of digital systems", division: "Technical Division" }
];

export const teamDivisions = [
  {
    name: "Executive Leadership",
    description: "Strategic vision and organizational direction",
    members: teamMembers.filter(m => m.division === "Executive Leadership")
  },
  {
    name: "Strategic Division",
    description: "Digital transformation and brand strategy",
    members: teamMembers.filter(m => m.division === "Strategic Division")
  },
  {
    name: "Creative Division",
    description: "Content and visual communication",
    members: teamMembers.filter(m => m.division === "Creative Division")
  },
  {
    name: "Technical Division",
    description: "Development and system integration",
    members: teamMembers.filter(m => m.division === "Technical Division")
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Marta Hailu",
    company: "NorthGrid Health",
    quote:
      "Amolex translated a complicated data problem into a product our clinical teams actually trust."
  },
  {
    name: "Daniel Kimani",
    company: "LatticePay",
    quote:
      "Their team operates like a product partner, not a vendor. The dashboard they shipped changed our pace."
  },
  {
    name: "Ari Stone",
    company: "Nova Freight",
    quote:
      "We needed real infrastructure and clear design thinking. Amolex delivered both without slowing execution."
  }
];

export const jobs = [
  {
    title: "Senior Product Designer",
    location: "Addis Ababa / Remote",
    type: "Full-time",
    summary: "Own high-leverage product and brand experiences across client platforms."
  },
  {
    title: "AI Engineer",
    location: "Remote",
    type: "Full-time",
    summary: "Design intelligent workflows, model evaluation pipelines, and production integrations."
  },
  {
    title: "Cloud Platform Engineer",
    location: "Hybrid",
    type: "Contract",
    summary: "Build deployment systems, observability foundations, and secure cloud infrastructure."
  }
];

async function tryDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function getProjects() {
  const rows = await tryDb(
    () =>
      prisma.project.findMany({
        orderBy: { createdAt: "desc" }
      }),
    []
  );

  if (rows.length === 0) {
    return projects;
  }

  return rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    technologies: row.technologies,
    hero: row.hero,
    metrics: row.metrics,
    challenge: row.challenge,
    solution: row.solution,
    outcome: row.outcome
  }));
}

export async function getProjectBySlug(slug: string) {
  const items = await getProjects();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getPosts() {
  const rows = await tryDb(
    () =>
      prisma.post.findMany({
        orderBy: { publishedAt: "desc" }
      }),
    []
  );

  if (rows.length === 0) {
    return posts;
  }

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    readTime: row.readTime,
    featured: row.featured,
    cover: row.cover,
    content: row.content
  }));
}

export async function getPostBySlug(slug: string) {
  const items = await getPosts();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getTeamMembers() {
  const rows = await tryDb(
    () =>
      prisma.teamMember.findMany({
        orderBy: { createdAt: "asc" }
      }),
    []
  );

  if (rows.length === 0) {
    return teamMembers;
  }

  return rows.map((row) => ({
    name: row.name,
    role: row.role,
    focus: row.focus
  }));
}

export async function getTestimonials() {
  const rows = await tryDb(
    () =>
      prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" }
      }),
    []
  );

  if (rows.length === 0) {
    return testimonials;
  }

  return rows.map((row) => ({
    name: row.name,
    company: row.company,
    quote: row.quote
  }));
}

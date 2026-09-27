import avatar from "@/assets/avatar.svg";
import ai from "@/assets/projects/ai.svg";
import alnassan from "@/assets/projects/alnassan.svg";
import pharmacy from "@/assets/projects/pharmacy.svg";
import seraj from "@/assets/projects/seraj.svg";
import shop from "@/assets/projects/shop.svg";
import toon from "@/assets/projects/toon.svg";

/**
 * Single source of truth for every word on the site.
 * Swap the copy here and the whole portfolio updates.
 */

export const profile = {
  name: "Abdullah Alatrash",
  initials: "AA",
  role: "Senior Mobile Developer",
  tagline: "I build mobile products that feel inevitable.",
  headline: ["Mobile apps", "engineered", "to feel alive"],
  summary:
    "Senior mobile developer specialising in Flutter architecture and AI-augmented products. I turn complex ideas into fast, elegant apps — from e-commerce and health platforms to Islamic knowledge systems used by thousands.",
  bio: [
    "I'm Abdullah — a mobile engineer who cares about the millisecond, the pixel and the story. My work sits where clean architecture meets obsessive polish: Flutter front-ends wired to resilient APIs, real-time data and LLM-powered brains.",
    "I've shipped more than 30 applications — storefronts, pharmacies, learning platforms, desktop developer tools — and open-sourced tools that other engineers actually use. Every project is built with layered architecture, exhaustive testing and documentation so the next developer moves fast.",
    "Beyond code I obsess over interface motion. Apps and websites should respond to you: they should breathe, spring, anticipate. That's the standard I hold this portfolio to.",
  ],
  location: "Remote · Working worldwide",
  timezoneLabel: "Remote · GMT+3",
  email: "hello@abdullahalatrash.dev",
  availability: "Available for new projects — Q2 2026",
  resumeUrl: "https://github.com/oiu85",
  avatar,
};

export const navigation = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "journey", label: "Journey", index: "05" },
  { id: "voices", label: "Voices", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export const socials = [
  { label: "GitHub", handle: "@oiu85", url: "https://github.com/oiu85", icon: "github" },
  { label: "LinkedIn", handle: "in/abdullah-alatrash", url: "https://linkedin.com", icon: "linkedin" },
  { label: "X", handle: "@abdullahaltrsh", url: "https://x.com", icon: "x" },
  { label: "Email", handle: "hello@abdullahalatrash.dev", url: "mailto:hello@abdullahalatrash.dev", icon: "mail" },
];

export const metrics = [
  { value: 5, suffix: "+", label: "Years shipping", detail: "production mobile software" },
  { value: 30, suffix: "+", label: "Apps delivered", detail: "iOS · Android · Desktop" },
  { value: 4.8, suffix: "★", label: "Avg. store rating", detail: "across published apps", decimals: 1 },
  { value: 12, suffix: "k+", label: "Lines open-sourced", detail: "reusable Flutter toolkits" },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  image: string;
  accent: string;
  glow: string;
  stars: number;
  featured?: boolean;
  summary: string;
  story: string;
  highlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    id: "toon",
    title: "TOON Converter",
    subtitle: "Token-efficient data for LLM pipelines",
    category: "Desktop Tool",
    year: "2025",
    role: "Architect & Developer",
    image: toon,
    accent: "#35e0e0",
    glow: "#0e5f66",
    stars: 5,
    featured: true,
    summary:
      "A native Windows application that converts JSON and plain text into TOON — a compact wire format that trims LLM token usage by 15–30% while keeping 100% of the data.",
    story:
      "Prompt engineering gets expensive fast when you keep feeding raw JSON. TOON Converter compresses structured payloads into a deterministic, still-readable format. Built in Dart with a native desktop shell, it handles huge files instantly, validates round-trip fidelity, and previews the exact token savings before you paste anything into a model.",
    highlights: [
      "15–30% fewer tokens on real-world payloads",
      "100% fidelity — lossless round-trip, verified",
      "Handles multi-megabyte JSON without freezing",
      "One-click copy for prompts, cURL and SDKs",
    ],
    stack: ["Dart", "Flutter Desktop", "Isolates", "Win32", "CI/CD"],
    metrics: [
      { label: "Token reduction", value: "up to 30%" },
      { label: "Conversion", value: "instant" },
      { label: "Fidelity", value: "100%" },
    ],
    links: [{ label: "View source", url: "https://github.com/oiu85/toon-converter-windows-applicarion" }],
  },
  {
    id: "seraj",
    title: "Seraj Aldeen",
    subtitle: "Islamic knowledge platform",
    category: "Mobile Platform",
    year: "2025",
    role: "Lead Flutter Engineer",
    image: seraj,
    accent: "#34d399",
    glow: "#0f5132",
    stars: 4,
    featured: true,
    summary:
      "A comprehensive Flutter platform for Islamic learning — audio lectures, video courses, digital books and articles in one coherent, offline-friendly experience.",
    story:
      "The hardest part was not the UI, it was the data layer: thousands of long-form media items, resumable playback across devices, and users on slow connections. I designed a clean, feature-first architecture with a resilient caching pipeline, background audio service, and book reader with adjustable typography — so the app feels local even when it isn't.",
    highlights: [
      "Feature-first Clean Architecture with Riverpod",
      "Background audio with resume + lock-screen controls",
      "Offline-first caching for books and articles",
      "Tablet layouts and full RTL Arabic typography",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "sqflite", "Firebase", "REST"],
    metrics: [
      { label: "Media items", value: "2,000+" },
      { label: "Cold start", value: "<1.2s" },
      { label: "Crash-free", value: "99.6%" },
    ],
    links: [{ label: "View source", url: "https://github.com/oiu85/Seraj-Aldeen-Islamic-flutter-app" }],
  },
  {
    id: "alnassan",
    title: "Alnassan",
    subtitle: "Knowledge, beautifully delivered",
    category: "Mobile Platform",
    year: "2026",
    role: "Lead Flutter Engineer",
    image: alnassan,
    accent: "#7aa2ff",
    glow: "#1b2c66",
    stars: 4,
    featured: true,
    summary:
      "A refined sibling platform to Seraj Aldeen: curated lectures, video series, digital library and speaker profiles wrapped in a calm, editorial interface.",
    story:
      "I rebuilt the experience from the ground up with a modular package structure so new content types (series, playlists, bookmarks) could be added without touching the core. Search became instant with a debounced local index, and the reader gained a distraction-free mode with progress persistence.",
    highlights: [
      "Modular package architecture, 90%+ reusable",
      "Instant offline search with local indexing",
      "Distraction-free reader with progress sync",
      "Custom design system in Figma → Flutter",
    ],
    stack: ["Flutter", "Dart", "Bloc", "Supabase", "Design System"],
    metrics: [
      { label: "Shared modules", value: "12" },
      { label: "Frame budget", value: "60fps" },
      { label: "Test coverage", value: "78%" },
    ],
    links: [{ label: "View source", url: "https://github.com/oiu85/alnassan-Islamic-flutter-app" }],
  },
  {
    id: "pharmacy",
    title: "Pharmacy Commerce",
    subtitle: "Healthcare retail in your pocket",
    category: "E-Commerce",
    year: "2025",
    role: "Mobile & API Engineer",
    image: pharmacy,
    accent: "#2dd4bf",
    glow: "#0b4f4a",
    stars: 4,
    featured: true,
    summary:
      "Cross-platform Flutter storefront for medicines and healthcare products — category browsing, smart search, cart, secure checkout and order tracking.",
    story:
      "Regulated commerce needs precision. I modelled prescriptions, dosage options and stock states as first-class domain objects, then built a checkout that validates rules on both client and server. Admin inventory updates stream in real time, so what a customer sees is always what the pharmacy has.",
    highlights: [
      "Product browsing with filter + dosage variants",
      "Two-step secure checkout with validation",
      "Real-time inventory and order status stream",
      "Push notifications for refills and offers",
    ],
    stack: ["Flutter", "Dart", "Node.js", "Firebase", "Stripe"],
    metrics: [
      { label: "Checkout steps", value: "2" },
      { label: "Catalogue", value: "1.4k SKUs" },
      { label: "Conversion lift", value: "+23%" },
    ],
    links: [{ label: "View source", url: "https://github.com/oiu85/Ecommerce-flutter-app-Pharmacy" }],
  },
  {
    id: "shop",
    title: "Storefront Starter",
    subtitle: "A commerce app you can learn from",
    category: "E-Commerce",
    year: "2026",
    role: "Solo Developer",
    image: shop,
    accent: "#ffa14a",
    glow: "#5c2a04",
    stars: 2,
    summary:
      "A professional-grade Flutter e-commerce application with a modern, animated interface — released alongside a coaching tutorial series for developers learning production patterns.",
    story:
      "Built as both product and teaching tool: every screen is documented, every state is explicit, and the animation layer is separated from business logic. It's the blueprint I hand to teams who want to move from tutorial code to maintainable architecture.",
    highlights: [
      "Animated product gallery and cart interactions",
      "Repository pattern with swappable data sources",
      "Local persistence + optimistic updates",
      "Companion tutorial covering the full build",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "MongoDB", "Animations"],
    metrics: [
      { label: "Screens", value: "18" },
      { label: "Reusable widgets", value: "40+" },
      { label: "Learners guided", value: "300+" },
    ],
    links: [{ label: "View source", url: "https://github.com/oiu85/fist_ecommerce_app_flutter" }],
  },
  {
    id: "ai",
    title: "Nova AI Assistant",
    subtitle: "Where mobile meets large language models",
    category: "AI System",
    year: "2026",
    role: "Product Engineer",
    image: ai,
    accent: "#b98bff",
    glow: "#3a1d78",
    stars: 3,
    featured: true,
    summary:
      "A mobile-first AI workspace: streaming LLM chat, retrieval augmented answers over your own documents, voice input and a token-aware context engine.",
    story:
      "I designed Nova around three pillars — latency, grounding and trust. Responses stream token-by-token with a typing rhythm that feels human, answers cite retrieved sources, and cost is controlled by the same TOON compression work from my desktop tool. Prompt orchestration lives server-side so models can be swapped in minutes.",
    highlights: [
      "Token-by-token streaming with optimistic UI",
      "RAG pipeline over private document sets",
      "Voice capture, transcription and playback",
      "Model-agnostic gateway for fast swapping",
    ],
    stack: ["Flutter", "Python", "FastAPI", "OpenAI", "Vector DB", "WebSockets"],
    metrics: [
      { label: "First token", value: "~320ms" },
      { label: "Cost cut", value: "-28%" },
      { label: "Answer grounding", value: "verified" },
    ],
    links: [{ label: "Case study on request", url: "mailto:hello@abdullahalatrash.dev" }],
  },
];

export const skillGroups = [
  {
    id: "mobile",
    label: "Mobile Engineering",
    blurb: "Native-quality cross-platform apps, pixel-tuned and battery-aware.",
    items: [
      { name: "Flutter", level: 96 },
      { name: "Dart", level: 95 },
      { name: "Kotlin", level: 82 },
      { name: "Swift / UIKit", level: 76 },
      { name: "React Native", level: 74 },
      { name: "Platform channels", level: 84 },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    blurb: "LLM features that are fast, grounded and worth the token.",
    items: [
      { name: "LLM integration", level: 90 },
      { name: "Prompt & context design", level: 92 },
      { name: "RAG / vector search", level: 84 },
      { name: "Python", level: 82 },
      { name: "FastAPI", level: 80 },
      { name: "On-device ML", level: 72 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Cloud",
    blurb: "APIs and pipelines that stay boring when traffic spikes.",
    items: [
      { name: "Firebase", level: 92 },
      { name: "Supabase / Postgres", level: 88 },
      { name: "Node.js", level: 84 },
      { name: "REST & GraphQL", level: 86 },
      { name: "Realtime sockets", level: 80 },
      { name: "CI/CD pipelines", level: 86 },
    ],
  },
  {
    id: "craft",
    label: "Craft & Architecture",
    blurb: "The invisible discipline behind software that lasts.",
    items: [
      { name: "Clean Architecture", level: 94 },
      { name: "Riverpod / Bloc", level: 92 },
      { name: "Design systems", level: 88 },
      { name: "Motion & micro-interactions", level: 90 },
      { name: "Testing & QA", level: 84 },
      { name: "Figma → code", level: 86 },
    ],
  },
];

export const orbitSkills = [
  "Flutter",
  "Dart",
  "Firebase",
  "Supabase",
  "Riverpod",
  "Bloc",
  "REST",
  "GraphQL",
  "Node.js",
  "Python",
  "OpenAI",
  "Vector DB",
  "Kotlin",
  "Swift",
  "CI/CD",
  "Figma",
  "Clean Architecture",
  "WebSockets",
];

export const experience = [
  {
    period: "2024 — Now",
    role: "Senior Mobile Engineer",
    org: "Independent · Remote",
    location: "Worldwide",
    summary:
      "Leading end-to-end delivery for startups and content platforms: architecture, UI systems, AI features and release engineering.",
    highlights: [
      "Delivered 14+ production apps across commerce, education and health",
      "Cut average feature cycle time by 38% with reusable Flutter kits",
      "Introduced automated release pipelines with staged rollouts",
    ],
    stack: ["Flutter", "Clean Arch", "Firebase", "CI/CD"],
    tone: "brand",
  },
  {
    period: "2022 — 2024",
    role: "Mobile Developer & Team Lead",
    org: "Product Studio",
    location: "Hybrid",
    summary:
      "Owned the mobile chapter: coding standards, review culture, and a shared component library used across client projects.",
    highlights: [
      "Bootstrapped a design system adopted by 5 product teams",
      "Mentored 6 junior developers through structured code reviews",
      "Reduced cold-start time by 42% on flagship Android app",
    ],
    stack: ["Flutter", "Kotlin", "REST", "Figma"],
    tone: "aqua",
  },
  {
    period: "2021 — 2022",
    role: "Flutter Developer",
    org: "E-Commerce Studio",
    location: "On-site",
    summary:
      "Built storefronts for retail brands — catalogue, cart, payments and the unglamorous post-launch performance work.",
    highlights: [
      "Shipped 8 client storefronts on a shared commerce core",
      "Integrated gateways, coupons and multi-currency pricing",
      "Raised average store rating from 3.9 to 4.6",
    ],
    stack: ["Flutter", "Node.js", "Stripe", "Push"],
    tone: "amber",
  },
  {
    period: "2019 — 2021",
    role: "Junior Developer → Freelancer",
    org: "Self-taught foundations",
    location: "Remote",
    summary:
      "Where the obsession started: learning by shipping — dozens of small apps, first paying clients, first open-source modules.",
    highlights: [
      "Published 12 personal apps while studying full-time",
      "First open-source Flutter package used by other developers",
      "Built the habit of documenting everything I learn",
    ],
    stack: ["Dart", "Java", "Firebase"],
    tone: "violet",
  },
];

export const services = [
  {
    title: "Mobile Product Build",
    blurb: "From Figma to stores: architecture, UI, integrations and launch support.",
    points: ["Flutter for iOS + Android", "Store submission & analytics", "Post-launch iteration"],
    accent: "#6c5cff",
    icon: "phone",
  },
  {
    title: "AI Feature Engineering",
    blurb: "Practical LLM features — streaming chat, RAG, summarisation, automation.",
    points: ["Model-agnostic gateways", "Cost & latency tuning", "Grounded, cited answers"],
    accent: "#b98bff",
    icon: "sparkles",
  },
  {
    title: "Architecture Rescue",
    blurb: "Inherited a codebase that fights you? I make it testable, modular and fast.",
    points: ["Refactor to clean layers", "Performance profiling", "Test & CI foundation"],
    accent: "#35e0e0",
    icon: "wrench",
  },
  {
    title: "Interface Motion",
    blurb: "Motion systems that make products feel considered rather than assembled.",
    points: ["Design system motion spec", "Gesture & transition design", "Web hero experiences"],
    accent: "#ffc860",
    icon: "wand",
  },
];

export const testimonials = [
  {
    quote:
      "Abdullah rebuilt our app's core from the ground up and it finally feels like a product. Playback is instant, the reader is gorgeous, and our support tickets dropped by half.",
    name: "Omar H.",
    role: "Founder, Seraj Media",
    initials: "OH",
    accent: "#34d399",
  },
  {
    quote:
      "The clearest communicator we've worked with. He documented every decision, hit every date, and shipped a checkout flow that measurably grew our orders.",
    name: "Sara M.",
    role: "Product Lead, HealthPlus",
    initials: "SM",
    accent: "#35e0e0",
  },
  {
    quote:
      "We asked for AI features and expected chaos. He delivered a system that streams, cites sources and costs less to run than our old summariser alone.",
    name: "Yousef A.",
    role: "CTO, Riyal Labs",
    initials: "YA",
    accent: "#b98bff",
  },
  {
    quote:
      "Rare combination: a senior engineer who genuinely obsesses over motion and micro-details. Our investors literally commented on how smooth the app felt.",
    name: "Lena K.",
    role: "COO, Northwind",
    initials: "LK",
    accent: "#ffc860",
  },
];

export const process = [
  { step: "01", title: "Listen", text: "Understand the business, the users and the constraint that actually matters." },
  { step: "02", title: "Sculpt", text: "Map flows, design the interface system and define the motion language." },
  { step: "03", title: "Engineer", text: "Build in clean layers with tests, telemetry and reviewable pull requests." },
  { step: "04", title: "Launch", text: "Ship to stores, measure, iterate — and hand over docs your team can own." },
];

export const faqs = [
  {
    q: "Are you available for new projects?",
    a: "Yes — I take on a small number of engagements at a time so each one gets senior-level attention. Freelance, contract and part-time retainers are all possible.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Absolutely. I integrate with your board, branch strategy and review process. If none exist yet, I'll help set up a lightweight workflow that your team actually keeps using.",
  },
  {
    q: "Do you only build Flutter apps?",
    a: "Flutter is my primary craft, but I also ship native Kotlin/Swift modules, Node and Python services, and web front-ends — including the motion-heavy site you're on right now.",
  },
  {
    q: "How do you handle AI features responsibly?",
    a: "Grounding first: retrieval over your own data, citations, guardrails and cost ceilings. I measure latency and token spend like any other performance budget.",
  },
];

export const marqueeWords = [
  "Flutter",
  "Clean Architecture",
  "Dart",
  "AI Systems",
  "Firebase",
  "Motion Design",
  "Supabase",
  "Performance",
  "Kotlin",
  "Riverpod",
  "Product Craft",
];

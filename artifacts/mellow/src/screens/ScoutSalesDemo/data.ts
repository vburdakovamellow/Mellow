/**
 * Scout Sales Demo — предзаполненные данные.
 *
 * Прототип строится по линейному happy-path сценарию для продавцов:
 *   PublicLanding → SignUp → Dashboard (empty) → Generate (filled prompt)
 *   → Loader → Edit Request → PublicRequest → Dashboard (active)
 *   → Request candidates: empty → first → ultra-briefing → ultra-ready
 *   → Application modal → Invitation modal
 *
 * Все данные захардкожены — реальный API не дёргается.
 */

export type DemoStep =
  | "landing"
  | "signup"
  | "dashboard-empty"
  | "generate-empty"
  | "generate-filled"
  | "loader"
  | "edit-request"
  | "public-request"
  | "dashboard-active"
  | "scout-match"
  | "candidates-empty"
  | "candidates-first"
  | "ultra-briefing"
  | "ultra-ready"
  | "application-modal"
  | "shortlisted";

export const DEMO_STEPS: DemoStep[] = [
  "landing",
  "signup",
  "dashboard-empty",
  "generate-empty",
  "generate-filled",
  "loader",
  "edit-request",
  "public-request",
  "dashboard-active",
  "scout-match",
  "candidates-empty",
  "candidates-first",
  "ultra-briefing",
  "ultra-ready",
  "application-modal",
  "shortlisted",
];

export const STEP_LABELS: Record<DemoStep, string> = {
  landing: "Public landing",
  signup: "Sign up",
  "dashboard-empty": "Dashboard · Empty",
  "generate-empty": "Generate · Empty",
  "generate-filled": "Generate · Filled",
  loader: "Generating",
  "edit-request": "Edit request",
  "public-request": "Public request page",
  "dashboard-active": "Dashboard · Active",
  "scout-match": "AI Scout · Match",
  "candidates-empty": "Applied · First wave",
  "candidates-first": "Candidates · First application",
  "ultra-briefing": "Ultra · Briefing",
  "ultra-ready": "Applied · Ready",
  "application-modal": "Application · Viewed",
  shortlisted: "Shortlisted · Proposal",
};

export const MANAGER = {
  firstName: "Jennifer",
  initials: "JM",
  company: "Acme Studio",
  email: "jennifer@acmestudio.io",
};

export const REQUEST = {
  id: "jr-uiux-designer",
  title: "Graphic Designer for Social Media Optimisation",
  status: "Active" as const,
  rate: "$20–30/hr",
  workload: "Under 20 hrs/week",
  projectType: "Ongoing",
  experience: "Middle",
  location: "EU",
  timezone: "GMT+1",
  expiresInHours: 22,
  views: 24,
  applied: 1,
  prompt:
    "Graphic designer based in the EU, up to $30/hr. Around 20 hours per week.",
  description:
    "We're looking for a talented Graphic Designer to elevate our social-media presence. You'll be the visual messenger of our brand, crafting scroll-stopping content for Instagram, Facebook, LinkedIn and emerging channels.",
  responsibilities: [
    "Create scroll-stopping visuals for IG, Facebook, LinkedIn and TikTok.",
    "Bring the brand book to life — logos, palettes, type, iconography.",
    "Produce static, animated and short-form video content for paid + organic.",
    "Collaborate with copy + community team to keep posting cadence on track.",
    "Run quick A/B tests on creatives, learn from analytics, iterate.",
  ],
  requirements: [
    "Proven portfolio in social-media design (B2C or B2B SaaS preferred).",
    "Strong sense of typography, layout, and motion fundamentals.",
    "Familiar with Figma, Photoshop, Illustrator, and at least one motion tool.",
    "Comfortable working async across EU/US time zones.",
  ],
  skills: [
    "Figma",
    "Canva",
    "Photoshop",
    "Illustrator",
    "Brand Identity",
    "Motion",
  ],
  languages: ["English", "Spanish"],
};

export type Candidate = {
  id: string;
  name: string;
  initials: string;
  country: string;
  role: string;
  experience: string;
  match: number;
  source: "applied" | "scouted" | "ultra";
  avatarTone: string;
  highlights?: string[];
  shortPitch?: string;
  rate?: string;
  date?: string;
  /** Manager tagged this candidate as not relevant. Renders greyed-out
   *  beneath the active list and is hidden behind a "Show rejected
   *  candidates" toggle by default. */
  rejected?: boolean;
};

/** Candidates surfaced by AI Scout Match (people *not* yet applied,
 *  found across user's network — X / LinkedIn / Mellow pool). */
export type ScoutMatchCandidate = {
  id: string;
  name: string;
  initials: string;
  country: string;
  role: string;
  experience: string;
  match: number;
  scoutSource: "X" | "LinkedIn" | "Mellow";
  avatarTone: string;
  /** When true, render an avatar photo placeholder instead of initials block.  */
  hasPhoto?: boolean;
};

export const SCOUT_MATCH_CANDIDATES: ScoutMatchCandidate[] = [
  {
    id: "santiago",
    name: "Santiago Herrera",
    initials: "SH",
    country: "Located in Hungary",
    role: "UI/UX Designer",
    experience: "5.5 years of experience",
    match: 100,
    scoutSource: "X",
    avatarTone: "#E5E0DA",
  },
  {
    id: "daryna-scout",
    name: "Daryna Shevchenko",
    initials: "DS",
    country: "Located in Hungary",
    role: "Graphic Designer",
    experience: "2 years of experience",
    match: 82,
    scoutSource: "LinkedIn",
    avatarTone: "#C28E6E",
    hasPhoto: true,
  },
  {
    id: "valentina",
    name: "Valentina Gonzalez",
    initials: "VG",
    country: "Located in Hungary",
    role: "Graphic Designer",
    experience: "3.5 years of experience",
    match: 81,
    scoutSource: "Mellow",
    avatarTone: "#E5E0DA",
  },
];

export const CANDIDATES: Candidate[] = [
  {
    id: "herbert",
    name: "Herbert Romaguera",
    initials: "HR",
    country: "Hungary",
    role: "Graphic Designer",
    experience: "9 years of experience",
    match: 100,
    source: "ultra",
    avatarTone: "#F4823C",
    rate: "Rate on request",
    date: "Today",
    highlights: ["Brand book and pitch decks for SaaS", "EU based", "Available next Monday"],
    shortPitch:
      "Senior brand designer with 9 yrs in B2B SaaS. Built a full visual system and ad templates for two Series B startups.",
  },
  {
    id: "sofia",
    name: "Sofia Almeida",
    initials: "SA",
    country: "Hungary",
    role: "UI/UX Designer",
    experience: "5.5 years of experience",
    match: 99,
    source: "applied",
    avatarTone: "#FFB47A",
    rate: "$45/hr",
    date: "Today",
    highlights: ["Strong portfolio in social ads", "5+ yrs in B2C lifestyle", "Speaks English & Spanish"],
    shortPitch:
      "Mid+ UI/UX designer who's been running social-creative pipelines for two D2C brands. Loves systems and motion.",
  },
  {
    id: "janet",
    name: "Janet Swift",
    initials: "JS",
    country: "Hungary",
    role: "Creative Designer",
    experience: "8 years of experience",
    match: 97,
    source: "ultra",
    avatarTone: "#E36C20",
    rate: "$55/hr",
    date: "May 17",
    highlights: ["Senior creative across IG/TikTok", "Owns motion + static", "Worked with HubSpot"],
    shortPitch:
      "Creative designer with 8 yrs experience building social creatives for SaaS and e-commerce brands.",
  },
  {
    id: "damon",
    name: "Damon Dickens",
    initials: "DD",
    country: "Hungary",
    role: "Graphic Designer",
    experience: "2 years of experience",
    match: 94,
    source: "ultra",
    avatarTone: "#F19A55",
    rate: "Rate on request",
    date: "May 17",
    highlights: ["Fast, scrappy, motion-first", "Hourly rate sweet-spot"],
  },
  {
    id: "wendy",
    name: "Wendy Sipes",
    initials: "WS",
    country: "Hungary",
    role: "UX Designer",
    experience: "2 years of experience",
    match: 88,
    source: "applied",
    avatarTone: "#A8A29E",
    rate: "$32/hr",
    date: "May 17",
  },
  {
    id: "daryna",
    name: "Daryna Shevchenko",
    initials: "DS",
    country: "Hungary",
    role: "Graphic Designer",
    experience: "2 years of experience",
    match: 84,
    source: "scouted",
    avatarTone: "#F8B58D",
    rate: "Rate on request",
    date: "May 17",
  },
  {
    id: "alejandro",
    name: "Alejandro Castillo",
    initials: "AC",
    country: "Hungary",
    role: "UI Designer",
    experience: "2.5 years of experience",
    match: 68,
    source: "applied",
    avatarTone: "#D9CFC4",
    rate: "$99/hr",
    date: "May 12",
  },
  {
    id: "elisa",
    name: "Elisa Kwon",
    initials: "EK",
    country: "Hungary",
    role: "Product Designer",
    experience: "1 year of experience",
    match: 47,
    source: "applied",
    avatarTone: "#C0B7AB",
    rate: "Rate on request",
    date: "Apr 28",
  },
  /* ---- Rejected by the manager. Hidden by default behind a toggle. ----
     Numbers and roles mirror the rejected rows in the "applied · with
     rejected" mockup so the demo can switch the toggle on and read
     pixel-close to the design.                                        */
  {
    id: "lorenzo",
    name: "Lorenzo King",
    initials: "LK",
    country: "Hungary",
    role: "UI/UX Designer",
    experience: "2.5 years of experience",
    match: 64,
    source: "applied",
    avatarTone: "#B9B1AA",
    rate: "Rate on request",
    date: "May 12",
    rejected: true,
  },
  {
    id: "zofia",
    name: "Zofia Nowak",
    initials: "ZN",
    country: "Hungary",
    role: "UI/UX Designer",
    experience: "4 years of experience",
    match: 23,
    source: "applied",
    avatarTone: "#A8A29E",
    rate: "Rate on request",
    date: "May 10",
    rejected: true,
  },
];

export const FEATURED_CANDIDATE = {
  id: "taylor",
  name: "Taylor Cook",
  initials: "TC",
  role: "Product Designer",
  email: "taylor.cook@gmail.com",
  match: 92,
  matchLabel: "Excellent",
  experience: "8.5 years",
  master: "Master's degree (or equivalent)",
  location: "London",
  spent: "—",
  cover:
    "I'm excited to apply for the Graphic Designer role you've posted on Mellow. With over 8 years of experience in brand and digital design, I've helped numerous teams launch products and refine their visual stories. My approach combines design thinking with data-driven insights to create interfaces that not only look beautiful but also drive business results. I'm particularly drawn to your team's commitment to quality and craft, and I'd love to bring my expertise in design systems, user research, and prototyping to help you achieve your goals.",
  cv: "RobertSmith-CV-2026.pdf",
  cvSize: "542 KB",
  skills: [
    "Figma",
    "Sketch",
    "Adobe XD",
    "Webflow",
    "Brand Identity",
    "Design Systems",
    "Motion",
    "Prototyping",
  ],
};

export const NETWORK_POST = `🎨 Looking for a Junior-Mid UI/UX Designer to work on a SaaS product refresh. Remote, flexible schedule, 1-3 months if you have a sharp eye for design — we'd love to hear from you.

#uxdesigner #remoteproject #freelance #parttime
`;

export const ONE_ON_ONE_MESSAGE = `Hey! 👋

We're looking for a UI/UX Designer (Junior-Mid) for a remote freelance project: SaaS dashboard refresh, 1 month, flexible hours. If you or someone you know is into design — check it out:

aisourcing.mellow.io/${REQUEST.id}

Would love to hear from you 🙌`;

export const COMMUNITIES = [
  { name: "UX Jobs", platform: "Telegram", icon: "✈️", explored: false },
  { name: "Design Community", platform: "Discord", icon: "🎮", explored: false },
  { name: "UX Designers CIS", platform: "Facebook", icon: "📘", explored: false },
  { name: "Freelance Board", platform: "Telegram", icon: "✈️", explored: false },
];

import { useState } from "react";
import styles from "./MellowPoolScreen.module.css";

type CardStatus = "new" | "viewed" | "invited" | "skipped" | "applied";
type ViewMode = "create-request" | "first-visit" | "variant-a" | "variant-a-empty" | "returning";

type ContractorSource = "mellow-pool" | "signal" | "organic" | "ultra";

interface Contractor {
  id: string;
  name: string;
  initials: string;
  role: string;
  matchScore: number;
  experience: string;
  rate: string;
  location: string;
  skills: string[];
  education: string;
  email: string;
  cvFileName: string;
  bio: string;
  workHistory: { company: string; role: string; period: string }[];
  status: CardStatus;
  source: ContractorSource;
}

const POOL_CONTRACTORS: Contractor[] = [
  {
    id: "c1",
    name: "Alex Petrov",
    initials: "AP",
    role: "Senior React Developer",
    matchScore: 94,
    experience: "8 years",
    rate: "$65/hr",
    location: "Berlin, Germany",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    education: "MSc Computer Science, TU Berlin",
    email: "a.petrov@mail.com",
    cvFileName: "CV_Alex_Petrov.pdf",
    bio: "Full-stack developer with deep expertise in React ecosystem. Built and scaled frontend architectures for fintech and SaaS products serving 500K+ users.",
    workHistory: [
      { company: "Fintech Startup (Berlin)", role: "Lead Frontend Engineer", period: "2022 – present" },
      { company: "SAP", role: "Senior Developer", period: "2019 – 2022" },
      { company: "Freelance", role: "React Consultant", period: "2017 – 2019" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c2",
    name: "Maria Gonzalez",
    initials: "MG",
    role: "Full-Stack Engineer",
    matchScore: 91,
    experience: "6 years",
    rate: "$55/hr",
    location: "Lisbon, Portugal",
    skills: ["React", "Python", "PostgreSQL", "Docker", "CI/CD"],
    education: "BSc Software Engineering, IST Lisbon",
    email: "m.gonzalez@mail.com",
    cvFileName: "CV_Maria_Gonzalez.pdf",
    bio: "Versatile full-stack engineer experienced in building end-to-end web applications. Strong background in both frontend and backend with focus on developer experience.",
    workHistory: [
      { company: "Outsystems", role: "Full-Stack Engineer", period: "2021 – present" },
      { company: "Talkdesk", role: "Frontend Developer", period: "2019 – 2021" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c3",
    name: "James Chen",
    initials: "JC",
    role: "Frontend Architect",
    matchScore: 88,
    experience: "10 years",
    rate: "$80/hr",
    location: "Toronto, Canada",
    skills: ["React", "Vue.js", "TypeScript", "Design Systems", "Performance"],
    education: "BSc Computer Science, University of Toronto",
    email: "j.chen@mail.com",
    cvFileName: "CV_James_Chen.pdf",
    bio: "Frontend architect specializing in design systems and performance optimization. Led teams of 8+ engineers at scale.",
    workHistory: [
      { company: "Shopify", role: "Staff Frontend Engineer", period: "2020 – present" },
      { company: "Wealthsimple", role: "Senior Frontend Developer", period: "2017 – 2020" },
      { company: "Freelance", role: "UI Engineer", period: "2015 – 2017" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c4",
    name: "Olena Koval",
    initials: "OK",
    role: "React / React Native Developer",
    matchScore: 85,
    experience: "5 years",
    rate: "$45/hr",
    location: "Warsaw, Poland",
    skills: ["React", "React Native", "TypeScript", "Redux", "Firebase"],
    education: "BSc Computer Engineering, KPI Kyiv",
    email: "o.koval@mail.com",
    cvFileName: "CV_Olena_Koval.pdf",
    bio: "Cross-platform developer building web and mobile apps with React and React Native. Delivered 10+ production apps for startups across Europe.",
    workHistory: [
      { company: "Freelance", role: "React / RN Developer", period: "2022 – present" },
      { company: "Grammarly (Kyiv)", role: "Frontend Developer", period: "2020 – 2022" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c5",
    name: "Tom Nakamura",
    initials: "TN",
    role: "Senior Frontend Developer",
    matchScore: 82,
    experience: "7 years",
    rate: "$70/hr",
    location: "Amsterdam, Netherlands",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Testing"],
    education: "MSc Information Systems, VU Amsterdam",
    email: "t.nakamura@mail.com",
    cvFileName: "CV_Tom_Nakamura.pdf",
    bio: "Quality-focused frontend developer with strong testing culture. Experienced in building accessible, high-performance web applications.",
    workHistory: [
      { company: "Booking.com", role: "Senior Frontend Engineer", period: "2021 – present" },
      { company: "Adyen", role: "Frontend Developer", period: "2018 – 2021" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c6",
    name: "Sarah Müller",
    initials: "SM",
    role: "React Developer",
    matchScore: 90,
    experience: "5 years",
    rate: "$50/hr",
    location: "Munich, Germany",
    skills: ["React", "TypeScript", "Redux", "Jest", "Webpack"],
    education: "BSc Informatics, LMU Munich",
    email: "s.mueller@mail.com",
    cvFileName: "CV_Sarah_Mueller.pdf",
    bio: "Frontend developer focused on React and TypeScript. Delivered projects for automotive and healthcare sectors.",
    workHistory: [
      { company: "BMW Group", role: "Frontend Developer", period: "2022 – present" },
      { company: "Freelance", role: "React Developer", period: "2020 – 2022" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c7",
    name: "David Kim",
    initials: "DK",
    role: "Frontend Engineer",
    matchScore: 87,
    experience: "6 years",
    rate: "$60/hr",
    location: "Seoul, South Korea",
    skills: ["React", "Next.js", "TypeScript", "Storybook", "Figma"],
    education: "BSc Computer Science, KAIST",
    email: "d.kim@mail.com",
    cvFileName: "CV_David_Kim.pdf",
    bio: "Frontend engineer with design systems expertise. Built component libraries used across 20+ teams.",
    workHistory: [
      { company: "Coupang", role: "Senior Frontend Engineer", period: "2021 – present" },
      { company: "LINE Corp", role: "Frontend Developer", period: "2019 – 2021" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c8",
    name: "Lara Novak",
    initials: "LN",
    role: "TypeScript Developer",
    matchScore: 86,
    experience: "4 years",
    rate: "$45/hr",
    location: "Prague, Czech Republic",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    education: "MSc Software Engineering, CTU Prague",
    email: "l.novak@mail.com",
    cvFileName: "CV_Lara_Novak.pdf",
    bio: "Full-stack TypeScript developer. Specializes in type-safe architectures and API design.",
    workHistory: [
      { company: "Productboard", role: "Frontend Engineer", period: "2023 – present" },
      { company: "JetBrains", role: "Developer", period: "2021 – 2023" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c9",
    name: "Marcus Reid",
    initials: "MR",
    role: "UI Engineer",
    matchScore: 83,
    experience: "5 years",
    rate: "$55/hr",
    location: "London, UK",
    skills: ["React", "CSS", "Animation", "Accessibility", "Svelte"],
    education: "BA Digital Design, Goldsmiths London",
    email: "m.reid@mail.com",
    cvFileName: "CV_Marcus_Reid.pdf",
    bio: "UI engineer specializing in animation, accessibility, and micro-interactions. Design-engineering hybrid.",
    workHistory: [
      { company: "Monzo", role: "UI Engineer", period: "2022 – present" },
      { company: "BBC", role: "Frontend Developer", period: "2020 – 2022" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c10",
    name: "Yuki Tanaka",
    initials: "YT",
    role: "React Specialist",
    matchScore: 80,
    experience: "4 years",
    rate: "$40/hr",
    location: "Tokyo, Japan",
    skills: ["React", "TypeScript", "React Query", "Zustand", "Vite"],
    education: "BSc Information Science, U of Tokyo",
    email: "y.tanaka@mail.com",
    cvFileName: "CV_Yuki_Tanaka.pdf",
    bio: "React specialist focused on state management and performance. Contributor to open-source React ecosystem tools.",
    workHistory: [
      { company: "Mercari", role: "Frontend Engineer", period: "2023 – present" },
      { company: "SmartNews", role: "React Developer", period: "2021 – 2023" },
    ],
    status: "new",
    source: "mellow-pool",
  },
];

const APPLIED_CANDIDATES: Contractor[] = [
  {
    id: "a1",
    name: "Raj Patel",
    initials: "RP",
    role: "Frontend Developer",
    matchScore: 89,
    experience: "5 years",
    rate: "$50/hr",
    location: "Mumbai, India",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "MongoDB"],
    education: "BTech Computer Science, IIT Bombay",
    email: "r.patel@mail.com",
    cvFileName: "CV_Raj_Patel.pdf",
    bio: "Frontend developer with strong React skills. Experienced in building scalable web applications for startups.",
    workHistory: [
      { company: "Razorpay", role: "Frontend Engineer", period: "2022 – present" },
      { company: "Freshworks", role: "Developer", period: "2020 – 2022" },
    ],
    status: "applied",
    source: "organic",
  },
  {
    id: "a2",
    name: "Elena Vasquez",
    initials: "EV",
    role: "React Engineer",
    matchScore: 84,
    experience: "4 years",
    rate: "$45/hr",
    location: "Barcelona, Spain",
    skills: ["React", "JavaScript", "GraphQL", "Storybook", "Cypress"],
    education: "MSc Web Engineering, UPC Barcelona",
    email: "e.vasquez@mail.com",
    cvFileName: "CV_Elena_Vasquez.pdf",
    bio: "React engineer with testing-first approach. Experienced in building component libraries and design systems.",
    workHistory: [
      { company: "Glovo", role: "Frontend Engineer", period: "2022 – present" },
      { company: "Typeform", role: "Junior Developer", period: "2021 – 2022" },
    ],
    status: "applied",
    source: "mellow-pool",
  },
  {
    id: "a3",
    name: "Sofia Almeida",
    initials: "SA",
    role: "Senior React Developer",
    matchScore: 98,
    experience: "7 years",
    rate: "$75/hr",
    location: "São Paulo, Brazil",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
    education: "MSc Computer Science, USP São Paulo",
    email: "s.almeida@mail.com",
    cvFileName: "CV_Sofia_Almeida.pdf",
    bio: "Senior frontend architect with deep React expertise. Led platform migration at a Series C fintech.",
    workHistory: [
      { company: "Nubank", role: "Staff Engineer", period: "2021 – present" },
      { company: "VTEX", role: "Senior Developer", period: "2018 – 2021" },
    ],
    status: "applied",
    source: "ultra",
  },
  {
    id: "a4",
    name: "Daryna Shevchenko",
    initials: "DS",
    role: "Full-Stack Developer",
    matchScore: 92,
    experience: "6 years",
    rate: "$55/hr",
    location: "Tallinn, Estonia",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    education: "BSc Computer Science, KPI Kyiv",
    email: "d.shevchenko@mail.com",
    cvFileName: "CV_Daryna_Shevchenko.pdf",
    bio: "Full-stack developer with strong backend and frontend skills. Built scalable microservices for SaaS products.",
    workHistory: [
      { company: "Wise", role: "Full-Stack Engineer", period: "2022 – present" },
      { company: "Readdle", role: "Frontend Developer", period: "2019 – 2022" },
    ],
    status: "applied",
    source: "ultra",
  },
  {
    id: "a5",
    name: "Sophie Laurent",
    initials: "SL",
    role: "Full-Stack Developer",
    matchScore: 76,
    experience: "3 years",
    rate: "$35/hr",
    location: "Lyon, France",
    skills: ["React", "Node.js", "Express", "MongoDB", "Git"],
    education: "Engineering Degree, INSA Lyon",
    email: "s.laurent@mail.com",
    cvFileName: "CV_Sophie_Laurent.pdf",
    bio: "Full-stack developer with growing React expertise. Quick learner with strong problem-solving skills.",
    workHistory: [
      { company: "OVHcloud", role: "Full-Stack Developer", period: "2023 – present" },
      { company: "Freelance", role: "Web Developer", period: "2022 – 2023" },
    ],
    status: "applied",
    source: "organic",
  },
];

/* ============================================================
   Create Request Step — initial step before Pool
   ============================================================ */

function CreateRequestStep({ onSave }: { onSave: () => void }) {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave();
    }, 900);
  };

  return (
    <div className={styles.crScreen}>
      <Header />

      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.requestTitle}>Senior React Developer</h1>

          <div className={styles.requestNav}>
            <div className={styles.requestNavLeft}>
              <button className={styles.backBtn}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className={styles.navTab}>Candidates</button>
              <button className={styles.navTab}>Promotion</button>
              <button className={`${styles.navTab} ${styles.navTabActive}`}>Edit</button>
            </div>
            <div className={styles.requestNavRight}>
              <span className={styles.statsText}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}>
                  <circle cx="8" cy="8" r="6" stroke="#999" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2.5" fill="#999" />
                </svg>
                42 viewed · 7 applied
              </span>
              <button className={styles.linkBtn}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.5 9.5l3-3M7 11l-1.5 1.5a2.12 2.12 0 01-3-3L4 8m5-2l1.5-1.5a2.12 2.12 0 013 3L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className={styles.publishedBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>

          <div className={styles.crBodyInner}>
            {/* Left: Info cards */}
            <div className={styles.crEditor}>
              <div className={styles.crInfoCard}>
                <div className={styles.crInfoCardHeader}>
                  <span className={styles.crInfoCardIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
                      <path d="M3 16c0-3.3 12-3.3 12 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.crInfoCardTitle}>Candidate</span>
                  <button className={styles.crInfoCardEditBtn}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10.5 2.5l1 1-7 7H3.5v-1l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={styles.crInfoCardBody}>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Profile</span>
                    <span className={styles.crInfoValue}>Senior React Developer · Senior · Speaks English</span>
                  </div>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Skills and Tech</span>
                    <span className={styles.crInfoValue}>React, TypeScript, Node.js, GraphQL, AWS</span>
                  </div>
                </div>
              </div>

              <div className={styles.crInfoCard}>
                <div className={styles.crInfoCardHeader}>
                  <span className={styles.crInfoCardIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
                      <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className={styles.crInfoCardTitle}>Overview</span>
                  <button className={styles.crInfoCardEditBtn}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10.5 2.5l1 1-7 7H3.5v-1l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={styles.crInfoCardBody}>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Summary</span>
                    <span className={styles.crInfoValue}>
                      We're looking for a Senior React Developer to join our distributed engineering team.
                      You'll take full ownership of frontend architecture, mentor junior developers, and
                      help shape technical decisions.
                    </span>
                  </div>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Timeline</span>
                    <span className={styles.crInfoValue}>ASAP · 20–40 h/week</span>
                  </div>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Budget</span>
                    <span className={styles.crInfoValue}>$60 – $90 / hr</span>
                  </div>
                  <div className={styles.crInfoWarning}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1L1 13h12L7 1z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                      <path d="M7 5.5v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span>Contractors are 32% more likely to apply when they can see your budget range</span>
                  </div>
                </div>
              </div>

              <div className={styles.crInfoCard}>
                <div className={styles.crInfoCardHeader}>
                  <span className={styles.crInfoCardIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
                      <circle cx="9" cy="7" r="1" fill="currentColor" />
                      <path d="M9 9.5v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.crInfoCardTitle}>Details</span>
                  <button className={styles.crInfoCardEditBtn}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10.5 2.5l1 1-7 7H3.5v-1l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={styles.crInfoCardBody}>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Company</span>
                    <span className={styles.crInfoValueMuted}>Not filled</span>
                  </div>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Location and Time Zone</span>
                    <span className={styles.crInfoValueMuted}>Not filled</span>
                  </div>
                  <div className={styles.crInfoItem}>
                    <span className={styles.crInfoLabel}>Description</span>
                    <div className={styles.crDescriptionContent}>
                      <p className={styles.crDescHeading}>Key Responsibilities:</p>
                      <ul className={styles.crDescList}>
                        <li>Design and implement scalable React component architecture</li>
                        <li>Lead code reviews and maintain high engineering standards</li>
                        <li>Collaborate with product and design on new features</li>
                        <li>Optimize performance for large-scale data rendering</li>
                      </ul>
                      <p className={styles.crDescHeading}>Requirements:</p>
                      <ul className={styles.crDescList}>
                        <li>5+ years of React experience, TypeScript is a must</li>
                        <li>Strong knowledge of state management (Redux, Zustand, React Query)</li>
                        <li>Experience with Node.js backend and REST / GraphQL APIs</li>
                        <li>Proven track record of shipping production-grade code</li>
                      </ul>
                      <p className={styles.crDescHeading}>Preferred Skills:</p>
                      <ul className={styles.crDescList}>
                        <li>Experience with design systems and component libraries</li>
                        <li>Knowledge of CI/CD pipelines and testing frameworks</li>
                        <li>Familiarity with cloud services (AWS, GCP)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Phone preview */}
            <div className={styles.crSidebar}>
              <div className={styles.crPhoneFrame}>
                <div className={styles.crPhoneNotch} />
                <div className={styles.crPhoneScreen}>
                  <div className={styles.crPhoneLogo}>W</div>
                  <h3 className={styles.crPhoneTitle}>Senior React Developer</h3>
                  <p className={styles.crPhoneDesc}>
                    We are looking for a Senior React Developer to join our distributed engineering
                    team. You'll take full ownership of frontend architecture, mentor junior developers,
                    and help shape technical decisions as we scale our platform.
                  </p>
                  <span className={styles.crPhoneShowMore}>Show more</span>

                  <div className={styles.crPhoneMeta}>
                    <span className={styles.crPhoneMetaLabel}>Experience level</span>
                    <div className={styles.crPhoneChipRow}>
                      <span className={styles.crPhoneChip}>Senior</span>
                    </div>
                  </div>

                  <div className={styles.crPhoneMeta}>
                    <span className={styles.crPhoneMetaLabel}>Skills and tech</span>
                    <div className={styles.crPhoneChipRow}>
                      <span className={styles.crPhoneChip}>React</span>
                      <span className={styles.crPhoneChip}>TypeScript</span>
                      <span className={styles.crPhoneChip}>Node.js</span>
                      <span className={styles.crPhoneChipMore}>+2 more</span>
                    </div>
                  </div>

                  <div className={styles.crPhoneMeta}>
                    <span className={styles.crPhoneMetaLabel}>Languages required</span>
                    <div className={styles.crPhoneChipRow}>
                      <span className={styles.crPhoneChip}>English</span>
                    </div>
                  </div>

                  <div className={styles.crPhoneBottom}>
                    <div className={styles.crPhoneInfo}>
                      <span>Project type: Ongoing</span>
                      <span>Workload: 20–40 h/week</span>
                    </div>
                    <div className={styles.crPhoneExpiry}>
                      <span className={styles.crPhoneExpiryIcon}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                          <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Expires in 12d 21h</span>
                    </div>
                    <span className={styles.crPhoneStats}>42 viewed · 7 applied</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {saving && (
        <div className={styles.crSavingOverlay}>
          <div className={styles.crSavingModal}>
            <div className={styles.crSavingSpinner} />
            <p className={styles.crSavingTitle}>Saving your request…</p>
            <p className={styles.crSavingText}>
              We're matching your request with contractors from the Mellow pool
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Header — B&W version of the real product header
   ============================================================ */

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>mellow</div>
        <div className={styles.headerRight}>
          <button className={styles.newRequestBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New request
          </button>
          <button className={styles.aiScoutBtn}>
            AI Scout
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.headerAvatar}>VB</div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   View Mode Switcher — for toggling between prototype views
   ============================================================ */

function ViewSwitcher({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className={styles.viewSwitcher}>
      <span className={styles.viewSwitcherLabel}>Prototype:</span>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "create-request" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("create-request")}
      >
        1. Create Request
      </button>
      <span className={styles.viewSwitcherArrow}>→</span>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "first-visit" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("first-visit")}
      >
        2. First Visit (Pool)
      </button>
      <span className={styles.viewSwitcherSep}>|</span>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "variant-a" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("variant-a")}
      >
        A: Pool tab w/candidates
      </button>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "variant-a-empty" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("variant-a-empty")}
      >
        A2: Pool tab w/o candidates
      </button>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "returning" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("returning")}
      >
        B: Priority Inbox
      </button>
    </div>
  );
}

/* ============================================================
   Request Navigation — tabs, stats, published badge
   ============================================================ */

function RequestNavigation({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: string; label: string; badge?: number }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className={styles.requestNav}>
      <div className={styles.requestNavLeft}>
        <button className={styles.backBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navTab} ${activeTab === tab.id ? styles.navTabActive : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={styles.navTabBadge}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.requestNavRight}>
        <span className={styles.statsText}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}>
            <circle cx="8" cy="8" r="6" stroke="#999" strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="8" r="2.5" fill="#999" />
          </svg>
          0 viewed · 0 applied
        </span>
        <button className={styles.linkBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.5 9.5l3-3M7 11l-1.5 1.5a2.12 2.12 0 01-3-3L4 8m5-2l1.5-1.5a2.12 2.12 0 013 3L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className={styles.publishedBtn}>
          Published
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Contractor Row — matches real product candidate row
   ============================================================ */

function SourceTag({ source }: { source: ContractorSource }) {
  if (source === "mellow-pool") {
    return <span className={styles.sourceTagPool}>Mellow pool</span>;
  }
  if (source === "ultra") {
    return <span className={styles.sourceTagUltra}>☆ Ultra</span>;
  }
  return null;
}

function ContractorRow({
  contractor,
  onClick,
  showSourceTag,
  badgeOverride,
}: {
  contractor: Contractor;
  onClick: () => void;
  showSourceTag?: boolean;
  badgeOverride?: string;
}) {
  const isInactive = contractor.status === "invited" || contractor.status === "skipped";

  const badgeClass =
    contractor.status === "applied" ? styles.badgeApplied :
    contractor.status === "new" ? styles.badgeNew :
    contractor.status === "viewed" ? styles.badgeViewed :
    contractor.status === "invited" ? styles.badgeInvited :
    styles.badgeSkipped;

  const badgeLabel = badgeOverride ?? (
    contractor.status === "applied" ? "Applied" :
    contractor.status === "invited" ? "Invited" :
    contractor.status === "skipped" ? "Skipped" :
    contractor.status === "viewed" ? "Viewed" : "New"
  );

  return (
    <div
      className={`${styles.candidateRow} ${isInactive ? styles.candidateRowInactive : ""}`}
      onClick={onClick}
    >
      <div className={styles.candidateRowLeft}>
        <span className={`${styles.candidateBadge} ${badgeClass}`}>
          {badgeLabel}
        </span>
        <span className={styles.candidateName}>{contractor.name}</span>
        {showSourceTag && <SourceTag source={contractor.source} />}
      </div>
      <div className={styles.candidateRowRight}>
        <span className={styles.candidateMatch}>{contractor.matchScore}%</span>
      </div>
    </div>
  );
}

/* ============================================================
   Contractor Modal — Application-style modal
   ============================================================ */

function ContractorModal({
  contractor,
  onClose,
  onInvite,
  onSkip,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  inviteDisabled,
}: {
  contractor: Contractor;
  onClose: () => void;
  onInvite: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  inviteDisabled: boolean;
}) {
  const isApplied = contractor.status === "applied";
  const isInvited = contractor.status === "invited";
  const isSkipped = contractor.status === "skipped";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isApplied ? "Application" : "Recommended Contractor"}
          </h2>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalRoleRow}>
            <span className={styles.modalRoleLabel}>{contractor.role}</span>
            {isApplied ? (
              <span className={styles.modalAppliedTag}>Applied</span>
            ) : (
              <span className={styles.modalNotApplied}>Not applied yet</span>
            )}
          </div>
          <h3 className={styles.modalName}>{contractor.name}</h3>

          <div className={styles.modalFieldsRow}>
            <div className={styles.modalField}>
              <span className={styles.modalFieldLabel}>Email</span>
              <span className={styles.modalFieldLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {contractor.email}
              </span>
            </div>
            <div className={styles.modalField}>
              <span className={styles.modalFieldLabel}>CV</span>
              <span className={styles.modalFieldLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v7M7 9L4.5 6.5M7 9l2.5-2.5M3 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {contractor.cvFileName}
              </span>
            </div>
          </div>

          <div className={styles.modalMetaRow}>
            <div className={styles.modalMatchSection}>
              <span className={styles.modalMatchLabel}>Candidate match (AI Scout)</span>
              <div className={styles.modalMatchValue}>{contractor.matchScore}%</div>
            </div>
            <div className={styles.modalSourceSection}>
              <span className={styles.modalMatchLabel}>Found via</span>
              <span className={styles.sourceTag}>
                {contractor.source === "mellow-pool" ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      <circle cx="7" cy="7" r="2" fill="currentColor" />
                    </svg>
                    Mellow Pool
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                    Signal
                  </>
                )}
              </span>
            </div>
          </div>

          <div className={styles.modalCtaBlock}>
            <div className={styles.modalCtaIcon}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#000" strokeWidth="1.5" fill="none" />
                <path d="M10 14l3 3 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.modalCtaText}>
              {isApplied
                ? "This contractor applied to your request. Review their profile and add to shortlist."
                : isInvited
                ? "Invitation sent. You'll be notified when they respond."
                : isSkipped
                ? "You skipped this contractor. You can still send an invitation."
                : "This contractor hasn't applied yet. Send an invitation and they can apply for your request."}
            </div>
            <button
              className={styles.modalCtaBtn}
              onClick={onInvite}
              disabled={isInvited || (!isApplied && inviteDisabled)}
            >
              {isApplied ? "Add to Shortlist" : isInvited ? "✓ Invited" : "Send Invitation"}
            </button>
          </div>

          <div className={styles.modalDetailsGrid}>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Experience</span>
              <span className={styles.modalDetailValue}>{contractor.experience}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Rate</span>
              <span className={styles.modalDetailValue}>{contractor.rate}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Location</span>
              <span className={styles.modalDetailValue}>{contractor.location}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Education</span>
              <span className={styles.modalDetailValue}>{contractor.education}</span>
            </div>
          </div>

          <div className={styles.modalSkillsSection}>
            <span className={styles.modalDetailLabel}>Skills</span>
            <div className={styles.modalSkillsList}>
              {contractor.skills.map((s) => (
                <span key={s} className={styles.skillTag}>{s}</span>
              ))}
            </div>
          </div>

          {!isInvited && !isSkipped && (
            <button className={styles.skipBtn} onClick={onSkip}>
              {isApplied ? "Reject application" : "Skip this contractor"}
            </button>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.modalNavBtn}
            onClick={onPrev}
            disabled={!hasPrev}
          >
            ← Previous
          </button>
          <button
            className={styles.modalNavBtn}
            onClick={onNext}
            disabled={!hasNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Ultra Banner — two formats: expanded and compact
   ============================================================ */

function UltraBannerExpanded({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div className={styles.ultraExpanded}>
      <div className={styles.ultraExpandedContent}>
        <h3 className={styles.ultraExpandedTitle}>Need a Pro to Step In?</h3>
        <ul className={styles.ultraList}>
          <li><span className={styles.checkmark}>✓</span> Your request is reviewed and refined by a real person</li>
          <li><span className={styles.checkmark}>✓</span> 3+ carefully selected candidates within 48 hours</li>
          <li><span className={styles.checkmark}>✓</span> You'll be notified as soon as your shortlist is ready</li>
        </ul>
        <button className={styles.btnBlack}>Try Ultra for free</button>
      </div>
      <button className={styles.ultraCloseBtn} onClick={onCollapse}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function UltraBannerCompact({ onExpand }: { onExpand: () => void }) {
  return (
    <div className={styles.ultraCompact} onClick={onExpand}>
      <div className={styles.ultraCompactLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth="1.5" fill="none" />
          <path d="M12 7v5l3 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <span className={styles.ultraCompactTitle}>Hire faster with Ultra!</span>
          <span className={styles.ultraCompactText}>A dedicated manager delivers 3+ matching candidates within 48 hours</span>
        </div>
      </div>
      <button className={styles.btnBlack} style={{ flexShrink: 0 }}>Try Ultra for free</button>
    </div>
  );
}

function UltraBannerReady() {
  return (
    <div className={styles.ultraReady}>
      <div className={styles.ultraReadyIcon}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="10" cy="11" r="4" stroke="#000" strokeWidth="1.3" fill="none" />
          <path d="M3 22c0-4 14-4 14 0" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="11" r="4" stroke="#000" strokeWidth="1.3" fill="none" />
          <path d="M12 22c0-4 14-4 14 0" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.ultraReadyContent}>
        <span className={styles.ultraReadyTitle}>Your Ultra candidates are ready!</span>
        <span className={styles.ultraReadyText}>Found the right fit? If not, you can start a new search at no extra cost</span>
      </div>
      <button className={styles.btnOutline}>Reactivate Ultra</button>
    </div>
  );
}

/* ============================================================
   Candidates Empty State
   ============================================================ */

function CandidatesEmptyState() {
  return (
    <div className={styles.emptyState}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="16" y="12" width="48" height="56" rx="5" stroke="#ccc" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="30" r="10" stroke="#ccc" strokeWidth="1.5" fill="none" />
        <path d="M26 58c0-11.6 28-11.6 28 0" stroke="#ccc" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <h3 className={styles.emptyTitle}>Candidates Will Appear Here</h3>
      <p className={styles.emptyText}>
        Want to speed things up? Use our sharing kit to reach even more people.
      </p>
      <button className={styles.btnOutline}>Share your request</button>
    </div>
  );
}

/* ============================================================
   Progress Bar — for first visit
   ============================================================ */

function ProgressBar({ reviewed, total }: { reviewed: number; total: number }) {
  return (
    <div className={styles.progressSection}>
      <div className={styles.progressInfo}>
        <h2 className={styles.progressTitle}>We found contractors for your request</h2>
        <p className={styles.progressSubtitle}>Review each contractor and invite them to apply</p>
      </div>
      <div className={styles.progressRight}>
        <span className={styles.progressText}>{reviewed} of {total} reviewed</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(reviewed / total) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FIRST VISIT — Pool as a dedicated step
   ============================================================ */

function FirstVisitView({
  contractors,
  setContractors,
  onComplete,
}: {
  contractors: Contractor[];
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
  onComplete: () => void;
}) {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setContractors((prev) =>
      prev.map((c, i) => (i === idx && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (modalIdx === null) return;
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c, i) => (i === modalIdx ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
    setTimeout(() => {
      if (modalIdx < contractors.length - 1) {
        openModal(modalIdx + 1);
      } else {
        setModalIdx(null);
        onComplete();
      }
    }, 400);
  };

  const handleSkip = () => {
    if (modalIdx === null) return;
    setContractors((prev) =>
      prev.map((c, i) =>
        i === modalIdx && (c.status === "new" || c.status === "viewed")
          ? { ...c, status: "skipped" as const }
          : c
      )
    );
    if (modalIdx < contractors.length - 1) {
      openModal(modalIdx + 1);
    } else {
      setModalIdx(null);
      onComplete();
    }
  };

  return (
    <>
      <p className={styles.poolHeaderText}>
        We found {contractors.length} contractors matching your request. Review their profiles and invite them to apply.
      </p>

      <div className={styles.poolList}>
        {contractors.map((c, i) => (
          <ContractorRow key={c.id} contractor={c} onClick={() => openModal(i)} />
        ))}
      </div>

      <button className={styles.poolNextBtn} onClick={onComplete}>
        Next step
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {modalIdx !== null && contractors[modalIdx] && (
        <ContractorModal
          contractor={contractors[modalIdx]}
          onClose={() => setModalIdx(null)}
          onInvite={handleInvite}
          onSkip={handleSkip}
          onPrev={() => modalIdx > 0 && openModal(modalIdx - 1)}
          onNext={() => modalIdx < contractors.length - 1 && openModal(modalIdx + 1)}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < contractors.length - 1}
          inviteDisabled={inviteCount >= 10}
        />
      )}

      {showRateLimit && (
        <div className={styles.rateLimitToast}>
          You've reached the invitation limit. Please try again later.
        </div>
      )}
    </>
  );
}

/* ============================================================
   VARIANT A — Pool as separate tab
   ============================================================ */

function VariantA({
  contractors,
  setContractors,
  appliedCandidates,
  setAppliedCandidates,
}: {
  contractors: Contractor[];
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
  appliedCandidates: Contractor[];
  setAppliedCandidates: React.Dispatch<React.SetStateAction<Contractor[]>>;
}) {
  const [activeTab, setActiveTab] = useState<string>("candidates");
  const [subTab, setSubTab] = useState<"recommended" | "applied">("recommended");
  const [modalId, setModalId] = useState<string | null>(null);
  const [inviteCount, setInviteCount] = useState(0);

  const invitedCount = contractors.filter((c) => c.status === "invited").length;
  const poolCount = contractors.filter((c) => c.status !== "invited" && c.status !== "skipped").length;
  const appliedCount = appliedCandidates.length;

  const allItems = subTab === "recommended" ? contractors : appliedCandidates;
  const modalContractor = allItems.find((c) => c.id === modalId) ?? null;
  const currentIdx = allItems.findIndex((c) => c.id === modalId);

  const openModal = (id: string) => {
    setModalId(id);
    if (subTab === "recommended") {
      setContractors((prev) =>
        prev.map((c) => (c.id === id && c.status === "new" ? { ...c, status: "viewed" as const } : c))
      );
    } else {
      setAppliedCandidates((prev) =>
        prev.map((c) => (c.id === id && c.status === "applied" ? { ...c, status: "viewed" as const } : c))
      );
    }
  };

  const handleInvite = () => {
    if (!modalContractor) return;
    setContractors((prev) =>
      prev.map((c) => (c.id === modalContractor.id ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleSkip = () => {
    if (!modalContractor) return;
    setContractors((prev) =>
      prev.map((c) =>
        c.id === modalContractor.id && (c.status === "new" || c.status === "viewed")
          ? { ...c, status: "skipped" as const }
          : c
      )
    );
  };

  const newApplied = appliedCandidates.filter((c) => c.status === "applied");
  const viewedApplied = appliedCandidates.filter((c) => c.status === "viewed");

  return (
    <>
      <RequestNavigation
        tabs={[
          { id: "candidates", label: "Candidates" },
          { id: "promotion", label: "Promotion" },
          { id: "edit", label: "Edit" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "candidates" && (
        <div className={styles.tabContent}>
          {/* Sub-tabs */}
          <div className={styles.subTabs}>
            <button
              className={`${styles.subTab} ${subTab === "recommended" ? styles.subTabActive : ""}`}
              onClick={() => setSubTab("recommended")}
            >
              Recommended
              <span className={styles.subTabBadge}>{poolCount}</span>
            </button>
            <button
              className={`${styles.subTab} ${subTab === "applied" ? styles.subTabActive : ""}`}
              onClick={() => setSubTab("applied")}
            >
              Applied
              {appliedCount > 0 && <span className={styles.subTabBadge}>{appliedCount}</span>}
            </button>
          </div>

          {subTab === "recommended" && (
            <>
              <p className={styles.poolSubtitle}>
                {invitedCount > 0
                  ? `You've invited ${invitedCount} contractor${invitedCount > 1 ? "s" : ""}. Waiting for their response.`
                  : "Here's a shortlist of contractors suggested by AI Scout based on your request"}
              </p>
              <div className={styles.poolList}>
                {contractors.map((c) => (
                  <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} badgeOverride={c.status === "new" ? "Matched" : undefined} />
                ))}
                <div className={styles.moreSuggestions}>
                  <span>Want to see more contractors?</span>
                  <button className={styles.btnOutline}>Get more suggestions</button>
                </div>
              </div>
            </>
          )}

          {subTab === "applied" && (
            <>
              <div className={styles.sortRow}>
                <button className={styles.sortBtn}>
                  Sort by Status
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {newApplied.length > 0 && (
                <>
                  <SectionHeader title="New" count={newApplied.length} />
                  <div className={styles.poolList}>
                    {newApplied.map((c) => (
                      <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} showSourceTag badgeOverride="New" />
                    ))}
                  </div>
                </>
              )}

              {viewedApplied.length > 0 && (
                <>
                  <SectionHeader title="Viewed" count={viewedApplied.length} />
                  <div className={styles.poolList}>
                    {viewedApplied.map((c) => (
                      <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} showSourceTag />
                    ))}
                  </div>
                </>
              )}

              <UltraBannerReady />
            </>
          )}
        </div>
      )}

      {modalContractor && (
        <ContractorModal
          contractor={modalContractor}
          onClose={() => setModalId(null)}
          onInvite={handleInvite}
          onSkip={handleSkip}
          onPrev={() => currentIdx > 0 && openModal(allItems[currentIdx - 1].id)}
          onNext={() => currentIdx < allItems.length - 1 && openModal(allItems[currentIdx + 1].id)}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < allItems.length - 1}
          inviteDisabled={inviteCount >= 10}
        />
      )}
    </>
  );
}

/* ============================================================
   VARIANT A EMPTY — Pool tab without candidates
   ============================================================ */

function VariantAEmpty() {
  const [activeTab, setActiveTab] = useState<string>("candidates");
  const [showUltra, setShowUltra] = useState(true);

  return (
    <>
      <RequestNavigation
        tabs={[
          { id: "candidates", label: "Candidates" },
          { id: "promotion", label: "Promotion" },
          { id: "edit", label: "Edit" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "candidates" && (
        <div className={styles.tabContent}>
          <div className={styles.sortRow}>
            <button className={styles.sortBtn}>
              Sort by Status
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {showUltra && (
            <UltraBannerExpanded onCollapse={() => setShowUltra(false)} />
          )}

          <CandidatesEmptyState />
        </div>
      )}
    </>
  );
}

/* ============================================================
   Section Header — for priority inbox sections
   ============================================================ */

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionTitle}>{title}</span>
      <span className={styles.sectionCount}>{count}</span>
    </div>
  );
}

/* ============================================================
   RETURNING VISIT — Unified priority inbox
   ============================================================ */

function ReturningVisit({
  contractors,
  setContractors,
  appliedCandidates,
  setAppliedCandidates,
}: {
  contractors: Contractor[];
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
  appliedCandidates: Contractor[];
  setAppliedCandidates: React.Dispatch<React.SetStateAction<Contractor[]>>;
}) {
  const [activeTab, setActiveTab] = useState<string>("candidates");
  const [modalId, setModalId] = useState<string | null>(null);
  const [inviteCount, setInviteCount] = useState(0);

  const applied = appliedCandidates.filter((c) => c.status === "applied");
  const recommendations = contractors.filter((c) => c.status === "new" || c.status === "viewed");
  const invited = contractors.filter((c) => c.status === "invited");
  const skipped = contractors.filter((c) => c.status === "skipped");

  const flatList = [...applied, ...recommendations, ...invited, ...skipped];
  const totalCount = flatList.length;

  const modalContractor = flatList.find((c) => c.id === modalId) ?? null;
  const currentIdx = flatList.findIndex((c) => c.id === modalId);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < flatList.length - 1;

  const openModal = (id: string) => {
    setModalId(id);
    setContractors((prev) =>
      prev.map((c) => (c.id === id && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (!modalContractor) return;
    if (modalContractor.status === "applied") {
      setAppliedCandidates((prev) =>
        prev.map((c) => (c.id === modalContractor.id ? { ...c, status: "invited" as const } : c))
      );
    } else {
      setContractors((prev) =>
        prev.map((c) => (c.id === modalContractor.id ? { ...c, status: "invited" as const } : c))
      );
    }
    setInviteCount((n) => n + 1);
  };

  const handleSkip = () => {
    if (!modalContractor) return;
    if (modalContractor.status === "applied") {
      setAppliedCandidates((prev) =>
        prev.map((c) =>
          c.id === modalContractor.id ? { ...c, status: "skipped" as const } : c
        )
      );
    } else {
      setContractors((prev) =>
        prev.map((c) =>
          c.id === modalContractor.id && (c.status === "new" || c.status === "viewed")
            ? { ...c, status: "skipped" as const }
            : c
        )
      );
    }
  };

  const handlePrev = () => {
    if (hasPrev) openModal(flatList[currentIdx - 1].id);
  };

  const handleNext = () => {
    if (hasNext) openModal(flatList[currentIdx + 1].id);
  };

  return (
    <>
      <RequestNavigation
        tabs={[
          { id: "candidates", label: "Candidates", badge: totalCount },
          { id: "promotion", label: "Promotion" },
          { id: "edit", label: "Edit" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "candidates" && (
        <div className={styles.tabContent}>
          {applied.length > 0 && (
            <>
              <SectionHeader title="Applicants" count={applied.length} />
              <div className={styles.poolList}>
                {applied.map((c) => (
                  <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} showSourceTag badgeOverride="New" />
                ))}
              </div>
            </>
          )}

          {recommendations.length > 0 && (
            <>
              <SectionHeader title="Recommended by Mellow" count={recommendations.length} />
              <div className={styles.poolList}>
                {recommendations.map((c) => (
                  <ContractorRow
                    key={c.id}
                    contractor={c}
                    onClick={() => openModal(c.id)}
                    badgeOverride={c.status === "new" ? "Matched" : undefined}
                  />
                ))}
              </div>
            </>
          )}

          {invited.length > 0 && (
            <>
              <SectionHeader title="Invited — waiting for response" count={invited.length} />
              <div className={styles.poolList}>
                {invited.map((c) => (
                  <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} />
                ))}
              </div>
            </>
          )}

          {skipped.length > 0 && (
            <>
              <SectionHeader title="Skipped" count={skipped.length} />
              <div className={styles.poolList}>
                {skipped.map((c) => (
                  <ContractorRow key={c.id} contractor={c} onClick={() => openModal(c.id)} />
                ))}
              </div>
            </>
          )}

          <UltraBannerReady />

          <div className={styles.moreSuggestions}>
            <span>Want to see more contractors?</span>
            <button className={styles.btnOutline}>Get more suggestions</button>
          </div>
        </div>
      )}

      {modalContractor && (
        <ContractorModal
          contractor={modalContractor}
          onClose={() => setModalId(null)}
          onInvite={handleInvite}
          onSkip={handleSkip}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
          inviteDisabled={inviteCount >= 10}
        />
      )}
    </>
  );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */

export function MellowPoolScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("create-request");
  const [contractors, setContractors] = useState(POOL_CONTRACTORS.map((c) => ({ ...c, status: "new" as const })));
  const [appliedCandidates, setAppliedCandidates] = useState(APPLIED_CANDIDATES);

  const handleViewChange = (m: ViewMode) => {
    setViewMode(m);
    if (m === "create-request" || m === "first-visit") {
      setContractors(POOL_CONTRACTORS.map((c) => ({ ...c, status: "new" as const })));
      setAppliedCandidates(APPLIED_CANDIDATES);
    } else if (m === "variant-a") {
      setContractors(POOL_CONTRACTORS.map((c, i) => ({
        ...c,
        status: (i < 3 ? "viewed" : "new") as CardStatus,
      })));
      setAppliedCandidates(APPLIED_CANDIDATES);
    } else if (m === "variant-a-empty") {
      setContractors(POOL_CONTRACTORS.map((c) => ({ ...c, status: "new" as const })));
      setAppliedCandidates([]);
    } else {
      setContractors(POOL_CONTRACTORS.map((c, i) => ({
        ...c,
        status: (i < 3 ? "invited" : i < 5 ? "skipped" : "new") as CardStatus,
      })));
      setAppliedCandidates(APPLIED_CANDIDATES);
    }
  };

  return (
    <div className={styles.screen}>
      <ViewSwitcher mode={viewMode} onChange={handleViewChange} />

      {viewMode === "create-request" && (
        <CreateRequestStep onSave={() => handleViewChange("first-visit")} />
      )}

      {viewMode !== "create-request" && (
        <>
          {viewMode !== "first-visit" && <Header />}
          <div className={styles.content}>
            <div className={styles.container}>
              <h1 className={styles.requestTitle}>Senior React Developer</h1>

              {viewMode === "first-visit" && (
                <FirstVisitView
                  contractors={contractors}
                  setContractors={setContractors}
                  onComplete={() => setViewMode("returning")}
                />
              )}

          {viewMode === "variant-a" && (
            <VariantA
              contractors={contractors}
              setContractors={setContractors}
              appliedCandidates={appliedCandidates}
              setAppliedCandidates={setAppliedCandidates}
            />
          )}

          {viewMode === "variant-a-empty" && (
            <VariantAEmpty />
          )}

              {viewMode === "returning" && (
                <ReturningVisit
                  contractors={contractors}
                  setContractors={setContractors}
                  appliedCandidates={appliedCandidates}
                  setAppliedCandidates={setAppliedCandidates}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

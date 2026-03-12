import { useState, useEffect, useCallback } from "react";
import "../../design-system/typography.css";
import styles from "./PromptValidationScreen.module.css";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FlowStep =
  | "dashboard"
  | "quiz"
  | "warning"
  | "redirect"
  | "block"
  | "edit"
  | "chat"
  | "dashboard-retry";

type Decision = "approve-full" | "approve-partial" | "warning" | "redirect" | "block";

interface DetectedField {
  id: string;
  label: string;
  required: boolean;
  detected: boolean;
}

export type Variant = "S1" | "S2" | "S3a" | "S3b" | "S4" | "S5";

/* ------------------------------------------------------------------ */
/*  Keyword detection (simulated AI)                                   */
/* ------------------------------------------------------------------ */

const DET: Record<string, RegExp> = {
  role: /\b(designer|developer|engineer|artist|manager|writer|analyst|consultant|architect|specialist|coordinator|director|lead|recruiter|animator|modeler|rigger|producer|tester|qa|devops|copywriter|editor|translator|illustrator|programmer|coder)\b/i,
  experience: /\b(senior|middle|junior|lead|intern|entry[\s-]?level|mid[\s-]?level|experienced|expert|\d+\s*(years?|yrs?)|sr\.|jr\.)\b/i,
  project_type: /\b(project|ongoing|one[\s-]?time|contract|freelance|part[\s-]?time|full[\s-]?time|temporary|\d+\s*months?|\d+\s*weeks?|long[\s-]?term|short[\s-]?term)\b/i,
  budget: /(\$|usd|eur|gbp|\b(hourly|hour|hr|rate|budget|pay|compensation)\b|\d+\s*\/\s*h)/i,
  skills: /\b(unity|unreal|figma|react|python|javascript|typescript|photoshop|illustrator|blender|maya|zbrush|node|aws|docker|sketch|canva|after\s*effects|premiere|salesforce|marketo|snowflake|ue5|blueprint|shader|houdini|substance|sql|tableau|wordpress)\b/i,
  location: /\b(remote|onsite|hybrid|worldwide|anywhere|us\b|usa|eu\b|europe|uk\b|asia|mena)\b/i,
  industry: /\b(gaming|game\s*dev|fintech|marketing|healthcare|ecommerce|saas|edtech|media|entertainment|gamedev|martech)\b/i,
  languages: /\b(english|spanish|french|german|russian|chinese|japanese|portuguese|arabic|korean|italian)\b/i,
};

function detectFields(text: string): DetectedField[] {
  const t = text.toLowerCase();
  return [
    { id: "role", label: "Role", required: true, detected: DET.role.test(t) },
    { id: "experience", label: "Experience level", required: true, detected: DET.experience.test(t) },
    { id: "project_type", label: "Project type", required: true, detected: DET.project_type.test(t) },
    { id: "budget", label: "Budget", required: false, detected: DET.budget.test(t) },
    { id: "skills", label: "Skills / Tools", required: false, detected: DET.skills.test(t) },
    { id: "location", label: "Location", required: false, detected: DET.location.test(t) },
    { id: "industry", label: "Industry", required: false, detected: DET.industry.test(t) },
    { id: "languages", label: "Languages", required: false, detected: DET.languages.test(t) },
  ];
}

/* ------------------------------------------------------------------ */
/*  Variant presets                                                    */
/* ------------------------------------------------------------------ */

const VARIANT_PROMPTS: Record<Variant, string> = {
  S1: "Senior UE5 Technical Artist, $50-80/hr, 3-month game development project. Need strong blueprint and shader skills. English required.",
  S2: "Looking for a senior Unity developer for our mobile game project",
  S3a: "developer",
  S3b: "developer",
  S4: "I'm a UX designer with 5 years of experience, looking for remote projects and new clients",
  S5: "Need someone to write fake reviews for our app store listings and create bot accounts",
};

const VARIANT_DECISIONS: Record<Variant, Decision> = {
  S1: "approve-full",
  S2: "approve-partial",
  S3a: "warning",
  S3b: "warning",
  S4: "redirect",
  S5: "block",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <div className={styles.fixedHeader}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>mellow</div>
        <div className={styles.headerRight}>
          <button className={styles.headerBtn}>
            <span>AI Scout</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.avatar}>VB</div>
        </div>
      </div>
    </div>
  );
}

function DetectionChips({ fields, retryHighlight }: { fields: DetectedField[]; retryHighlight?: string[] }) {
  const required = fields.filter((f) => f.required);
  const optional = fields.filter((f) => !f.required);

  const requiredChipClass = (f: DetectedField) => {
    if (f.detected) return `${styles.detectionChip} ${styles.chipDetected}`;
    if (retryHighlight?.includes(f.id)) return `${styles.detectionChip} ${styles.chipMissing}`;
    return `${styles.detectionChip} ${styles.chipRequired}`;
  };

  return (
    <div className={styles.chipsSection}>
      <p className={styles.chipsLabel}>Required</p>
      <div className={styles.chipsRow}>
        {required.map((f) => (
          <span key={f.id} className={requiredChipClass(f)}>
            {f.detected ? (
              <span className={styles.chipIcon}>✓</span>
            ) : (
              <span className={`${styles.chipDot} ${styles.chipDotRequired}`} />
            )}
            {f.label}
          </span>
        ))}
      </div>
      <p className={styles.chipsLabel} style={{ marginTop: 12 }}>
        Recommended
      </p>
      <div className={styles.chipsRow}>
        {optional.map((f) => (
          <span key={f.id} className={`${styles.detectionChip} ${styles.chipOptional}`}>
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===== Dashboard Step ===== */
function DashboardStep({
  prompt,
  onPromptChange,
  onGenerate,
  retryHint,
  retryHighlightFields,
}: {
  prompt: string;
  onPromptChange: (v: string) => void;
  onGenerate: () => void;
  retryHint?: string;
  retryHighlightFields?: string[];
}) {
  const fields = detectFields(prompt);

  return (
    <div className={styles.dashboardBody}>
      <h1 className={styles.dashboardTitle}>Create New Freelancer Request</h1>

      <div className={styles.promptArea}>
        <textarea
          className={styles.promptTextarea}
          placeholder="Describe your request"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          rows={3}
        />
        <button className={styles.generateBtn} onClick={onGenerate}>
          ✦ Generate
        </button>
      </div>

      <p className={styles.exampleText}>
        Example: Senior UE5 Technical Artist, $50-80/hr, 3-month game dev project, blueprint & shader skills
      </p>

      {retryHint && (
        <div className={styles.retryHint}>
          <span className={styles.retryHintIcon}>⚠</span>
          <p className={styles.retryHintText}>{retryHint}</p>
        </div>
      )}

      <DetectionChips fields={fields} retryHighlight={retryHighlightFields} />
    </div>
  );
}

/* ===== Quiz + Loader Step ===== */
function QuizStep({
  decision,
  onTransition,
}: {
  decision: Decision;
  onTransition: (next: FlowStep) => void;
}) {
  const [interrupt, setInterrupt] = useState<Decision | null>(null);

  useEffect(() => {
    const delay = decision.startsWith("approve") ? 3000 : 2000;

    const timer = setTimeout(() => {
      if (decision === "approve-full" || decision === "approve-partial") {
        onTransition("edit");
      } else {
        setInterrupt(decision);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [decision, onTransition]);

  const loaderStopped = interrupt !== null;

  return (
    <div className={styles.quizScreen}>
      <div className={styles.quizLeft}>
        <span className={styles.statusLabel}>
          {loaderStopped ? "Validation — Action required" : "Generating — In progress"}
        </span>

        <div className={interrupt ? styles.quizDimmed : undefined}>
          <h2 className={styles.quizTitle}>Choose Your Next Step</h2>
          <p className={styles.quizSubtitle}>This helps us personalize your experience</p>

          <div className={styles.quizOptions}>
            {[
              { title: "I'd like to browse matched contractors", desc: "Explore AI-matched contractors from Mellow's pool (coming soon)" },
              { title: "I need candidates urgently", desc: "A dedicated Orchestrator will source and screen candidates for you" },
              { title: "I want to find the most trusted contractor", desc: "Get a shareable request page to source contractors from your network" },
              { title: "I'm a contractor looking for work", desc: "Discover new project opportunities on Project Radar" },
            ].map((opt) => (
              <div key={opt.title} className={styles.quizOption}>
                <div className={styles.quizRadio} />
                <div className={styles.quizOptionText}>
                  <h4>{opt.title}</h4>
                  <p>{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.quizHide}>
            <div className={styles.quizHideCheckbox} />
            <span>Hide this quiz next time</span>
          </div>
        </div>

        {interrupt === "warning" && (
          <div className={styles.interruptOverlay}>
            <div className={`${styles.interruptIcon} ${styles.iconWarning}`}>⚠</div>
            <h3 className={styles.interruptTitle}>Your request needs more detail</h3>
            <p className={styles.interruptText}>
              We couldn't generate a quality request from your prompt. Please add the missing information so we can create an accurate project description.
            </p>
            <div className={styles.interruptMissing}>
              <h4>Missing required fields</h4>
              <ul>
                <li><strong>Experience level</strong> — e.g. senior, middle, junior</li>
                <li><strong>Project type</strong> — e.g. 3-month contract, ongoing, one-time</li>
              </ul>
            </div>
            <div className={styles.interruptActions}>
              <button className={styles.btnPrimary} onClick={() => onTransition("dashboard-retry")}>
                ← Improve your prompt
              </button>
              <button className={styles.btnSecondary} onClick={() => onTransition("chat")}>
                💬 Chat with AI to refine
              </button>
            </div>
          </div>
        )}

        {interrupt === "redirect" && (
          <div className={styles.interruptOverlay}>
            <div className={`${styles.interruptIcon} ${styles.iconRedirect}`}>🔍</div>
            <h3 className={styles.interruptTitle}>Looking for work yourself?</h3>
            <p className={styles.interruptText}>
              It looks like you might be a contractor searching for projects rather than hiring. If that's the case, Project Radar is the right place for you.
            </p>
            <div className={styles.redirectProductCard}>
              <div className={styles.redirectProductIcon}>PR</div>
              <div className={styles.redirectProductText}>
                <h4>Project Radar</h4>
                <p>Discover relevant B2B projects matched to your skills</p>
              </div>
            </div>
            <div className={styles.interruptActions}>
              <button className={styles.btnPrimary} onClick={() => window.open("https://mellow.io/radar", "_blank")}>
                Go to Project Radar →
              </button>
              <button className={styles.btnSecondary} onClick={() => onTransition("dashboard-retry")}>
                No, I'm hiring — let me rephrase
              </button>
            </div>
          </div>
        )}

        {interrupt === "block" && (
          <div className={styles.interruptOverlay}>
            <div className={`${styles.interruptIcon} ${styles.iconBlock}`}>✕</div>
            <h3 className={styles.interruptTitle}>Request can't be generated</h3>
            <p className={styles.interruptText}>
              This request appears to violate our community guidelines and can't be processed. Please make sure your request describes a legitimate project and the contractor role you need.
            </p>
            <div className={styles.interruptActions}>
              <button className={styles.btnPrimary} onClick={() => onTransition("dashboard-retry")}>
                ← Start a new request
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.quizRight}>
        <div
          className={styles.loaderSpinner}
          style={loaderStopped ? { animationPlayState: "paused", borderTopColor: "#ccc" } : undefined}
        />
        <h3 className={styles.loaderTitle}>
          {loaderStopped ? "Generation paused" : "Creating Your Request..."}
        </h3>
        <p className={styles.loaderSubtitle}>
          {loaderStopped ? "Please resolve the issue on the left" : "Almost ready — keep this page open"}
        </p>
      </div>
    </div>
  );
}

/* ===== Edit Page Step ===== */
type EditMode = "full" | "partial" | "from-chat";

function EditPageStep({ mode }: { mode: EditMode }) {
  const highlight = mode === "partial";
  const fromChat = mode === "from-chat";

  const title = fromChat
    ? "Mid-Senior React Frontend Developer — Dashboard Rebuild"
    : highlight
      ? "Senior Unity Developer — Mobile Game"
      : "Senior UE5 Technical Artist — Game Development";

  return (
    <div className={styles.editScreen}>
      <div className={styles.editSaveBar}>
        <h2 className={styles.editRequestTitle}>{title}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className={styles.btnSecondary} style={{ width: "auto" }}>Preview</button>
          <button className={styles.btnPrimary} style={{ width: "auto" }}>✦ Save request</button>
        </div>
      </div>

      {highlight && (
        <div className={styles.editBanner}>
          <span className={styles.editBannerIcon}>ℹ</span>
          <span>
            <strong>Some fields were auto-filled by AI.</strong> We didn't find budget, skills, or language preferences in your prompt.
            Please review the highlighted sections before saving.
          </span>
        </div>
      )}

      <div className={styles.editContent}>
        <div className={styles.editMain}>
          <div className={styles.editBlock}>
            <h3 className={styles.editBlockTitle}>Project Summary</h3>
            <p className={styles.editBlockText}>
              {fromChat
                ? "We are looking for a Mid-to-Senior React Frontend Developer for a 6-month project to rebuild our customer-facing dashboard. The ideal candidate will have strong experience with modern React patterns, TypeScript, responsive design, and data visualization."
                : highlight
                  ? "We are looking for an experienced Unity Developer to join our mobile game project. The ideal candidate will have deep knowledge of Unity engine, C# scripting, mobile optimization, and experience shipping games on iOS and Android platforms."
                  : "We are seeking a Senior UE5 Technical Artist for a 3-month game development project. The ideal candidate will bridge the gap between art and engineering, creating efficient shader pipelines, optimizing Blueprints, and building tools that accelerate the art team's workflow within Unreal Engine 5."}
            </p>
          </div>

          <div className={styles.editBlock}>
            <h3 className={styles.editBlockTitle}>Key Responsibilities</h3>
            <ul className={styles.editList}>
              {fromChat ? (
                <>
                  <li>Rebuild the customer dashboard from scratch using React and TypeScript</li>
                  <li>Implement responsive layouts and data visualization components</li>
                  <li>Collaborate with backend engineers on API integration</li>
                  <li>Write clean, testable code with proper component architecture</li>
                </>
              ) : highlight ? (
                <>
                  <li>Develop gameplay systems and mechanics in Unity using C#</li>
                  <li>Optimize game performance for mobile devices (iOS/Android)</li>
                  <li>Collaborate with artists and designers to implement visual features</li>
                  <li>Debug and resolve technical issues across the development pipeline</li>
                </>
              ) : (
                <>
                  <li>Develop and maintain shader pipelines and material systems in UE5</li>
                  <li>Create Blueprint tools and editor utilities to speed up art production</li>
                  <li>Optimize rendering performance across target platforms</li>
                  <li>Bridge communication between art and engineering teams</li>
                </>
              )}
            </ul>
          </div>

          <div className={styles.editBlock}>
            <h3 className={styles.editBlockTitle}>Requirements</h3>
            <ul className={styles.editList}>
              {fromChat ? (
                <>
                  <li>3+ years of professional React development experience</li>
                  <li>Strong TypeScript skills and understanding of type safety</li>
                  <li>Experience building complex dashboard interfaces</li>
                  <li>Familiarity with charting libraries (Recharts, D3, etc.)</li>
                </>
              ) : highlight ? (
                <>
                  <li>5+ years of Unity development experience</li>
                  <li>Strong C# programming skills</li>
                  <li>Shipped at least one mobile game title</li>
                  <li>Experience with mobile performance optimization</li>
                </>
              ) : (
                <>
                  <li>5+ years of experience as a Technical Artist in game development</li>
                  <li>Deep proficiency with UE5 Blueprints and material editor</li>
                  <li>Strong understanding of real-time rendering and shader programming</li>
                  <li>Experience with Houdini or Substance Designer is a plus</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.editSidebar}>
          <div className={styles.editSidebarCard}>
            <p className={styles.editSidebarCardTitle}>Skills &amp; Tools</p>
            {highlight ? (
              <div className={styles.highlightField}>
                <span className={styles.highlightBadge}>AI-filled</span>
                <div className={styles.editChipsRow}>
                  <span className={styles.editChip}>Unity</span>
                  <span className={styles.editChip}>C#</span>
                  <span className={styles.editChip}>Mobile Optimization</span>
                  <span className={styles.editChip}>iOS</span>
                  <span className={styles.editChip}>Android</span>
                </div>
              </div>
            ) : (
              <div className={styles.editChipsRow}>
                {fromChat ? (
                  <>
                    <span className={styles.editChip}>React</span>
                    <span className={styles.editChip}>TypeScript</span>
                    <span className={styles.editChip}>Responsive Design</span>
                    <span className={styles.editChip}>Data Visualization</span>
                  </>
                ) : (
                  <>
                    <span className={styles.editChip}>UE5</span>
                    <span className={styles.editChip}>Blueprints</span>
                    <span className={styles.editChip}>Shader Programming</span>
                    <span className={styles.editChip}>Houdini</span>
                    <span className={styles.editChip}>Substance</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.editSidebarCard}>
            <p className={styles.editSidebarCardTitle}>Budget</p>
            {highlight ? (
              <div className={styles.highlightField}>
                <span className={styles.highlightBadge}>AI-filled</span>
                <div className={styles.editFieldRow}>
                  <span className={styles.editFieldLabel}>Rate</span>
                  <span className={styles.editFieldValue}>$40 — $70 / hr</span>
                </div>
                <div className={styles.editFieldRow}>
                  <span className={styles.editFieldLabel}>Type</span>
                  <span className={styles.editFieldValue}>Hourly</span>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.editFieldRow}>
                  <span className={styles.editFieldLabel}>Rate</span>
                  <span className={styles.editFieldValue}>{fromChat ? "$50 — $80 / hr" : "$50 — $80 / hr"}</span>
                </div>
                <div className={styles.editFieldRow}>
                  <span className={styles.editFieldLabel}>Type</span>
                  <span className={styles.editFieldValue}>Hourly</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.editSidebarCard}>
            <p className={styles.editSidebarCardTitle}>Languages</p>
            <div className={styles.editChipsRow}>
              <span className={styles.editChip}>English</span>
            </div>
          </div>

          <div className={styles.editSidebarCard}>
            <p className={styles.editSidebarCardTitle}>Project Details</p>
            <div className={styles.editFieldRow}>
              <span className={styles.editFieldLabel}>Experience</span>
              <span className={styles.editFieldValue}>{fromChat ? "Middle — Senior" : "Senior"}</span>
            </div>
            <div className={styles.editFieldRow}>
              <span className={styles.editFieldLabel}>Duration</span>
              <span className={styles.editFieldValue}>{fromChat ? "6 months" : highlight ? "Ongoing" : "3 months"}</span>
            </div>
            <div className={styles.editFieldRow}>
              <span className={styles.editFieldLabel}>Location</span>
              <span className={styles.editFieldValue}>Remote</span>
            </div>
            <div className={styles.editFieldRow}>
              <span className={styles.editFieldLabel}>Workload</span>
              <span className={styles.editFieldValue}>Full-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Chat UI Step ===== */
function ChatUIStep({ onGenerateFromChat }: { onGenerateFromChat: () => void }) {
  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatLeft}>
        <div className={styles.chatHeader}>
          <div className={styles.chatAvatar}>AI</div>
          <div className={styles.chatHeaderText}>
            <h3>Scout Request Assistant</h3>
            <p>Helping you build a better request</p>
          </div>
        </div>

        <div className={styles.chatMessages}>
          <div className={styles.chatBubbleAI}>
            Hi! I noticed your request just says <strong>"developer"</strong> — that's a great start, but I need a few more details to create a solid project description. Let me ask a couple of quick questions.
          </div>

          <div className={styles.chatBubbleAI}>
            <strong>What type of developer do you need?</strong><br />
            For example: frontend, backend, full-stack, Unity, UE5, mobile, etc.
          </div>

          <div className={styles.chatBubbleUser}>
            React frontend developer
          </div>

          <div className={styles.chatBubbleAI}>
            Got it — React frontend developer. <strong>What experience level are you looking for?</strong> Junior, Middle, or Senior?
          </div>

          <div className={styles.chatBubbleUser}>
            Middle to senior
          </div>

          <div className={styles.chatBubbleAI}>
            <strong>What kind of project is this?</strong> For example: a 3-month contract, ongoing engagement, one-time task, etc.
          </div>

          <div className={styles.chatBubbleUser}>
            It's a 6-month project to rebuild our customer dashboard
          </div>

          <div className={styles.chatBubbleAI}>
            Great, I have enough to build your request. Here's the improved prompt:
            <div className={styles.chatImprovedPrompt}>
              <h4>Your improved request</h4>
              <p>
                Middle-to-Senior React Frontend Developer for a 6-month project to rebuild a customer dashboard. Experience with modern React (hooks, TypeScript), responsive design, and dashboard/data-viz preferred.
              </p>
            </div>
            <div className={styles.chatImprovedActions}>
              <button className={styles.btnPrimary} style={{ width: "auto", padding: "8px 20px", fontSize: 13 }} onClick={onGenerateFromChat}>
                ✦ Generate request
              </button>
              <button className={styles.btnGhost} style={{ padding: "8px 12px", fontSize: 13 }}>
                Edit prompt
              </button>
            </div>
          </div>
        </div>

        <div className={styles.chatInputArea}>
          <input className={styles.chatInput} placeholder="Type a message..." />
          <button className={styles.chatSendBtn}>Send</button>
        </div>
      </div>

      <div className={styles.chatRight}>
        <div className={styles.loaderSpinner} style={{ opacity: 0.2, animationPlayState: "paused" }} />
        <h3 className={styles.loaderTitle} style={{ opacity: 0.4 }}>Waiting for prompt...</h3>
        <p className={styles.loaderSubtitle} style={{ opacity: 0.3 }}>
          We'll generate your request once the prompt is ready
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Screen                                                        */
/* ------------------------------------------------------------------ */

export function PromptValidationScreen({ variant }: { variant: Variant }) {
  const decision = VARIANT_DECISIONS[variant];
  const presetPrompt = VARIANT_PROMPTS[variant];

  const [step, setStep] = useState<FlowStep>("dashboard");
  const [prompt, setPrompt] = useState(presetPrompt);
  const [retryHint, setRetryHint] = useState<string | undefined>();
  const [retryHighlight, setRetryHighlight] = useState<string[] | undefined>();
  const [retryCount, setRetryCount] = useState(0);
  const [cameFromChat, setCameFromChat] = useState(false);

  useEffect(() => {
    setStep("dashboard");
    setPrompt(presetPrompt);
    setRetryHint(undefined);
    setRetryHighlight(undefined);
    setRetryCount(0);
    setCameFromChat(false);
  }, [variant, presetPrompt]);

  const handleGenerate = useCallback(() => {
    setStep("quiz");
  }, []);

  const effectiveDecision = retryCount > 0 ? "approve-full" as Decision : decision;

  const handleTransition = useCallback(
    (next: FlowStep) => {
      if (next === "dashboard-retry") {
        setRetryCount((c) => c + 1);
        if (decision === "block") {
          setPrompt("");
          setRetryHint(
            "Your previous request was blocked. Please describe a legitimate project — include the role you need, required experience level, and project type."
          );
          setRetryHighlight(["role", "experience", "project_type"]);
        } else if (decision === "redirect") {
          setRetryHint(
            "Your previous prompt sounded like a contractor looking for work. Rephrase it as a hiring request — describe the role, project, and what you need."
          );
          setRetryHighlight(["role", "project_type"]);
        } else {
          setRetryHint(
            "Please add the missing details: experience level (e.g. senior, middle) and project type (e.g. 3-month contract, ongoing)."
          );
          setRetryHighlight(["experience", "project_type"]);
        }
        setStep("dashboard");
      } else if (next === "chat") {
        setStep("chat");
      } else if (next === "dashboard") {
        setPrompt("");
        setRetryHint(undefined);
        setRetryHighlight(undefined);
        setRetryCount(0);
        setStep("dashboard");
      } else {
        setStep(next);
      }
    },
    [decision]
  );

  const editMode: EditMode = cameFromChat
    ? "from-chat"
    : decision === "approve-partial"
      ? "partial"
      : "full";

  return (
    <div className={styles.screen}>
      <Header />

      {step === "dashboard" && (
        <DashboardStep
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          retryHint={retryHint}
          retryHighlightFields={retryHighlight}
        />
      )}

      {step === "quiz" && (
        <QuizStep decision={effectiveDecision} onTransition={handleTransition} />
      )}

      {step === "edit" && (
        <EditPageStep mode={editMode} />
      )}

      {step === "chat" && (
        <ChatUIStep
          onGenerateFromChat={() => {
            setCameFromChat(true);
            setStep("edit");
          }}
        />
      )}
    </div>
  );
}

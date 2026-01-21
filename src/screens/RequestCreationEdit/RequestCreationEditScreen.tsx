import { useMemo, useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";
import { InputField } from "../../design-system/primitives/Input/Input";
import { Modal } from "../../design-system/primitives/Modal/Modal";
import { RadioCard } from "../../design-system/primitives/RadioCard/RadioCard";
import { Toggle } from "../../design-system/primitives/Toggle/Toggle";

import "../../design-system/typography.css";
import styles from "./RequestCreationEditScreen.module.css";
import type { SharePackRequest } from "../SharePack/SharePackScreen";

function IconChevronDown({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlusCircle({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 5v6M5 8h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSpark({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2l1.2 4.2L15.5 8l-4.3 1.8L10 14l-1.2-4.2L4.5 8l4.3-1.8L10 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Header({
  onGoToEdit,
  onGoToShare,
  onGoToView
}: {
  onGoToEdit?: () => void;
  onGoToShare?: () => void;
  onGoToView?: () => void;
}) {
  return (
    <div className={styles.fixedHeader}>
      <div className={[styles.container, styles.headerInner].join(" ")}>
        <div className={styles.headerRow}>
          <div className={styles.logo}>mellow</div>
          <div className={styles.logoSubtitle}>AI request editor</div>
        </div>
        <div className={styles.nav}>
          <Button variant="brand" disabled>
            Edit
          </Button>
          <Button variant="secondary" onClick={onGoToShare}>
            Share pack
          </Button>
          <Button variant="secondary" onClick={onGoToView}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

type PaymentType = "hourly" | "fixed";
type StartDate = "asap" | "in-1-2-weeks" | "next-month" | "flexible";
type SelectKey = "location" | "currency" | "workload";

function TitleActionsBarWithActions({
  onPreview,
  onSave
}: {
  onPreview: () => void;
  onSave: () => void;
}) {
  return (
    <div className={styles.fixedTitleBar}>
      <div className={[styles.container, styles.titleBarInner].join(" ")}>
        <div className={styles.titleRow}>
          <p className="ds-h3">Graphic Designer for Social Media Optimisation</p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onPreview}>
            Preview
          </Button>
          <Button variant="brand" leftIcon={<IconSpark color="var(--ds-color-text-inverse)" />} onClick={onSave}>
            Save request
          </Button>
        </div>
      </div>
    </div>
  );
}

function WysiwygToolbar() {
  return (
    <div className={styles.wysiwyg} aria-label="WYSIWYG toolbar">
      <div className={styles.wysiwygChip}>
        <span className={styles.wysiwygText}>Normal</span>
        <IconChevronDown size={16} color="#000000" />
      </div>
      <div className={styles.wysiwygGroup}>
        <button className={styles.wysiwygBtn} type="button" aria-label="Bold">
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}>B</span>
        </button>
        <button className={styles.wysiwygBtn} type="button" aria-label="Italic">
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>I</span>
        </button>
        <button className={styles.wysiwygBtn} type="button" aria-label="Underline">
          <span style={{ fontFamily: "Georgia, serif", textDecoration: "underline", fontWeight: 700 }}>U</span>
        </button>
        <button className={styles.wysiwygBtn} type="button" aria-label="Strikethrough">
          <span style={{ fontFamily: "Georgia, serif", textDecoration: "line-through", fontWeight: 700 }}>S</span>
        </button>
      </div>
      <div className={styles.wysiwygGroup}>
        <button className={styles.wysiwygBtn} type="button" aria-label="Bulleted list">
          ••
        </button>
        <button className={styles.wysiwygBtn} type="button" aria-label="Numbered list">
          1.
        </button>
      </div>
      <div className={styles.wysiwygGroup}>
        <button className={styles.wysiwygBtn} type="button" aria-label="Link">
          ⛓
        </button>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (next: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div onClick={onToggle}>
        <InputField
          label={label}
          value={value}
          readOnly
          rightIcon={<IconChevronDown size={16} color="#000000" />}
        />
      </div>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: 12,
            border: "1px solid #000000",
            padding: 6,
            zIndex: 50
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              style={{
                width: "100%",
                textAlign: "left",
                border: 0,
                background: "transparent",
                padding: "10px 10px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 16,
                lineHeight: "22px",
                color: "#000000"
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MainColumn({
  requestTitle,
  onRequestTitleChange
}: {
  requestTitle: string;
  onRequestTitleChange: (next: string) => void;
}) {
  return (
    <section className={styles.main} aria-label="Main editor">
      <div className={styles.hintCard}>
        <p className={styles.hintTitle}>What’s happening here</p>
        <p className={styles.hintText}>
          Mellow drafted this request using AI. Your job is to quickly review and tweak it so contractors get a clear,
          complete brief — then save it to generate a shareable page.
        </p>
      </div>

      <InputField label="Request title" value={requestTitle} onChange={onRequestTitleChange} />

      <div className={styles.editorCard}>
        <WysiwygToolbar />

        <div className={styles.content}>
          <div className={styles.block}>
            <h2 className="ds-h3">Project Summary:</h2>
            <p className="ds-b1">
              We are seeking a talented UI Designer to lead the redesign of our SaaS platform. This project aims to
              enhance user experience, improve visual appeal, and optimize the interface for efficiency and clarity. The
              ideal candidate will collaborate closely with product managers and developers to create intuitive,
              engaging, and modern UI designs that align with user needs and business goals.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className="ds-h3">Key Responsibilities:</h2>
            <ul className={styles.list}>
              <li>Design and deliver high-quality user interfaces for the SaaS.</li>
              <li>Ensure the dashboard design is consistent with the overall brand.</li>
              <li>Iterate designs based on user feedback and usability testing results.</li>
              <li>Stay up-to-date with the latest UI trends, techniques, and technologies.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2 className="ds-h3">Requirements:</h2>
            <ul className={styles.list}>
              <li>Proven experience as a UI designer, preferably with SaaS or web application projects.</li>
              <li>Strong proficiency in design tools such as Figma, Sketch, Adobe XD, or similar.</li>
              <li>Excellent understanding of design principles, typography, color theory.</li>
              <li>Ability to translate complex concepts into simple and engaging interfaces.</li>
              <li>Strong communication skills and ability to work collaboratively in a team environment.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2 className="ds-h3">Preferred Skills:</h2>
            <ul className={styles.list}>
              <li>Basic knowledge of front-end development.</li>
              <li>Experience with user experience (UX) design methodologies and user research.</li>
              <li>Familiarity with accessibility standards and best practices.</li>
              <li>Experience using design systems and component libraries.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2 className="ds-h3">Experience Level:</h2>
            <p className="ds-b1">Intermediate to Senior UI Designer with 3+ years of relevant experience in SaaS platform design.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sidebar({
  companyName,
  website,
  location,
  currency,
  workload,
  skills,
  aiSuggested,
  languages,
  suggestedLanguages,
  newSkill,
  newLanguage,
  negotiable,
  paymentType,
  fromRate,
  toRate,
  timelineFlexible,
  startDate,
  openSelectKey,
  hasVideoNote,
  onCompanyNameChange,
  onWebsiteChange,
  onSelectOpenToggle,
  onLocationSelect,
  onCurrencySelect,
  onWorkloadSelect,
  onRemoveSkill,
  onAddSuggested,
  onNewSkillChange,
  onAddNewSkill,
  onRemoveLanguage,
  onAddSuggestedLanguage,
  onNewLanguageChange,
  onAddNewLanguage,
  onToggleVideoNote,
  onNegotiableToggle,
  onPaymentTypeSelect,
  onFromRateChange,
  onToRateChange,
  onTimelineFlexibleToggle,
  onStartDateSelect
}: {
  companyName: string;
  website: string;
  location: string;
  currency: string;
  workload: string;
  skills: string[];
  aiSuggested: string[];
  languages: string[];
  suggestedLanguages: string[];
  newSkill: string;
  newLanguage: string;
  negotiable: boolean;
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  timelineFlexible: boolean;
  startDate: StartDate;
  openSelectKey: SelectKey | null;
  hasVideoNote: boolean;
  onCompanyNameChange: (next: string) => void;
  onWebsiteChange: (next: string) => void;
  onSelectOpenToggle: (key: SelectKey) => void;
  onLocationSelect: (next: string) => void;
  onCurrencySelect: (next: string) => void;
  onWorkloadSelect: (next: string) => void;
  onRemoveSkill: (skill: string) => void;
  onAddSuggested: (skill: string) => void;
  onNewSkillChange: (next: string) => void;
  onAddNewSkill: () => void;
  onRemoveLanguage: (lang: string) => void;
  onAddSuggestedLanguage: (lang: string) => void;
  onNewLanguageChange: (next: string) => void;
  onAddNewLanguage: () => void;
  onToggleVideoNote: () => void;
  onNegotiableToggle: (next: boolean) => void;
  onPaymentTypeSelect: (next: PaymentType) => void;
  onFromRateChange: (next: string) => void;
  onToRateChange: (next: string) => void;
  onTimelineFlexibleToggle: (next: boolean) => void;
  onStartDateSelect: (next: StartDate) => void;
}) {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Company Details</p>
        <div className={styles.inputsStack}>
          <InputField label="Company name" value={companyName} placeholder="Enter company name" onChange={onCompanyNameChange} />
          <InputField label="Website" value={website} placeholder="Enter company website" type="url" onChange={onWebsiteChange} />
        </div>
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Location</p>
        <SelectField
          label=""
          value={location}
          options={["Remote from any country", "United Kingdom", "Europe", "United States"]}
          open={openSelectKey === "location"}
          onToggle={() => onSelectOpenToggle("location")}
          onSelect={onLocationSelect}
        />
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Skills</p>
        <div className={styles.chipsGrid}>
          {skills.map((s) => (
            <Chip key={s} rightIcon={<IconX color="var(--ds-color-text-secondary)" />} onClick={() => onRemoveSkill(s)}>
              {s}
            </Chip>
          ))}
        </div>

        <div className={styles.tip}>
          <p className={styles.sectionLabel}>AI suggested</p>
          <div className={styles.chipsGrid}>
            {aiSuggested.map((s) => (
              <Chip key={s} leftIcon={<IconPlusCircle />} onClick={() => onAddSuggested(s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>

        <InputField
          label="Add skills"
          value={newSkill}
          placeholder="Type and press Enter"
          onChange={onNewSkillChange}
        />
        <div style={{ marginTop: 8 }}>
          <Button variant="secondary" onClick={onAddNewSkill}>
            Add
          </Button>
        </div>
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Languages</p>
        <div className={styles.chipsGrid}>
          {languages.map((l) => (
            <Chip key={l} rightIcon={<IconX color="#000000" />} onClick={() => onRemoveLanguage(l)}>
              {l}
            </Chip>
          ))}
        </div>

        <div className={styles.tip}>
          <p className={styles.sectionLabel}>Suggested</p>
          <div className={styles.chipsGrid}>
            {suggestedLanguages.map((l) => (
              <Chip key={l} leftIcon={<IconPlusCircle />} onClick={() => onAddSuggestedLanguage(l)}>
                {l}
              </Chip>
            ))}
          </div>
        </div>

        <InputField
          label="Add language"
          value={newLanguage}
          placeholder="Type and press Enter"
          onChange={onNewLanguageChange}
        />
        <div style={{ marginTop: 8 }}>
          <Button variant="secondary" onClick={onAddNewLanguage}>
            Add
          </Button>
        </div>
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Manager’s Video Note</p>
        <p className={styles.sectionLabel} style={{ marginTop: -4 }}>
          Add a short personal video to increase trust and clarity.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className={styles.videoBubble} type="button" onClick={onToggleVideoNote} aria-label="Record video note">
            <div className={styles.videoBubbleInner}>{hasVideoNote ? "▶" : "＋"}</div>
          </button>
          <div style={{ flex: 1 }}>
            <p className="ds-b2" style={{ margin: 0 }}>
              {hasVideoNote ? "Video note added" : "No video yet"}
            </p>
            <p className="ds-b3 ds-text-secondary" style={{ marginTop: 4 }}>
              {hasVideoNote ? "Click to re-record (stub)." : "Click to record a 30–60s message (stub)."}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Budget</p>
        <div className={styles.toggleRow}>
          <Toggle on={negotiable} onToggle={onNegotiableToggle} />
          <p className="ds-b1">Set as negotiable</p>
        </div>

        <div>
          <p className={styles.sectionLabel}>Payment type</p>
          <div className={styles.radioRow}>
            <RadioCard label="Hourly" active={paymentType === "hourly"} onSelect={() => onPaymentTypeSelect("hourly")} />
            <RadioCard label="Fixed" active={paymentType === "fixed"} onSelect={() => onPaymentTypeSelect("fixed")} />
          </div>
        </div>

        <div className={styles.twoColInputs}>
          <InputField label="From" value={fromRate} onChange={onFromRateChange} />
          <InputField label="To" value={toRate} onChange={onToRateChange} />
        </div>

        <SelectField
          label="Currency"
          value={currency}
          options={["USD", "EUR", "GBP"]}
          open={openSelectKey === "currency"}
          onToggle={() => onSelectOpenToggle("currency")}
          onSelect={onCurrencySelect}
        />
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Project timeline</p>
        <div className={styles.toggleRow}>
          <Toggle on={timelineFlexible} onToggle={onTimelineFlexibleToggle} />
          <p className="ds-b1">Set as flexible</p>
        </div>

        <div>
          <p className={styles.sectionLabel}>Start date</p>
          <div className={styles.chipsGrid} style={{ gap: 8 }}>
            <div style={{ width: 176 }}>
              <RadioCard label="ASAP" active={startDate === "asap"} onSelect={() => onStartDateSelect("asap")} />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard
                label="In 1-2 weeks"
                active={startDate === "in-1-2-weeks"}
                onSelect={() => onStartDateSelect("in-1-2-weeks")}
              />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard label="Next month" active={startDate === "next-month"} onSelect={() => onStartDateSelect("next-month")} />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard label="Flexible" active={startDate === "flexible"} onSelect={() => onStartDateSelect("flexible")} />
            </div>
          </div>
        </div>

        <SelectField
          label="Workload"
          value={workload}
          options={["Less than 20 hours per week", "20-40 hours per week", "More than 40 hours per week"]}
          open={openSelectKey === "workload"}
          onToggle={() => onSelectOpenToggle("workload")}
          onSelect={onWorkloadSelect}
        />
      </div>
    </aside>
  );
}

function LandingPreview({
  requestTitle,
  companyName,
  location,
  skills,
  languages,
  hasVideoNote,
  onViewFull
}: {
  requestTitle: string;
  companyName: string;
  location: string;
  skills: string[];
  languages: string[];
  hasVideoNote: boolean;
  onViewFull?: () => void;
}) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className={styles.previewCard} aria-label="Landing preview">
      <div className={styles.previewHeader}>
        <p className={styles.previewTitle}>How contractors will see it</p>
        <div className={styles.previewModes}>
          <button
            type="button"
            className={[styles.modeBtn, mode === "desktop" ? styles.modeBtnActive : ""].filter(Boolean).join(" ")}
            onClick={() => setMode("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            className={[styles.modeBtn, mode === "mobile" ? styles.modeBtnActive : ""].filter(Boolean).join(" ")}
            onClick={() => setMode("mobile")}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className={styles.previewFrame}>
        <div className={mode === "desktop" ? styles.previewFrameInnerDesktop : styles.previewFrameInnerMobile}>
          {/* Header: Identity & Action */}
          <div className={styles.landingHeader}>
            <div className={styles.landingHeaderLeft}>
              <p className={styles.landingTitle}>{requestTitle || "Untitled request"}</p>
              <div className={styles.landingMeta}>
                {companyName ? <span className={styles.landingCompany}>{companyName}</span> : <span className={styles.landingIndustry}>Creative Services</span>}
                <span className={styles.landingVerified}>✓</span>
              </div>
            </div>
            <div className={styles.landingHeaderRight}>
              <div className={styles.landingTimer}>3d 12h</div>
              <button className={styles.landingSaveBtn} type="button">☆</button>
              <button className={styles.landingReplyBtn} type="button">Reply</button>
            </div>
          </div>

          {/* Body: Main Content */}
          <div className={styles.landingBody}>
            {/* Left Column: Main content */}
            <div className={styles.landingMainCol}>
              {/* Qualification Block */}
              <div className={styles.landingQualBlock}>
                <div className={styles.landingQualRow}>
                  <span className={styles.landingQualLabel}>Experience</span>
                  <div className={styles.landingLevelSwitcher}>
                    <span className={styles.landingLevel}>Junior</span>
                    <span className={`${styles.landingLevel} ${styles.landingLevelActive}`}>Middle</span>
                    <span className={styles.landingLevel}>Senior</span>
                  </div>
                </div>
                <div className={styles.landingQualRow}>
                  <span className={styles.landingQualLabel}>Skills</span>
                  <div className={styles.pillRow}>
                    {(skills.length ? skills : ["Skill 1", "Skill 2"]).slice(0, 5).map((s) => (
                      <span key={s} className={styles.pillSkill}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.landingQualRow}>
                  <span className={styles.landingQualLabel}>Languages</span>
                  <div className={styles.pillRow}>
                    {(languages.length ? languages : ["English"]).slice(0, 3).map((l) => (
                      <span key={l} className={styles.pillLang}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Block */}
              <div className={styles.landingSummaryBlock}>
                <div className={styles.landingSummaryText}>
                  <h3 className={styles.landingSectionH3}>Project Summary</h3>
                  <p className={styles.landingTextP}>
                    We are seeking a talented designer to lead the redesign of our social media presence...
                  </p>
                </div>
                {hasVideoNote && (
                  <div className={styles.landingVideoContainer}>
                    <div className={styles.videoBubble}>
                      <div className={styles.videoBubbleInner}>▶</div>
                    </div>
                    <p className={styles.landingVideoCap}>Manager's Note</p>
                  </div>
                )}
              </div>

              {/* Deliverables */}
              <div className={styles.landingSowBlock}>
                <h3 className={styles.landingSectionH3}>Key Responsibilities</h3>
                <ul className={styles.landingSowList}>
                  <li className={styles.landingSowItem}>
                    <span className={styles.landingCheckIcon}>✓</span>
                    <div>
                      <strong>Design graphics</strong>
                      <p>Create engaging visuals for social platforms</p>
                    </div>
                  </li>
                  <li className={styles.landingSowItem}>
                    <span className={styles.landingCheckIcon}>✓</span>
                    <div>
                      <strong>Ensure consistency</strong>
                      <p>Maintain brand identity across all designs</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className={styles.landingSidebar}>
              {/* Budget Card */}
              <div className={styles.landingCard}>
                <div className={styles.landingCardTitle}>Budget</div>
                <div className={styles.landingBudgetValue}>$20-30/hr</div>
                <div className={styles.landingBudgetType}>Hourly • Negotiable</div>
              </div>

              {/* Logistics Card */}
              <div className={styles.landingCard}>
                <ul className={styles.landingLogisticsList}>
                  <li className={styles.landingLogItem}>
                    <span className={styles.landingLogLabel}>Start Date</span>
                    <span className={styles.landingLogVal}>ASAP</span>
                  </li>
                  <li className={styles.landingLogItem}>
                    <span className={styles.landingLogLabel}>Workload</span>
                    <span className={styles.landingLogVal}>20h/week</span>
                  </li>
                  <li className={styles.landingLogItem}>
                    <span className={styles.landingLogLabel}>Location</span>
                    <span className={styles.landingLogVal}>{location}</span>
                  </li>
                </ul>
              </div>

              {/* Process Card */}
              <div className={styles.landingCard}>
                <div className={styles.landingCardTitle}>What happens next?</div>
                <div className={styles.landingProcessSteps}>
                  <div className={styles.landingProcessStep}>
                    <div className={styles.landingStepNum}>1</div>
                    <div>
                      <strong>Submit</strong>
                      <p>Fill brief form</p>
                    </div>
                  </div>
                  <div className={styles.landingProcessStep}>
                    <div className={styles.landingStepNum}>2</div>
                    <div>
                      <strong>Review</strong>
                      <p>Manager reviews ~48h</p>
                    </div>
                  </div>
                  <div className={styles.landingProcessStep}>
                    <div className={styles.landingStepNum}>3</div>
                    <div>
                      <strong>Interview</strong>
                      <p>If shortlisted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {onViewFull && (
        <button className={styles.viewFullBtn} onClick={onViewFull}>
          View Full Preview
        </button>
      )}
    </div>
  );
}

export function RequestCreationEditScreen({
  onGoToView,
  onRequestSaved
}: {
  onGoToView?: () => void;
  onRequestSaved?: (req: SharePackRequest) => void;
}) {
  const [modal, setModal] = useState<null | "preview">(null);

  const [requestTitle, setRequestTitle] = useState("Graphic Designer for Social Media Optimisation");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");

  const [location, setLocation] = useState("Remote from any country");
  const [currency, setCurrency] = useState("USD");
  const [workload, setWorkload] = useState("Less than 20 hours per week");
  const [openSelectKey, setOpenSelectKey] = useState<SelectKey | null>(null);

  const [skills, setSkills] = useState<string[]>(["Canva", "Adobe Photoshop"]);
  const [newSkill, setNewSkill] = useState("");

  const allSuggested = useMemo(() => ["Figma", "Chat GPT", "Midjourney"], []);
  const aiSuggested = useMemo(() => allSuggested.filter((s) => !skills.includes(s)), [allSuggested, skills]);

  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [newLanguage, setNewLanguage] = useState("");
  const allSuggestedLanguages = useMemo(() => ["Russian", "Ukrainian", "German", "Spanish"], []);
  const suggestedLanguages = useMemo(
    () => allSuggestedLanguages.filter((l) => !languages.includes(l)),
    [allSuggestedLanguages, languages]
  );

  const [hasVideoNote, setHasVideoNote] = useState(false);

  const [negotiable, setNegotiable] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("hourly");
  const [fromRate, setFromRate] = useState("20.00");
  const [toRate, setToRate] = useState("30.00");

  const [timelineFlexible, setTimelineFlexible] = useState(false);
  const [startDate, setStartDate] = useState<StartDate>("asap");

  function handleSave() {
    const req: SharePackRequest = {
      id: String(Date.now()),
      title: requestTitle,
      companyName: companyName || undefined,
      location,
      skills,
      languages,
      budget: {
        paymentType,
        from: fromRate,
        to: toRate,
        currency
      }
    };
    onRequestSaved?.(req);
  }

  function toggleSelect(key: SelectKey) {
    setOpenSelectKey((prev) => (prev === key ? null : key));
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setSkills((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function addNewSkill() {
    addSkill(newSkill);
    setNewSkill("");
  }

  function addLanguage(lang: string) {
    const trimmed = lang.trim();
    if (!trimmed) return;
    setLanguages((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  }

  function removeLanguage(lang: string) {
    setLanguages((prev) => prev.filter((l) => l !== lang));
  }

  function addNewLanguage() {
    addLanguage(newLanguage);
    setNewLanguage("");
  }

  return (
    <div className={styles.screen}>
      <Header onGoToShare={handleSave} onGoToView={onGoToView} />
      <TitleActionsBarWithActions onPreview={() => setModal("preview")} onSave={handleSave} />

      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.page}>
            <MainColumn requestTitle={requestTitle} onRequestTitleChange={setRequestTitle} />
            <div>
              <LandingPreview
                requestTitle={requestTitle}
                companyName={companyName}
                location={location}
                skills={skills}
                languages={languages}
                hasVideoNote={hasVideoNote}
                onViewFull={onGoToView}
              />

              <div style={{ marginTop: 16 }}>
                <Sidebar
                  companyName={companyName}
                  website={website}
                  location={location}
                  currency={currency}
                  workload={workload}
                  skills={skills}
                  aiSuggested={aiSuggested}
                  languages={languages}
                  suggestedLanguages={suggestedLanguages}
                  newSkill={newSkill}
                  newLanguage={newLanguage}
                  negotiable={negotiable}
                  paymentType={paymentType}
                  fromRate={fromRate}
                  toRate={toRate}
                  timelineFlexible={timelineFlexible}
                  startDate={startDate}
                  openSelectKey={openSelectKey}
                  hasVideoNote={hasVideoNote}
                  onCompanyNameChange={setCompanyName}
                  onWebsiteChange={setWebsite}
                  onSelectOpenToggle={toggleSelect}
                  onLocationSelect={(next) => {
                    setLocation(next);
                    setOpenSelectKey(null);
                  }}
                  onCurrencySelect={(next) => {
                    setCurrency(next);
                    setOpenSelectKey(null);
                  }}
                  onWorkloadSelect={(next) => {
                    setWorkload(next);
                    setOpenSelectKey(null);
                  }}
                  onRemoveSkill={removeSkill}
                  onAddSuggested={(s) => addSkill(s)}
                  onNewSkillChange={setNewSkill}
                  onAddNewSkill={addNewSkill}
                  onRemoveLanguage={removeLanguage}
                  onAddSuggestedLanguage={(l) => addLanguage(l)}
                  onNewLanguageChange={setNewLanguage}
                  onAddNewLanguage={addNewLanguage}
                  onToggleVideoNote={() => {
                    setHasVideoNote((v) => !v);
                    handleSave();
                  }}
                  onNegotiableToggle={setNegotiable}
                  onPaymentTypeSelect={setPaymentType}
                  onFromRateChange={setFromRate}
                  onToRateChange={setToRate}
                  onTimelineFlexibleToggle={setTimelineFlexible}
                  onStartDateSelect={setStartDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={"Preview"}
        open={modal !== null}
        onClose={() => setModal(null)}
      >
        <div>
          <p className="ds-b2" style={{ margin: 0 }}>
            This is where we’ll show the full landing preview.
          </p>
          <p className="ds-b3 ds-text-secondary" style={{ marginTop: 8 }}>
            For now you already have the live preview panel on the right.
          </p>
        </div>
      </Modal>
    </div>
  );
}


import { useMemo, useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";
import { InputField } from "../../design-system/primitives/Input/Input";
import { Modal } from "../../design-system/primitives/Modal/Modal";
import { RadioCard } from "../../design-system/primitives/RadioCard/RadioCard";
import { Toggle } from "../../design-system/primitives/Toggle/Toggle";

import "../../design-system/typography.css";
import styles from "./RequestCreationEditScreen.module.css";

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

function Header() {
  return (
    <div className={styles.fixedHeader}>
      <div className={[styles.container, styles.headerInner].join(" ")}>
        <div className={styles.headerRow}>
          <div className={styles.logo}>
            mellow<span className={styles.logoSlash}>/</span>
          </div>
          <div className={styles.navRight}>
            <nav className={styles.menu} aria-label="Primary">
              <span className={styles.menuLink}>
                For Businesses <IconChevronDown size={10} color="var(--ds-color-button-brand)" />
              </span>
              <span className={styles.menuLink}>
                For Contractors <IconChevronDown size={10} color="var(--ds-color-button-brand)" />
              </span>
              <span className={styles.menuLink}>Pricing</span>
              <span className={styles.menuLink}>
                Resources <IconChevronDown size={10} color="var(--ds-color-button-brand)" />
              </span>
            </nav>
            <button className={styles.signUp} type="button">
              Sign Up
            </button>
          </div>
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
  onCreate
}: {
  onPreview: () => void;
  onCreate: () => void;
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
          <Button variant="brand" leftIcon={<IconSpark color="var(--ds-color-text-inverse)" />} onClick={onCreate}>
            Create page
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
        <IconChevronDown size={16} color="var(--ds-color-button-brand)" />
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
          rightIcon={<IconChevronDown size={16} color="var(--ds-color-text-secondary)" />}
        />
      </div>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--ds-color-bg-surface)",
            borderRadius: 12,
            border: "1px solid var(--ds-color-border-secondary)",
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
                lineHeight: "22px"
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
  newSkill,
  negotiable,
  paymentType,
  fromRate,
  toRate,
  timelineFlexible,
  startDate,
  openSelectKey,
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
  newSkill: string;
  negotiable: boolean;
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  timelineFlexible: boolean;
  startDate: StartDate;
  openSelectKey: SelectKey | null;
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

export function RequestCreationEditScreen() {
  const [modal, setModal] = useState<null | "preview" | "create">(null);

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

  const [negotiable, setNegotiable] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("hourly");
  const [fromRate, setFromRate] = useState("20.00");
  const [toRate, setToRate] = useState("30.00");

  const [timelineFlexible, setTimelineFlexible] = useState(false);
  const [startDate, setStartDate] = useState<StartDate>("asap");

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

  return (
    <div className={styles.screen}>
      <Header />
      <TitleActionsBarWithActions onPreview={() => setModal("preview")} onCreate={() => setModal("create")} />

      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.page}>
            <MainColumn requestTitle={requestTitle} onRequestTitleChange={setRequestTitle} />
            <Sidebar
              companyName={companyName}
              website={website}
              location={location}
              currency={currency}
              workload={workload}
              skills={skills}
              aiSuggested={aiSuggested}
              newSkill={newSkill}
              negotiable={negotiable}
              paymentType={paymentType}
              fromRate={fromRate}
              toRate={toRate}
              timelineFlexible={timelineFlexible}
              startDate={startDate}
              openSelectKey={openSelectKey}
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

      <Modal
        title={modal === "preview" ? "Preview" : "Create page"}
        open={modal !== null}
        onClose={() => setModal(null)}
      >
        {modal === "preview" ? (
          <div>
            <p className="ds-b2" style={{ margin: 0 }}>
              This is a placeholder preview action.
            </p>
            <p className="ds-b3 ds-text-secondary" style={{ marginTop: 8 }}>
              (We can wire this to a real preview route later.)
            </p>
          </div>
        ) : (
          <div>
            <p className="ds-b2" style={{ margin: 0 }}>
              Page creation action triggered.
            </p>
            <p className="ds-b3 ds-text-secondary" style={{ marginTop: 8 }}>
              (Next step: call API / generate shareable link.)
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}


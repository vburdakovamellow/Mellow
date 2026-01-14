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

function IconAlert({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2L2 14h12L8 2zM8 6v4M8 12h.01"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
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
            mellow
          </div>
        </div>
      </div>
    </div>
  );
}

type PaymentType = "hourly" | "fixed";
type StartDate = "asap" | "in-1-2-weeks" | "next-month" | "flexible";
type SelectKey = "currency" | "workload" | "experienceLevel" | "timezone";

function IconSparkNew({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0002 1.33334L10.3593 2.92772C10.664 4.2801 11.72 5.33621 13.0724 5.64085L14.6668 6L13.0724 6.35916C11.72 6.6638 10.664 7.71987 10.3593 9.07227L10.0002 10.6667L9.64103 9.07227C9.33636 7.71987 8.2803 6.6638 6.9279 6.35916L5.3335 6L6.9279 5.64085C8.28023 5.33621 9.33636 4.2801 9.64103 2.92772L10.0002 1.33334Z" fill={color} stroke={color} strokeWidth="1.5"/>
      <path d="M4.66683 8L4.92337 9.13887C5.14097 10.1048 5.89533 10.8592 6.8613 11.0768L8.00016 11.3333L6.8613 11.5899C5.89533 11.8075 5.14097 12.5618 4.92337 13.5278L4.66683 14.6667L4.41029 13.5278C4.19269 12.5618 3.43833 11.8075 2.47234 11.5899L1.3335 11.3333L2.47234 11.0768C3.43833 10.8592 4.19269 10.1049 4.41029 9.13887L4.66683 8Z" fill={color} stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function TitleActionsBarWithActions({
  onCreate
}: {
  onCreate: () => void;
}) {
  return (
    <div className={styles.fixedTitleBar}>
      <div className={[styles.container, styles.titleBarInner].join(" ")}>
        <div className={styles.titleRow}>
          <p className="ds-h3">
            <span style={{ color: '#8A8686' }}>[Draft]</span> Graphic Designer for Social Media Optimisation
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="brand" size="xl" leftIcon={<IconSparkNew size={16} />} onClick={onCreate}>
            Create request
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
                lineHeight: "22px",
                color: "var(--ds-color-text-primary)"
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

function OutdatedWarning({ onRegenerate }: { onRegenerate: () => void }) {
  return (
    <div className={styles.outdatedWarning}>
      <IconAlert size={16} color="#FF6F23" />
      <span className={styles.outdatedText}>
        Description may be outdated. Parameters have been changed.
      </span>
      <Button variant="secondary" onClick={onRegenerate}>
        Regenerate
      </Button>
    </div>
  );
}

function ManualEditWarning({ onRegenerate }: { onRegenerate: () => void }) {
  return (
    <div className={styles.manualEditWarning}>
      <IconAlert size={16} color="#FF6F23" />
      <span className={styles.manualEditText}>
        Description has been manually edited. Regeneration will overwrite your changes.
      </span>
      <Button variant="secondary" onClick={onRegenerate}>
        Regenerate anyway
      </Button>
    </div>
  );
}

function ProjectDescriptionSection({
  content,
  onContentChange,
  isOutdated,
  isManuallyEdited,
  onRegenerate
}: {
  content: {
    summary: string;
    responsibilities: string[];
    requirements: string[];
    preferredSkills: string[];
    experienceLevel: string;
  };
  onContentChange: (section: string, value: string | string[]) => void;
  isOutdated: boolean;
  isManuallyEdited: boolean;
  onRegenerate: () => void;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Project Description</h2>
        {isOutdated && !isManuallyEdited && <OutdatedWarning onRegenerate={onRegenerate} />}
        {isManuallyEdited && <ManualEditWarning onRegenerate={onRegenerate} />}
      </div>
      
      <div className={styles.editorCard}>
        <WysiwygToolbar />

        <div className={styles.content}>
          <div className={styles.block}>
            <h3 className="ds-h3">Project Summary:</h3>
            <p 
              className="ds-b1" 
              contentEditable 
              suppressContentEditableWarning
              onInput={(e) => onContentChange('summary', e.currentTarget.textContent || '')}
              style={{ 
                minHeight: '60px',
                outline: 'none',
                border: isManuallyEdited ? '1px solid #FF6F23' : '1px solid transparent',
                borderRadius: '4px',
                padding: '4px'
              }}
            >
              {content.summary}
            </p>
          </div>

          <div className={styles.block}>
            <h3 className="ds-h3">Key Responsibilities:</h3>
            <ul className={styles.list}>
              {content.responsibilities.map((item, idx) => (
                <li 
                  key={idx}
                  contentEditable 
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const newList = [...content.responsibilities];
                    newList[idx] = e.currentTarget.textContent || '';
                    onContentChange('responsibilities', newList);
                  }}
                  style={{ 
                    outline: 'none',
                    border: isManuallyEdited ? '1px solid #FF6F23' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    marginBottom: '4px'
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className="ds-h3">Requirements:</h3>
            <ul className={styles.list}>
              {content.requirements.map((item, idx) => (
                <li 
                  key={idx}
                  contentEditable 
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const newList = [...content.requirements];
                    newList[idx] = e.currentTarget.textContent || '';
                    onContentChange('requirements', newList);
                  }}
                  style={{ 
                    outline: 'none',
                    border: isManuallyEdited ? '1px solid #FF6F23' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    marginBottom: '4px'
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className="ds-h3">Preferred Skills:</h3>
            <ul className={styles.list}>
              {content.preferredSkills.map((item, idx) => (
                <li 
                  key={idx}
                  contentEditable 
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const newList = [...content.preferredSkills];
                    newList[idx] = e.currentTarget.textContent || '';
                    onContentChange('preferredSkills', newList);
                  }}
                  style={{ 
                    outline: 'none',
                    border: isManuallyEdited ? '1px solid #FF6F23' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    marginBottom: '4px'
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className="ds-h3">Experience Level:</h3>
            <p 
              className="ds-b1"
              contentEditable 
              suppressContentEditableWarning
              onInput={(e) => onContentChange('experienceLevel', e.currentTarget.textContent || '')}
              style={{ 
                minHeight: '40px',
                outline: 'none',
                border: isManuallyEdited ? '1px solid #FF6F23' : '1px solid transparent',
                borderRadius: '4px',
                padding: '4px'
              }}
            >
              {content.experienceLevel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleAndSkillsSummary({
  roleTitle,
  experienceLevel,
  skills,
  onEdit
}: {
  roleTitle: string;
  experienceLevel: string;
  skills: string[];
  onEdit: () => void;
}) {
  const skillsText = skills.join(", ");
  const description = `${roleTitle}, ${experienceLevel} • ${skillsText}`;

  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>Role & Skills</h3>
          <p className={styles.roleSkillsDescription}>{description}</p>
        </div>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function RoleAndSkillsSection({
  roleTitle,
  onRoleTitleChange,
  experienceLevel,
  onExperienceLevelChange,
  skills,
  aiSuggested,
  newSkill,
  onRemoveSkill,
  onAddSuggested,
  onNewSkillChange,
  onAddNewSkill,
  onSave,
  onCancel
}: {
  roleTitle: string;
  onRoleTitleChange: (next: string) => void;
  experienceLevel: string;
  onExperienceLevelChange: (next: string) => void;
  skills: string[];
  aiSuggested: string[];
  newSkill: string;
  onRemoveSkill: (skill: string) => void;
  onAddSuggested: (skill: string) => void;
  onNewSkillChange: (next: string) => void;
  onAddNewSkill: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const experienceLevels = ["Intern", "Junior", "Middle", "Senior", "Lead", "Executive"];

  return (
    <section className={styles.roleSkillsSection}>
      <h3 className={styles.roleSkillsTitle}>Role & Skills</h3>
      <div className={styles.sectionContent}>
        <InputField 
          label="Role title" 
          value={roleTitle} 
          onChange={onRoleTitleChange}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
          <p className={styles.sectionLabel}>Experience Level</p>
          <div className={styles.radioRow}>
            {experienceLevels.map((level) => (
              <RadioCard
                key={level}
                label={level}
                active={experienceLevel === level}
                onSelect={() => onExperienceLevelChange(level)}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
              <p className={styles.sectionLabel}>Skills</p>
              <div className={styles.chipsGrid}>
                {skills.map((s) => (
                  <Chip key={s} rightIcon={<IconX color="var(--ds-color-text-secondary)" />} onClick={() => onRemoveSkill(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            {aiSuggested.length > 0 && (
              <div className={styles.tip}>
                <p className={styles.sectionLabel}>
                  <IconSparkNew size={16} color="#FF6F23" />
                  AI suggested
                </p>
                <div className={styles.chipsGrid}>
                  {aiSuggested.map((s) => (
                    <Chip key={s} leftIcon={<IconPlusCircle />} onClick={() => onAddSuggested(s)}>
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <InputField
              label=""
              value={newSkill}
              placeholder="Add any needed skills"
              onChange={onNewSkillChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddNewSkill();
                }
              }}
            />
            <p className={styles.skillHint}>Press Enter to add skill</p>
          </div>
        </div>
      </div>
      <div className={styles.roleSkillsActions}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="brand" onClick={onSave}>
          Save
        </Button>
      </div>
    </section>
  );
}

function BudgetSummary({
  paymentType,
  fromRate,
  toRate,
  currency,
  onEdit
}: {
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  currency: string;
  onEdit: () => void;
}) {
  const description = paymentType === "hourly" 
    ? `$${fromRate} - $${toRate} ${currency}/hr`
    : `$${fromRate} - $${toRate} ${currency}`;

  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>Budget</h3>
          <p className={styles.roleSkillsDescription}>{description}</p>
        </div>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function BudgetSection({
  negotiable,
  paymentType,
  fromRate,
  toRate,
  currency,
  openSelectKey,
  onNegotiableToggle,
  onPaymentTypeSelect,
  onFromRateChange,
  onToRateChange,
  onCurrencySelect,
  onSelectOpenToggle,
  onSave,
  onCancel
}: {
  negotiable: boolean;
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  currency: string;
  openSelectKey: SelectKey | null;
  onNegotiableToggle: (next: boolean) => void;
  onPaymentTypeSelect: (next: PaymentType) => void;
  onFromRateChange: (next: string) => void;
  onToRateChange: (next: string) => void;
  onCurrencySelect: (next: string) => void;
  onSelectOpenToggle: (key: SelectKey) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <h3 className={styles.roleSkillsTitle}>Budget</h3>
      <div className={styles.sectionContent}>
        <div className={styles.toggleRow}>
          <Toggle on={negotiable} onToggle={onNegotiableToggle} />
          <p className="ds-b1">Set as negotiable</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
          <p className={styles.sectionLabel}>Payment type</p>
          <div className={styles.radioRow} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
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
          options={["USD", "EUR", "GBR"]}
          open={openSelectKey === "currency"}
          onToggle={() => onSelectOpenToggle("currency")}
          onSelect={onCurrencySelect}
        />
      </div>
      <div className={styles.roleSkillsActions}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="brand" onClick={onSave}>
          Save
        </Button>
      </div>
    </section>
  );
}

function TimelineSummary({
  workload,
  startDate,
  onEdit
}: {
  workload: string;
  startDate: StartDate;
  onEdit: () => void;
}) {
  const workloadShort = workload
    .replace("Less than 20 hours per week", "Less 20h/week")
    .replace("20-40 hours per week", "20-40h/week")
    .replace("More than 40 hours per week", "More 40h/week");
  const startDateLabel = startDate === "asap" ? "ASAP" 
    : startDate === "in-1-2-weeks" ? "In 1-2 weeks"
    : startDate === "next-month" ? "Next month"
    : "Flexible";
  const description = `${workloadShort} • Start: ${startDateLabel}`;

  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>Timeline</h3>
          <p className={styles.roleSkillsDescription}>{description}</p>
        </div>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function TimelineSection({
  timelineFlexible,
  startDate,
  workload,
  openSelectKey,
  onTimelineFlexibleToggle,
  onStartDateSelect,
  onWorkloadSelect,
  onSelectOpenToggle,
  onSave,
  onCancel
}: {
  timelineFlexible: boolean;
  startDate: StartDate;
  workload: string;
  openSelectKey: SelectKey | null;
  onTimelineFlexibleToggle: (next: boolean) => void;
  onStartDateSelect: (next: StartDate) => void;
  onWorkloadSelect: (next: string) => void;
  onSelectOpenToggle: (key: SelectKey) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <h3 className={styles.roleSkillsTitle}>Timeline</h3>
      <div className={styles.sectionContent}>
        <div className={styles.toggleRow}>
          <Toggle on={timelineFlexible} onToggle={onTimelineFlexibleToggle} />
          <p className="ds-b1">Set as flexible</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
          <p className={styles.sectionLabel}>Start date</p>
          <div className={styles.radioRow}>
            <RadioCard label="ASAP" active={startDate === "asap"} onSelect={() => onStartDateSelect("asap")} />
            <RadioCard
              label="In 1-2 weeks"
              active={startDate === "in-1-2-weeks"}
              onSelect={() => onStartDateSelect("in-1-2-weeks")}
            />
            <RadioCard label="Next month" active={startDate === "next-month"} onSelect={() => onStartDateSelect("next-month")} />
            <RadioCard label="Flexible" active={startDate === "flexible"} onSelect={() => onStartDateSelect("flexible")} />
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
      <div className={styles.roleSkillsActions}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="brand" onClick={onSave}>
          Save
        </Button>
      </div>
    </section>
  );
}

function CompanySummary({
  companyName,
  website,
  onEdit
}: {
  companyName: string;
  website: string;
  onEdit: () => void;
}) {
  const hasData = companyName || website;
  const description = hasData 
    ? companyName || website || "Not filled"
    : "Not filled";

  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>Company</h3>
          <p className={styles.roleSkillsDescription} style={{ color: hasData ? 'var(--ds-color-text-secondary)' : 'var(--ds-color-text-tertiary)' }}>
            {description}
          </p>
        </div>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function CompanySection({
  companyName,
  website,
  timezone,
  openSelectKey,
  onCompanyNameChange,
  onWebsiteChange,
  onTimezoneSelect,
  onSelectOpenToggle,
  onSave,
  onCancel
}: {
  companyName: string;
  website: string;
  timezone: string;
  openSelectKey: SelectKey | null;
  onCompanyNameChange: (next: string) => void;
  onWebsiteChange: (next: string) => void;
  onTimezoneSelect: (next: string) => void;
  onSelectOpenToggle: (key: SelectKey) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const timezones = [
    "UTC",
    "GMT",
    "EST (UTC-5)",
    "PST (UTC-8)",
    "CET (UTC+1)",
    "EET (UTC+2)",
    "IST (UTC+5:30)",
    "JST (UTC+9)"
  ];

  return (
    <section className={styles.roleSkillsSection}>
      <h3 className={styles.roleSkillsTitle}>Company</h3>
      <div className={styles.sectionContent}>
        <div className={styles.inputsStack}>
          <InputField 
            label="Company name" 
            value={companyName} 
            placeholder="Enter company name" 
            onChange={onCompanyNameChange}
          />
          <InputField 
            label="Website" 
            value={website} 
            placeholder="Enter company website" 
            type="url" 
            onChange={onWebsiteChange}
          />
        </div>
        <SelectField
          label="Timezone"
          value={timezone}
          options={timezones}
          open={openSelectKey === "timezone"}
          onToggle={() => onSelectOpenToggle("timezone")}
          onSelect={onTimezoneSelect}
        />
      </div>
      <div className={styles.roleSkillsActions}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="brand" onClick={onSave}>
          Save
        </Button>
      </div>
    </section>
  );
}


function MobilePreviewPlaceholder() {
  return (
    <div className={styles.mobilePreview}>
      <div className={styles.previewPlaceholder}>
        <p className={styles.placeholderText}>Mobile Preview</p>
        <p className={styles.placeholderSubtext}>Preview will appear here</p>
      </div>
    </div>
  );
}

export function RequestCreationEditScreen() {
  const [modal, setModal] = useState<null | "create">(null);

  const [requestTitle, setRequestTitle] = useState("Graphic Designer for Social Media Optimisation");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [timezone, setTimezone] = useState("UTC");

  const [currency, setCurrency] = useState("USD");
  const [workload, setWorkload] = useState("Less than 20 hours per week");
  const [roleTitle, setRoleTitle] = useState("Graphic Designer");
  const [experienceLevel, setExperienceLevel] = useState("Middle");
  const [openSelectKey, setOpenSelectKey] = useState<SelectKey | null>(null);
  const [isRoleSkillsExpanded, setIsRoleSkillsExpanded] = useState(false);
  const [isBudgetExpanded, setIsBudgetExpanded] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);

  const [skills, setSkills] = useState<string[]>(["Figma", "Canva", "Adobe Photoshop"]);
  const [newSkill, setNewSkill] = useState("");

  const allSuggested = useMemo(() => ["Chat GPT", "Midjourney", "Adobe Illustrator", "Sketch"], []);
  const aiSuggested = useMemo(() => allSuggested.filter((s) => !skills.includes(s)), [allSuggested, skills]);

  const [negotiable, setNegotiable] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("hourly");
  const [fromRate, setFromRate] = useState("20.00");
  const [toRate, setToRate] = useState("30.00");

  const [timelineFlexible, setTimelineFlexible] = useState(false);
  const [startDate, setStartDate] = useState<StartDate>("asap");

  // Temporary values for editing
  const [tempRoleTitle, setTempRoleTitle] = useState(roleTitle);
  const [tempExperienceLevel, setTempExperienceLevel] = useState(experienceLevel);
  const [tempSkills, setTempSkills] = useState(skills);
  const [tempNewSkill, setTempNewSkill] = useState("");
  
  const [tempNegotiable, setTempNegotiable] = useState(negotiable);
  const [tempPaymentType, setTempPaymentType] = useState(paymentType);
  const [tempFromRate, setTempFromRate] = useState(fromRate);
  const [tempToRate, setTempToRate] = useState(toRate);
  const [tempCurrency, setTempCurrency] = useState(currency);
  
  const [tempTimelineFlexible, setTempTimelineFlexible] = useState(timelineFlexible);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempWorkload, setTempWorkload] = useState(workload);
  
  const [tempCompanyName, setTempCompanyName] = useState(companyName);
  const [tempWebsite, setTempWebsite] = useState(website);
  const [tempTimezone, setTempTimezone] = useState(timezone);

  // Content state
  const [descriptionContent, setDescriptionContent] = useState({
    summary: "We are seeking a talented UI Designer to lead the redesign of our SaaS platform. This project aims to enhance user experience, improve visual appeal, and optimize the interface for efficiency and clarity. The ideal candidate will collaborate closely with product managers and developers to create intuitive, engaging, and modern UI designs that align with user needs and business goals.",
    responsibilities: [
      "Design and deliver high-quality user interfaces for the SaaS.",
      "Ensure the dashboard design is consistent with the overall brand.",
      "Iterate designs based on user feedback and usability testing results.",
      "Stay up-to-date with the latest UI trends, techniques, and technologies."
    ],
    requirements: [
      "Proven experience as a UI designer, preferably with SaaS or web application projects.",
      "Strong proficiency in design tools such as Figma, Sketch, Adobe XD, or similar.",
      "Excellent understanding of design principles, typography, color theory.",
      "Ability to translate complex concepts into simple and engaging interfaces.",
      "Strong communication skills and ability to work collaboratively in a team environment."
    ],
    preferredSkills: [
      "Basic knowledge of front-end development.",
      "Experience with user experience (UX) design methodologies and user research.",
      "Familiarity with accessibility standards and best practices.",
      "Experience using design systems and component libraries."
    ],
    experienceLevel: "Intermediate to Senior UI Designer with 3+ years of relevant experience in SaaS platform design."
  });

  // Track if parameters changed after last generation
  const [parametersChanged, setParametersChanged] = useState(false);
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

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

  function handleParameterChange() {
    setParametersChanged(true);
  }

  function handleContentChange(section: string, value: string | string[]) {
    setIsManuallyEdited(true);
    setDescriptionContent((prev) => ({
      ...prev,
      [section]: value
    }));
  }

  function handleRegenerate() {
    // Reset flags and regenerate content
    setParametersChanged(false);
    setIsManuallyEdited(false);
    // In real app, this would call API to regenerate
    console.log("Regenerating description...");
  }

  return (
    <div className={styles.screen}>
      <Header />
      <TitleActionsBarWithActions onCreate={() => setModal("create")} />

      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.page}>
            <div className={styles.mainContent}>
              <div className={styles.requestParametersContainer}>
                <div className={styles.requestParametersHeader}>
                  <h2 className={styles.requestParametersTitle}>Request Parameters</h2>
                  <p className={styles.requestParametersDescription}>
                    Set up the key details for your request. You can come back and edit these anytime.
                  </p>
                </div>

                <div className={styles.requestParametersWrapper}>
                {!isRoleSkillsExpanded ? (
                  <RoleAndSkillsSummary
                    roleTitle={roleTitle}
                    experienceLevel={experienceLevel}
                    skills={skills}
                    onEdit={() => {
                      setTempRoleTitle(roleTitle);
                      setTempExperienceLevel(experienceLevel);
                      setTempSkills([...skills]);
                      setTempNewSkill("");
                      setIsRoleSkillsExpanded(true);
                    }}
                  />
                ) : (
                  <RoleAndSkillsSection
                    roleTitle={tempRoleTitle}
                    onRoleTitleChange={setTempRoleTitle}
                    experienceLevel={tempExperienceLevel}
                    onExperienceLevelChange={setTempExperienceLevel}
                    skills={tempSkills}
                    aiSuggested={allSuggested.filter((s) => !tempSkills.includes(s))}
                    newSkill={tempNewSkill}
                    onRemoveSkill={(skill) => setTempSkills(tempSkills.filter((s) => s !== skill))}
                    onAddSuggested={(s) => setTempSkills([...tempSkills, s])}
                    onNewSkillChange={setTempNewSkill}
                    onAddNewSkill={() => {
                      const trimmed = tempNewSkill.trim();
                      if (trimmed && !tempSkills.includes(trimmed)) {
                        setTempSkills([...tempSkills, trimmed]);
                        setTempNewSkill("");
                      }
                    }}
                    onSave={() => {
                      setRoleTitle(tempRoleTitle);
                      setExperienceLevel(tempExperienceLevel);
                      setSkills([...tempSkills]);
                      setIsRoleSkillsExpanded(false);
                      handleParameterChange();
                    }}
                    onCancel={() => {
                      setIsRoleSkillsExpanded(false);
                    }}
                  />
                )}
              {!isBudgetExpanded ? (
                <BudgetSummary
                  paymentType={paymentType}
                  fromRate={fromRate}
                  toRate={toRate}
                  currency={currency}
                  onEdit={() => {
                    setTempNegotiable(negotiable);
                    setTempPaymentType(paymentType);
                    setTempFromRate(fromRate);
                    setTempToRate(toRate);
                    setTempCurrency(currency);
                    setIsBudgetExpanded(true);
                  }}
                />
              ) : (
                <BudgetSection
                  negotiable={tempNegotiable}
                  paymentType={tempPaymentType}
                  fromRate={tempFromRate}
                  toRate={tempToRate}
                  currency={tempCurrency}
                  openSelectKey={openSelectKey}
                  onNegotiableToggle={setTempNegotiable}
                  onPaymentTypeSelect={setTempPaymentType}
                  onFromRateChange={setTempFromRate}
                  onToRateChange={setTempToRate}
                  onCurrencySelect={(next) => {
                    setTempCurrency(next);
                    setOpenSelectKey(null);
                  }}
                  onSelectOpenToggle={toggleSelect}
                  onSave={() => {
                    setNegotiable(tempNegotiable);
                    setPaymentType(tempPaymentType);
                    setFromRate(tempFromRate);
                    setToRate(tempToRate);
                    setCurrency(tempCurrency);
                    setIsBudgetExpanded(false);
                    handleParameterChange();
                  }}
                  onCancel={() => setIsBudgetExpanded(false)}
                />
              )}

              {!isTimelineExpanded ? (
                <TimelineSummary
                  workload={workload}
                  startDate={startDate}
                  onEdit={() => {
                    setTempTimelineFlexible(timelineFlexible);
                    setTempStartDate(startDate);
                    setTempWorkload(workload);
                    setIsTimelineExpanded(true);
                  }}
                />
              ) : (
                <TimelineSection
                  timelineFlexible={tempTimelineFlexible}
                  startDate={tempStartDate}
                  workload={tempWorkload}
                  openSelectKey={openSelectKey}
                  onTimelineFlexibleToggle={setTempTimelineFlexible}
                  onStartDateSelect={setTempStartDate}
                  onWorkloadSelect={(next) => {
                    setTempWorkload(next);
                    setOpenSelectKey(null);
                  }}
                  onSelectOpenToggle={toggleSelect}
                  onSave={() => {
                    setTimelineFlexible(tempTimelineFlexible);
                    setStartDate(tempStartDate);
                    setWorkload(tempWorkload);
                    setIsTimelineExpanded(false);
                    handleParameterChange();
                  }}
                  onCancel={() => setIsTimelineExpanded(false)}
                />
              )}

              {!isCompanyExpanded ? (
                <CompanySummary
                  companyName={companyName}
                  website={website}
                  onEdit={() => {
                    setTempCompanyName(companyName);
                    setTempWebsite(website);
                    setTempTimezone(timezone);
                    setIsCompanyExpanded(true);
                  }}
                />
              ) : (
                <CompanySection
                  companyName={tempCompanyName}
                  website={tempWebsite}
                  timezone={tempTimezone}
                  openSelectKey={openSelectKey}
                  onCompanyNameChange={setTempCompanyName}
                  onWebsiteChange={setTempWebsite}
                  onTimezoneSelect={(next) => {
                    setTempTimezone(next);
                    setOpenSelectKey(null);
                  }}
                  onSelectOpenToggle={toggleSelect}
                  onSave={() => {
                    setCompanyName(tempCompanyName);
                    setWebsite(tempWebsite);
                    setTimezone(tempTimezone);
                    setIsCompanyExpanded(false);
                    handleParameterChange();
                  }}
                  onCancel={() => setIsCompanyExpanded(false)}
                />
              )}

                </div>

                {(parametersChanged || isManuallyEdited) && (
                  <div>
                    {parametersChanged && !isManuallyEdited && <OutdatedWarning onRegenerate={handleRegenerate} />}
                    {isManuallyEdited && <ManualEditWarning onRegenerate={handleRegenerate} />}
                  </div>
                )}
              </div>

              <div className={styles.requestDescriptionContainer}>
                <div className={styles.requestDescriptionHeader}>
                  <h2 className={styles.requestParametersTitle}>Request Description</h2>
                  <p className={styles.requestParametersDescription}>
                    Review and edit each section of your generated description. You can edit sections independently.
                  </p>
                </div>

                <div className={styles.requestDescriptionWrapper}>
                  {/* Content will be added here */}
                </div>
              </div>

              <ProjectDescriptionSection
                content={descriptionContent}
                onContentChange={handleContentChange}
                isOutdated={false}
                isManuallyEdited={isManuallyEdited}
                onRegenerate={handleRegenerate}
              />
            </div>

            <MobilePreviewPlaceholder />
          </div>
        </div>
      </div>

      <Modal
        title="Create request"
        open={modal !== null}
        onClose={() => setModal(null)}
      >
        <div>
          <p className="ds-b2" style={{ margin: 0 }}>
            Page creation action triggered.
          </p>
          <p className="ds-b3 ds-text-secondary" style={{ marginTop: 8 }}>
            (Next step: call API / generate shareable link.)
          </p>
        </div>
      </Modal>
    </div>
  );
}

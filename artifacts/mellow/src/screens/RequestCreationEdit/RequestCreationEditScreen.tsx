import { useMemo, useState, useRef, useEffect } from "react";
import { DevButtons } from "../../components/DevButtons/DevButtons";
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
          <p className="ds-h3">
            <span className={styles.draftBadge}>[Draft]</span> Graphic Designer for Social Media Optimisation
          </p>
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

function IconBulletList({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="4" r="1.5" fill={color}/>
      <line x1="5" y1="4" x2="14" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="2" cy="8" r="1.5" fill={color}/>
      <line x1="5" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="2" cy="12" r="1.5" fill={color}/>
      <line x1="5" y1="12" x2="14" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconNumberedList({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="1" y="5" fontSize="9" fill={color} fontFamily="Arial, sans-serif" fontWeight="400">1.</text>
      <line x1="5" y1="4" x2="14" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="1" y="9" fontSize="9" fill={color} fontFamily="Arial, sans-serif" fontWeight="400">2.</text>
      <line x1="5" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="1" y="13" fontSize="9" fill={color} fontFamily="Arial, sans-serif" fontWeight="400">3.</text>
      <line x1="5" y1="12" x2="14" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconLink({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 9.5L9.5 6.5M7.5 4.5L11.5 4.5C12.3284 4.5 13 5.17157 13 6L13 10C13 10.8284 12.3284 11.5 11.5 11.5L7.5 11.5C6.67157 11.5 6 10.8284 6 10L6 6M4.5 6.5L4.5 10C4.5 10.8284 3.82843 11.5 3 11.5L3 11.5C2.17157 11.5 1.5 10.8284 1.5 10L1.5 6C1.5 5.17157 2.17157 4.5 3 4.5L4.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
          <IconBulletList size={16} color="var(--ds-color-text-primary)" />
        </button>
        <button className={styles.wysiwygBtn} type="button" aria-label="Numbered list">
          <IconNumberedList size={16} color="var(--ds-color-text-primary)" />
        </button>
      </div>
      <div className={styles.wysiwygGroup}>
        <button className={styles.wysiwygBtn} type="button" aria-label="Link">
          <IconLink size={16} color="var(--ds-color-text-primary)" />
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

function OutdatedWarning({ onRegenerate, onDismiss }: { onRegenerate: () => void; onDismiss?: () => void }) {
  return (
    <div className={styles.outdatedWarning}>
      <div style={{ flexShrink: 0 }}>
        <IconAlertCircle size={20} />
      </div>
      <div className={styles.outdatedWarningContent}>
        <h3 className={styles.outdatedWarningTitle}>Parameters changed</h3>
        <p className={styles.outdatedWarningText}>
          You've updated some parameters. Regenerate to update the description based on your new inputs.
        </p>
      </div>
      <div className={styles.outdatedWarningButton}>
        <Button variant="brand" size="xs" leftIcon={<IconSparkNew size={16} color="white" />} onClick={onRegenerate}>
          Regenerate
        </Button>
      </div>
      {onDismiss && (
        <div style={{ flexShrink: 0, cursor: 'pointer' }} onClick={onDismiss}>
          <IconX size={16} color="var(--ds-color-text-secondary)" />
        </div>
      )}
    </div>
  );
}

function ManualEditWarning({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className={styles.manualEditWarning}>
      <div style={{ flexShrink: 0 }}>
        <IconAlertCircle size={16} />
      </div>
      <div className={styles.outdatedWarningContent}>
        <h3 className={styles.outdatedWarningTitle}>Manually edited</h3>
        <p className={styles.outdatedWarningText}>
          Ensure Request Parameters match the updated text
        </p>
      </div>
      {onDismiss && (
        <div style={{ flexShrink: 0, cursor: 'pointer' }} onClick={onDismiss}>
          <IconX size={16} color="var(--ds-color-text-secondary)" />
        </div>
      )}
    </div>
  );
}

function ParametersChangedWarning({ onRegenerate, onDismiss }: { onRegenerate?: () => void; onDismiss?: () => void }) {
  return (
    <div className={styles.manualEditWarning}>
      <div style={{ flexShrink: 0 }}>
        <IconAlertCircle size={16} />
      </div>
      <div className={styles.outdatedWarningContent}>
        <h3 className={styles.outdatedWarningTitle}>Parameters changed</h3>
        <p className={styles.outdatedWarningText}>
          You've updated some parameters. Regenerate to update the description based on your new inputs.
        </p>
      </div>
      {onRegenerate && (
        <div className={styles.outdatedWarningButton}>
          <Button variant="brand" size="xs" leftIcon={<IconSparkNew size={16} color="white" />} onClick={onRegenerate}>
            Regenerate
          </Button>
        </div>
      )}
      {onDismiss && (
        <div style={{ flexShrink: 0, cursor: 'pointer' }} onClick={onDismiss}>
          <IconX size={16} color="var(--ds-color-text-secondary)" />
        </div>
      )}
    </div>
  );
}


function RoleAndSkillsSummary({
  roleTitle,
  experienceLevel,
  skills,
  languages,
  onEdit
}: {
  roleTitle: string;
  experienceLevel: string;
  skills: string[];
  languages: string[];
  onEdit: () => void;
}) {
  const skillsText = skills.join(", ");
  const languagesText = languages.length > 0 ? ` • ${languages.join(", ")}` : "";
  const description = `${roleTitle}, ${experienceLevel} • ${skillsText}${languagesText}`;

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
  languages,
  filteredLanguages,
  newLanguage,
  onRemoveLanguage,
  onAddLanguage,
  onNewLanguageChange,
  onAddNewLanguage,
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
  languages: string[];
  filteredLanguages: string[];
  newLanguage: string;
  onRemoveLanguage: (language: string) => void;
  onAddLanguage: (language: string) => void;
  onNewLanguageChange: (next: string) => void;
  onAddNewLanguage: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const experienceLevels = ["Intern", "Junior", "Middle", "Senior", "Lead", "Executive"];

  return (
    <section className={styles.roleSkillsSection}>
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>Talent profile</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-8)' }}>
              <p className={styles.sectionLabel}>Languages</p>
              <div className={styles.chipsGrid}>
                {languages.map((l) => (
                  <Chip key={l} rightIcon={<IconX color="var(--ds-color-text-secondary)" />} onClick={() => onRemoveLanguage(l)}>
                    {l}
                  </Chip>
                ))}
              </div>
            </div>

          </div>

          <div style={{ position: 'relative' }}>
            <InputField
              label=""
              value={newLanguage}
              placeholder="Add language"
              onChange={onNewLanguageChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddNewLanguage();
                }
              }}
            />
            {filteredLanguages.length > 0 && newLanguage.trim() && (
              <div style={{ 
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                background: 'var(--ds-color-bg-surface)',
                border: '1px solid var(--ds-color-border-secondary)',
                borderRadius: 'var(--ds-radius-8)',
                padding: '8px',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                {filteredLanguages.map((l) => (
                  <div
                    key={l}
                    onClick={() => onAddLanguage(l)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'var(--ds-color-text-primary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--ds-color-bg-porcelain)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
            <p className={styles.skillHint}>Press Enter to add language</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BudgetSummary({
  negotiable,
  paymentType,
  fromRate,
  toRate,
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
  currency,
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
  onCurrencySelect,
  onSelectOpenToggle,
  onSave,
  onCancel
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
  currency: string;
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
  onCurrencySelect: (next: string) => void;
  onSelectOpenToggle: (key: SelectKey) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>Budget</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.toggleRow}>
          <Toggle on={negotiable} onToggle={onNegotiableToggle} />
          <p className="ds-b1">Set as negotiable</p>
        </div>

        {negotiable && (
          <div className={styles.marketRateNotification}>
            <div className={styles.marketRateNotificationIcons}>
              <IconSparkNew size={32} color="#FF6F23" />
            </div>
            <div className={styles.marketRateNotificationContent}>
              <h4 className={styles.marketRateNotificationTitle}>Market Rate for Similar Work</h4>
              <p className={styles.marketRateNotificationText}>
                Most freelancers charge <strong>$21-50/hr</strong> for projects like this. Experienced professionals may charge more.
              </p>
            </div>
          </div>
        )}

        {!negotiable && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}

function TimelineSummary({
  timelineFlexible,
  workload,
  startDate,
  onEdit
}: {
  timelineFlexible: boolean;
  workload: string;
  startDate: StartDate;
  onEdit: () => void;
}) {
  const description = timelineFlexible
    ? "Set as flexible"
    : (() => {
        const workloadShort = workload
          .replace("Less than 20 hours per week", "Less 20h/week")
          .replace("20-40 hours per week", "20-40h/week")
          .replace("More than 40 hours per week", "More 40h/week");
        const startDateLabel = startDate === "asap" ? "ASAP" 
          : startDate === "in-1-2-weeks" ? "In 1-2 weeks"
          : startDate === "next-month" ? "Next month"
          : "Flexible";
        return `${workloadShort} • Start: ${startDateLabel}`;
      })();

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
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>Timeline</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.toggleRow}>
          <Toggle on={timelineFlexible} onToggle={onTimelineFlexibleToggle} />
          <p className="ds-b1">Set as flexible</p>
        </div>

        {!timelineFlexible && (
          <>
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
          </>
        )}
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
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>Company</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
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
    </section>
  );
}


function ProjectSummary({
  title,
  text,
  onEdit,
  showWarning,
  onDismissWarning
}: {
  title: string;
  text: string;
  onEdit: () => void;
  showWarning?: boolean;
  onDismissWarning?: () => void;
}) {
  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>{title}</h3>
          <p className={styles.roleSkillsDescription}>{text}</p>
          {showWarning && (
            <div style={{ marginTop: 'var(--ds-space-12)' }}>
              <ManualEditWarning onDismiss={onDismissWarning} />
            </div>
          )}
        </div>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function ProjectTitleSection({
  title,
  text,
  onTextChange,
  onSave,
  onCancel
}: {
  title: string;
  text: string;
  onTextChange: (next: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>{title}</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <InputField
          value={text}
          onChange={onTextChange}
          placeholder="Enter project title"
        />
      </div>
    </section>
  );
}

function ProjectSummarySection({
  title,
  text,
  onTextChange,
  onSave,
  onCancel
}: {
  title: string;
  text: string;
  onTextChange: (next: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>{title}</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.editorCard}>
          <WysiwygToolbar />
          <div className={styles.content}>
            <div className={styles.block}>
              <p 
                className="ds-b1" 
                contentEditable 
                suppressContentEditableWarning
                onInput={(e) => onTextChange(e.currentTarget.textContent || '')}
                style={{ 
                  minHeight: '60px',
                  outline: 'none',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  padding: '4px'
                }}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 'var(--ds-space-16)' }}>
          <Button variant="secondary" leftIcon={<IconVideo size={16} color="#8A8686" />}>
            Video Note
          </Button>
        </div>
      </div>
    </section>
  );
}

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
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

function ProjectListSection({
  title,
  items,
  onItemsChange,
  onSave,
  onCancel
}: {
  title: string;
  items: string[];
  onItemsChange: (next: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={styles.roleSkillsSection}>
      <div className={styles.roleSkillsSummaryContent}>
        <h3 className={styles.roleSkillsTitle}>{title}</h3>
        <div style={{ display: 'flex', gap: 'var(--ds-space-8)' }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.editorCard}>
          <WysiwygToolbar />
          <div className={styles.content}>
            <div className={styles.block}>
              <ul className={styles.list} style={{ margin: 0, paddingLeft: '20px' }}>
                {items.map((item, idx) => (
                  <li 
                    key={idx}
                    contentEditable 
                    suppressContentEditableWarning
                    onInput={(e) => {
                      const newList = [...items];
                      newList[idx] = e.currentTarget.textContent || '';
                      onItemsChange(newList);
                    }}
                    style={{ 
                      minHeight: '24px',
                      outline: 'none',
                      border: '1px solid transparent',
                      borderRadius: '4px',
                      padding: '4px',
                      marginBottom: '4px'
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RequestPreview({
  requestTitle,
  roleTitle,
  experienceLevel,
  skills,
  languages,
  negotiable,
  paymentType,
  fromRate,
  toRate,
  currency,
  timelineFlexible,
  startDate,
  workload,
  companyName,
  website,
  projectSummaryText,
  keyResponsibilitiesList,
  requirementsList,
  preferredSkillsList,
  experienceLevelText
}: {
  requestTitle: string;
  roleTitle: string;
  experienceLevel: string;
  skills: string[];
  languages: string[];
  negotiable: boolean;
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  currency: string;
  timelineFlexible: boolean;
  startDate: StartDate;
  workload: string;
  companyName: string;
  website: string;
  projectSummaryText: string;
  keyResponsibilitiesList: string[];
  requirementsList: string[];
  preferredSkillsList: string[];
  experienceLevelText: string;
}) {
  const applicationCardRef = useRef<HTMLDivElement>(null);
  const [isApplicationCardVisible, setIsApplicationCardVisible] = useState(false);
  const formatRate = (rate: string) => {
    const num = parseFloat(rate);
    return Number.isInteger(num) ? num.toString() : num.toFixed(0);
  };

  const budgetDescription = negotiable 
    ? "Negotiable"
    : paymentType === "hourly" 
      ? `$${formatRate(fromRate)} - ${formatRate(toRate)} ${currency}/hr`
      : `$${formatRate(fromRate)} - ${formatRate(toRate)} ${currency}`;

  const workloadShort = workload
    .replace("Less than 20 hours per week", "Less 20h/week")
    .replace("20-40 hours per week", "20-40h/week")
    .replace("More than 40 hours per week", "More 40h/week");
  
  const startDateLabel = timelineFlexible
    ? "Set as flexible"
    : startDate === "asap" ? "ASAP" 
      : startDate === "in-1-2-weeks" ? "In 1-2 weeks"
      : startDate === "next-month" ? "Next month"
      : "Flexible";

  const languagesText = languages.length > 0 ? languages.join(", ") : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsApplicationCardVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    );

    if (applicationCardRef.current) {
      observer.observe(applicationCardRef.current);
    }

    return () => {
      if (applicationCardRef.current) {
        observer.unobserve(applicationCardRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.mobilePreview}>
      <div className={styles.phoneMockup}>
        <div className={styles.phoneNotch}></div>
        <div className={styles.previewContent}>
        {/* Mellow Logo - outside the card, on green background */}
        <div className={styles.previewLogo}>mellow</div>
        
        {/* Header Card with title, experience, skills and languages */}
        <div className={styles.previewHeaderCard}>
          {/* Header with title */}
          <div className={styles.previewHeader}>
            <p className={styles.previewPublishedDate}>
              Published on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h1 className={styles.previewTitle}>{requestTitle}</h1>
            {companyName && (
              <div className={styles.previewMeta}>
                <span>{companyName}</span>
                {website && <span> • {website}</span>}
                {languagesText && <span> • {languagesText}</span>}
              </div>
            )}
          </div>

          {/* Request Parameters */}
          <div className={styles.previewSection}>
            <h3 className={styles.previewHeaderSectionTitle}>Experience</h3>
            <div className={styles.previewChips}>
              <span className={styles.previewChip}>{experienceLevel}</span>
            </div>
          </div>

          {skills.length > 0 && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewHeaderSectionTitle}>Skills and Tech</h3>
              <div className={styles.previewChips}>
                {skills.map((skill) => (
                  <span key={skill} className={styles.previewChip}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewHeaderSectionTitle}>Languages</h3>
              <div className={styles.previewChips}>
                {languages.map((lang) => (
                  <span key={lang} className={styles.previewChip}>{lang}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Budget Block - отдельно и хорошо виден */}
        <div className={styles.previewBudgetCard}>
          <div className={styles.previewSection}>
            <h3 className={styles.previewBudgetTitle}>Project budget</h3>
            <p className={styles.previewBudgetAmount}>
              {paymentType === "hourly" && !negotiable ? (
                <>
                  <span className={styles.previewBudgetNumbers}>
                    ${formatRate(fromRate)} - {formatRate(toRate)} {currency}
                  </span>
                  <span className={styles.previewBudgetSuffix}>/hr</span>
                </>
              ) : (
                <span className={styles.previewBudgetNumbers}>{budgetDescription}</span>
              )}
            </p>
            {/* High Market Rate Badge */}
            {!negotiable && (
              <div className={styles.previewMarketRateBadge}>
                <IconFire size={14} color="#FF6F23" />
                <span className={styles.previewMarketRateText}>High Market Rate</span>
              </div>
            )}
          </div>

          {/* Timeline Block */}
          <div className={styles.previewSection}>
            <div className={styles.previewTimelineItem}>
              <span className={styles.previewTimelineLabel}>Start Date:</span>
              <span>{startDateLabel}</span>
            </div>
            {!timelineFlexible && (
              <>
                <div className={styles.previewTimelineItem}>
                  <span className={styles.previewTimelineLabel}>Workload:</span>
                  <span>{workloadShort}</span>
                </div>
                <div className={styles.previewTimelineItem}>
                  <span className={styles.previewTimelineLabel}>Location:</span>
                  <span>Remote</span>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Content Card - Summary through Experience Level */}
        <div className={styles.previewHeaderCard}>
          {/* Project Description */}
          {projectSummaryText && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewSectionTitle}>Summary</h3>
              <p className={styles.previewText}>{projectSummaryText}</p>
              {/* Video Note Example */}
              <div className={styles.previewVideoNote}>
                <div className={styles.previewVideoNoteThumbnail}>
                  <IconPlay size={24} color="white" />
                </div>
                <div className={styles.previewVideoNoteInfo}>
                  <span className={styles.previewVideoNoteTitle}>Video Note</span>
                  <span className={styles.previewVideoNoteDuration}>0:45</span>
                </div>
              </div>
            </div>
          )}

          {keyResponsibilitiesList.length > 0 && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewSectionTitle}>Key Responsibilities</h3>
              <ul className={styles.previewList}>
                {keyResponsibilitiesList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {requirementsList.length > 0 && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewSectionTitle}>Requirements</h3>
              <ul className={styles.previewList}>
                {requirementsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {preferredSkillsList.length > 0 && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewSectionTitle}>Preferred Skills</h3>
              <ul className={styles.previewList}>
                {preferredSkillsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* What happens next */}
        <div className={styles.previewNextStepsCard}>
          <div className={styles.previewNextStepsIcon}>
            <img src={thumbsUpImage} alt="Thumbs up" className={styles.previewNextStepsImage} />
          </div>
          <div className={styles.previewNextStepsContent}>
            <h3 className={styles.previewNextStepsTitle}>What happens next?</h3>
            <p className={styles.previewNextStepsText}>
              Submit your application and if you're selected for further discussion, you'll receive an email with the client's contact information to start the conversation directly.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div ref={applicationCardRef} className={styles.previewApplicationCard}>
          <h2 className={styles.previewApplicationTitle}>Ready to Apply?</h2>
          <p className={styles.previewApplicationText}>
            Upload your CV and our AI will pre-fill your application form — you just review and send.
          </p>
          <div className={styles.previewUploadArea}>
            <p className={styles.previewUploadText}>
              Drop CV here or <span className={styles.previewUploadLink}>browse</span>
            </p>
            <p className={styles.previewUploadHint}>PDF, DOC or DOCX (up to 5 MB)</p>
          </div>
          <div style={{ width: '100%', marginTop: '16px' }}>
            <Button variant="brand" size="xl" className={styles.previewUploadButton}>
              Upload CV
            </Button>
          </div>
          <button className={styles.previewManualLink}>Manual setup</button>
        </div>

        {/* Apply Button - Fixed at bottom of preview */}
        {!isApplicationCardVisible && (
          <div className={styles.previewFixedApplyButton}>
            <Button variant="brand" size="xl">
              Apply now
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
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
  const [isProjectTitleExpanded, setIsProjectTitleExpanded] = useState(false);
  const [isProjectSummaryExpanded, setIsProjectSummaryExpanded] = useState(false);
  const [isKeyResponsibilitiesExpanded, setIsKeyResponsibilitiesExpanded] = useState(false);
  const [isRequirementsExpanded, setIsRequirementsExpanded] = useState(false);
  const [isPreferredSkillsExpanded, setIsPreferredSkillsExpanded] = useState(false);
  const [isExperienceLevelExpanded, setIsExperienceLevelExpanded] = useState(false);

  const [skills, setSkills] = useState<string[]>(["Figma", "Canva", "Adobe Photoshop"]);
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [newLanguage, setNewLanguage] = useState("");

  const allSuggested = useMemo(() => ["Chat GPT", "Midjourney", "Adobe Illustrator", "Sketch"], []);
  const aiSuggested = useMemo(() => allSuggested.filter((s) => !skills.includes(s)), [allSuggested, skills]);
  const popularLanguages = useMemo(() => ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Russian", "Arabic", "Hindi"], []);

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

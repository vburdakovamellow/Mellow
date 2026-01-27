import { useMemo, useState, useRef, useEffect, ReactNode } from "react";
import { DevButtons } from "../../components/DevButtons/DevButtons";
import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";
import { InputField } from "../../design-system/primitives/Input/Input";
import { Modal } from "../../design-system/primitives/Modal/Modal";
import { RadioCard } from "../../design-system/primitives/RadioCard/RadioCard";
import { Toggle } from "../../design-system/primitives/Toggle/Toggle";

import "../../design-system/typography.css";
import styles from "./RequestCreationEditScreen.module.css";
import { Header } from "../../components/Header/Header";
import thumbsUpImage from "../../assets/thumbs-up.png";

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

function IconVideo({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="10" height="8" rx="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6L14 5V11L12 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconPlay({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L12 8L6 12V4Z" fill={color} />
    </svg>
  );
}

function IconCheck({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 4L6 11L3 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconFire({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_15435_48961)">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.8" strokeLinecap="square"/>
      </g>
      <defs>
        <clipPath id="clip0_15435_48961">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function IconThumbsUp({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orange circle background */}
      <circle cx="16" cy="16" r="18" fill="#FF6F23"/>
      
      {/* Sparkles */}
      <g opacity="0.9">
        <path d="M8 12L9 10L8 8L10 9L12 8L10 9L11 11L10 9L8 12Z" fill="white" stroke="black" strokeWidth="0.5"/>
        <path d="M6 20L7 18L6 16L8 17L10 16L8 17L9 19L8 17L6 20Z" fill="white" stroke="black" strokeWidth="0.5"/>
      </g>
      
      {/* Thumbs up hand */}
      <g transform="translate(24, 20)">
        {/* Fist/knuckles */}
        <path d="M-4 8C-4 6 -2 4 0 4C2 4 4 6 4 8C4 10 2 12 0 12C-2 12 -4 10 -4 8Z" fill="white" stroke="black" strokeWidth="1.5"/>
        <line x1="-2" y1="6" x2="2" y2="6" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="-2" y1="8" x2="2" y2="8" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="-2" y1="10" x2="2" y2="10" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Thumb with smiley face */}
        <path d="M-8 -4L-8 4C-8 6 -6 8 -4 8" fill="white" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="-10" cy="-2" r="1.5" fill="black"/>
        <circle cx="-6" cy="-2" r="1.5" fill="black"/>
        <path d="M-10 -4Q-8 -5 -6 -4" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}

function IconAlertCircle({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_alert)">
        <path d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z" stroke="#FF6F23" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 6.66675V10.0001" stroke="#FF6F23" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 13.3333H10.0083" stroke="#FF6F23" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_alert">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
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
            <span className={styles.draftBadge}>[Draft]</span> Graphic Designer for Social Media Optimisation
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="brand" size="xl" leftIcon={<IconSparkNew size={16} />} onClick={onCreate}>
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
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>Talent profile</h3>
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
  onEdit
}: {
  negotiable: boolean;
  paymentType: PaymentType;
  fromRate: string;
  toRate: string;
  currency: string;
  onEdit: () => void;
}) {
  const description = negotiable 
    ? "Negotiable"
    : paymentType === "hourly" 
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
  // Format text with headers and paragraphs
  const formatTextWithHeaders = (text: string): ReactNode => {
    if (!text) return null;
    
    // Split by lines and format headers
    const lines = text.split('\n');
    const formattedLines: ReactNode[] = [];
    const headerPatterns = ['Summary', 'Key Responsibilities', 'Requirements', 'Preferred Skills'];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if line is exactly a header
      const isExactHeader = headerPatterns.some(header => trimmedLine === header);
      
      // Check if line starts with a header followed by text (e.g., "Summary We are seeking...")
      let headerMatch: string | null = null;
      let contentAfterHeader = '';
      for (const header of headerPatterns) {
        if (trimmedLine.startsWith(header)) {
          const afterHeader = trimmedLine.substring(header.length).trim();
          if (afterHeader.length > 0 || trimmedLine === header) {
            headerMatch = header;
            contentAfterHeader = afterHeader;
            break;
          }
        }
      }
      
      if (isExactHeader) {
        formattedLines.push(
          <strong 
            key={`header-${index}`} 
            style={{ 
              fontWeight: 600, 
              display: 'block', 
              marginTop: index > 0 ? '16px' : '0', 
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '18px',
              color: 'var(--ds-color-text-primary)'
            }}
          >
            {trimmedLine}
          </strong>
        );
      } else if (headerMatch) {
        // Line starts with header but has content after it
        formattedLines.push(
          <strong 
            key={`header-${index}`} 
            style={{ 
              fontWeight: 600, 
              display: 'block', 
              marginTop: index > 0 ? '16px' : '0', 
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '18px',
              color: 'var(--ds-color-text-primary)'
            }}
          >
            {headerMatch}
          </strong>
        );
        if (contentAfterHeader) {
          formattedLines.push(
            <span 
              key={`content-${index}`} 
              style={{ 
                display: 'block', 
                marginBottom: '8px'
              }}
            >
              {contentAfterHeader}
            </span>
          );
        }
      } else if (trimmedLine) {
        // Check if line starts with bullet point
        const isBullet = trimmedLine.startsWith('•');
        formattedLines.push(
          <span 
            key={`line-${index}`} 
            style={{ 
              display: 'block', 
              marginBottom: isBullet ? '4px' : '8px',
              paddingLeft: isBullet ? '0' : '0'
            }}
          >
            {line}
          </span>
        );
      } else {
        // Empty line for paragraph break
        formattedLines.push(<br key={`br-${index}`} />);
      }
    });
    
    return <>{formattedLines}</>;
  };

  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>{title}</h3>
          <div className={styles.roleSkillsDescription}>
            {formatTextWithHeaders(text)}
          </div>
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
  const editorRef = useRef<HTMLDivElement>(null);
  const isEditingRef = useRef(false);
  const lastTextRef = useRef(text);

  // Format text with headers for editor display (same as preview) - returns HTML string
  const formatEditorTextAsHTML = (text: string): string => {
    if (!text) return '';
    
    // Split by lines and format headers
    const lines = text.split('\n');
    const formattedParts: string[] = [];
    const headerPatterns = ['Summary', 'Key Responsibilities', 'Requirements', 'Preferred Skills'];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      // Check if line is a header
      const isHeader = headerPatterns.some(header => trimmedLine === header);
      
      // Check if line starts with a header followed by text
      let headerMatch: string | null = null;
      let contentAfterHeader = '';
      if (!isHeader) {
        for (const header of headerPatterns) {
          if (trimmedLine.startsWith(header)) {
            const afterHeader = trimmedLine.substring(header.length).trim();
            if (afterHeader.length > 0) {
              headerMatch = header;
              contentAfterHeader = afterHeader;
              break;
            }
          }
        }
      }
      
      if (isHeader) {
        const marginTop = index > 0 ? '16px' : '0';
        formattedParts.push(
          `<h2 class="${styles.descriptionHeader}" style="margin-top: ${marginTop};">${trimmedLine}</h2>`
        );
      } else if (headerMatch) {
        const marginTop = index > 0 ? '16px' : '0';
        formattedParts.push(
          `<h2 class="${styles.descriptionHeader}" style="margin-top: ${marginTop};">${headerMatch}</h2>`
        );
        if (contentAfterHeader) {
          formattedParts.push(
            `<span style="display: block; margin-bottom: 8px;">${contentAfterHeader}</span>`
          );
        }
      } else if (trimmedLine) {
        formattedParts.push(
          `<span style="display: block; margin-bottom: 8px;">${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`
        );
      } else {
        formattedParts.push('<br />');
      }
    });
    
    return formattedParts.join('');
  };

  // Initialize and update HTML when text changes externally (not during editing)
  useEffect(() => {
    if (editorRef.current && !isEditingRef.current) {
      if (text !== lastTextRef.current || !editorRef.current.innerHTML) {
        editorRef.current.innerHTML = formatEditorTextAsHTML(text);
        lastTextRef.current = text;
      }
    }
  }, [text]);

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
              <div 
                ref={editorRef}
                className="ds-b1" 
                contentEditable 
                suppressContentEditableWarning
                onFocus={() => {
                  isEditingRef.current = true;
                }}
                onBlur={(e) => {
                  isEditingRef.current = false;
                  const newText = e.currentTarget.textContent || '';
                  onTextChange(newText);
                  lastTextRef.current = newText;
                  // Re-format after editing
                  if (editorRef.current) {
                    editorRef.current.innerHTML = formatEditorTextAsHTML(newText);
                  }
                }}
                onInput={(e) => {
                  // Don't update during typing to avoid cursor jumps
                }}
                style={{ 
                  minHeight: '60px',
                  outline: 'none',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  padding: '4px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}
              />
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

function ProjectListSummary({
  title,
  items,
  onEdit,
  showWarning,
  onDismissWarning
}: {
  title: string;
  items: string[];
  onEdit: () => void;
  showWarning?: boolean;
  onDismissWarning?: () => void;
}) {
  return (
    <div className={styles.roleSkillsSummary}>
      <div className={styles.roleSkillsSummaryContent}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.roleSkillsTitle}>{title}</h3>
          <ul className={styles.list} style={{ margin: 0, paddingLeft: '20px' }}>
            {items.map((item, idx) => (
              <li key={idx} className={styles.roleSkillsDescription} style={{ marginBottom: '8px' }}>
                {item}
              </li>
            ))}
          </ul>
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
  descriptionText,
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
  descriptionText?: string;
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

  // Format description text for preview with styled headers
  const formatPreviewDescription = (text: string): ReactNode => {
    if (!text) return null;
    
    // Split by lines and format headers
    const lines = text.split('\n');
    const formattedLines: ReactNode[] = [];
    const headerPatterns = ['Summary', 'Key Responsibilities', 'Requirements', 'Preferred Skills'];
    let headerCount = 0;
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      // Check if line is a header (Summary, Key Responsibilities, Requirements, Preferred Skills)
      const isHeader = headerPatterns.some(header => trimmedLine === header);
      
      // Check if line starts with a header followed by text
      let headerMatch: string | null = null;
      let contentAfterHeader = '';
      if (!isHeader) {
        for (const header of headerPatterns) {
          if (trimmedLine.startsWith(header)) {
            const afterHeader = trimmedLine.substring(header.length).trim();
            if (afterHeader.length > 0) {
              headerMatch = header;
              contentAfterHeader = afterHeader;
              break;
            }
          }
        }
      }
      
      if (isHeader) {
        headerCount++;
        formattedLines.push(
          <h2 key={`header-${index}`} className={styles.descriptionHeader}>
            {trimmedLine}
          </h2>
        );
      } else if (headerMatch) {
        headerCount++;
        formattedLines.push(
          <h2 key={`header-${index}`} className={styles.descriptionHeader}>
            {headerMatch}
          </h2>
        );
        if (contentAfterHeader) {
          formattedLines.push(
            <span key={`content-${index}`} style={{ display: 'block', marginBottom: '8px' }}>
              {contentAfterHeader}
            </span>
          );
        }
      } else if (trimmedLine) {
        formattedLines.push(
          <span key={index} style={{ display: 'block', marginBottom: '8px' }}>
            {line}
          </span>
        );
      } else {
        // Empty line
        formattedLines.push(<br key={index} />);
      }
    });
    
    return <>{formattedLines}</>;
  };

  const previewDescriptionText = descriptionText || (() => {
    // Fallback to old format if descriptionText is not available
    let text = '';
    if (projectSummaryText) {
      text += `Summary\n${projectSummaryText}\n\n`;
    }
    if (keyResponsibilitiesList.length > 0) {
      text += `Key Responsibilities\n${keyResponsibilitiesList.map(r => `• ${r}`).join('\n')}\n\n`;
    }
    if (requirementsList.length > 0) {
      text += `Requirements\n${requirementsList.map(r => `• ${r}`).join('\n')}\n\n`;
    }
    if (preferredSkillsList.length > 0) {
      text += `Preferred Skills\n${preferredSkillsList.map(s => `• ${s}`).join('\n')}`;
    }
    return text.trim();
  })();

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
                {/* {languagesText && <span> • {languagesText}</span>} */}
              </div>
            )}
          </div>

          {/* Talent profile sections hidden for first iteration */}
          {/* Request Parameters */}
          {/* <div className={styles.previewSection}>
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
          )} */}
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

        {/* Content Card - Description */}
        <div className={styles.previewHeaderCard}>
          {/* Project Description - unified text with headers */}
          {previewDescriptionText && (
            <div className={styles.previewSection}>
              <div className={styles.previewText}>
                {formatPreviewDescription(previewDescriptionText)}
              </div>
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
  const [isProjectTitleExpanded, setIsProjectTitleExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  // Keep old expanded states for backward compatibility (will be removed)
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
  const [tempLanguages, setTempLanguages] = useState(languages);
  const [tempNewLanguage, setTempNewLanguage] = useState("");
  
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

  // Project Title state
  const [projectTitle, setProjectTitle] = useState("Graphic Designer for Social Media Optimisation");
  const [tempProjectTitle, setTempProjectTitle] = useState(projectTitle);

  // Helper function to format description with headers
  const formatDescriptionWithHeaders = (
    summary: string,
    responsibilities: string[],
    requirements: string[],
    preferredSkills: string[]
  ): string => {
    let text = '';
    if (summary) {
      text += `Summary\n${summary}\n\n`;
    }
    if (responsibilities.length > 0) {
      text += `Key Responsibilities\n${responsibilities.map(r => `• ${r}`).join('\n')}\n\n`;
    }
    if (requirements.length > 0) {
      text += `Requirements\n${requirements.map(r => `• ${r}`).join('\n')}\n\n`;
    }
    if (preferredSkills.length > 0) {
      text += `Preferred Skills\n${preferredSkills.map(s => `• ${s}`).join('\n')}`;
    }
    return text.trim();
  };

  // Description state - unified text with headers
  const initialDescriptionText = formatDescriptionWithHeaders(
    "We are seeking a talented Graphic Designer to lead the visual redesign of our social media presence and marketing materials. This project aims to enhance brand identity, improve visual appeal, and optimize graphics for engagement and clarity. The ideal candidate will collaborate closely with marketing managers and content creators to create intuitive, engaging, and modern visual designs that align with brand guidelines and audience preferences.",
    [
      "Design and deliver high-quality visual content for social media platforms",
      "Create engaging graphics, illustrations, and layouts that align with brand guidelines",
      "Collaborate with marketing team to develop creative concepts and visual strategies",
      "Ensure consistency across all marketing materials and social media channels"
    ],
    [
      "Proficiency in design software such as Figma, Adobe Creative Suite, and Canva",
      "Strong portfolio demonstrating creative design skills",
      "Ability to work independently and meet deadlines",
      "Excellent communication skills and attention to detail"
    ],
    [
      "Experience with social media design and marketing materials",
      "Knowledge of current design trends and best practices",
      "Understanding of brand identity and visual communication",
      "Ability to adapt designs for different platforms and formats"
    ]
  );
  
  const [descriptionText, setDescriptionText] = useState(initialDescriptionText);
  const [tempDescriptionText, setTempDescriptionText] = useState(descriptionText);

  // Keep old states for backward compatibility with preview (will be removed later)
  const [projectSummaryText, setProjectSummaryText] = useState("We are seeking a talented Graphic Designer to lead the visual redesign of our social media presence and marketing materials. This project aims to enhance brand identity, improve visual appeal, and optimize graphics for engagement and clarity. The ideal candidate will collaborate closely with marketing managers and content creators to create intuitive, engaging, and modern visual designs that align with brand guidelines and audience preferences.");
  const [keyResponsibilitiesList, setKeyResponsibilitiesList] = useState([
    "Design and deliver high-quality visual content for social media platforms",
    "Create engaging graphics, illustrations, and layouts that align with brand guidelines",
    "Collaborate with marketing team to develop creative concepts and visual strategies",
    "Ensure consistency across all marketing materials and social media channels"
  ]);
  const [requirementsList, setRequirementsList] = useState([
    "Proficiency in design software such as Figma, Adobe Creative Suite, and Canva",
    "Strong portfolio demonstrating creative design skills",
    "Ability to work independently and meet deadlines",
    "Excellent communication skills and attention to detail"
  ]);
  const [preferredSkillsList, setPreferredSkillsList] = useState([
    "Experience with social media design and marketing materials",
    "Knowledge of current design trends and best practices",
    "Understanding of brand identity and visual communication",
    "Ability to adapt designs for different platforms and formats"
  ]);

  // Experience Level state
  const [experienceLevelText, setExperienceLevelText] = useState("We are looking for a mid-level to senior graphic designer with 3-5 years of experience in social media and marketing design. The ideal candidate should have a proven track record of creating engaging visual content and working collaboratively with marketing teams.");
  const [tempExperienceLevelText, setTempExperienceLevelText] = useState(experienceLevelText);

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
  const [isParametersWarningDismissed, setIsParametersWarningDismissed] = useState(false);
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);
  const [manuallyEditedSections, setManuallyEditedSections] = useState<Record<string, boolean>>({});
  const [dismissedWarnings, setDismissedWarnings] = useState<Record<string, boolean>>({});

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
    setIsParametersWarningDismissed(false);
  }

  function handleContentChange(section: string, value: string | string[]) {
    setIsManuallyEdited(true);
    setManuallyEditedSections((prev) => ({
      ...prev,
      [section]: true
    }));
    // Clear dismissed flag when user edits the section again
    setDismissedWarnings((prev) => {
      const next = { ...prev };
      delete next[section];
      return next;
    });
    setDescriptionContent((prev) => ({
      ...prev,
      [section]: value
    }));
  }

  function handleRegenerate() {
    // Reset flags and regenerate content
    setParametersChanged(false);
    setIsParametersWarningDismissed(false);
    setIsManuallyEdited(false);
    setManuallyEditedSections({});
    setDismissedWarnings({});
    // In real app, this would call API to regenerate
    console.log("Regenerating description...");
  }

  function dismissParametersWarning() {
    setIsParametersWarningDismissed(true);
  }

  function dismissWarning(section: string) {
    setManuallyEditedSections((prev) => {
      const next = { ...prev };
      delete next[section];
      // If no sections are manually edited, reset global flag
      if (Object.keys(next).length === 0) {
        setIsManuallyEdited(false);
      }
      return next;
    });
    // Mark this warning as dismissed so it won't show again after parameter changes
    setDismissedWarnings((prev) => ({
      ...prev,
      [section]: true
    }));
  }

  return (
    <div className={styles.screen}>
      <Header />
      <DevButtons />
      <TitleActionsBarWithActions 
        onCreate={() => setModal("create")} 
      />

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
                {/* Talent profile section hidden for first iteration */}
                {/* {!isRoleSkillsExpanded ? (
                  <RoleAndSkillsSummary
                    roleTitle={roleTitle}
                    experienceLevel={experienceLevel}
                    skills={skills}
                    languages={languages}
                    onEdit={() => {
                      setTempRoleTitle(roleTitle);
                      setTempExperienceLevel(experienceLevel);
                      setTempSkills([...skills]);
                      setTempNewSkill("");
                      setTempLanguages([...languages]);
                      setTempNewLanguage("");
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
                    languages={tempLanguages}
                    filteredLanguages={popularLanguages.filter(l => 
                      !tempLanguages.includes(l) && 
                      (tempNewLanguage.trim() === "" || l.toLowerCase().includes(tempNewLanguage.toLowerCase()))
                    )}
                    newLanguage={tempNewLanguage}
                    onRemoveLanguage={(language) => setTempLanguages(tempLanguages.filter((l) => l !== language))}
                    onAddLanguage={(language) => {
                      if (!tempLanguages.includes(language)) {
                        setTempLanguages([...tempLanguages, language]);
                        setTempNewLanguage("");
                      }
                    }}
                    onNewLanguageChange={setTempNewLanguage}
                    onAddNewLanguage={() => {
                      const trimmed = tempNewLanguage.trim();
                      if (trimmed && !tempLanguages.includes(trimmed)) {
                        setTempLanguages([...tempLanguages, trimmed]);
                        setTempNewLanguage("");
                      }
                    }}
                    onSave={() => {
                      setRoleTitle(tempRoleTitle);
                      setExperienceLevel(tempExperienceLevel);
                      setSkills([...tempSkills]);
                      setLanguages([...tempLanguages]);
                      setIsRoleSkillsExpanded(false);
                      handleParameterChange();
                    }}
                    onCancel={() => {
                      setIsRoleSkillsExpanded(false);
                    }}
                  />
                )} */}
              {!isBudgetExpanded ? (
                <BudgetSummary
                  negotiable={negotiable}
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
                  timelineFlexible={timelineFlexible}
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

                {parametersChanged && !isParametersWarningDismissed && (
                  <div style={{ marginTop: 'var(--ds-space-12)' }}>
                    <ParametersChangedWarning onRegenerate={handleRegenerate} onDismiss={dismissParametersWarning} />
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
                  {!isProjectTitleExpanded ? (
                    <ProjectSummary
                      title="Title"
                      text={projectTitle}
                      showWarning={manuallyEditedSections.projectTitle && !dismissedWarnings.projectTitle}
                      onDismissWarning={() => dismissWarning('projectTitle')}
                      onEdit={() => {
                        setTempProjectTitle(projectTitle);
                        setIsProjectTitleExpanded(true);
                      }}
                    />
                  ) : (
                    <ProjectTitleSection
                      title="Title"
                      text={tempProjectTitle}
                      onTextChange={setTempProjectTitle}
                      onSave={() => {
                        setProjectTitle(tempProjectTitle);
                        setIsProjectTitleExpanded(false);
                        handleContentChange('projectTitle', tempProjectTitle);
                      }}
                      onCancel={() => setIsProjectTitleExpanded(false)}
                    />
                  )}

                  {!isDescriptionExpanded ? (
                    <ProjectSummary
                      title="Description"
                      text={descriptionText}
                      showWarning={manuallyEditedSections.description && !dismissedWarnings.description}
                      onDismissWarning={() => dismissWarning('description')}
                      onEdit={() => {
                        setTempDescriptionText(descriptionText);
                        setIsDescriptionExpanded(true);
                      }}
                    />
                  ) : (
                    <ProjectSummarySection
                      title="Description"
                      text={tempDescriptionText}
                      onTextChange={setTempDescriptionText}
                      onSave={() => {
                        setDescriptionText(tempDescriptionText);
                        setIsDescriptionExpanded(false);
                        handleContentChange('description', tempDescriptionText);
                      }}
                      onCancel={() => setIsDescriptionExpanded(false)}
                    />
                  )}

                </div>
              </div>

            </div>

            <RequestPreview
              requestTitle={requestTitle}
              roleTitle={roleTitle}
              experienceLevel={experienceLevel}
              skills={skills}
              languages={languages}
              negotiable={negotiable}
              paymentType={paymentType}
              fromRate={fromRate}
              toRate={toRate}
              currency={currency}
              timelineFlexible={timelineFlexible}
              startDate={startDate}
              workload={workload}
              companyName={companyName}
              website={website}
              descriptionText={descriptionText}
              projectSummaryText={projectSummaryText}
              keyResponsibilitiesList={keyResponsibilitiesList}
              requirementsList={requirementsList}
              preferredSkillsList={preferredSkillsList}
              experienceLevelText={experienceLevelText}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Save request"
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

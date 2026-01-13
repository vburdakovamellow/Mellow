import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";
import { InputField } from "../../design-system/primitives/Input/Input";
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

function TitleActionsBar() {
  return (
    <div className={styles.fixedTitleBar}>
      <div className={[styles.container, styles.titleBarInner].join(" ")}>
        <div className={styles.titleRow}>
          <p className="ds-h3">Graphic Designer for Social Media Optimisation</p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary">Preview</Button>
          <Button variant="brand" leftIcon={<IconSpark color="var(--ds-color-text-inverse)" />}>
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

function MainColumn() {
  return (
    <section className={styles.main} aria-label="Main editor">
      <InputField label="Request title" value="Graphic Designer for Social Media Optimisation" />

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

function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Company Details</p>
        <div className={styles.inputsStack}>
          <InputField label="Company name" placeholder="Enter company name" />
          <InputField label="Website" placeholder="Enter company website" />
        </div>
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Location</p>
        <InputField value="Remote from any country" rightIcon={<IconChevronDown size={16} color="var(--ds-color-text-secondary)" />} />
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Skills</p>
        <div className={styles.chipsGrid}>
          <Chip rightIcon={<IconX color="var(--ds-color-text-secondary)" />}>Canva</Chip>
          <Chip rightIcon={<IconX color="var(--ds-color-text-secondary)" />}>Adobe Photoshop</Chip>
        </div>

        <div className={styles.tip}>
          <p className={styles.sectionLabel}>AI suggested</p>
          <div className={styles.chipsGrid}>
            <Chip leftIcon={<IconPlusCircle />} >Figma</Chip>
            <Chip leftIcon={<IconPlusCircle />} >Chat GPT</Chip>
            <Chip leftIcon={<IconPlusCircle />} >Midjourney</Chip>
          </div>
        </div>

        <InputField label="Add skills" placeholder="Type and press Enter" />
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Budget</p>
        <div className={styles.toggleRow}>
          <Toggle />
          <p className="ds-b1">Set as negotiable</p>
        </div>

        <div>
          <p className={styles.sectionLabel}>Payment type</p>
          <div className={styles.radioRow}>
            <RadioCard label="Hourly" active />
            <RadioCard label="Fixed" />
          </div>
        </div>

        <div className={styles.twoColInputs}>
          <InputField label="From" value="20.00" />
          <InputField label="To" value="30.00" />
        </div>

        <InputField label="Currency" value="USD" rightIcon={<IconChevronDown size={16} color="var(--ds-color-text-secondary)" />} />
      </div>

      <div className={styles.sidebarGroup}>
        <p className={styles.groupTitle}>Project timeline</p>
        <div className={styles.toggleRow}>
          <Toggle />
          <p className="ds-b1">Set as flexible</p>
        </div>

        <div>
          <p className={styles.sectionLabel}>Start date</p>
          <div className={styles.chipsGrid} style={{ gap: 8 }}>
            <div style={{ width: 176 }}>
              <RadioCard label="ASAP" active />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard label="In 1-2 weeks" />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard label="Next month" />
            </div>
            <div style={{ width: 176 }}>
              <RadioCard label="Flexible" />
            </div>
          </div>
        </div>

        <InputField label="Workload" value="Less than 20 hours per week" rightIcon={<IconChevronDown size={16} color="var(--ds-color-text-secondary)" />} />
      </div>
    </aside>
  );
}

export function RequestCreationEditScreen() {
  return (
    <div className={styles.screen}>
      <Header />
      <TitleActionsBar />

      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.page}>
            <MainColumn />
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}


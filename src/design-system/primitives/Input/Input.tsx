import styles from "./Input.module.css";
import type { ReactNode } from "react";

export function InputField({
  label,
  value,
  placeholder,
  readOnly = false,
  rightIcon,
  className,
  onChange,
  type = "text"
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  rightIcon?: ReactNode;
  className?: string;
  onChange?: (next: string) => void;
  type?: "text" | "number" | "url";
}) {
  return (
    <label className={[styles.field, className].filter(Boolean).join(" ")}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={[styles.control, rightIcon ? styles.withRightIcon : ""].filter(Boolean).join(" ")}>
        <input
          aria-label={label}
          className={styles.native}
          value={value ?? ""}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          onChange={(e) => onChange?.(e.currentTarget.value)}
        />
        {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : null}
      </span>
    </label>
  );
}


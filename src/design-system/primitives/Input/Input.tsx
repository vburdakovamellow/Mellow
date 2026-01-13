import styles from "./Input.module.css";
import type { ReactNode } from "react";

export function InputField({
  label,
  value,
  placeholder,
  readOnly = true,
  rightIcon,
  className
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  rightIcon?: ReactNode;
  className?: string;
}) {
  return (
    <label className={[styles.field, className].filter(Boolean).join(" ")}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={[styles.control, rightIcon ? styles.withRightIcon : ""].filter(Boolean).join(" ")}>
        <input
          aria-label={label}
          className={styles.native}
          defaultValue={value}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : null}
      </span>
    </label>
  );
}


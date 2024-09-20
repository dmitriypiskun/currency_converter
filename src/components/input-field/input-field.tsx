import React from "react";
import styles from "./input-field.module.css";

export interface InputFieldProps {
  value?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
  pattern?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  placeholder,
  inputMode = "numeric",
  pattern = "^d+$",
  style,
  onChange,
}) => {
  return (
    <input
      type="text"
      inputMode={inputMode}
      pattern={pattern}
      placeholder={placeholder}
      value={value}
      className={styles["container"]}
      style={style}
      onChange={(e) => onChange?.(e.target.value)}
    ></input>
  );
};

import React from "react";
import styles from "./input-field.module.css";

export interface InputFieldProps {
  value?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: "decimal" | "text" | "numeric";
  min?: number;
  max?: number;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  placeholder,
  type = "number",
  inputMode = "decimal",
  min = 0,
  max,
  style,
  onChange,
}) => {
  return (
    <input
      type={type}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      min={min}
      max={max}
      className={styles["container"]}
      style={style}
      onChange={(e) => onChange?.(e.target.value)}
    ></input>
  );
};

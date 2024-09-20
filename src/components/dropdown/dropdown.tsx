import styles from "./dropdown.module.css";

export interface DropDownItem {
  label: string;
  value: string;
}

export interface DropDownProps {
  data: DropDownItem[];
  value?: string;
  onChange?: (value: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  data,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      className={styles["container"]}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {data.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

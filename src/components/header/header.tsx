import React, { useMemo } from "react";
import styles from "./header.module.css";
import { Currency } from "../../service/datasource";
import { getPriceString } from "../../utils";

export interface HeaderProps {
  title: string;
  currencies: Currency[];
}

export const Header: React.FC<HeaderProps> = ({ title, currencies }) => {
  const usd = useMemo(() => getPriceString(currencies, "USD"), [currencies]);
  const eur = useMemo(() => getPriceString(currencies, "EUR"), [currencies]);

  return (
    <header className={styles["container"]}>
      <div className={styles["logo-content"]}>
        <h1>{title}</h1>
      </div>

      <div className={styles["currency-content"]}>
        <div>{usd}</div>
        <div>{eur}</div>
      </div>
    </header>
  );
};

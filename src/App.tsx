import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

import { Currency, getCurrencies } from "./service/datasource";
import { DropDown, DropDownItem, Header, InputField } from "./components";

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [sourceAmount, setSourceAmount] = useState<number>();
  const [sourceCurrency, setSourceCurrency] = useState<Currency>();

  const [targetAmount, setTargetAmount] = useState<number>();
  const [targetCurrency, setTargetCurrency] = useState<Currency>();

  useEffect(() => {
    if (!currencies.length) {
      getCurrencies()
        .then((data) => {
          setCurrencies(data);
        })
        .catch((err) => alert(err));
    }
  }, [currencies.length]);

  const currencyList = useMemo<DropDownItem[]>(
    () =>
      currencies.length
        ? currencies.map((item) => ({ label: item.code, value: item.code }))
        : [],
    [currencies]
  );

  const handleSourceAmountChange = (value: string) => {
    setSourceAmount(+value);
  };

  const handleTargetAmountChange = (value: string) => {
    setTargetAmount(+value);
  };

  const handleSourceCurrencyChange = (value: string) => {
    const currency = currencies.find((item) => item.code === value);

    if (currency) {
      setSourceCurrency(currency);
    }
  };

  const handleTargetCurrencyChange = (value: string) => {
    const currency = currencies.find((item) => item.code === value);

    if (currency) {
      setTargetCurrency(currency);
    }
  };

  return (
    <>
      <Header title="Currency converter" currencies={currencies} />

      <main className={styles["main-container"]}>
        <div>
          <span>From</span>

          <div className={styles["row"]}>
            <InputField
              placeholder="From"
              value={sourceAmount?.toString() || ""}
              onChange={handleSourceAmountChange}
              style={{ flex: 2 }}
            />
            <DropDown
              data={currencyList}
              value={sourceCurrency?.code}
              onChange={handleSourceCurrencyChange}
            />
          </div>
        </div>

        <div>
          <span>To</span>

          <div className={styles["row"]}>
            <InputField
              placeholder="To"
              value={targetAmount?.toString() || ""}
              onChange={handleTargetAmountChange}
              style={{ flex: 2 }}
            />
            <DropDown
              data={currencyList}
              value={targetCurrency?.code}
              onChange={handleTargetCurrencyChange}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

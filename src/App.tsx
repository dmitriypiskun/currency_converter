import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

import { Currency, getCurrencies } from "./service/datasource";
import { DropDown, DropDownItem, Header, InputField } from "./components";

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [sourceAmount, setSourceAmount] = useState<number>(100);
  const [sourceCurrency, setSourceCurrency] = useState<Currency>();

  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [targetCurrency, setTargetCurrency] = useState<Currency>();

  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    if (!isFirstLoad) {
      return;
    }

    getCurrencies()
      .then((data) => {
        setCurrencies(data);
        setSourceCurrency(data[0]);
        setTargetCurrency(data[1]);
        setExchangeRate(data[0]?.rateBuy / data[1]?.rateSell);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    if (sourceCurrency && targetCurrency) {
      const rate =
        sourceCurrency.code !== targetCurrency.code
          ? sourceCurrency.rateBuy / targetCurrency.rateSell
          : 1;
      setExchangeRate(rate);
      setTargetAmount(roundNumber(sourceAmount * rate));
    }
  }, [sourceAmount, sourceCurrency, targetCurrency]);

  const currencyList = useMemo<DropDownItem[]>(
    () =>
      (currencies || []).map((item) => ({
        label: item.code,
        value: item.code,
      })),
    [currencies]
  );

  const roundNumber = (value: number): number => {
    return parseFloat(value.toFixed(2));
  };

  const handleSourceAmountChange = (value: string) => {
    setSourceAmount(+value);
    setTargetAmount(roundNumber(+value * exchangeRate));
  };

  const handleTargetAmountChange = (value: string) => {
    setTargetAmount(+value);
    setSourceAmount(roundNumber(+value / exchangeRate));
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
          <strong>From</strong>

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
          <strong>To</strong>

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

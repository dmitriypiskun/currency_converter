import { useEffect, useState } from "react";
import "./App.module.css";
import { Header } from "./components/header/header";
import { Currency, getCurrencies } from "./service/datasource";

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    if (!currencies.length) {
      getCurrencies()
        .then((data) => {
          setCurrencies(data);
        })
        .catch((err) => alert(err));
    }
  }, [currencies.length]);

  return (
    <>
      <Header currencies={currencies} />
      <p>{JSON.stringify(currencies)}</p>
    </>
  );
}

export default App;

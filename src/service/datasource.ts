const CURRENCY_URL = "https://api.monobank.ua/bank/currency";

const currencyCodes = new Map<number, string>();
currencyCodes.set(980, "UAH");
currencyCodes.set(840, "USD");
currencyCodes.set(978, "EUR");

export interface Currency {
  code: string;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
}

export async function getCurrencies(): Promise<Currency[]> {
  try {
    const response = await fetch(CURRENCY_URL, {});
    const result = await response.json();
    return filterAndMap(result);
  } catch (err) {
    console.log(err);
    return [];
  }
}

function filterAndMap(data: Record<string, any>[]): Currency[] {
  return data.reduce<Currency[]>((result, item) => {
    const currencyName = currencyCodes.get(item.currencyCodeA);

    if (currencyName) {
      result.push({
        code: currencyName,
        rateSell: item.rateSell,
        rateBuy: item.rateBuy,
        rateCross: item.rateCross,
      });
    }

    return result;
  }, []);
}

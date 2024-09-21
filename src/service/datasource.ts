const currencyCodes = new Map<number, string>();
currencyCodes.set(840, "USD");
currencyCodes.set(978, "EUR");

export interface Currency {
  code: string;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
}

const UAH_CODE = 980;

const UAH: Currency = {
  code: "UAH",
  rateSell: 1,
  rateBuy: 1,
  rateCross: 0,
};

export async function getCurrencies(): Promise<Currency[]> {
  try {
    const response = await fetch(import.meta.env.VITE_CURRENCY_API_URL, {});
    const result = await response.json();
    const currencies = [UAH, ...filterAndMap(result)];
    return currencies;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function filterAndMap(data: Record<string, any>[]): Currency[] {
  return data.reduce<Currency[]>((result, item) => {
    if (item.currencyCodeB !== UAH_CODE) {
      return result;
    }

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

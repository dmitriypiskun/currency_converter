import { Currency } from "../service/datasource";

type CurrencyName = "USD" | "EUR" | "UAH";

/**
 * Get currency price string
 * @param data - Currency array
 * @param currencyName - Currency name
 * @returns
 */
export function getPriceString(
  data: Currency[],
  currencyName: CurrencyName
): string {
  const item = data.find((item) => item.code === currencyName);
  return item
    ? `$ ${item.rateBuy.toFixed(2)} / ${item.rateSell.toFixed(2)}`
    : `$ --.-- /--.--`;
}

import { getExchangeRate } from "../providers/currency.provider.js";

export function convertCurrency() {
  try {
    const response = getExchangeRate();
    return response;
  } catch (error) {
    console.log("Erro ao converter valores");
  }
}

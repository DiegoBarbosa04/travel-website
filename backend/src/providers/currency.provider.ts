import axios from "axios";

export function getExchangeRate() {
  const response = axios.get(`https://api.frankfurter.dev/v2/rate/USD/BRL`);
  return response;
}

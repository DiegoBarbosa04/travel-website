import axios from "axios";
import { toast } from "sonner";

export const UNAUTHORIZED_EVENT = "auth:unauthorized";

const RATE_LIMIT_TOAST_ID = "rate-limit";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// O backend responde 429 quando o limite de requisições é excedido.
// O interceptor já avisa o usuário; quem trata erros por conta própria usa isto para não duplicar a mensagem.
export const isRateLimitError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 429;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    if (isRateLimitError(error)) {
      const message: string | undefined = error.response?.data?.message;
      // id fixo: várias requisições recusadas em sequência mostram um único toast.
      toast.error(
        message || "Muitas requisições. Tente novamente em alguns minutos.",
        { id: RATE_LIMIT_TOAST_ID },
      );
    }

    return Promise.reject(error);
  },
);

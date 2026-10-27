import { api } from "./api";

export type SearchHistoryEntry = {
  id: string;
  origin: string;
  destination: string;
  originName: string | null;
  destinationName: string | null;
  departureDate: string;
  adults: number;
  createdAt: string;
};

export type SearchHistoryInput = {
  origin: string;
  destination: string;
  originName?: string;
  destinationName?: string;
  departureDate: string;
  adults: number;
};

export const addToHistory = async (data: SearchHistoryInput) => {
  const response = await api.post("/history", data);
  return response.data as SearchHistoryEntry;
};

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data as SearchHistoryEntry[];
};

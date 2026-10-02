import type { Request, Response } from "express";
import {
  addToHistoryService,
  getHistoryService,
} from "../services/history.service.js";

export const addToHistory = async (req: Request, res: Response) => {
  const { user } = req;
  const { searchQuery } = req.body;
  try {
    await addToHistoryService({ user, searchQuery });
    res.status(201).json({ message: "Histórico adicionado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    await getHistoryService(user);
    res.status(200).json({ message: "Histórico recuperado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

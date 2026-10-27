import type { Request, Response } from "express";
import {
  addToHistoryService,
  getHistoryService,
} from "../services/history.service.js";

export const addToHistory = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const entry = await addToHistoryService({
      userId: user!.id,
      searchQuery: req.body,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const history = await getHistoryService(user!.id);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

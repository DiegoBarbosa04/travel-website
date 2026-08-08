import type { Request, Response } from "express";
import { searchFlightsService } from "../services/flight.service";
import type { SearchFlightsDTO } from "../schemas/flight.schema";

export const searchFlights = async (req: Request, res: Response) => {
  try {
    const flights = await searchFlightsService(
      req.query as unknown as SearchFlightsDTO,
    );
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

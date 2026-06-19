import type { Request, Response } from "express";
import { searchFlightsService } from "../services/amadeus.service";

export async function searchFlightsController(req: Request, res: Response) {
  const { origin, destination, departureDate } = req.query;

  const flights = await searchFlightsService({
    origin: String(origin),
    destination: String(destination),
    departureDate: String(departureDate),
  });

  return res.status(200).json(flights);
}

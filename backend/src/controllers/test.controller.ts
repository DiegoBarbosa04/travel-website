import type { Request, Response } from "express";
import { duffel } from "../lib/duffel";

export const testDuffel = async (req: Request, res: Response) => {
  try {
    const response = await duffel.offerRequests.create({
      slices: [
        {
          origin: "GRU",
          destination: "LIS",
          departure_date: "2026-09-15",
        },
      ],
      passengers: [
        {
          type: "adult",
        },
      ],
      cabin_class: "economy",
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

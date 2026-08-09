import type { Request, Response } from "express";
import { searchLocationsService } from "../services/location.service";

export const searchLocations = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;

    const locations = await searchLocationsService({
      keyword: keyword as string,
    });

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao buscar locais",
    });
  }
};

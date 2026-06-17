import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  };
};

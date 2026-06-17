import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ errors: validation.error.flatten() });
      return;
    }
    req.body = validation.data;
    next();
  };
};

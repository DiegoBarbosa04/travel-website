import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateSchema = (
  schema: ZodSchema,
  source: "body" | "query" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req[source]);

    if (!validation.success) {
      res.status(400).json({
        errors: validation.error.flatten(),
      });
      return;
    }

    if (source === "body") {
      req.body = validation.data;
    }

    next();
  };
};

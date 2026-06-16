import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req.cookies;
  if (!user || !process.env.JWT_SECRET) {
    res.status(401).json({ message: "Token ou JWT_SECRET não encontrado" });
    return;
  }

  try {
    const decoded = jwt.verify(user, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }
};

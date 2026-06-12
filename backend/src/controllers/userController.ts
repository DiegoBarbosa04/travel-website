import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const userRegister = async (req: Request, res: Response) => {
  const data = req.body;

  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!data.name || !data.email || !data.password) {
    res.status(401).json({ message: "Preencha todos os campos" });
    return;
  }

  if (user?.email === data.email) {
    res.status(409).json({ message: "Usuário já existe" });
    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
};

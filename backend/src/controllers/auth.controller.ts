import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    if (!data.name || !data.email || !data.password) {
      res.status(401).json({ message: "Preencha todos os campos" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });

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

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (!email || !password) {
      res.status(400).json({ message: "Preencha email e senha" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: "Email ou senha inválidos" });
    }

    if (!process.env.JWT_SECRET) {
      return;
    }

    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    res.cookie("user", token, {
      maxAge: 18000000,
    });

    res.status(200).json(userInfos);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

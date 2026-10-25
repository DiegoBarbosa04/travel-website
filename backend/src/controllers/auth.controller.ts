import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyGoogleCredential } from "../providers/google.provider.js";
import type { AuthUser } from "../types/auth.type.js";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const data = req.body;

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
        firstName: data.firstName,
        lastName: data.lastName,
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
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    // Contas criadas pelo Google não têm senha
    if (!user || !user.password) {
      res.status(401).json({ message: "Usuário ou senha inválido" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: "Usuário ou senha inválido" });
      return;
    }

    sendAuthCookie(res, user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const userGoogleLogin = async (req: Request, res: Response) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    res.status(500).json({ message: "Login com Google não configurado" });
    return;
  }

  let payload;

  try {
    payload = await verifyGoogleCredential(req.body.credential);
  } catch (error) {
    res.status(401).json({ message: "Credencial do Google inválida" });
    return;
  }

  if (!payload?.email || !payload.email_verified) {
    res.status(401).json({ message: "Email do Google não verificado" });
    return;
  }

  try {
    let user = await prisma.user.findUnique({
      where: { googleId: payload.sub },
    });

    if (!user) {
      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      // Vincula a conta Google a um usuário já cadastrado com o mesmo email
      user = existingUser
        ? await prisma.user.update({
            where: { id: existingUser.id },
            data: { googleId: payload.sub },
          })
        : await prisma.user.create({
            data: {
              firstName: payload.given_name ?? payload.name ?? "Usuário",
              lastName: payload.family_name ?? "",
              email: payload.email,
              googleId: payload.sub,
            },
          });
    }

    sendAuthCookie(res, user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const sendAuthCookie = (res: Response, user: AuthUser) => {
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }

  const userInfos: AuthUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const token = jwt.sign(userInfos, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  res.cookie("user", token, {
    maxAge: 18000000,
  });

  res.status(200).json(userInfos);
};

export const userAuth = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("user");
    res.status(200).json({ message: "Usuário deslogado" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

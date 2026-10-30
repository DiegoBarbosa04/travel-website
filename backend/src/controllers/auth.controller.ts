import type { Request, Response } from "express";
import {
  AuthError,
  googleLoginService,
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

const handleAuthError = (res: Response, error: unknown) => {
  if (error instanceof AuthError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  res.status(500).json({ message: "Erro no servidor" });
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    await registerUserService(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    handleAuthError(res, error);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { token, user } = await loginUserService(req.body);

    res.cookie("user", token, {
      maxAge: 18000000,
    });

    res.status(200).json(user);
  } catch (error) {
    handleAuthError(res, error);
  }
};

export const userGoogleLogin = async (req: Request, res: Response) => {
  try {
    const { token, user } = await googleLoginService(req.body.credential);

    res.cookie("user", token, {
      maxAge: 18000000,
    });

    res.status(200).json(user);
  } catch (error) {
    handleAuthError(res, error);
  }
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

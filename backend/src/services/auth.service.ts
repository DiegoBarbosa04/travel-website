import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { verifyGoogleCredential } from "../providers/google.provider.js";
import type {
  AuthUser,
  LoginUserDTO,
  RegisterUserDTO,
} from "../types/auth.type.js";

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

const createAuthSession = (user: AuthUser) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado");
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

  return { token, user: userInfos };
};

export const registerUserService = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterUserDTO) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new AuthError("Usuário já existe", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
};

export const loginUserService = async ({ email, password }: LoginUserDTO) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Contas criadas pelo Google não têm senha
  if (!user || !user.password) {
    throw new AuthError("Usuário ou senha inválido", 401);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new AuthError("Usuário ou senha inválido", 401);
  }

  return createAuthSession(user);
};

export const googleLoginService = async (credential: string) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new AuthError("Login com Google não configurado", 500);
  }

  const payload = await verifyGoogleCredential(credential).catch(() => {
    throw new AuthError("Credencial do Google inválida", 401);
  });

  if (!payload?.email || !payload.email_verified) {
    throw new AuthError("Email do Google não verificado", 401);
  }

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

  return createAuthSession(user);
};

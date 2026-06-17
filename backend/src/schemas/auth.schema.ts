import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(16, "A senha deve ter no máximo 16 caracteres"),
});

export const registerSchema = z.object({
  name: z
    .string("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(24, "O nome deve ter no máximo 24 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(16, "A senha deve ter no máximo 16 caracteres"),
});

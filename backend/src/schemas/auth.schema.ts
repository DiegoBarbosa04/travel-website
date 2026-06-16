import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const registerSchema = z.object({
  name: z.string().min(3).max(24),
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

import { z } from "zod";

const email = z.email("Invalid email");
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128);

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email,
  password,
});

export const refreshTokenBodySchema = z.object({
  refreshToken: z.string().min(1, "refreshToken is required"),
});

export const meSchema = z.object({ user: z.object({ sub: z.string() }) });

export type LoginBody = z.infer<typeof loginSchema>;
export type SignupBody = z.infer<typeof signupSchema>;
export type RefreshTokenBody = z.infer<typeof refreshTokenBodySchema>;

export type MeBody = z.infer<typeof meSchema>;

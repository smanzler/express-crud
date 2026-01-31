import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import type {
  LoginBody,
  SignupBody,
  RefreshTokenBody,
  MeBody,
} from "../validations/auth.schemas";
import { AuthService } from "../services/auth.services";
import { clearRefreshTokenCookie, setRefreshTokenCookie } from "../lib/cookies";

export async function login(
  req: Request<object, object, LoginBody>,
  res: Response
) {
  const tokens = await AuthService.login(req.body);
  setRefreshTokenCookie(res, tokens.refreshToken);

  res.json(tokens.accessToken);
}

export async function signup(
  req: Request<object, object, SignupBody>,
  res: Response
) {
  const tokens = await AuthService.signup(req.body);
  setRefreshTokenCookie(res, tokens.refreshToken);
  res.status(201).json(tokens.accessToken);
}

export async function refresh(
  req: Request<object, object, RefreshTokenBody>,
  res: Response
) {
  const tokens = await AuthService.refresh(req.body.refreshToken);
  setRefreshTokenCookie(res, tokens.refreshToken);
  res.json(tokens.accessToken);
}

export async function logout(
  req: Request<object, object, RefreshTokenBody>,
  res: Response
) {
  await AuthService.logout(req.body.refreshToken);
  clearRefreshTokenCookie(res);
  res.json({ message: "Logged out successfully" });
}

export async function me(req: Request<object, object, MeBody>, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.body.user.sub },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  res.json(user);
}

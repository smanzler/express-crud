import { Router } from "express";
import { login, signup, refresh, logout, me } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate";
import { asyncHandler } from "../middlewares/asyncHandler";
import { requireAuth, refreshTokenFromCookie } from "../middlewares/auth";
import {
  loginSchema,
  signupSchema,
  refreshTokenBodySchema,
} from "../validations/auth.schemas";

const router = Router();

router.post("/login", validateBody(loginSchema), asyncHandler(login));
router.post("/signup", validateBody(signupSchema), asyncHandler(signup));
router.post(
  "/refresh",
  refreshTokenFromCookie,
  validateBody(refreshTokenBodySchema),
  asyncHandler(refresh)
);
router.post(
  "/logout",
  refreshTokenFromCookie,
  validateBody(refreshTokenBodySchema),
  asyncHandler(logout)
);

router.get("/me", requireAuth, asyncHandler(me));

export default router;

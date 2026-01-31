import type { Express } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

export function registerRoutes(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
}

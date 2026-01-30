import "dotenv/config";
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const prisma = new PrismaClient({
  adapter,
});
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json(userCount == 0 ? "No users have been added" : userCount);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

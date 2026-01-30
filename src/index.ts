import "dotenv/config";
import express from "express";
import { prisma } from "./prisma";
import userRoute from "./routes/users";

const app = express();
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

app.use("/user", userRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

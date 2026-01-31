import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser());

registerRoutes(app);

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

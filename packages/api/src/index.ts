import cors from "cors";
import express from "express";
import { apiRouter } from "./routes.js";

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  },
);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

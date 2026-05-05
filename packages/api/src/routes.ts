import { Router } from "express";
import { getAllOrderStats, incrementOrderCount } from "./services.js";

export const apiRouter = Router();

apiRouter.get("/orders", async (_req, res, next) => {
  try {
    const rows = await getAllOrderStats();
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/orders", async (req, res, next) => {
  try {
    const appName = req.body?.appName;
    if (typeof appName !== "string" || !appName.trim()) {
      res.status(400).json({ error: "appName is required" });
      return;
    }
    const row = await incrementOrderCount(appName.trim());
    res.json(row);
  } catch (e) {
    next(e);
  }
});

import express from "express";
import { getTodayStocks } from "../controllers/todayController.js";

const router = express.Router();

router.get("/:userId", getTodayStocks);

export default router;

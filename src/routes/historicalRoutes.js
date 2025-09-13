import express from "express";
import { getHistoricalINR } from "../controllers/historicalController.js";

const router = express.Router();

router.get("/:userId", getHistoricalINR);

export default router;

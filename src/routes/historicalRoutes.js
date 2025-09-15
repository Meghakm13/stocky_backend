import express from "express";
import { getHistoricalINR } from "../controllers/historicalController.js";

const router = express.Router();

/**
 * @openapi
 * /historical-inr/{userId}:
 *   get:
 *     summary: Get INR value of all past stock rewards (up to yesterday)
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: user_1
 *     responses:
 *       200:
 *         description: Historical INR values returned successfully
 */
router.get("/:userId", getHistoricalINR);

export default router;

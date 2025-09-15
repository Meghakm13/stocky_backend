import express from "express";
import { getTodayStocks } from "../controllers/todayController.js";

const router = express.Router();

/**
 * @openapi
 * /today-stocks/{userId}:
 *   get:
 *     summary: Get all stock rewards for a user for today
 *     tags:
 *       - Rewards
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: user_1
 *     responses:
 *       200:
 *         description: Today's stock rewards returned successfully
 */
router.get("/:userId", getTodayStocks);

export default router;

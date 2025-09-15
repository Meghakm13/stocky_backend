import express from "express";
import { createReward } from "../controllers/rewardController.js";

const router = express.Router();

/**
 * @openapi
 * /reward:
 *   post:
 *     summary: Record a new reward event for a user
 *     tags:
 *       - Rewards
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user_1
 *               stockSymbol:
 *                 type: string
 *                 example: RELIANCE
 *               quantity:
 *                 type: number
 *                 example: 2.5
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-13T10:00:00Z
 *               externalId:
 *                 type: string
 *                 example: evt-004
 *     responses:
 *       201:
 *         description: Reward created successfully
 */
router.post("/", createReward);

export default router;

import express from "express";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

/**
 * @openapi
 * /stats/{userId}:
 *   get:
 *     summary: Get total shares rewarded today and current portfolio INR value
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
 *         description: Stats returned successfully
 */
router.get("/:userId", getStats);

export default router;

import express from "express";
import { getPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

/**
 * @openapi
 * /portfolio/{userId}:
 *   get:
 *     summary: Get holdings per stock symbol with current INR value
 *     tags:
 *       - Portfolio
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: user_1
 *     responses:
 *       200:
 *         description: Portfolio details returned successfully
 */
router.get("/:userId", getPortfolio);

export default router;

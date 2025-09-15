import express from "express";
import { createReward, getAllRewards } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/", createReward);
router.get("/", getAllRewards); // Added GET route

export default router;

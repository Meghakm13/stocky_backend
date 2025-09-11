import express from "express";
import { createReward } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/", createReward);

export default router;

import express from "express";
import { createReward, getAllRewards } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/", createReward);

//----------------// this (TEMP: route to list all rewards)
router.get("/", getAllRewards);
//----------------// this (END)

export default router;

import express from "express";
import cors from "cors";
import rewardRoutes from "./routes/rewardRoutes.js";
import stocksRoutes from "./routes/stocksRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/reward", rewardRoutes);
app.use("/today-stocks", stocksRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Stocky Backend is Running ??" });
});

export default app;

import express from "express";
import cors from "cors";
import rewardRoutes from "./routes/rewardRoutes.js";
import todayRoutes from "./routes/todayRoutes.js";
import historicalRoutes from "./routes/historicalRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();
setupSwagger(app);

app.use(cors());
app.use(express.json());

// Routes
app.use("/reward", rewardRoutes);
app.use("/today-stocks", todayRoutes);
app.use("/historical-inr", historicalRoutes);
app.use("/stats", statsRoutes);
app.use("/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Stocky Backend is Running ??" });
});

// global error handler
app.use(errorHandler);

export default app;


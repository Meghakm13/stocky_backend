import app from "./app.js";
import dotenv from "dotenv";
import { startPriceUpdater } from "./jobs/priceUpdater.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// start optional background job (no-op safe)
startPriceUpdater();

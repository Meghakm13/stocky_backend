import cron from "node-cron";

export const startPriceUpdater = () => {
  cron.schedule("0 * * * *", () => {
    console.log("[priceUpdater] hourly tick (dummy)");
  });
};

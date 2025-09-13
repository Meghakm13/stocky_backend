import prisma from "../config/prismaClient.js";
import { getRandomPrice } from "../services/stockPriceService.js";
import { decimalToNumber } from "../utils/decimal.js";

export const getStats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId required" });

    // today totals
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);

    const todayRewards = await prisma.rewardEvent.findMany({
      where: { userId, rewardTimestamp: { gte: start, lte: end } },
      include: { Ledger: true }
    });

    const totalSharesToday = {};
    todayRewards.forEach(r => {
      totalSharesToday[r.stockSymbol] = (totalSharesToday[r.stockSymbol] || 0) + Number(r.quantity);
    });

    // current portfolio value: sum quantities by stock * current price
    const allRewards = await prisma.rewardEvent.findMany({
      where: { userId },
    });

    const holdings = {};
    allRewards.forEach(r => {
      holdings[r.stockSymbol] = (holdings[r.stockSymbol] || 0) + Number(r.quantity);
    });

    let currentInr = 0;
    for (const symbol of Object.keys(holdings)) {
      const price = Number(getRandomPrice(symbol));
      currentInr += holdings[symbol] * price;
    }

    return res.json({
      userId,
      totalSharesToday,
      currentInr: Number(currentInr.toFixed(4))
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};

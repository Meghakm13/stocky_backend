import prisma from "../config/prismaClient.js";
import { getRandomPrice } from "../services/stockPriceService.js";

export const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const allRewards = await prisma.rewardEvent.findMany({
      where: { userId },
    });

    const bySymbol = {};
    allRewards.forEach(r => {
      bySymbol[r.stockSymbol] = (bySymbol[r.stockSymbol] || 0) + Number(r.quantity);
    });

    const portfolio = [];
    for (const [symbol, qty] of Object.entries(bySymbol)) {
      const price = Number(getRandomPrice(symbol));
      portfolio.push({ symbol, quantity: qty, price, currentInr: Number((qty * price).toFixed(4)) });
    }

    return res.json({ userId, portfolio });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching portfolio", error: err.message });
  }
};

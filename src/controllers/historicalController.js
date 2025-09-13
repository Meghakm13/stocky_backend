import prisma from "../config/prismaClient.js";
import { decimalToNumber } from "../utils/decimal.js";

export const getHistoricalINR = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId required" });

    // up to yesterday (inclusive)
    const end = new Date();
    end.setHours(23,59,59,999);
    end.setDate(end.getDate() - 1);

    const events = await prisma.rewardEvent.findMany({
      where: {
        userId,
        rewardTimestamp: { lte: end }
      },
      include: { Ledger: true },
      orderBy: { rewardTimestamp: "asc" }
    });

    const byDate = {};
    events.forEach(ev => {
      const key = new Date(ev.rewardTimestamp).toISOString().split("T")[0];
      const inr = (ev.Ledger && ev.Ledger.length > 0) ? decimalToNumber(ev.Ledger[0].inrOutflow) : 0;
      byDate[key] = (byDate[key] || 0) + inr;
    });

    return res.json({ userId, historicalInr: byDate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching historical INR", error: err.message });
  }
};

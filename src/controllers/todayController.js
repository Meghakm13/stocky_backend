import prisma from "../config/prismaClient.js";

export const getTodayStocks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);

    const rewards = await prisma.rewardEvent.findMany({
      where: {
        userId,
        rewardTimestamp: { gte: start, lte: end }
      },
      include: { Ledger: true },
      orderBy: { rewardTimestamp: "desc" }
    });

    return res.json({ userId, date: start.toISOString().split("T")[0], rewards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching today's stocks", error: err.message });
  }
};

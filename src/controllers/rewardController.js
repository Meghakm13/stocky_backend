import prisma from "../config/prismaClient.js";
import { getRandomPrice } from "../services/stockPriceService.js";
import { computeFees } from "../services/ledgerService.js";

/*
Request body:
{
  "userId":"user_1",
  "stockSymbol":"RELIANCE",
  "quantity":"2.5",
  "timestamp":"2025-09-12T10:00:00Z",
  "externalId":"optional-unique-id"
}
*/
export const createReward = async (req, res) => {
  try {
    const { userId, stockSymbol, quantity, timestamp, externalId } = req.body;
    if (!userId || !stockSymbol || !quantity) {
      return res.status(400).json({ message: "userId, stockSymbol and quantity are required" });
    }

    // Idempotency by externalId (if provided)
    if (externalId) {
      const existing = await prisma.rewardEvent.findUnique({ where: { externalId } });
      if (existing) {
        return res.status(200).json({ message: "Duplicate event (externalId)", data: existing });
      }
    }

    // price at time of reward (dummy service)
    const priceStr = getRandomPrice(stockSymbol);
    const price = Number(priceStr);

    // compute ledger fees (using existing service)
    const fees = computeFees({ quantity: Number(quantity), price });

    // create reward + ledger in a transaction
    const created = await prisma.$transaction(async (tx) => {
      const reward = await tx.rewardEvent.create({
        data: {
          externalId: externalId ? externalId : undefined,
          userId,
          stockSymbol,
          quantity: quantity.toString(),
          rewardTimestamp: timestamp ? new Date(timestamp) : undefined,
          Ledger: {
            create: {
              stockSymbol,
              quantity: quantity.toString(),
              inrOutflow: fees.inrOutflow.toString(),
              brokerageFee: fees.brokerageFee.toString(),
              sttFee: fees.sttFee.toString(),
              gstFee: fees.gstFee.toString()
            }
          }
        },
        include: { Ledger: true }
      });
      return reward;
    });

    return res.status(201).json({ message: "Reward recorded (DB)", data: created });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error recording reward", error: err.message });
  }
};

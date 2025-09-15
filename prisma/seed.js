import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Clearing old data...");
  await prisma.ledger.deleteMany();
  await prisma.rewardEvent.deleteMany();

  console.log("🌱 Inserting 10 reward events...");

  // Helper to add days offset (negative = past days)
  const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

  const rewards = [
    // user_1 (mix of today, yesterday, 3 days ago)
    { userId: "user_1", stockSymbol: "RELIANCE", quantity: "2.500000", date: daysAgo(0), inr: "2500.0000" },
    { userId: "user_1", stockSymbol: "TCS",      quantity: "1.500000", date: daysAgo(0), inr: "4500.0000" },
    { userId: "user_1", stockSymbol: "INFY",     quantity: "3.000000", date: daysAgo(1), inr: "4200.0000" },
    { userId: "user_1", stockSymbol: "HDFCBANK", quantity: "5.500000", date: daysAgo(3), inr: "7700.0000" },

    // user_2 (different mix)
    { userId: "user_2", stockSymbol: "RELIANCE", quantity: "1.000000", date: daysAgo(0), inr: "1000.0000" },
    { userId: "user_2", stockSymbol: "TCS",      quantity: "2.000000", date: daysAgo(2), inr: "6000.0000" },
    { userId: "user_2", stockSymbol: "WIPRO",    quantity: "4.000000", date: daysAgo(0), inr: "2800.0000" },

    // user_3 (just yesterday + older)
    { userId: "user_3", stockSymbol: "ITC",      quantity: "10.000000", date: daysAgo(1), inr: "3200.0000" },
    { userId: "user_3", stockSymbol: "SBIN",     quantity: "8.000000", date: daysAgo(5), inr: "5200.0000" },
    { userId: "user_3", stockSymbol: "HCLTECH",  quantity: "3.000000", date: daysAgo(0), inr: "3300.0000" }
  ];

  for (let i = 0; i < rewards.length; i++) {
    const r = rewards[i];
    await prisma.rewardEvent.create({
      data: {
        externalId: `evt-${i + 1}`,
        userId: r.userId,
        stockSymbol: r.stockSymbol,
        quantity: r.quantity,
        rewardTimestamp: r.date,
        Ledger: {
          create: {
            stockSymbol: r.stockSymbol,
            quantity: r.quantity,
            inrOutflow: r.inr,
            brokerageFee: (parseFloat(r.inr) * 0.001).toFixed(4),
            sttFee: (parseFloat(r.inr) * 0.0005).toFixed(4),
            gstFee: ((parseFloat(r.inr) * 0.001) * 0.18).toFixed(4)
          }
        }
      }
    });
  }

  console.log("✅ Seeded 10 rows successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

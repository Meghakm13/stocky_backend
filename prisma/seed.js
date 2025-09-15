import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Clearing existing data...");
  await prisma.ledger.deleteMany().catch(() => {});
  await prisma.rewardEvent.deleteMany().catch(() => {});

  console.log("🌱 Inserting dummy reward events...");

  // User 1 rewards
  await prisma.rewardEvent.create({
    data: {
      externalId: "evt-001",
      userId: "user_1",
      stockSymbol: "RELIANCE",
      quantity: "2.500000",
      rewardTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      Ledger: {
        create: {
          stockSymbol: "RELIANCE",
          quantity: "2.500000",
          inrOutflow: "2500.0000",
          brokerageFee: "10.0000",
          sttFee: "5.0000",
          gstFee: "1.8000"
        }
      }
    }
  });

  await prisma.rewardEvent.create({
    data: {
      externalId: "evt-002",
      userId: "user_1",
      stockSymbol: "TCS",
      quantity: "1.000000",
      rewardTimestamp: new Date(), // today
      Ledger: {
        create: {
          stockSymbol: "TCS",
          quantity: "1.000000",
          inrOutflow: "3500.0000",
          brokerageFee: "8.0000",
          sttFee: "4.0000",
          gstFee: "1.4400"
        }
      }
    }
  });

  // User 2 rewards
  await prisma.rewardEvent.create({
    data: {
      externalId: "evt-003",
      userId: "user_2",
      stockSymbol: "INFY",
      quantity: "3.000000",
      rewardTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
      Ledger: {
        create: {
          stockSymbol: "INFY",
          quantity: "3.000000",
          inrOutflow: "4200.0000",
          brokerageFee: "12.0000",
          sttFee: "6.0000",
          gstFee: "2.1600"
        }
      }
    }
  });

  console.log("✅ Dummy data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

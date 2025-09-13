import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // drop existing for clean seed (optional in dev)
  await prisma.ledger.deleteMany().catch(()=>{});
  await prisma.rewardEvent.deleteMany().catch(()=>{});

  await prisma.rewardEvent.create({
    data: {
      userId: "user_1",
      stockSymbol: "RELIANCE",
      quantity: "2.500000",
      rewardTimestamp: new Date(),
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
      userId: "user_1",
      stockSymbol: "TCS",
      quantity: "1.000000",
      rewardTimestamp: new Date(),
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

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

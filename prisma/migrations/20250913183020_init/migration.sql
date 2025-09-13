-- CreateTable
CREATE TABLE "RewardEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT,
    "userId" TEXT NOT NULL,
    "stockSymbol" TEXT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "rewardTimestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rewardId" INTEGER NOT NULL,
    "stockSymbol" TEXT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "inrOutflow" DECIMAL NOT NULL,
    "brokerageFee" DECIMAL NOT NULL,
    "sttFee" DECIMAL NOT NULL,
    "gstFee" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ledger_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "RewardEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardEvent_externalId_key" ON "RewardEvent"("externalId");

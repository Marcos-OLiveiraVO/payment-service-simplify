/*
  Warnings:

  - You are about to drop the column `(card_owner)` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `profile_client_id` to the `payables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `payables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_owner` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payables" ADD COLUMN     "profile_client_id" INTEGER NOT NULL,
ADD COLUMN     "transaction_id" INTEGER NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "(card_owner)",
ADD COLUMN     "card_owner" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "profile_clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "profile_clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_clients_email_key" ON "profile_clients"("email");

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

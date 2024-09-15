-- AlterTable
ALTER TABLE "profile_clients" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_profile_client_id_fkey" FOREIGN KEY ("profile_client_id") REFERENCES "profile_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

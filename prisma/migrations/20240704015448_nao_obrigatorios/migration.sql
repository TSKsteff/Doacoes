-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "donationType" DROP NOT NULL,
ALTER COLUMN "money" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DonationTarget" ALTER COLUMN "moneyQuota" DROP NOT NULL,
ALTER COLUMN "moneyTotal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "image" DROP NOT NULL;

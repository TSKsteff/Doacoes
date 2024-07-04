/*
  Warnings:

  - A unique constraint covering the columns `[donationTargetId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donation_donationTargetId_key" ON "Donation"("donationTargetId");

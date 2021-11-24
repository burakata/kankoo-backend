/*
  Warnings:

  - A unique constraint covering the columns `[GameId]` on the table `Fixture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[GameId]` on the table `GamePoints` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Fixture.GameId_unique` ON `Fixture`(`GameId`);

-- CreateIndex
CREATE UNIQUE INDEX `GamePoints.GameId_unique` ON `GamePoints`(`GameId`);

-- AddForeignKey
ALTER TABLE `Fixture` ADD FOREIGN KEY (`GameId`) REFERENCES `GamePoints`(`GameId`) ON DELETE CASCADE ON UPDATE CASCADE;

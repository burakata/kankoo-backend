/*
  Warnings:

  - You are about to drop the `GamePoints` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `AwayWinPoint` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DrawPoint` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HomeWinPoint` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Fixture` DROP FOREIGN KEY `Fixture_ibfk_4`;

-- AlterTable
ALTER TABLE `Fixture` ADD COLUMN `AwayWinPoint` INTEGER NOT NULL,
    ADD COLUMN `DrawPoint` INTEGER NOT NULL,
    ADD COLUMN `HomeWinPoint` INTEGER NOT NULL;

-- DropTable
DROP TABLE `GamePoints`;

-- CreateTable
CREATE TABLE `Teams` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,

    INDEX `Teams.Id_index`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fixture` (
    `GameId` INTEGER NOT NULL AUTO_INCREMENT,
    `WeekId` INTEGER NOT NULL,
    `HomeTeamId` INTEGER NOT NULL,
    `AwayTeamId` INTEGER NOT NULL,
    `Result` INTEGER NOT NULL DEFAULT -1,

    INDEX `Fixture.GameId_index`(`GameId`),
    INDEX `Fixture.WeekId_index`(`WeekId`),
    PRIMARY KEY (`GameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GamePoints` (
    `GameId` INTEGER NOT NULL,
    `HomeWinPoint` INTEGER NOT NULL,
    `DrawPoint` INTEGER NOT NULL,
    `AwayWinPoint` INTEGER NOT NULL,

    INDEX `GamePoints.GameId_index`(`GameId`),
    PRIMARY KEY (`GameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bets` (
    `UserId` INTEGER NOT NULL,
    `GameId` INTEGER NOT NULL,
    `Bet` INTEGER NOT NULL,

    INDEX `Bets.UserId_GameId_index`(`UserId`, `GameId`),
    UNIQUE INDEX `Bets.UserId_GameId_unique`(`UserId`, `GameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weeks` (
    `Id` INTEGER NOT NULL,
    `IsBetActive` BOOLEAN NOT NULL,

    INDEX `Weeks.Id_index`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResultTypes` (
    `Id` INTEGER NOT NULL,
    `Description` VARCHAR(45) NOT NULL,

    INDEX `ResultTypes.Id_index`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

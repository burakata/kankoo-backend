-- CreateTable
CREATE TABLE `Users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,
    `UserName` VARCHAR(45) NOT NULL,
    `Password` VARCHAR(45) NOT NULL,
    `IsAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Users.UserName_unique`(`UserName`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

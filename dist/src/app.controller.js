"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let AppController = class AppController {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllUsers() {
        return this.prismaService.users.findMany();
    }
    async getUserByUsername(userName) {
        return this.prismaService.users.findFirst({
            where: { UserName: userName }
        });
    }
    async getAllTeams() {
        return this.prismaService.teams.findMany();
    }
    async getAllWeeks() {
        return this.prismaService.weeks.findMany();
    }
    async getAllBets() {
        return this.prismaService.bets.findMany();
    }
    async getBetsByUser(userId) {
        return this.prismaService.bets.findMany({
            where: { UserId: Number(userId) }
        });
    }
    async getFixtureByWeek(weekId) {
        return this.prismaService.fixture.findMany({
            where: { WeekId: Number(weekId) },
            include: {
                Week: true,
                HomeTeam: true,
                AwayTeam: true,
                GameBets: true
            }
        });
    }
    async addWeek(weekData) {
        console.log(weekData);
        try {
            return await this.prismaService.weeks.create({
                data: {
                    Id: weekData.Id,
                    IsBetActive: weekData.IsBetActive
                },
            });
        }
        catch (e) {
            throw new common_1.HttpException({
                message: e.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signupUser(userData) {
        console.log(userData);
        try {
            return await this.prismaService.users.create({
                data: {
                    Name: userData === null || userData === void 0 ? void 0 : userData.name,
                    UserName: userData.userName,
                    Password: userData.password
                },
            });
        }
        catch (e) {
            throw new common_1.HttpException({
                message: e.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addGame(gameData) {
        console.log(gameData);
        try {
            return await this.prismaService.fixture.create({
                data: {
                    WeekId: gameData.weekId,
                    HomeTeamId: gameData.homeTeamId,
                    AwayTeamId: gameData.awayTeamId,
                    HomeWinPoint: gameData.homeWinPoint,
                    DrawPoint: gameData.drawPoint,
                    AwayWinPoint: gameData.awayWinPoint
                },
            });
        }
        catch (e) {
            throw new common_1.HttpException({
                message: e.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addBet(betData) {
        console.log(betData);
        const existingBet = await this.prismaService.bets.findFirst({
            where: { AND: [{ UserId: betData.userId }, { GameId: betData.gameId }] }
        });
        if (!existingBet) {
            try {
                return await this.prismaService.bets.create({
                    data: {
                        UserId: betData.userId,
                        GameId: betData.gameId,
                        Bet: betData.bet
                    },
                });
            }
            catch (e) {
                throw new common_1.HttpException({
                    message: e.message
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            try {
                return await this.prismaService.bets.update({
                    where: { UserId_GameId: { UserId: betData.userId, GameId: betData.gameId } },
                    data: {
                        UserId: betData.userId,
                        GameId: betData.gameId,
                        Bet: betData.bet
                    },
                });
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException({
                    message: e.message
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    addBulkBets(betData) {
        const allResult = betData.map(bet => {
            var existingBet = {
                Bet: -1,
                UserId: -1,
                GameId: -1
            };
            this.prismaService.bets.findFirst({
                where: { AND: [{ UserId: bet.UserId }, { GameId: bet.GameId }] }
            }).then((response) => {
                existingBet = response;
                if (!existingBet || existingBet.GameId === -1) {
                    try {
                        this.prismaService.bets.create({
                            data: {
                                UserId: bet.UserId,
                                GameId: bet.GameId,
                                Bet: bet.Bet
                            },
                        }).then(x => { });
                    }
                    catch (e) {
                        throw new common_1.HttpException({
                            message: e.message
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else {
                    try {
                        this.prismaService.bets.update({
                            where: { UserId_GameId: { UserId: bet.UserId, GameId: bet.GameId } },
                            data: {
                                UserId: bet.UserId,
                                GameId: bet.GameId,
                                Bet: bet.Bet
                            },
                        }).then(x => { });
                    }
                    catch (e) {
                        console.log(e);
                        throw new common_1.HttpException({
                            message: e.message
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
            });
        });
    }
};
__decorate([
    common_1.Get('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get('users/:userName'),
    __param(0, common_1.Param('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserByUsername", null);
__decorate([
    common_1.Get('teams'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllTeams", null);
__decorate([
    common_1.Get('weeks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllWeeks", null);
__decorate([
    common_1.Get('bets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllBets", null);
__decorate([
    common_1.Get('bets/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBetsByUser", null);
__decorate([
    common_1.Get('fixture/:weekId'),
    __param(0, common_1.Param('weekId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getFixtureByWeek", null);
__decorate([
    common_1.Post('addweek'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addWeek", null);
__decorate([
    common_1.Post('signup'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signupUser", null);
__decorate([
    common_1.Post('add-game'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addGame", null);
__decorate([
    common_1.Post('add-bet'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addBet", null);
__decorate([
    common_1.Post('add-bulk-bets'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Object)
], AppController.prototype, "addBulkBets", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
import { PrismaService } from './prisma.service';
import { Users as UserModel, Teams as TeamModel, Weeks, Fixture, Bets } from '@prisma/client';
export declare class AppController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllUsers(): Promise<UserModel[]>;
    getUserByUsername(userName: string): Promise<UserModel>;
    getAllTeams(): Promise<TeamModel[]>;
    getAllWeeks(): Promise<Weeks[]>;
    getAllBets(): Promise<Bets[]>;
    getBetsByUser(userId: string): Promise<Bets[]>;
    getFixtureByWeek(weekId: string): Promise<Fixture[]>;
    addWeek(weekData: {
        Id: number;
        IsBetActive: boolean;
    }): Promise<any>;
    signupUser(userData: {
        name: string;
        userName: string;
        password: string;
    }): Promise<any>;
    addGame(gameData: {
        weekId: number;
        homeTeamId: number;
        awayTeamId: number;
        homeWinPoint: number;
        drawPoint: number;
        awayWinPoint: number;
    }): Promise<any>;
    addBet(betData: {
        userId: number;
        gameId: number;
        bet: number;
    }): Promise<any>;
    addBulkBets(betData: Bets[]): any;
}

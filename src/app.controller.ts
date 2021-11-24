import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Users as UserModel, Teams as TeamModel,  Prisma, Weeks, Fixture, Bets } from '@prisma/client'
import { exception } from 'console';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

/*   @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id: Number(id) } })
  } */

/*   @Get('feed')
  async getFilteredPosts(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<PostModel[]> {
    const or = searchString ? {
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } },
      ],
    } : {}

    return this.prismaService.post.findMany({
      where: {
        published: true,
        ...or
      },
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy
      }
    })
  } */

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.users.findMany()
  }

  @Get('teams')
  async getAllTeams(): Promise<TeamModel[]> {
    return this.prismaService.teams.findMany()
  }

  @Get('weeks')
  async getAllWeeks(): Promise<Weeks[]> {
    return this.prismaService.weeks.findMany()
  }

  @Get('bets')
  async getAllBets(): Promise<Bets[]> {
    return this.prismaService.bets.findMany()
  }

  @Get('fixture/:weekId')
  async getFixtureByWeek(@Param('weekId') weekId: string): Promise<Fixture[]> {
    return this.prismaService.fixture.findMany(
      { 
        where: { WeekId: Number(weekId) },
        include: {
          Week:true,
          HomeTeam:true,
          AwayTeam:true,
          GameBets:true
        }
      })
  }

 /*  @Get('user/:id/drafts')
  async getDraftsByUser(@Param('id') id: string): Promise<PostModel[]> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) }
    }).posts({
      where: {
        published: false
      }
    })
  } */
/* 
  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData
    return this.prismaService.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }
 */

  
  @Post('addweek')
  async addWeek(
    @Body() weekData: { Id: number; IsBetActive: boolean },
  ): Promise<any>  {

    console.log(weekData);
   
    try {
      return await this.prismaService.weeks.create({
        data: {
          Id: weekData.Id,
          IsBetActive: weekData.IsBetActive
        },
      })
    }
    catch (e){
      //return {error : e.message}

    throw new HttpException({
        message: e.message
      }, HttpStatus.BAD_REQUEST); 
    }
  } 

  @Post('signup')
  async signupUser(
    @Body() userData: { name: string; userName: string, password: string },
  ): Promise<any>  {

    console.log(userData);
   
    try {
      return await this.prismaService.users.create({
        data: {
          Name: userData?.name,
          UserName: userData.userName,
          Password: userData.password
        },
      })
    }
    catch (e){
      //return {error : e.message}

    throw new HttpException({
        message: e.message
      }, HttpStatus.BAD_REQUEST); 
    }
  } 



  @Post('add-game')
  async addGame(
    @Body() gameData: { weekId: number; homeTeamId: number; awayTeamId: number; homeWinPoint:number; drawPoint:number;awayWinPoint:number; },
  ): Promise<any>  {

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
      })
    }
    catch (e){
      //return {error : e.message}

    throw new HttpException({
        message: e.message
      }, HttpStatus.BAD_REQUEST); 
    }
  } 

  @Post('add-bet')
  async addBet(
    @Body() betData: { userId: number; gameId: number; bet: number; },
  ): Promise<any>  {

    console.log(betData);
   
    try {
      return await this.prismaService.bets.create({
        data: {
          UserId: betData.userId,
          GameId: betData.gameId,
          Bet: betData.bet
        },
      })
    }
    catch (e){
      //return {error : e.message}

    throw new HttpException({
        message: e.message
      }, HttpStatus.BAD_REQUEST); 
    }
  } 
/* 
  @Put('publish/:id')
  async togglePublishPost(@Param('id') id: string): Promise<PostModel> {

    const postData = await this.prismaService.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true
      }
    })

    return this.prismaService.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    })
  }
 */
/* 
  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.delete({ where: { id: Number(id) } })
  }
 */
  /* @Put('/post/:id/views')
  async incrementPostViewCount(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1
        }
      }
    })
  }  */
}

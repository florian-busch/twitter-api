import { Controller, Get, Param, Post, UseGuards, Request, Query, Delete } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParseObjectIdPipe } from '../pipes/validateObjectID.pipe';

@Controller('2/tweets')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  //get one or multiple Tweets by ID
  @Get('/:ids')
  async getTweetsById(@Param() params): Promise<unknown> {
    return this.tweetService.getTweetsById(params.ids);
  }

  //search for tweets published in the last 7 days
  @Get('/search/recent')
  async getRecentTweets(@Query() query?: string): Promise<unknown> {
    return this.tweetService.getRecentTweets(query);
  }

  @Get('/:id/liking_users')
  async getTweetsLikingUsers(@Param('id', new ParseObjectIdPipe()) params): Promise<unknown> {
    return this.tweetService.getTweetsLikingUsers(params);
  }

  //post one tweet
  @UseGuards(JwtAuthGuard)
  @Post()
  async postTweet(@Request() req: any): Promise<any> {
    return this.tweetService.postTweet(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTweet(@Param('id', new ParseObjectIdPipe()) params, @Request() req: any): Promise<any> {
    return this.tweetService.deleteTweet(params, req);
  }
}

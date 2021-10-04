import { Controller, Get, Param, Post, UseGuards, Request, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async getTweetsLikingUsers(@Param() params): Promise<unknown> {
    return this.tweetService.getTweetsLikingUsers(params.id);
  }

  //post one tweet
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async postTweet(@Request() req: any): Promise<any> {
    return this.tweetService.postTweet(req);
  }
}

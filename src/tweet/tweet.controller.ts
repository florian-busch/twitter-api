import { Controller, Body, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from '../schemas/tweet.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('statuses')
export class TweetController {

  constructor(private tweetService: TweetService) {}

  //post one tweet
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async postTweet(@Request() req: any): Promise<any> {
    return this.tweetService.postTweet(req);
  }

}

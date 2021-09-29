import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('statuses')
export class TweetController {

  constructor(private tweetService: TweetService) {}

  // //post one tweet
  // @Post('/update')
  // async postTweet(@Body() body: Tweet): Promise<Tweet> {
  //   return this.tweetService.postTweet(body)
  // }

}

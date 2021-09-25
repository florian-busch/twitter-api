import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('tweet')
export class TweetController {

  @Get(':topic')
  findAll(@Param() params): string {
    console.log(params.topic)
    return `This gets all tweets with topic ${params.topic}`
  }


}

import { Injectable } from '@nestjs/common';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TweetService {

  constructor(@InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>) {}

  //post Tweet and auto-populate Tweet.user by users ObjectId
  async postTweet(req) {
    const tweet = new this.tweetModel(req.body);
    tweet.user = req.user.userId;
    tweet.created_at = new Date().toString();
    tweet.populate('user');
    return await tweet.save();
  }
}

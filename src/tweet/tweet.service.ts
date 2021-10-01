import { Injectable } from '@nestjs/common';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  //get one tweet with user by Id
  async getTweetById(id) {
    try {
      return await this.tweetModel.findById(id).populate('user');
    } catch (err) {
      return err.message;
    }
  }

  //get multiple tweets with user by ids
  //TODO: sort out invalid ids befor db-query -->otherwise returns error for all ids
  async getMultipleTweetsById(ids) {
    const separatedIds = ids.split(',');
    const tweets = await Promise.all(
      separatedIds.map((tweetId) =>
        this.tweetModel.findById(tweetId).populate('user'),
      ),
    );
    return tweets;
  }

  //post Tweet and auto-populate Tweet.user by users ObjectId
  async postTweet(req) {
    const tweet = new this.tweetModel(req.body);
    tweet.user = req.user.userId;
    tweet.created_at = new Date().toString();
    //TODO: is populate needed here? return value in production won't be tweet but success message; ID already is saved
    tweet.populate('user');
    return await tweet.save();
  }
}

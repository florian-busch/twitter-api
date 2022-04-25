import { Injectable } from '@nestjs/common';
import { Tweet, TweetDocument } from '../schemas/tweet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  //get one or more tweets with user by ids
  async getTweetsById(ids) {
    //check if ObjectIds of tweets are valid
    const checkedIds = [];
    ids
      .split(',')
      .forEach((id) =>
        Types.ObjectId.isValid(id)
          ? checkedIds.push(id)
          : console.log('Unvalid id ' + id),
      );
    //query tweets from db
    const tweets = await Promise.all(
      checkedIds.map((tweetId) =>
        this.tweetModel.findById(tweetId).populate('author_id'),
      ),
    );
    //filter for null values (valid ObjectIds with no corresponding tweet in db) and return tweets
    return tweets.filter(n => n);
  }

  //get tweets based on query from the last 7 days
  async getRecentTweets(query) {
    //regex for query with 'i' for case insensitive, s for query-string
    const s = query.query;
    const regex = new RegExp(s, 'i');

    //TODO: #9 getRecentTweets returns all tweets with matching query, not only those from 7 or less days ago
    //date from week ago for created_at query
    const date = new Date();
    const minusSevenDays = date.setDate(date.getDate() - 7);
    const sevenDaysAgo = new Date(minusSevenDays).toISOString();

    //query and populate with user-data
    const tweets = this.tweetModel
      .find({
        text: { $regex: regex },
        created_at: { $gte: sevenDaysAgo },
      })
      .populate('author_id');
    return tweets;
  }

  //TODO: #8 implement data-fields like here: https://developer.twitter.com/en/docs/twitter-api/tweets/likes/api-reference/get-tweets-id-liking_users
  async getTweetsLikingUsers(tweetId) {
    return this.tweetModel.find({ _id: tweetId });
  }

  //post Tweet and auto-populate Tweet.user by users ObjectId
  async postTweet(req) {
    try {
    const tweet = new this.tweetModel(req.body);
    tweet.author_id = req.user.userId;
    tweet.created_at = new Date().toISOString();
    //TODO: is populate needed here? return value in production won't be tweet but success message; ID already is saved
    tweet.populate('author_id');
    return await tweet.save();
    }
    catch (err) {
      return err.message
    }
  }
}

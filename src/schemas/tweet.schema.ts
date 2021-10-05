import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
  @Prop({ required: true })
  text: string;

  //Should be of type object
  @Prop()
  attachments: string;

  //User who posted this tweet --> holds whole user object
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author_id: User;

  //should be of type array
  @Prop()
  context_annotations: string;

  @Prop()
  conversation_id: string;

  //TODO: #2 should be of type date and ISO 8601. Problem: date.toISOString() returns string
  @Prop({ required: true })
  created_at: string;

  //TODO: #6 Type Entities (once implemented); Entities which have been parsed out of the text of the tweet(hashtags, urls, symbols, polls)
  @Prop()
  entities: string;

  //TODO: #3 formatted as geoJSON --> should be type GeolocationCoordinates
  @Prop()
  geo: string;

  @Prop()
  in_reply_to_user_id: number;

  @Prop()
  lang: string;

  //should be of type object
  @Prop()
  non_public_metrics: string;

  //should be of type object
  @Prop()
  organic_metrics: string;

  @Prop()
  possibly_sensitive: boolean;

  //should be of type object
  @Prop()
  promoted_metrics: string;

  //should be of type object
  @Prop()
  public_metrics: string;

  //should be of type array
  @Prop()
  referenced_tweets: string;

  @Prop()
  reply_settings: string;

  @Prop()
  source: string;

  //should be of type object
  @Prop()
  withheld: string;

  @Prop()
  truncated: boolean;

  //from her on legacy api entries
  @Prop()
  in_reply_to_status_id: number;

  @Prop()
  in_reply_to_status_id_str: string;

  @Prop()
  in_reply_to_user_id_str: string;

  @Prop()
  in_reply_to_screen_name: string;

  @Prop()
  place: string;

  @Prop()
  quoted_status_id: number;

  @Prop()
  quoted_status_id_str: string;

  @Prop()
  default_profile_image: boolean;

  @Prop()
  is_quote_status: boolean;

  //TODO: #5 holds original tweet if tweet is quoted --> should be of type Tweet
  @Prop()
  quoted_status: string;

  //TODO: #4 holds original tweet if tweet is retweeted --> should be of type Tweet
  @Prop()
  retweeted_status: string;

  @Prop()
  quote_count: number;

  @Prop()
  reply_count: number;

  @Prop()
  retweet_count: number;

  //represents Likes
  @Prop()
  favorite_count: number;

  @Prop()
  extended_entities: number;

  //indicates if tweet has been liked by authenticated user
  @Prop()
  favorited: boolean;

  //indicates if tweet has been retweeted by authenticated user
  @Prop()
  retweeted: boolean;

  @Prop()
  filter_level: string;

  //type: array of rules object
  @Prop()
  matching_rules: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

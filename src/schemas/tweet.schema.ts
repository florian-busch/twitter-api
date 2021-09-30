import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
  //TODO: has to be unique
  @Prop({ required: true })
  created_at: string;

  //TODO: id_str should be ObjectId to string
  @Prop()
  id_str: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  source: string;

  @Prop()
  truncated: boolean;

  @Prop()
  in_reply_to_status_id: number;

  @Prop()
  in_reply_to_status_id_str: string;

  @Prop()
  in_reply_to_user_id: number;

  @Prop()
  in_reply_to_user_id_str: string;

  @Prop()
  in_reply_to_screen_name: string;

  //User who posted this tweet --> holds whole user object
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  //formatted as geoJSON --> should be type GeolocationCoordinates
  @Prop()
  coordinates: string;

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

  //holds original tweet if tweet is quoted --> should be of type Tweet
  @Prop()
  quoted_status: string;

  //holds original tweet if tweet is retweeted --> should be of type Tweet
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

  //Important: Entities which have been parsed out of the text of the tweet(hashtags, urls, symbols, polls)
  @Prop()
  entities: string;

  @Prop()
  extended_entities: number;

  //indicates if tweet has been liked by authenticated user --> to display like-symbol in red
  @Prop()
  favorited: boolean;

  //indicates if tweet has been retweeted by authenticated user --> to display retweet-symbol in color
  @Prop()
  retweeted: boolean;

  @Prop()
  possibly_sensitive: boolean;

  @Prop()
  filter_level: string;

  @Prop()
  lang: string;

  //type: array of rules object
  @Prop()
  matching_rules: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

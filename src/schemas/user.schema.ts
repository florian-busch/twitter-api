import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  //TODO: #7 User.name has to be unique
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  location: string;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  verified: boolean;

  @Prop()
  followers_count: number;

  @Prop()
  friends_count: number;

  @Prop()
  listed_count: number;

  @Prop()
  favorites_count: number;

  @Prop()
  statuses_count: number;

  @Prop()
  created_at: string;

  @Prop()
  profile_banner_url: string;

  @Prop()
  profile_image_url_https: string;

  @Prop()
  default_profile: boolean;

  @Prop()
  default_profile_image: boolean;

  @Prop()
  withheld_in_countries: string;

  @Prop()
  withheld_scope: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

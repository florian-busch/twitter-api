import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema()
export class Media {

  @Prop({ required: true, unique: true})
  media_key: string;

  //classify the media as photo, GIF or video
  @Prop({ enum: ['animated_gif', 'video', 'photo']})
  type: string;

  //A direct URL to the media file on Twitter.
  @Prop()
  url: string;

  //Available when type is video. Duration in milliseconds of the video.
  @Prop()
  duration_ms: number;

  @Prop()
  height: number;

  //should be of type object
  @Prop()
  non_public_metrics: string;

  //holds engagements metrics, type: object
  @Prop()
  organic_metrics: string;

  //URL to the static placeholder preview of this content.
  @Prop()
  preview_image_url: string;

  //type: object
  @Prop()
  promoted_metrics: number;

  //public engagement metrics for the media content at the time of request; type: object
  @Prop()
  public_metrics: string;

  @Prop()
  width: number;

  //
  @Prop({ maxlength: 1000 })
  alt_text: string;

}

export const MediaSchema = SchemaFactory.createForClass(Media);

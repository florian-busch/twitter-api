import { Injectable } from '@nestjs/common';
import { Media, MediaDocument } from '../schemas/media.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}

  //check mimetype of file data and return correct type
  async determineFileType(mimetype) {
    const photo = ['jpg', 'jpeg', 'png'];
    if (photo.some(el => mimetype.includes(el))) {
      return 'photo';
    } else if (mimetype.includes('video')) {
      return 'video';
    } else if (mimetype.includes('gif')) {
      return 'animated_gif';
    }
  }

  async saveMediaObject(data, body) {
    const mediaObject = {
      media_key: data.filename,
      type: '',
      url: `${data.path}`,
      alt_text: `${body.alt_text}`,
    }

    //populate type of media object based on files mimetype
    mediaObject.type = await this.determineFileType(data.mimetype)

    const objectForSave = new this.mediaModel(mediaObject);
    //returns saved mediaObject with id that can later be used to populate media-tweet with data
    return objectForSave.save();
  }

}

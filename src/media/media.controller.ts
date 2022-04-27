import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter:  (req: Request, file, cb) => {
        const validMimetypes: string[] = ['image', 'video'];
        const ext: string = file.mimetype;
        if (!validMimetypes.some(el => ext.includes(el))) {
          //TODO: #11 Built a custom exception that sends a response to client with error message (right now client gets 500 internal server error)
          return cb(new Error('Extension not allowed'), false);
        }
        return cb(null, true);
      }
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.mediaService.saveMediaObject(file, body);
  }
}

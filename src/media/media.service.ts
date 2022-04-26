import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {

  testFunction() {
    return 'Test läuft'
  }
}

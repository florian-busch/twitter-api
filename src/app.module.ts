import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

//Mongoose
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TweetModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/twitter'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

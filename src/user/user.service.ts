import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //retrieve single user by id
  async findSingleUserByID(userID) {
    try {
      return this.userModel.findById(userID);
    } catch (err) {
      return err.message;
    }
  }

  //retrieve multiple users by id
  async findMultipleUsersByID(query) {
    try {
      const users = await Promise.all(
        query.ids.split(',').map((userID) => this.userModel.findById(userID)),
      );
      return users;
    } catch (err) {
      return err.message
    }


  }

  //retrieve single user by username
  async findSingleUserbyUsername(username) {
    return this.userModel.findOne({ name: username });
  }

  //retrieve multiple users by username
  async findMultipleUsersByUsername(query) {
    try {
      const users = await Promise.all(
        query.usernames
          .split(',')
          .map((username) => this.userModel.findOne({ name: username })),
      );
      return users;
    } catch (err) {
      return err.message;
    }
  }

  //TODO: Where to save the like of an user?
  async likeTweet(userId, tweetId) {
    console.log('tweetId' + tweetId);
    console.log('userId' + userId);
    return {
      data: {
        liked: true,
      },
    };
  }

  //Login and Auth Routes#############################################################################
  //create User-Object with hashed pw and safe it to Database
  async createUser(body) {
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    body.password = hash;
    const createdUser = new this.userModel(body);
    return createdUser.save();
  }

  //find user by name and return password-hash for authentication
  async findUserForAuthentication(username) {
    return await this.userModel.findOne({ name: username }).select('+password');
  }

  async getInformationAboutAuthorizedUser(id) {
    return await this.userModel.findById(id);
  }

  //TODO #10: insert keys for updates dynamically. so far everything is hardcoded
  //update one user
  async updateOneUser(id, content) {
    const update = {
      name: content.name,
      verified: content.verified,
      location: content.location
    }
    return await this.userModel.updateOne({ _id: id}, update );
  }

  //delete one user
  async deleteOneUser(id) {
    return await this.userModel.deleteOne({ _id: id});
  }
}

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
    return this.userModel.findById(userID)
    } catch (err) {
      return err.message
    }
  }

  //retrieve multiple users by id
  async findMultipleUsersByID(query) {
    const users = await Promise.all(query.ids
      .split(',')
      .map(userID => this.userModel.findById(userID))
      )
    return users
  }

  //retrieve single user by username
  async findSingleUserbyUsername(username) {
    return this.userModel.findOne({ name: username })
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
}

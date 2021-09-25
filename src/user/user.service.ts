import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  //retrieve single user by id
  async findSingleUserByID(userID) {
    return this.userRepository.find({ id: userID })
  }

  //retrieve multiple users by id
  async findMultipleUsersByID(query) {
    let users = await Promise.all(query.ids
      .split(',')
      .map(userID => this.userRepository.find( {id: userID} )))
    return users
  }

  //retrieve single user by username
  async findSingleUserbyUsername(username) {
    return this.userRepository.find( {name: username})
  }

  //retrieve multiple users by username
  async findMultipleUsersByUsername(query) {
    let users = await Promise.all(query.usernames
      .split(',')
      .map(username => this.userRepository.find( {name: username} )))
    return users
  }

  //create User-Object with hashed pw and safe it to Database
  async createUser(body) {
      const saltOrRounds = 10;
      const password = body.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      body.password = hash;
      return this.userRepository.save(body);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection
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
    try {
    let users = await Promise.all(query.usernames
      .split(',')
      .map(username => this.userRepository.find( {name: username} )))
    return users
  } catch (err) {
    return err.message
  }
}

  //Login and Auth Routes#############################################################################
    //create User-Object with hashed pw and safe it to Database
  async createUser(body) {
      const saltOrRounds = 10;
      const password = body.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      body.password = hash;
      return this.userRepository.save(body);
  }

  //find user by name and return password-hash for authentication
  async findUserAuthentication(username) {
    return await this.connection.getRepository(User)
      .createQueryBuilder('user')
      .where('user.name = :name', { name: username})
      .addSelect('user.password')
      .getOne()
  }
}

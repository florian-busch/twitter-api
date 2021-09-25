import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Like, Repository, FindManyOptions } from 'typeorm';


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
  //TODO: returns only one user so far
  async findMultipleUsersByID(query) {
    return this.userRepository.findByIds(query.ids)
  }

  //retrieve single user by username
  async findSingleUserbyUsername(username) {
    return this.userRepository.find( {name: username})
  }

  //retrieve multiple users by username
  async findMultipleUsersByUsername(username) {
    return this.userRepository.find({ name: Like(`%${username}`) })
  }

  //find all users where user.description contains description-query
  async findAllDescription(description) {
    return this.userRepository.find({ description: Like(`%${description}%`) })
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

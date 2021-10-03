import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { Types } from 'mongoose';
@Controller('2/users')
export class UserController {

  constructor(private userService: UserService) {}

  //retrieve multiple users by ids
  @Get()
  findMultipleUsersByID(@Query() query?: string): Promise<unknown> {
    return this.userService.findMultipleUsersByID(query)
  }

  //find multiple users by username --> localhost:3000/users/by?usernames=MongoTest,MongoTest2
  @Get('/by')
  findMultipleUsersByUsername(@Query() query?: string): Promise<unknown> {
    try {
      return this.userService.findMultipleUsersByUsername(query);
    } catch (err) {
      return err.message;
    }
  }

  //find single user with id
  @Get('/:id')
  findSingleUserByID(@Param() params): Promise<User> | string {
    if (Types.ObjectId.isValid(params.id)) {
    return this.userService.findSingleUserByID(params.id)
    } else {
      return 'No valid id'
    }
  }

  //find single user by username
  @Get('/by/username/:username')
  findSingleUserbyUsername(@Param() params): Promise<User> {
    return this.userService.findSingleUserbyUsername(params.username);
  }

  //create a User-Account
  @Post()
  async createOne(@Body() body: User): Promise<string> {
    try {
    await this.userService.createUser(body);
    return 'User created';
    } catch (err) {
      return err.message;
    }
  }

  @Delete()
  deleteOne(): string {
    return 'This deletes one User';
  }

  @Put()
  updateOne(): string {
    return 'This updates one User'
  }

}

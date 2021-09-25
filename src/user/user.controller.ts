import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  //retrieve multiple users by ids
  //returns only one user --> debug!
  @Get()
  findMultipleUsersByID(@Query() query?: string): Promise<User[]> {
    return this.userService.findMultipleUsersByID(query)
  }

  //find single user with id
  @Get('/:id')
  findSingleUserByID(@Param() params): Promise<User[]> {
    return this.userService.findSingleUserByID(params.id)

  }

  @Get('/by/username/:username')
  findSingleUserbyUsername(@Param() params): Promise<User[]> {
    return this.userService.findSingleUserbyUsername(params.username)
  }

  @Get('/by')
  findMultipleUsersByUsername(@Query() usernames?: string): Promise<User[]> {
    return this.userService.findMultipleUsersByUsername(usernames)
  }



  //liefert kein resultat
  @Get('/description/:description')
  findAllDescriptions(@Param() params): Promise<User[]> {
    console.log('descriptions' + params.description)
    return this.userService.findAllDescription(params.description)
  }

  //create a User-Account
  @Post()
  async createOne(@Body() body: User): Promise<string> {
    try {
    await this.userService.createUser(body)
    return 'User created'
    } catch (err) {
      return err.message
    }
  }

  @Delete()
  deleteOne(): string {
    return 'This deletes one User'
  }

  @Put()
  updateOne(): string {
    return 'This updates one User'
  }

}

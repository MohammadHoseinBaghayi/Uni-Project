import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Response200 } from '../../response.dto';

@ApiTags("User Routes")
@Controller("user")
export class UserController {
  constructor(private userService:UserService) {
  }

  @Post("create")
  async createUser(@Body(ValidationPipe) createUserDto:CreateUserDto):Promise<any>
  {
    return await this.userService.createUser(createUserDto)
  }
}
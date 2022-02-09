import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Response200, ResponseOk } from '../../response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private userRepository:UserRepository) {
  }

  async createUser(createUserDto:CreateUserDto):Promise<UserEntity>
  {
    const findUser=await this.userRepository.findOne({where:{username:createUserDto.username}})
    if (findUser)
    {
      findUser.phone=createUserDto.phone
      findUser.age=createUserDto.age
      findUser.address=createUserDto.address
      findUser.birthdate=createUserDto.birthdate
      findUser.family=createUserDto.family
      findUser.name=createUserDto.name
      const data=await this.userRepository.save(findUser)
      return data
    }

    if (!findUser)
    {
      const user=new UserEntity()
      user.name=createUserDto.name
      user.family=createUserDto.family
      user.birthdate=createUserDto.birthdate
      user.address=createUserDto.address
      user.age=createUserDto.age
      user.phone=createUserDto.phone
      user.username=createUserDto.username
      const data=await this.userRepository.save(user)
      return data
    }
  }

}
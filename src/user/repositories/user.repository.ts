import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

}
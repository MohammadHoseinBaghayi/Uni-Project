import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()

  username?:string

  @ApiProperty()

  name:string

  @ApiProperty()

  family:string

  @ApiProperty()

  age:number

  @ApiProperty()

  birthdate:string

  @ApiProperty()

  phone:string

  @ApiProperty()

  address:string
}
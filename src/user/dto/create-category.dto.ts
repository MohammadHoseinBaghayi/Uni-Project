import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLowercase()
  name:string
}
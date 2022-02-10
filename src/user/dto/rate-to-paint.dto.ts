import { ApiProperty } from '@nestjs/swagger';

export class RateToPaintDto {
  @ApiProperty()
  paintId:string

  @ApiProperty()
  rate:number
}
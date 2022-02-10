import { ApiProperty } from '@nestjs/swagger';

export class FeedbackToPaintDto {
  @ApiProperty()
  paintId:string

  @ApiProperty()
  feedback:string
}
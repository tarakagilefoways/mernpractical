import { ApiProperty } from '@nestjs/swagger';

export class NextQuestionDto {
  @ApiProperty({ example: 'abc123' })
  _id: string;

  @ApiProperty({ example: 1 })
  previoudQueId: number;

  @ApiProperty({ example: 1 })
  previousQueAnswer: number;
}

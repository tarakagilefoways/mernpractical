import { ApiProperty } from '@nestjs/swagger';

export class QuitGameDto {
  @ApiProperty({ example: 'abc123' })
  _id: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class StartGameDto {
  @ApiProperty({ example: 'John' })
  name: string;
}

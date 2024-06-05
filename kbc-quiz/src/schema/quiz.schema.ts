import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FORTIFIED = 'FORTIFIED',
}

@Schema()
export class Quiz {
  @Prop()
  name: string;

  @Prop({ type: Array<Number>, default: [] })
  attemptedQuestion: number[];

  @Prop({ type: Number, default: 0 })
  score: number;

  @Prop({ type: Date, default: Date.now })
  startTime: Date;

  @Prop({ type: Date })
  updatedTime: Date;

  @Prop({ type: Date })
  endTime: Date;

  @Prop({ type: String, enum: GameStatus, default: GameStatus.NOT_STARTED })
  status: GameStatus;

  @Prop({ type: Boolean, default: false })
  usedFiftyFifty: boolean;

  @Prop({ type: Boolean, default: false })
  usedAskAi: boolean;
}

export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);

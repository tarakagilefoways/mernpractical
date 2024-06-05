import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Question {
  @Prop()
  queId: number;

  @Prop()
  question: string;

  @Prop()
  options: { id: number; ans: string }[];

  @Exclude()
  @Prop()
  correctId: number;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from 'src/schema/question.schema';
import { QuestionSeederService } from './question.seeder.service';
let QuestionModel = MongooseModule.forFeature([
  { name: Question.name, schema: QuestionSchema },
]);
@Module({
  imports: [QuestionModel],
  providers: [QuestionSeederService],
  exports: [QuestionSeederService, MongooseModule],
})
export class QuestionSeederModule {}

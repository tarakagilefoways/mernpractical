import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionSeederModule } from '../question/question.seeder.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from 'src/schema/question.schema';
import { Quiz, QuizSchema } from 'src/schema/quiz.schema';
import { QuizCronService } from './quiz.cron.service';

let QuizModel = MongooseModule.forFeature([
  { name: Quiz.name, schema: QuizSchema },
]);
@Module({
  imports: [
    QuestionSeederModule,
    QuizModel,
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizCronService],
})
export class QuizModule {}

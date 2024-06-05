import { Module, OnModuleInit } from '@nestjs/common';
import mongoDb from './config/db/mongo.config';
import { QuizModule } from './module/quiz/quiz.module';
import { QuestionSeederModule } from './module/question/question.seeder.module';
import { QuestionSeederService } from './module/question/question.seeder.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    mongoDb,
    ScheduleModule.forRoot(),
    QuestionSeederModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly questionSeederService: QuestionSeederService) {}

  async onModuleInit() {
    await this.questionSeederService.seed();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment-timezone';
import { Model } from 'mongoose';
import { GameStatus, Quiz, QuizDocument } from 'src/schema/quiz.schema';

@Injectable()
export class QuizCronService {
  constructor(
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    let quizs = await this.quizModel
      .find({ status: [GameStatus.IN_PROGRESS, GameStatus.STARTED] })
      .exec();
    quizs.forEach(async (quiz) => {
      //Find Updated Time Difference of 30 Seconds or more
      let difference = moment
        .tz('UTC')
        .diff(moment.tz(quiz.updatedTime, 'UTC'), 'seconds');
      if (difference > 30) {
        //Update Quiz Status
        quiz.status = GameStatus.FORTIFIED;
        quiz.endTime = new Date();
        await this.quizModel.findOneAndUpdate(
          { _id: quiz._id },
          {
            $set: {
              status: quiz.status,
              endTime: quiz.endTime,
            },
          },
        );
      }
    });
  }
}

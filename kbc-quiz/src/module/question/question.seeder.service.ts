import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schema/question.schema';
import Questions from 'src/constants/question.json';
import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class QuestionSeederService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  async seed() {
    Questions.forEach(async (question) => {
      const existingQuestion = await this.questionModel.findOne({
        queId: question.queId,
      });
      if (!existingQuestion) {
        const newQuestion = new this.questionModel(question);
        await newQuestion.save();
        Logger.log(`Inserted question: ${question.question}`);
      } else {
        Logger.log(`Found question: ${existingQuestion.question}`);
      }
    });
  }
}

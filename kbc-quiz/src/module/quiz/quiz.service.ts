import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schema/question.schema';
import {
  GameStatus,
  Quiz,
  QuizDocument,
  QuizSchema,
} from 'src/schema/quiz.schema';
import { NextQuestionDto } from './dto/next-question.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  // Start Quiz
  async startQuiz(data: { name: string }) {
    const { name } = data;
    const newQuiz = await this.quizModel.create({
      name,
      status: GameStatus.STARTED,
      startTime: new Date(),
      updatedTime: new Date(),
      attemptedQuestion: [],
      score: 0,
      endTime: null,
    });
    Logger.log(`Inserted new quiz: ${newQuiz}`);
    let quiz = await this.quizModel.findOne({ _id: newQuiz._id }).exec();
    Logger.log(`Quiz: ${quiz.name} started`);
    return newQuiz;
  }
  // Get Random Question from DB
  async getRandomQuestion(askedQuestionsIds: number[]) {
    let questions = await this.questionModel.find();
    let updatedQuestions = [];
    questions.map((question) => {
      if (askedQuestionsIds.includes(question.queId) === false) {
        updatedQuestions.push({
          queId: question.queId,
          question: question.question,
          options: question.options,
          // correctId: question.correctId,
        });
      }
    });
    let randomQuestionIndex = Math.floor(
      Math.random() * updatedQuestions.length,
    );
    let randomQuestion = updatedQuestions.splice(randomQuestionIndex, 1);
    return randomQuestion[0];
  }
  // Next Question
  async nextQuestion(data: NextQuestionDto) {
    const { _id, previoudQueId, previousQueAnswer } = data;
    const quiz = await this.quizModel.findOne({ _id });

    if (
      quiz.status === GameStatus.COMPLETED ||
      quiz.status === GameStatus.FORTIFIED
    ) {
      let response = {
        attemptedQuestion: quiz.attemptedQuestion,
        score: quiz.score,
        message: 'Game Completed.',
      };
      return response;
    }

    if (
      previoudQueId === -1 &&
      previousQueAnswer === -1 &&
      quiz.attemptedQuestion.length != 9
    ) {
      let randomQuestion = await this.getRandomQuestion(quiz.attemptedQuestion);
      Logger.debug(quiz);
      let response = {
        ...randomQuestion,
        attemptedQuestion: quiz.attemptedQuestion,
        score: quiz.score,
        status: GameStatus.IN_PROGRESS,
        usedAskAi: quiz.usedAskAi,
        usedFiftyFifty: quiz.usedFiftyFifty,
      };
      return response;
    }

    let previousQuestion = await this.questionModel.findOne({
      queId: previoudQueId,
    });

    //  Matching previous question answer to previous question's correct answer
    if (previousQueAnswer === previousQuestion.correctId) {
      quiz.attemptedQuestion.push(previoudQueId);
      quiz.score =
        quiz.attemptedQuestion.length >= 4 ? quiz.attemptedQuestion.length : 0;
      quiz.updatedTime = new Date();
      quiz.status = GameStatus.IN_PROGRESS;
      if (quiz.attemptedQuestion.length === 9) {
        quiz.endTime = new Date();
        quiz.status = GameStatus.COMPLETED;
      }
      await this.quizModel
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              attemptedQuestion: quiz.attemptedQuestion,
              score: quiz.score,
              updatedTime: quiz.updatedTime,
              status: quiz.status,
              endTime: quiz.endTime,
            },
          },
        )
        .exec();

      //  If next que index is 10 then game is completed
      if (quiz.score === 9) {
        let finalResult = await this.quizModel.findById(_id).exec();
        let response = {
          attemptedQuestion: finalResult.attemptedQuestion,
          score: quiz.score,
          usedAskAi: quiz.usedAskAi,
          usedFiftyFifty: quiz.usedFiftyFifty,
          message: 'Game Completed.',
        };
        return response;
      }

      //  return remaining random question
      let randomQuestion = await this.getRandomQuestion(quiz.attemptedQuestion);
      let response = {
        ...randomQuestion,
        attemptedQuestion: quiz.attemptedQuestion,
        score: quiz.score,
        status: GameStatus.IN_PROGRESS,
        usedAskAi: quiz.usedAskAi,
        usedFiftyFifty: quiz.usedFiftyFifty,
      };
      return response;
    } else {
      // game over if answer is wrong
      quiz.endTime = new Date();
      quiz.status = GameStatus.COMPLETED;
      let finalResult = await this.quizModel
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              endTime: quiz.endTime,
              status: quiz.status,
            },
          },
        )
        .exec();
      return {
        message: 'Game Over',
        result: finalResult,
      };
    }
  }

  async getLeaderBoard() {
    return await this.quizModel
      .find({ status: [GameStatus.COMPLETED, GameStatus.FORTIFIED] })
      .sort({ score: -1 })
      .exec();
  }

  async quitGame(data: { _id: string }) {
    const { _id } = data;
    await this.quizModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          status: GameStatus.FORTIFIED,
          endTime: new Date(),
        },
      },
    );
    let finalResult = await this.quizModel.findById(_id).exec();
    let response = {
      score: finalResult.score,
      attemptedQuestion: finalResult.attemptedQuestion,
      message: 'Quiz quited successfully',
    };

    return response;
  }

  async useFiftyFifty(data: { _id: string; queId: number }) {
    const { _id, queId } = data;
    let finalResult = await this.quizModel
      .findOneAndUpdate(
        { _id },
        {
          $set: {
            usedFiftyFifty: true,
          },
        },
      )
      .exec();

    let question = await this.questionModel.findOne({ queId: queId }).exec();
    Logger.debug(question);
    // find index of correct answer in options
    let correctAnswerIndex = question.options.findIndex(
      (option) => option.id === question.correctId,
    );
    let option = question.options[correctAnswerIndex];
    question.options.splice(correctAnswerIndex, 1);
    let randomOptionNumber = Math.floor(
      Math.random() * question.options.length,
    );
    let randomOption = question.options[randomOptionNumber];
    let newOptions = [option, randomOption];
    let response = {
      queId: question.queId,
      question: question.question,
      options: newOptions,
      usedFiftyFifty: true,
      usedAskAi: finalResult.usedAskAi,
    };
    return response;
  }

  async useAskAi(data: { _id: string; queId: number }) {
    const { _id, queId } = data;
    let finalResult = await this.quizModel
      .findOneAndUpdate(
        { _id },
        {
          $set: {
            usedAskAi: true,
          },
        },
      )
      .exec();
    let question = await this.questionModel.findOne({ queId: queId }).exec();
    // find index of correct answer in options
    let response = {
      queId: question.queId,
      question: question.question,
      options: question.options,
      correctId: question.correctId,
      usedAskAi: true,
      usedFiftyFifty: finalResult.usedFiftyFifty,
    };
    return response;
  }
}

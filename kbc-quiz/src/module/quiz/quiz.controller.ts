import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { StartGameDto } from './dto/start-game.dto';
import { NextQuestionDto } from './dto/next-question.dto';
import { QuitGameDto } from './dto/quiz-game.dto';

@Controller('quiz')
@ApiTags('Quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/start')
  @ApiBody({ type: StartGameDto })
  async startQuiz(@Body() data: { name: string }) {
    return await this.quizService.startQuiz(data);
  }

  @Post('/next-question')
  @ApiBody({ type: NextQuestionDto })
  async nextQuestion(@Body() data: NextQuestionDto) {
    return await this.quizService.nextQuestion(data);
  }

  @Get('/leaderboard')
  async getLeaderBoard() {
    return await this.quizService.getLeaderBoard();
  }

  @Post('/quit-game')
  @ApiBody({ type: QuitGameDto })
  async quitGame(@Body() data: { _id: string }) {
    return await this.quizService.quitGame(data);
  }

  @Post('/use-fifty-fifty')
  async useFiftyFifty(@Body() data: { _id: string; queId: number }) {
    return await this.quizService.useFiftyFifty(data);
  }

  @Post('/use-ask-ai')
  async useAskAi(@Body() data: { _id: string; queId: number }) {
    return await this.quizService.useAskAi(data);
  }
}

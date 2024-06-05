import React from 'react'
import styled from 'styled-components'
import WrapperComponent from '../../../components/wrapper/wrapper'
import Colors from '../../../constant/colors'
import MileStone from '../../../components/milestone/milestone'
import Question from '../../../components/Question/Question'
import { USER_ID, USER_NAME } from '../../../constant/storagekeys'
import { getKeyValue } from '../../../utils/session'
import { useMutation } from '@tanstack/react-query'
import { nextQuestion, quitQuiz, useFiftyFiftyApi, useAskAIApi } from '../../../apis/quiz'
import LifeLine from '../../../components/lifeline/lifeline'

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid ${Colors.primary};
  justify-content: space-between;
  margin-left: 1em;
  margin-right: 1em;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`
const GamePageWrapper = styled.section`
  display: flex;
`
const NameMilestoneSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 10%;
  margin: 1em;
`
const PlayerName = styled.h1`
  font-size: 1.5em;
  color: ${Colors.primary};
`

const QuestionSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const Buttons = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 1em;
`

const Button = styled.button`
  background-color: ${Colors.primary};
  border: none;
  color: white;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 10%;
  color: ${Colors.accent};
`
const Message = styled.h1`
  font-size: 1.5em;
  color: ${Colors.primary};
  text-align: center;
  padding: 1em;
  align-self: center;
  width: 100%;
`

const GamePage = () => {
  const [message, setMessage] = React.useState('')
  const [name, setName] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [currentMileStone, setCurrentMileStone] = React.useState(1)
  const [currentQuestionId, setCurrentQuestionId] = React.useState(-1)
  const [currentQuestion, setCurrentQuestion] = React.useState('')
  const [currentOptions, setCurrentOptions] = React.useState<{ id: number; ans: string }[]>([])
  const [currentAnswer, setCurrentAnswer] = React.useState(-1)
  const [useFiftyFifty, setUseFiftyFifty] = React.useState(false)
  const [useAskAI, setUseAskAI] = React.useState(false)
  const [correctAnswer, setCorrectAnswer] = React.useState(-1)
  const [showHint, setShowHint] = React.useState(false)
  const [load, setLoad] = React.useState(false)

  //Mutations
  const mutationNextQuestion = useMutation({
    mutationFn: nextQuestion,
    onSuccess: (data: {
      queId: number
      question: string
      options: { id: number; ans: string }[]
      attemptedQuestion: number[]
      score: number
      message: string
      usedFiftyFifty: boolean
      usedAskAi: boolean
    }) => {
      console.log('data', data)
      if (data.question) {
        if (data.attemptedQuestion.length === 9) {
          setMessage(data.message)
        } else {
          setCurrentQuestionId(data.queId)
          setCurrentQuestion(data.question)
          setCurrentOptions(data.options)
          setCurrentAnswer(-1)
          setCurrentMileStone(data.attemptedQuestion.length + 1)
          setUseFiftyFifty(data.usedFiftyFifty)
          setUseAskAI(data.usedAskAi)
          setLoad(true)
        }
      } else if (data.message) {
        setMessage(data.message)
        setCurrentMileStone(data.attemptedQuestion.length)
        setLoad(false)
      }
      //Save Key and Navigate to GamePage
      //   window.location.href = "/gamepage";
    },
    onError: () => {
      // Handle error state
      setLoad(false)
    },
  })

  const mutationQuit = useMutation({
    mutationFn: quitQuiz,
    onSuccess: (data: {
      queId: number
      question: string
      options: { id: number; ans: string }[]
      attemptedQuestion: number[]
      score: number
      message: string
      usedFiftyFifty: boolean
      usedAskAi: boolean
    }) => {
      if (data.message) {
        setMessage(data.message)
        setCurrentMileStone(data.attemptedQuestion.length)
        if (data.attemptedQuestion.length === 9) {
          window.location.href = '/leaderboard'
        }
        setLoad(false)
      }
    },
    onError: () => {
      // Handle error state
    },
  })

  const mutationFiftyFifty = useMutation({
    mutationFn: useFiftyFiftyApi,
    onSuccess: (data: {
      queId: number
      question: string
      options: { id: number; ans: string }[]
      attemptedQuestion: number[]
      score: number
      usedFiftyFifty: boolean
      usedAskAi: boolean
    }) => {
      //remove 2 options
      setCurrentQuestionId(data.queId)
      setCurrentQuestion(data.question)
      setCurrentOptions(data.options)
      setCurrentAnswer(-1)
      setUseFiftyFifty(data.usedFiftyFifty)
      setLoad(true)
    },
    onError: () => {
      // Handle error state
    },
  })

  const mutationAskAI = useMutation({
    mutationFn: useAskAIApi,
    onSuccess: (data: {
      queId: number
      question: string
      options: { id: number; ans: string }[]
      attemptedQuestion: number[]
      score: number
      usedFiftyFifty: boolean
      usedAskAi: boolean
      correctId: number
    }) => {
      //remove 2 options
      setCurrentQuestionId(data.queId)
      setCurrentQuestion(data.question)
      setCurrentOptions(data.options)
      setUseAskAI(data.usedAskAi)
      setCorrectAnswer(data.correctId)
      setShowHint(true)
      setTimeout(() => {
        setShowHint(false)
      }, 3000)
      setLoad(true)
    },
    onError: () => {
      // Handle error state
    },
  })

  //Callbacks

  const onAnswer = (index: number) => {
    setCurrentAnswer(index)
  }
  const handleNext = () => {
    getNextQuestion()
  }

  const handleQuit = () => {
    mutationQuit.mutate({
      _id: userId,
    })
  }

  const getFirstQuestion = () => {
    let userNameValue = getKeyValue(USER_NAME)
    let userIdValue = getKeyValue(USER_ID)
    if (userNameValue && userIdValue) {
      setName(userNameValue)
      setUserId(userIdValue)
      mutationNextQuestion.mutate({
        _id: userIdValue,
        previoudQueId: -1,
        previousQueAnswer: -1,
      })
    }
  }

  const getNextQuestion = () => {
    setLoad(false)
    mutationNextQuestion.mutate({
      _id: userId,
      previoudQueId: currentQuestionId,
      previousQueAnswer: currentOptions[currentAnswer].id,
    })
  }

  const onFiftyFifty = () => {
    setLoad(false)
    setTimeout(() => {
      mutationFiftyFifty.mutate({
        _id: userId,
        queId: currentQuestionId,
      })
    }, 250)
  }

  const onAskAI = () => {
    setLoad(false)
    setTimeout(() => {
      mutationAskAI.mutate({
        _id: userId,
        queId: currentQuestionId,
      })
    }, 250)
  }
  const onLeaderboard = () => {
    window.location.href = '/leaderboard'
  }

  const restartGame = () => {
    window.location.href = '/'
  }

  //Rendering
  React.useEffect(() => {
    getFirstQuestion()
  }, [])

  return (
    <WrapperComponent>
      <Header>
        <PlayerName>{'Welcome ' + name}</PlayerName>
        {currentMileStone > 4 && <Button onClick={handleQuit}>{'Quit'}</Button>}
        {showHint && <PlayerName>Hint: {currentOptions[correctAnswer - 1].ans}</PlayerName>}
        <PlayerName onClick={onLeaderboard}>{'Leaderboard'}</PlayerName>
      </Header>

      <GamePageWrapper>
        <NameMilestoneSection>
          <MileStone currentMileStone={currentMileStone} />
          {load && (
            <LifeLine
              showFiftyFifty={!useFiftyFifty}
              showAskAI={!useAskAI}
              onFiftyFifty={onFiftyFifty}
              onAskAI={onAskAI}
            />
          )}
        </NameMilestoneSection>
        {load && (
          <QuestionSection>
            <Question
              question={currentQuestion}
              options={currentOptions}
              currentQuestion={currentMileStone}
              totalQuestions={9}
              onAnswer={onAnswer}
            />

            <Buttons>{currentAnswer != -1 && <Button onClick={handleNext}>{'Next'}</Button>}</Buttons>
          </QuestionSection>
        )}
        {!load && (
          <Column>
            <Message>{message}</Message>
            <Button onClick={restartGame}>{'Restart'}</Button>
          </Column>
        )}
      </GamePageWrapper>
    </WrapperComponent>
  )
}

export default GamePage

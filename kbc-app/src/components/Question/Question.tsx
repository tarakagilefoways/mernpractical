




import React from 'react'
import styled from 'styled-components';
import Colors from '../../constant/colors';
import Linebreak from '../linebreak/Linebreak';

const QuestionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
    border-left: 1px solid ${Colors.primary};
    `
const QuestionNumber = styled.h1`
    font-size: 1.5em;   
    color: ${Colors.primary};
    padding: 0.5em;
  `;
const QuestionText = styled.h1`
    font-size: 1.5em;
    color: ${Colors.primary};
    text-align: center;
    padding: 0.5em;
  `;

const AnswerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 300px;
`;

const Option = styled.div`
  flex: 1 1 50%; /* This makes sure each option takes 50% of the container width */
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
`;

const AnswerText = styled.h1`
    font-size: 1.5em;
    padding: 0.5em;
    color: ${Colors.primary};
  `;    

const AnserSelectedText = styled.h1`
    font-size: 1.5em;
    color: ${Colors.accent};
    padding: 0.5em;
    background-color: ${Colors.primary};
  `;

interface QuestionProps {
    question: string;
    options: {id: number, ans: string}[];
    currentQuestion: number;
    totalQuestions: number;
    onAnswer: (answerIndex: number) => void;
}


const Question = (props: QuestionProps) => {

    const [answerIndex, setAnswerIndex] = React.useState(-1);
    const handleSelectAnswer = (index: number) => {
        setAnswerIndex(index);
        props.onAnswer(index);
    }
    return (
        <QuestionWrapper>
            <QuestionNumber>{"Question: " + props.currentQuestion +"/" + props.totalQuestions}</QuestionNumber>
            <Linebreak/>
            <QuestionText>{props.question}</QuestionText>
            <Linebreak/>
            <AnswerWrapper>
            {
                props.options.map((answer, index) => {
                    return (
                        <Option key={index}>
                        {
                            index === answerIndex ? 
                            <AnserSelectedText>{answer.ans}</AnserSelectedText> : 
                            <AnswerText onClick={() => handleSelectAnswer(index)} >{answer.ans}</AnswerText>
                        }
                        </Option>
                    )
                })
                
            }   
            </AnswerWrapper>
        </QuestionWrapper>
    )
}

export default Question
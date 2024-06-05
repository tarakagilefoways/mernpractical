import React from 'react'
import styled from 'styled-components'
import Colors from '../../../constant/colors'
import WrapperComponent from '../../../components/wrapper/wrapper'
import { useMutation } from '@tanstack/react-query'
import { startGameApi } from '../../../apis/quiz'
import { queryClient } from '../../../App'
import { getKeyValue, saveKeyValue } from '../../../utils/session'
import { USER_ID, USER_NAME } from '../../../constant/storagekeys'

const GameRulesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3em;
`

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${Colors.primary};
`

const Rule = styled.p`
  font-size: 1.5em;
  color: ${Colors.primary};
`

const RuleText = styled.div`
  font-size: 1.25em;
  color: ${Colors.primary};
  margin-top: 1em;
`
const SubRuleText = styled.div`
  font-size: 1.25em;
  color: ${Colors.primary};
  margin-top: 1em;
  margin-left: 2em;
`
const InputViewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  justify-content: center;
`
const Input = styled.input`
  padding: 0.5em;
  color: ${Colors.textInput};
  width: 20%; // Adjust width based on preference
  font-size: 1em;
  margin-top: 2em; // Add some spacing after the title
  text-align: center; // Center text input content
`

const Next = styled.button`
  background-color: ${Colors.accent};
  border: none;
  color: white;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  margin-top: 2em;
  cursor: pointer;
  width: 20%;
`
const Welcome = () => {
  const [name, setName] = React.useState('') // State variable for user's name

  const mutation = useMutation({
    mutationFn: startGameApi,
    onSuccess: (data: { name: string; _id: string }) => {
      //Save Key and Navigate to GamePage
      saveKeyValue(USER_ID, data._id)
      saveKeyValue(USER_NAME, data.name)
      window.location.href = '/gamepage'
    },
    onError: () => {
      // Handle error state
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = () => {
    //navigate to game page
    if (name) {
      mutation.mutate({ name: name })
    } else {
      alert('Please enter your name')
    }
  }

  return (
    <WrapperComponent>
      <GameRulesWrapper>
        <Title>{'Welcome to Kaun Banega Crorepati!'}</Title>
        <Rule>{'Game Rules'}</Rule>
        <RuleText>{'1. Quiz has 9 levels, from 1...10 Crore.'}</RuleText>
        <RuleText>{'2. To move on next level, you need to answer correctly previous question.'}</RuleText>
        <RuleText>{'3. Each question has 4 options.'}</RuleText>
        <RuleText>{'4. You can choose only one option.'}</RuleText>
        <RuleText>{'5. You can not go back to previous question.'}</RuleText>
        <RuleText>{'6. You can not skip any level.'}</RuleText>
        <RuleText>{'7. There are two milestone prize money levels: 1000 and 1000000 (10 lacs).'}</RuleText>
        <RuleText>{'8. You can quit until crossing first milestone.'}</RuleText>
        <RuleText>{'9. Rules for Final prize money:'}</RuleText>
        <SubRuleText>
          {'a. If a player loses before winning level 4 (Rs 1000), he/she loses all prize money and wins Rs 0.'}
        </SubRuleText>
        <SubRuleText>
          {
            'b. If a player loses (i.e. answers a question incorrectly), he only wins the prize money of the last milestone he cleared.'
          }
        </SubRuleText>
        <SubRuleText>{'c. If a player quits, he wins the prize money of the current level he cleared.'}</SubRuleText>
        <RuleText>{'10. Lifelines:'}</RuleText>
        <SubRuleText>{'a. 50-50: Two incorrect options get eliminated.'}</SubRuleText>
        <SubRuleText>
          {
            'b. AskTheAI: The player is provided with the correct answer as a hint. The player can choose to answer as per the hint or choose different answer.'
          }
        </SubRuleText>
        <SubRuleText>{'c. The player can avail a lifeline only once per game.'}</SubRuleText>
        <InputViewWrapper>
          <Input
            type="text" // Specify input type for clarity
            placeholder="Enter your name"
            value={name} // Bind state variable to input value
            onChange={handleInputChange}
            onKeyDown={e => {
              e.key === 'Enter' && handleSubmit()
            }}
          />
          <Next onClick={handleSubmit}>{'Start'}</Next>
        </InputViewWrapper>
      </GameRulesWrapper>
    </WrapperComponent>
  )
}
export default Welcome

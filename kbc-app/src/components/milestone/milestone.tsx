import React from 'react'
import styled from 'styled-components'
import Colors from '../../constant/colors'

export const mileStones = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]

interface MileStoneProps {
  currentMileStone: number
}

const MileStoneHeader = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  color: ${Colors.primary};
  margin-bottom: 1em;
`

const MileStoneActiveText = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  color: ${Colors.accent};
  margin: 0.5em 0em;
`
const MileStoneInactiveText = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  color: ${Colors.primary};
  opacity: 0.5;
  margin: 0.5em 0em;
`
const LineBreak = styled.section`
  display: flex;
  background-color: ${Colors.primary};
  width: 100%;
  height: 1px;
`
const MileStone = (props: MileStoneProps) => {
  console.log('milestone', props.currentMileStone)
  return (
    <div>
      <MileStoneHeader>{'Milestones'}</MileStoneHeader>
      <LineBreak />
      {mileStones.map((milestone, index) => {
        if (index + 1 < props.currentMileStone) {
          return (
            <>
              <MileStoneActiveText key={index}>{milestone}</MileStoneActiveText>
              <LineBreak />
            </>
          )
        } else {
          return (
            <>
              <MileStoneInactiveText key={index}>{milestone}</MileStoneInactiveText>
              <LineBreak />
            </>
          )
        }
      })}
    </div>
  )
}
export default MileStone

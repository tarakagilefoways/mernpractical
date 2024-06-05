import React from 'react'
import { styled } from 'styled-components';
import WrapperComponent from '../../../components/wrapper/wrapper';
import Colors from '../../../constant/colors';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../../../apis/quiz';
import moment from 'moment-timezone';
import { mileStones } from '../../../components/milestone/milestone';

const LabelView = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    text-align: center;
    border-bottom: 1px solid ${Colors.primary};

`
const LabelName = styled.h1`
    font-size: 1.5em;   
    color: ${Colors.primary};
    padding: 0.5em;
    width:20%
  `
const LabelScore = styled.h1`
    font-size: 1.5em;
    color: ${Colors.primary};
    padding: 0.5em;
    width:80%
  `
const Leaderboard = () => {


    const queryLeaderboard = useQuery({
        queryKey: ["leaderboard"],
        queryFn:getLeaderboard,
        
    })

    React.useEffect(() => {
        queryLeaderboard.refetch()
    },[])
    console.log(queryLeaderboard.data)
    return (
        <WrapperComponent>
            <LabelView>
                <LabelName>{"Name"}</LabelName>
                <LabelName>{"Score Amount"}</LabelName>
                <LabelName>{"Status"}</LabelName>
                <LabelName>{"Start Time"}</LabelName>
                <LabelName>{"End Time"}</LabelName>
            </LabelView>
            {
                queryLeaderboard.data?.map((user:any) => {
                    return (
                        <LabelView key={user.id}>
                            <LabelName>{user.name}</LabelName>
                            <LabelName> {mileStones[user.score-1]}</LabelName>
                            <LabelName>{user.status}</LabelName>
                            <LabelName>{moment(user.startTime).format("YYYY-MM-DD HH:mm:ss")}</LabelName>
                            <LabelName>{moment(user.endTime).format("YYYY-MM-DD HH:mm:ss")}</LabelName>
                            
                        </LabelView>
                    )
                })
            }
        </WrapperComponent>
    )
}

export default Leaderboard
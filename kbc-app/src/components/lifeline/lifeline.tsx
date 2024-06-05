import React from "react";
import styled from "styled-components";
import Colors from "../../constant/colors";


interface LifeLineProps {
    showFiftyFifty: boolean
    showAskAI: boolean
    onFiftyFifty: () => void
    onAskAI: () => void
}

const FiftyFifty = styled.button`
    background-color: ${Colors.primary};
    border: none;
    color: white;
    padding: 8px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    color: ${Colors.accent};
    margin: 1em 0em;
`
const LifeLine = ( props: LifeLineProps) => {

    const { showFiftyFifty, showAskAI, onFiftyFifty, onAskAI } = props

    return (
        <>
        { showFiftyFifty && 
        <FiftyFifty onClick={onFiftyFifty}>
            {"50-50"}
        </FiftyFifty>
        }
        {   showAskAI && 
            <FiftyFifty onClick={onAskAI}>
            {"AskAI"}
             </FiftyFifty>
        }
        </>
    )
}

export default LifeLine
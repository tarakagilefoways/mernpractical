

import React from 'react'
import styled from 'styled-components'
import Colors from '../../constant/colors'

const Line = styled.section`
    display: flex;
    background-color: ${Colors.primary};
    width: 100%;
    height:1px
    `
export default function Linebreak() {
  return (
    <Line/>
  )
}

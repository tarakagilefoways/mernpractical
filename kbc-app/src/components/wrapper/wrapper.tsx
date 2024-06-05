import React from "react"
import styled from 'styled-components';
import Colors from "../../constant/colors";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${Colors.secondary};
  padding-top: 1em ;
`;

const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

export default WrapperComponent
import React from 'react'
import styled from 'styled-components'
import { Button, withTheme } from 'react-native-paper'
import { Text } from 'react-native'
import {WhiteText} from '../styles/global';

const ChooseEnteringOption = ({ setEnteringMethod, comps, theme }: any) => {

  const funcOnPressHandler = (setComp: any) => {
    setEnteringMethod(setComp)
  }

  return (
    <>
      <ButtonStyled style={{ color: 'white' }} contentStyle={{ height: theme.btnHeight.large }} mode='contained' onPress={() => funcOnPressHandler(comps.signin)}>
          <WhiteText>Login</WhiteText>
      </ButtonStyled>
      <ButtonStyled contentStyle={{ height: theme.btnHeight.large }} mode='contained' onPress={() => funcOnPressHandler(comps.signup)}>
        <WhiteText>New account</WhiteText>
      </ButtonStyled>
    </>
  )
}

const ButtonStyled = styled<any>(Button)`
  /* height: ${props => props}; */
  margin-vertical: 10;
  color: white;
`;


export default withTheme(ChooseEnteringOption)

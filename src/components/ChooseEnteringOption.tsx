import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components'
import { Button, withTheme } from 'react-native-paper'

const ChooseEnteringOption = ({ setEnteringMethod, comps, theme }: any) => {

  const funcOnPressHandler = (setComp: any) => {
    setEnteringMethod(setComp)
  }
  
  return (
    <>
      <ButtonStyled contentStyle={{ height: theme.btnHeight.large }} mode='contained' onPress={() => funcOnPressHandler(comps.signin)}>
        Login
      </ButtonStyled>
      <ButtonStyled contentStyle={{ height: theme.btnHeight.large }} mode='contained' onPress={() => funcOnPressHandler(comps.signup)}>
        New account
      </ButtonStyled>
    </>
  )
}

const ButtonStyled = styled(Button)`
  /* height: ${props => props}; */
  margin-vertical: 10;
`;

export default withTheme(ChooseEnteringOption)

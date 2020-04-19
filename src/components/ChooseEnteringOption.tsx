import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components'
import { Button } from 'react-native-paper'

const ChooseEnteringOption = ({ setCompToRender, comps }: any) => {

  const funcOnPressHandler = (setComp: any) => {
    setCompToRender(setComp)
  }
  return (
    <Container>
      <ButtonStyled contentStyle={styles.btnContentStyle} mode='contained' onPress={() => funcOnPressHandler(comps.signin)}>
        Login
      </ButtonStyled>
      <ButtonStyled contentStyle={styles.btnContentStyle} mode='contained' onPress={() => funcOnPressHandler(comps.signup)}>
        New account
      </ButtonStyled>
    </Container>
  )
}

const Container = styled.View`
  top: 85;
`;
const ButtonStyled = styled(Button)`
  margin-vertical: 7;
  justify-content: center;
`;
const styles = StyleSheet.create({
  btnContentStyle: {
    height: 50
  }
})

export default ChooseEnteringOption

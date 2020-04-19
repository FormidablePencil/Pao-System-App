import React, { useState } from 'react'
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native'
import styled from 'styled-components'
import { Button, DefaultTheme } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { comps } from '../constants/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import DynamicFormFields from './dynamic-form-fields/DynamicFormFields'
import { useSelector, useDispatch } from 'react-redux';
import { RESET_NOTIFY_MESG } from '../actions/types';

interface propTypes {
  compToRender: number
  setCompToRender: any
  initialInputFields: {
    [index: number]: {
      input: string | undefined
      name: string | number
    },
  },
  getInputedDataEnabled: boolean
  setGetInputedDataEnabled: any
  getValuesOfInputFields: (output: []) => any
  containerProps?: {
    signin: boolean
  }
}
const InputFieldsComp = ({
  compToRender, setCompToRender,
  getInputedDataEnabled,setGetInputedDataEnabled,
  initialInputFields,
  getValuesOfInputFields,
  containerProps
}: propTypes) => {
  const { loading, signin, notifyMesg } = useSelector((state: any) => state.systemMessages)
  const dispatch = useDispatch()

  const onPressHandlerEnter = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGetInputedDataEnabled(true)
    dispatch({ type: RESET_NOTIFY_MESG })
    // LayoutAnimation
  }

  const onPressHandlerBack = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCompToRender(comps.enterOptions)
    dispatch({ type: RESET_NOTIFY_MESG })
  }

  return (
    <Container {...containerProps}>
      <Animatable.Text animation={notifyMesg && 'bounce'} duration={1000} style={styles.errorMessage}>{notifyMesg}</Animatable.Text>
      <DynamicFormFields
        error={notifyMesg}
        getInputDataEnabled={getInputedDataEnabled}
        getDataFunc={(output: any) => getValuesOfInputFields(output)}
        initialInputFields={initialInputFields}
      />
      <BottomSection>
        <StyledButtonLeft
          icon={'keyboard-backspace'}
          mode="contained"
          onPress={() => onPressHandlerBack()}
        >
          Back
      </StyledButtonLeft>
        <StyledButtonRight
          mode="contained"
          onPress={() => onPressHandlerEnter()}
          loading={loading}
        >
          {comps[compToRender]}
        </StyledButtonRight>
      </BottomSection>
    </Container >
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 15,
    color: 'white',
    top: -25,
    width: '100%',
    textAlign: 'center',
    position: 'absolute'

  }
})

const StyledButtonLeft = styled(Button)`
  flex: 1; 
  margin-right: 5;
`
const StyledButtonRight = styled(Button)`
  flex: 1;
  margin-left: 5;
`

const BottomSection = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10;
`;

const Container = styled.View`
  justify-content: flex-start;
  width: 350;
  height: 100%;
  top: ${(props: any) => props.signin ? 50 : 0};
`;
const ContainerSignUp = styled(Container)`
`

export default InputFieldsComp

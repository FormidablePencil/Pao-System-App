import React, { useState } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, Keyboard } from 'react-native'
import styled from 'styled-components'
import { Button, DefaultTheme, TextInput } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { comps } from '../constants/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import DynamicFormFields from '../../components/dynamic-form-fields/DynamicFormFields'
import { useSelector, useDispatch } from 'react-redux';
import { RESET_NOTIFY_MESG } from '../actions/types';
import { withTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming';
import { inputErrMessages } from '../constants/constants'
import { signIn, signUp } from '../actions/authActions';
import useUserAuthentication, { ErrMsg } from '../hooks/useUserAuthentication';

interface propertyTypes {
  enteringMethod: number
  setEnteringMethod: any
  theme: PaoThemeType
}
export type DefaultInputedValuesTypes = { email: string, username: string, password: string }

const InputFieldsComp = ({
  enteringMethod,
  setEnteringMethod,
  theme,
}: propertyTypes) => {
  const { loading } = useSelector((state: any) => state.systemMessages)
  const { validateInputs } = useUserAuthentication()

  const defaultInputedValues = { email: '', username: '', password: '' }
  const [inputedValues, setInputedValues] = useState<DefaultInputedValuesTypes>(defaultInputedValues)
  const [errorMsg, setErrorMsg] = useState<ErrMsg>(ErrMsg.no_err)

  enum onPress {
    goBack,
    enter
  }

  const onPressHandler = async (action: onPress) => {
    await Keyboard.dismiss()
    switch (action) {
      case onPress.goBack:
        setEnteringMethod(comps.enterOptions)
        break;
      case onPress.enter:
        validate_user()

        break;

      default:
        break;
    }
  }

  const validate_user = async () => {
    const response = await validateInputs(inputedValues, enteringMethod)
    switch (response) {
      case ErrMsg.empty_all:
      case ErrMsg.empty_email:
      case ErrMsg.empty_password:
      case ErrMsg.empty_username:
      case ErrMsg.no_err:
        setErrorMsg(response)
        break;

      case 'something from dispatch':
        break;

      default:
        break;
    }
  }


  const onChangeHandler = async (text, whatInput) => {
    await setInputedValues({ ...inputedValues, [whatInput]: text })
  }


  return (
    <View>
      <Animatable.Text animation={errorMsg && 'bounce'} duration={1000} style={styles.errorMessage}>{errorMsg}</Animatable.Text>

      <StyledTextInput
        multiline={false}
        underlineColor={theme.colors.primary}
        mode={'flat'}
        label={'username'}
        value={inputedValues.username}
        onChangeText={(text: any) => onChangeHandler(text, 'username')}
        keyboardType={'default'}
        error={errorMsg !== ErrMsg.no_err && inputedValues.username === '' ? true : false}
      />
      <StyledTextInput
        multiline={false}
        underlineColor={theme.colors.primary}
        mode={'flat'}
        label={'password'}
        value={inputedValues.password}
        secureTextEntry={true}
        onChangeText={(text: any) => onChangeHandler(text, 'password')}
        keyboardType={'default'}
        error={errorMsg !== ErrMsg.no_err && inputedValues.username === '' ? true : false}
      />
      {enteringMethod === comps.signup ?
        <StyledTextInput
          multiline={false}
          underlineColor={theme.colors.primary}
          mode={'flat'}
          label={'email'}
          value={inputedValues.email}
          secureTextEntry={true}
          onChangeText={(text: any) => onChangeHandler(text, 'email')}
          keyboardType={'email-address'}
          error={errorMsg !== ErrMsg.no_err && inputedValues.email === '' ? true : false}
        />
        : null
      }
      <BottomSection>
        <StyledButton
          contentStyle={{ height: theme.btnHeight.large }}
          icon={'keyboard-backspace'}
          mode="contained"
          onPress={() => onPressHandler(onPress.goBack)}
        >
          Back
      </StyledButton>
        <StyledButton
          contentStyle={{ height: theme.btnHeight.large }}
          mode="contained"
          onPress={() => onPressHandler(onPress.enter)}
          loading={loading}
        >
          {comps[enteringMethod]}
        </StyledButton>
      </BottomSection>
    </View>
  )
}

const StyledTextInput = styled(TextInput)`
  background-color: #fff; border-radius: 15; margin: 10px 0px; overflow: hidden; 
`;

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

const StyledButton = styled(Button)`
  margin-right: 5; flex: 1; 
`

const BottomSection = styled.View`
  margin-top: 10; flex-direction: row; justify-content: space-around;
`;


export default withTheme(InputFieldsComp)

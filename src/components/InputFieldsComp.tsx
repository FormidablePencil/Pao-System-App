import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, Keyboard } from 'react-native'
import styled from 'styled-components'
import { Button, DefaultTheme, TextInput } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { comps, tabScreens } from '../constants/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import DynamicFormFields from '../../components/dynamic-form-fields/DynamicFormFields'
import { useSelector, useDispatch } from 'react-redux';
import { RESET_NOTIFY_MESG } from '../actions/types';
import { withTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming';
import { inputErrMessages } from '../constants/constants'
import { signIn, signUp } from '../actions/authActions';
import useUserAuthentication, { form_res_msg } from '../hooks/useUserAuthentication';
import { useNavigation } from '@react-navigation/native';

interface propertyTypes {
  enteringMethod: number
  setEnteringMethod: any
  theme: PaoThemeType
}
export type DefaultInputedValuesTypes = { email: string, username: string, password: string }
export enum LoadingTypes { notLoading = 'not loading', loading = 'loading', success = 'successful', }

const InputFieldsComp = ({
  enteringMethod,
  setEnteringMethod,
  theme,
}: propertyTypes) => {
  const { validate_inputs } = useUserAuthentication()
  const [loading, setLoading] = useState<LoadingTypes>(LoadingTypes.notLoading)
  const defaultInputedValues = { email: '', username: '', password: '' }
  const [inputedValues, setInputedValues] = useState<DefaultInputedValuesTypes>(defaultInputedValues)
  const [errorMsg, setErrorMsg] = useState<form_res_msg>(form_res_msg.no_err)
  let error_text_anim = useRef(null)
  const navigation = useNavigation()

  enum onPress {
    goBack,
    enter
  }

  const onPressHandler = async (action: onPress) => {
    switch (action) {
      case onPress.goBack:
        setEnteringMethod(comps.enterOptions)
        await Keyboard.dismiss()
        break
      case onPress.enter:
        if (errorMsg === form_res_msg.invalid_credentials) {
          error_text_anim.current.bounce()
          return
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLoading(LoadingTypes.loading)
        await validate_user()
        break

      default:
        break
    }
  }

  const validate_user = async () => {
    const response = await validate_inputs(inputedValues, enteringMethod)
    if (response === form_res_msg.signed_in || response === form_res_msg.signed_up) {
      await Keyboard.dismiss()
      setLoading(LoadingTypes.success)
      setTimeout(async () => {
        await navigation.navigate('TabNavigator')
        setLoading(LoadingTypes.notLoading)
      }, 1250);
    } else {
      setErrorMsg(response)
    }
  }


  const onChangeHandler = async (text, whatInput) => {
    setErrorMsg(form_res_msg.no_err)
    await setInputedValues({ ...inputedValues, [whatInput]: text })
  }


  return (
    <View>
      <Animatable.Text ref={error_text_anim} animation={errorMsg !== form_res_msg.no_err && 'bounce'} duration={1000} style={styles.errorMessage}>{errorMsg !== form_res_msg.no_err && errorMsg}</Animatable.Text>

      <StyledTextInput
        multiline={false}
        underlineColor={theme.colors.primary}
        mode={'flat'}
        label={'username'}
        value={inputedValues.username}
        onChangeText={(text: any) => onChangeHandler(text, 'username')}
        keyboardType={'default'}
        error={errorMsg !== form_res_msg.no_err && inputedValues.username === '' ? true : false}
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
        error={errorMsg !== form_res_msg.no_err && inputedValues.password === '' ? true : false}
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
          error={errorMsg !== form_res_msg.no_err && inputedValues.email === '' ? true : false}
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
          loading={loading === LoadingTypes.loading ? true : false}
          icon={loading === LoadingTypes.success && 'check'}
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

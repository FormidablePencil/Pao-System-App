import React, { useEffect, useState } from 'react'
import ChooseEnteringOption from './ChooseEnteringOption'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Text, KeyboardAvoidingView } from 'react-native'
import { signUp, signIn } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'
import InputFieldsComp from './InputFieldsComp';
import { comps } from '../constants/constants';
import { INVALID_CREDENTIALS_NOTIFY_MESG, INPUT_FIELDS_EMPTY_NOTIFY_MESG } from '../actions/types';

const RenderEnterComps = ({ navigation }: any) => {
  const [enteringMethod, setEnteringMethod] = useState(comps.enterOptions)
  const { authenticated } = useHandleSystemMesgAuth()
  
  useEffect(() => {
    // if (authenticated === true) navigation.navigate('TabNavigator', { screen: 'Paotable' })
    // if (authenticated === false) dispatch({ type: INVALID_CREDENTIALS_NOTIFY_MESG })
  }, [authenticated])


  if (enteringMethod === comps.signin || enteringMethod === comps.signup) {
    return (
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={85}>
        <InputFieldsComp enteringMethod={enteringMethod} setEnteringMethod={setEnteringMethod} />
      </KeyboardAvoidingView>
    )
  } else {
    return (
      <ChooseEnteringOption
        enteringMethod={enteringMethod}
        setEnteringMethod={setEnteringMethod}
        comps={comps}
      />
    )
  }
}

export default RenderEnterComps

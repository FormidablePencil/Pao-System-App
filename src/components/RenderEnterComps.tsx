import React, { useState } from 'react'
import ChooseEnteringOption from './ChooseEnteringOption'
import { KeyboardAvoidingView } from 'react-native'
import InputFieldsComp from './InputFieldsComp';
import { comps } from '../constants/constants';

const RenderEnterComps = () => {
  const [enteringMethod, setEnteringMethod] = useState(comps.enterOptions)

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

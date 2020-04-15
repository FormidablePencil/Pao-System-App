import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import ChooseEnteringOption from './ChooseEnteringOption'
import EnteringOptionComp from './DynamicFormFields'
import Btn from './reusableComps/Btn'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import FormComp from './FormComp'

const RenderEnterComps = () => {
  enum comps { enterOptions, signup, signin } //index starts from 0 'enum.signup' should be '1'
  const [compToRender, setCompToRender] = useState(comps.enterOptions)

  //here I can use enum to choose what comp

  if (compToRender === comps.signup) {
    return (
      <FormComp onClickBtns={{compToRender, setCompToRender}} comps={{comps}} />
      )
    } else if (compToRender === comps.signin) {
      return (
        <FormComp onClickBtns={{compToRender, setCompToRender}} comps={{comps}} />
    )
  } else {
    return (
      <ChooseEnteringOption
        compToRender={compToRender}
        setCompToRender={setCompToRender}
        comps={comps}
      />
    )
  }
}

export default RenderEnterComps

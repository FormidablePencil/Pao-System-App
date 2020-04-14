import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { EnterMethodContext } from '../screens/EnterScreen'
import ChooseEnteringOption from './ChooseEnteringOption'

const RenderEnterComps = () => {
  const { compToRender, comps } = useContext(EnterMethodContext)
  //here I can use enum to choose what comp

  if (compToRender === comps.signup) {
    return (
      <View>
        <Text>
        //import reusable TextInput component
        </Text>
      </View>
    )
  } else if (compToRender === comps.signin) {
    return (
      <View>
        <Text>
        //import reusable TextInput component
        </Text>
      </View>
    )
  } else {
    return (
      <ChooseEnteringOption />
    )
  }
}

export default RenderEnterComps

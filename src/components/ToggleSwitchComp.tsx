import React, { useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/global'
import Icon2 from "react-native-vector-icons/FontAwesome5"

const ToggleSwitchComp = () => {
  const [switchToggle, setSwitchToggle] = useState(false)

  function onPressHandlerToggle() {
    setSwitchToggle(!switchToggle)
  }
  return (
    <TouchableOpacity onPress={() => onPressHandlerToggle()} style={{ ...globalStyles.tiger }}>
      {switchToggle ?
        <Icon2 name='toggle-on' size={35} />
        :
        <Icon2 name='toggle-off' size={35} />
      }
    </TouchableOpacity>
  )
}
export default ToggleSwitchComp
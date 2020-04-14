import React from 'react'
import { View, Text } from 'react-native-tailwind'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyledText } from '../styles/global'

const AccountSettings = () => {
  return (
    <View>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <StyledText>UserAleksandrov</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <StyledText>td</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <StyledText>td</StyledText>
      </TouchableOpacity>

    </View>
  )
}

export default AccountSettings

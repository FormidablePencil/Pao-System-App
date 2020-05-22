import React from 'react'
import { View, Text } from 'react-native-tailwind'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyledText } from '../styles/global'
import { useSelector } from 'react-redux'

const AccountSettings = () => {
  const { username } = useSelector(state => state.auth)
  return (
    <View>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <StyledText>{username ?? 'guest'}</StyledText> 
        {/* make option to change username */}
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

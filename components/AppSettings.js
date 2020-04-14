import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import img from './../assets/gear-option.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyledText } from '../styles/global'

const AppSettings = () => {
  return (
    <View className="w-4/5 flex flex-row justify-around items-center">
      <Image source={img} style={{ height: 125, width: 125 }} />
      <View>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <StyledText style={{ color: 'white' }}>Change wallpaper</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <StyledText style={{ color: 'white' }}>Sound effect volumn nob</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <StyledText style={{ color: 'white' }}>Themes</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <StyledText style={{ color: 'white' }}>Darkmode</StyledText>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default AppSettings

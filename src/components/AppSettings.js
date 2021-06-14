import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import img from './../assets/gear-option.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { reusableStyles } from '../styles/global'

const AppSettings = () => {
  return (
    <View className="w-4/5 flex flex-row justify-around items-center">
      <Image source={img} style={{ height: 125, width: 125 }} />
      <View>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white', reusableStyles.styledText }}>Change wallpaper</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white', reusableStyles.styledText }}>Sound effect volumn nob</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white', reusableStyles.styledText }}>Themes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white', reusableStyles.styledText }}>Darkmode</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default AppSettings

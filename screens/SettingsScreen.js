import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import { Image } from 'react-native'
import { StyledText } from '../styles/global'

import { TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundSvg from '../components/BackgroundSvg';
import AccountSettings from '../components/AccountSettings'
import profileImg from '../assets/mycat.jpg'
import AppSettings from '../components/AppSettings'
import AppInfo from '../components/AppInfo'

//~ I have to learn svg to get that border slanted effect on settings screen


const SettingsScreen = () => {
  return (
    <View className="relative flex justify-around items-center h-full bg-blue-lightest">

      <BackgroundSvg />
      <View className="w-4/5 flex flex-row justify-around items-center">
        <AccountSettings />

        <Image source={profileImg} style={{ height: 200, width: 200, borderRadius: 100, }} />
      </View>
      <AppSettings />
      <View className="w-4/5 flex flex-row justify-around items-center">
        <AppInfo />
        <Image source={require('./../assets/playing-cards-png-11-original.png')} style={{ height: 125, width: 125 }} />
      </View>

    </View>

  )
}

// Constants.statusBarHeight


export default SettingsScreen

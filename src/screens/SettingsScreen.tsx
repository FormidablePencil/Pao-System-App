import React, { useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Animated, Slider } from 'react-native'
import BackgroundSvg from '../components/BackgroundSvg';
import AccountSettings from '../components/AccountSettings'
import profileImg from '../assets/mycat.jpg'
import AppSettings from '../components/AppSettings'
import AppInfo from '../components/AppInfo'
import { IconButton } from 'react-native-paper'

//~ I have to learn svg to get that border slanted effect on settings screen

const ProfileScreen = ({ navigation }) => {

  return (
    <>
      <View className="relative flex justify-around items-center h-full bg-blue-lightest">
        <BackgroundSvg />
        <View className="w-4/5 flex flex-row justify-around items-center">
          <AccountSettings />
          <Image source={profileImg} style={{ height: 200, width: 200, borderRadius: 100, }} />
        </View>
        {/* <AppSettings /> */}
        <View className="w-4/5 flex flex-row justify-around items-center">
          <AppInfo navigation={navigation} />
          <Image source={require('./../assets/playing-cards-png-11-original.png')} style={{ height: 125, width: 125 }} />
        </View>

      </View>
    </>
  )
}

// Constants.statusBarHeight


export default ProfileScreen

import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Animated, Slider } from 'react-native'
import BackgroundSvg from '../components/BackgroundSvg';
// import AccountSettings from '../components/AccountSettings'
import profileImg from '../assets/mycat.jpg'
import AppSettings from '../components/AppSettings'
import AppInfo from '../components/AppInfo'
import { IconButton, Appbar } from 'react-native-paper'
import { TabNavContext } from '../routes/StackNavigator';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../hooks/usePrimaryControlledColor';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledText } from '../styles/global';
import { useSelector } from 'react-redux';

//~ I have to learn svg to get that border slanted effect on settings screen

const ProfileScreen = ({ navigation }) => {
  const { controlledThemeColor } = useSelector((state: any) => state)
  const { username } = useSelector((state: any) => state.auth)

  return (
    <>
      <Appbar.Header statusBarHeight={0}
        style={{ backgroundColor: usePrimaryControlledColor(WhereToColor.profileHeader) }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View className="relative flex justify-around items-center h-full" style={{ backgroundColor: usePrimaryControlledColor(WhereToColor.profileTopHalf) }}>
        <BackgroundSvg />
        <View>
          <Image source={require('./../assets/playing-cards-png-11-original.png')} style={{ height: 125, width: 125 }} />
          <TouchableOpacity style={{ marginVertical: 5 }}>
            <StyledText style={textControlledColor(controlledThemeColor)}>{username ?? 'guest'}</StyledText>
          </TouchableOpacity>
        </View>
        <AppInfo navigation={navigation} />
        {/* <AppSettings /> */}

      </View>
    </>
  )
}

// Constants.statusBarHeight


export default ProfileScreen

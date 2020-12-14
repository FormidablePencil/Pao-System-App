import React from 'react'
import { View } from 'react-native-tailwind'
import { Image } from 'react-native'
import BackgroundSvg from '../components/BackgroundSvg';
import AppInfo from '../components/AppInfo'
import { Appbar } from 'react-native-paper'
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../hooks/usePrimaryControlledColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledText } from '../styles/global';
import { useSelector } from 'react-redux';
import { RootReducerT } from '../store';

const ProfileScreen = ({ navigation }) => {
  const username = useSelector((state: RootReducerT) => state.auth.username)

  return (
    <>
      <Appbar.Header
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
            <StyledText style={textControlledColor()}>{username ?? 'guest'}</StyledText>
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

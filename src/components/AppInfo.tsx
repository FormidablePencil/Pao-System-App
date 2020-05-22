import React, { useEffect, useState } from 'react'
import { Button, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'
import { LayoutAnimation, Animated, Slider, View, Text } from 'react-native'
import styled from 'styled-components'
import { PaoThemeType } from '../styles/theming'
import { white } from 'react-native-paper/lib/typescript/src/styles/colors'

const AppInfo = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const theme: PaoThemeType = useTheme()
  const { refreshToken } = useSelector((state: any) => state.auth)
  const loading = useSelector((state: any) => state.systemMessages.loading)
  const { userSignedOut } = useHandleSystemMesgAuth()
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [fontSize, setFontSize] = useState<number>() //to theme provider

  useEffect(() => {
    if (userSignedOut === true || userSignedOut === false) {
      setLoadingComplete(true)
      setTimeout(() => {
        navigation.navigate('WelcomeScreen')
      }, 1150);
    }
  }, [userSignedOut])

  const handleOnPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(signOut({ refreshToken }))
  }
  return (
    <Container>
      <Animated.Text style={{ fontSize: fontSize, color: 'white' }}>Font Size</Animated.Text>
      <Slider
        // value={10}
        onValueChange={(value) => { setFontSize(value) }}
        style={{ width: 200, height: 40 }}
        minimumValue={15}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor={theme.colors.accent}
      />
      <Button
        loading={loading}
        mode='contained'
        icon={loadingComplete && 'check'}
        onPress={() => handleOnPress()}
        style={{margin: 10}}
      >
        <Text style={{color: 'white'}}>Logout</Text>
      </Button>
    </Container>
  )
}

const Container = styled(View)`
  
`;

export default AppInfo

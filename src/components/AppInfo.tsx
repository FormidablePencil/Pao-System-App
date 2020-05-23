import React, { useEffect, useState, useContext } from 'react'
import { Button, useTheme, Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'
import { LayoutAnimation, Animated, Slider, View, Text } from 'react-native'
import styled from 'styled-components'
import { PaoThemeType } from '../styles/theming'
import { ControlledThemeContext } from '../routes/StackNavigator'
import { textControlledColor } from '../hooks/usePrimaryControlledColor';


const AppInfo = ({ navigation }: any) => {
  const { controlledThemeColor, setControlledThemeColor } = useContext(ControlledThemeContext)
  const dispatch = useDispatch()
  const theme: PaoThemeType = useTheme()
  const { refreshToken } = useSelector((state: any) => state.auth)
  const loading = useSelector((state: any) => state.systemMessages.loading)
  const { userSignedOut } = useHandleSystemMesgAuth()
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [themeControllerValue, setThemeControllerValue] = useState(controlledThemeColor)

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

  const sliderOnValueChangeHandler = (value) => setControlledThemeColor(value)
  // console.log(controlledThemeColor);
  const sliderOnResponderEndHandler = () => setThemeControllerValue(controlledThemeColor => !controlledThemeColor)
  const switchOnValueChangeHander = () => {
    setControlledThemeColor(prev => prev === null ? 155 : null)
  }

  return (
    <Container>
      {/* //~ this will control the darkness of the app. Only applicable to plain mode */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Animated.Text style={textControlledColor(controlledThemeColor)}>Control theme opacity</Animated.Text>
        <Switch
          value={controlledThemeColor ? true : false}
          onValueChange={() => switchOnValueChangeHander()}
        />
      </View>
      <Slider
        value={themeControllerValue}
        // disabled={true}
        onValueChange={(value) => { sliderOnValueChangeHandler(value) }}
        style={{ width: 200, height: 40 }}
        minimumValue={.05}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor={theme.colors.accent}
        onResponderEnd={() => sliderOnResponderEndHandler()}
      />
      <Button
        loading={loading}
        mode='contained'
        icon={loadingComplete && 'check'}
        onPress={() => handleOnPress()}
        style={{ marginTop: 30 }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </Button>
    </Container>
  )
}

const Container = styled(View)`
  bottom: 40
`;

export default AppInfo

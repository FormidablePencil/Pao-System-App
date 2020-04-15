import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import { View, Text } from 'react-native-tailwind'
import EnterOptions from '../components/ChooseEnteringOption'
import RenderEnterComps from '../components/RenderEnterComps'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Image, Keyboard, KeyboardAvoidingView, LayoutAnimation, Animated } from 'react-native'
import paoLogo from '../assets/playing-cards-png-11-original.png'
import * as Animatable from 'react-native-animatable';
import useLogoAnimation from '../components/useLogoAnimation'

//@ what we'll need: 
//@ 1. reusable inputs component
//@ 2. redux actions to hook up to backend endpoints
/////@ 3. reducers with their types created
//~ 3.5 import reusable textinput components through bit
//@ 4. Component for enterAppOptions, signinForm, signupForm
// % lets get this all hooked up before testing the code out

export const EnterMethodContext = createContext()

const WelcomeScreen = () => {
  //are these a replacement for objects? With regular obj your have to create obj and then set interface to it. This possibly could be the replacement

  //~ creating: login page 
  const [compPosition, setCompPosition] = useState(0)
  const { spinAnim, opacityAnim } = useLogoAnimation()

  return (
    <EnterMethodContext.Provider>
      <LinearGradient colors={['#67B4FF', '#4132D3']} style={styles.container} end={[1, 1.3]}>
        <View className='flex-1 justify-center align-center'>
          <View>
            <Animated.Text style={styles.headerStyle}>Pao System</Animated.Text>
          </View>
          <Animated.View
            style={{ transform: [{ scaleX: spinAnim }], opacity: opacityAnim }}>
            <Image
              source={paoLogo}
              style={styles.PaoLogo}
            />
          </Animated.View>
        </View>
        <View className='flex-1 justify-center' style={{ bottom: compPosition }}>
          <View
            behavior={"height"}
            style={{ flex: 1, width: '100%', height: '100%' }}>
            <RenderEnterComps />
          </View>
        </View>
      </LinearGradient>
    </EnterMethodContext.Provider >
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerStyle: {
    fontFamily: 'rock-salt',
    color: 'white',
    fontSize: 35,
    alignSelf: 'center',
  },
  PaoLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 25,
    width: 120,
    height: 120
  }
})
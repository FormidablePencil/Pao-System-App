import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import RenderEnterComps from '../components/RenderEnterComps'
import { LinearGradient } from 'expo-linear-gradient'
import { View, ImageBackground, Dimensions, Keyboard, LayoutAnimation, Animated } from 'react-native'
import useLogoAnimation from '../components/useLogoAnimation'
import styled from 'styled-components'
import paoLogo from '../assets/playing-cards-png-11-original.png'
import bgImg from '../assets/imgs/julius-drost-C8wlYF8ubBo-unsplash.jpg'
import { createAnimatableComponent } from 'react-native-animatable'
import { Text, withTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming'

export const EnterMethodContext = createContext()
const SCREEN_HEIGHT = Dimensions.get('window').height

interface WelcomeScreenTypes {
  navigation: any
  theme: PaoThemeType
}

const WelcomeScreen = ({ navigation, theme }: WelcomeScreenTypes) => {
  const [showSpinningImg, setShowSpinningImg] = useState(true)
  const { interpolatingSpinAnim, interpolationOpacity } = useLogoAnimation({ showSpinningImg })
  let headerTextRef = useRef(null)
  // let interpolatingSpinAnim = useRef(new Animated.Value(0)).current
  //! change color of logo perhaps

  useEffect(() => {
    const keyboardShowed = Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setShowSpinningImg(false)

    })
    const keyboardHid = Keyboard.addListener('keyboardDidHide', () => setShowSpinningImg(true))
    return () => {
      keyboardShowed.remove()
      keyboardHid.remove()
    }
  })




  return (
    <EnterMethodContext.Provider>
      <ImageBackground style={{
        flex: 1, height: SCREEN_HEIGHT, alignItems: "center", justifyContent: 'center'
      }} source={bgImg}>

        {/* {showSpinningImg &&
          <Animated.View style={{
            transform: [{ rotateY: interpolatingSpinAnim }],
            opacity: interpolationOpacity,
            height: 120, position: 'absolute', top: '35%', resizeMode: 'contain', width: 120
           }}>
            <AnimatedImg source={paoLogo} />
          </Animated.View>
        } */}

      <StyledLinearGradient colors={['rgba(76,0,157,.25)', 'rgba(255,0,0,.3)']} end={[1, 1]} start={[.1, .8]}>
        <HeaderView >
          <AnimatedHeaderText
           ref={headerTextRef}
            font={theme.fonts.largeHeader.fontFamily}
            style={{ textShadowRadius: 10, textShadowOffset: { width: -1, height: 1 }, textShadowColor: 'rgba(0, 0, 0, 0.75)', }}
          >Pao System
            </AnimatedHeaderText>
        </HeaderView>


        <View style={{ flex: 3.2, width: '100%', paddingHorizontal: 20, justifyContent: 'center' }}>
          <RenderEnterComps navigation={navigation} />
        </View>

      </StyledLinearGradient>
      </ImageBackground>
    </EnterMethodContext.Provider >
  )
}

export default withTheme(WelcomeScreen)


const StyledImg = styled.Image`
  height: 120; position: absolute; top: 35%; resize-mode: contain; width: 120;
`;

const AnimatedImg = createAnimatableComponent(StyledImg)

const HeaderView = styled.View`
  align-items: center; color: white; flex: 2; justify-content: center;
  
`;
const HeaderText = styled(Text)`
  color: #CAC8FF; font-family: ${props => props.font}; font-size: 60; /* //* resize fontSize depending on screen width */
`
const AnimatedHeaderText = createAnimatableComponent(HeaderText)

const StyledLinearGradient = styled(LinearGradient)`
   align-items: center; flex: 1; justify-content: flex-end; width: 100%;
`;
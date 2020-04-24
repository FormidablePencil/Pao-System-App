import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import RenderEnterComps from '../components/RenderEnterComps'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Image, View, Animated } from 'react-native'
import useLogoAnimation from '../components/useLogoAnimation'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
//@ts-ignore
import paoLogo from '../assets/playing-cards-png-11-original.png'

//@ts-ignore
export const EnterMethodContext = createContext()

const WelcomeScreen = ({ navigation }: any) => {
  const { spinAnim, opacityAnim } = useLogoAnimation()
  //! linearGradient over a card image

  return (
    <EnterMethodContext.Provider>
      <LinearGradient colors={['#67B4FF', '#4132D3']} style={styles.container} end={[1, 1.3]}>
        <TopSectionContainer>
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
        </TopSectionContainer>
        <Section>
          <RenderEnterComps navigation={navigation} />
        </Section>
      </LinearGradient>
    </EnterMethodContext.Provider >
  )
}

export default WelcomeScreen

const TopSectionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Section = styled.View`
  flex: 1;
  justify-content: center;
`

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
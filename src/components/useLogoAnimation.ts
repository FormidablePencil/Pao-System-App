import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

const useLogoAnimation = ({ showSpinningImg }) => {
  const spinAnim: any = useRef(new Animated.Value(1)).current
  const opacityAnim: any = useRef(new Animated.Value(1)).current
  let interpolatingSpinAnim = useRef(new Animated.Value(0)).current

  const executeAnimationIn = () => {
    //make these work concurrently
    Animated.sequence([
      Animated.parallel([
        Animated.timing(spinAnim, { //how would I get rid of these stupid red squgalies? 
          toValue: -1,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: .3,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ]),
      Animated.parallel([
        Animated.timing(spinAnim, { //how would I get rid of these stupid red squgalies? 
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: .3,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ])
    ]).start(() => showSpinningImg && setTimeout(() => { executeAnimationIn() }, 3000))
  }//! we don't need this long animation sequence. We will simply use interpolation

  interpolatingSpinAnim = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1.57],
    // extrapolate: 'clamp',
  })

  useEffect(() => {
    // setTimeout(() => {
    // console.log('@@')
    console.log('####')
    executeAnimationIn()
    // }, 5000);
  }, [])
  useEffect(() => {
    if (!showSpinningImg) {
      //@ts-ignore
      // spinAnim.stopAnimation(value => console.log(value))
      // opacityAnim.stopAnimation(value => console.log('value'))
    }
  }, [showSpinningImg])
  return { spinAnim, opacityAnim, interpolatingSpinAnim }
}

export default useLogoAnimation

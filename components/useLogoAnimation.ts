import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'

const useLogoAnimation = () => {
  const spinAnim: any = useRef(new Animated.Value(0)).current
  const opacityAnim: any = useRef(new Animated.Value(0)).current

  const executeAnimationIn = () => {
    //make these work concurrently
    Animated.sequence([
      Animated.parallel([
        Animated.timing(spinAnim, { //how would I get rid of these stupid red squgalies? 
          toValue: -1,
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
    ]).start(() => executeAnimationIn())
  }

  useEffect(() => {
    executeAnimationIn()
  }, [])
  return { spinAnim, opacityAnim }
}

export default useLogoAnimation

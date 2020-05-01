import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

const useLogoAnimation = () => {
  const spinAnim: any = useRef(new Animated.Value(0)).current
  let interpolatingSpinAnim = useRef(new Animated.Value(0)).current
  let interpolationOpacity = useRef(new Animated.Value(0)).current

  const execute_animation_in = () => {
    Animated.sequence([
      Animated.timing(spinAnim, { //how would I get rid of these stupid red squgalies? 
        toValue: 1,
        easing: Easing.linear,
        duration: 8000,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnim, { //how would I get rid of these stupid red squgalies? 
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    ]).start(() => execute_animation_in())
  }


  interpolatingSpinAnim = spinAnim.interpolate({
    inputRange: [0, .50, 1],
    outputRange: [0, 3, 0],
    // extrapolate: 'clamp',
  })

  interpolationOpacity = spinAnim.interpolate({
    inputRange: [0, .25, .5, .75, 1],
    outputRange: [1, .2, 1, .2, 1],
    // extrapolate: 'clamp',
  })
  useEffect(() => {
    execute_animation_in()
  }, [])

  return { interpolatingSpinAnim, interpolationOpacity }
}

export default useLogoAnimation

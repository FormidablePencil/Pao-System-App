import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing } from "react-native"

const FadeInTransitionGroup = ({
  children,
  appearCondition,
  duration = 150,
  easing = Easing.sin,
  style
}: {
  appearCondition,
  children,
  duration?,
  easing?
  style?
}
) => {
  const [compVisible, setCompVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    (async () => {
      if (appearCondition) {
        await setCompVisible(true)
        Animated.timing(fadeAnim, { toValue: 1, duration, easing, useNativeDriver: true, }).start()
      }
      else {
        await Animated.timing(fadeAnim, { toValue: 0, duration, easing, useNativeDriver: true, }).start()
        setTimeout(() => { setCompVisible(false) }, duration);
      }
    })()
  }, [appearCondition])

  return compVisible ? <Animated.View style={{ opacity: fadeAnim, ...style }}>{children}</Animated.View> : null
}

export { FadeInTransitionGroup }
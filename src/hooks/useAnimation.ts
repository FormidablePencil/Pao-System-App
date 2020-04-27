import { Animated, Easing } from "react-native"

interface InterfaceAnim {
  flipFrontSide,
  frontSideOpacity,
  backSideOpacity,
  flipBackSide,
  setToggle,
  toggle
}

const useAnimation = ({
  flipFrontSide,
  frontSideOpacity,
  backSideOpacity,
  flipBackSide,
  setToggle,
  toggle
}: InterfaceAnim) => {
  const flipCard = () => {
    setToggle(!toggle)
    if (toggle) {
      Animated.sequence([
        Animated.timing(flipFrontSide, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true
        }),
        Animated.parallel([
          Animated.timing(frontSideOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true
          }),
          Animated.timing(backSideOpacity, {
            toValue: 0,
            duration: 10,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(flipBackSide, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true
        })
      ]).start()

    } else {

      Animated.sequence([
        Animated.timing(flipBackSide, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true
        }),
        Animated.timing(frontSideOpacity, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true
        }),
        Animated.parallel([
          Animated.timing(frontSideOpacity, {
            toValue: 0,
            duration: 10,
            useNativeDriver: true
          }),
          Animated.timing(backSideOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(flipFrontSide, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true
        })
      ]).start()
    }
  }

  return { flipCard }

}

export default useAnimation

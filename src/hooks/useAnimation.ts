import { useRef } from "react";
import { Animated, Easing } from "react-native";

const useAnimation = ({ setToggle, toggle }) => {
  let frontInterpolation: any = useRef(new Animated.Value(0)).current;
  let backInterpolation: any = useRef(new Animated.Value(0)).current;
  let flipFrontSide: any = useRef(new Animated.Value(0)).current;
  let flipBackSide: any = useRef(new Animated.Value(0)).current;
  let backSideOpacity: any = useRef(new Animated.Value(1)).current;
  let frontSideOpacity: any = useRef(new Animated.Value(1)).current;

  backInterpolation = flipFrontSide.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
    // extrapolate: 'clamp',
  });
  frontInterpolation = flipBackSide.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"],
    // extrapolate: 'clamp',
  });

  const flipCard = () => {
    setToggle(!toggle);
    if (toggle) {
      Animated.sequence([
        Animated.timing(flipFrontSide, {
          toValue: 1,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(frontSideOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true,
          }),
          Animated.timing(backSideOpacity, {
            toValue: 0,
            duration: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(flipBackSide, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(flipBackSide, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(frontSideOpacity, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(frontSideOpacity, {
            toValue: 0,
            duration: 10,
            useNativeDriver: true,
          }),
          Animated.timing(backSideOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(flipFrontSide, {
          toValue: 0,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return {
    flipCard,
    frontSideOpacity,
    backSideOpacity,
    frontInterpolation,
    backInterpolation,
  };
};

export default useAnimation;

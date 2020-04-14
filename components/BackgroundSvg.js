import React from 'react'
import { View, Text } from 'react-native-tailwind'
import Svg, { Circle, Rect, Polygon, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Constants } from 'expo';

const BackgroundSvg = () => {
  return (
    <View className="absolute w-full h-full">
      <Svg height="1000" width="1000">
        <Defs>
          <RadialGradient
            id="grad"
            cx="150"
            cy="75"
            rx="500"
            ry="500"
            fx="150"
            fy="75"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#41E2FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#16627F" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Polygon
          y="220"
          points="0,4 0,1000 1000,100"
          fill="url(#grad)"
          strokeWidth="1"
        />
      </Svg>
    </View>
  )
}

export default BackgroundSvg

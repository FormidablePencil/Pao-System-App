import React, { useContext } from 'react'
import { View, Text } from 'react-native-tailwind'
import Svg, { Circle, Rect, Polygon, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Constants } from 'expo';
import { useTheme } from 'react-native-paper';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';
import { ControlledThemeContext } from '../routes/StackNavigator';
import { useSelector } from 'react-redux';

const BackgroundSvg = () => {
  const theme = useTheme()
  const { controlledThemeColor } = useSelector(state => state)

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
            <Stop offset="0" stopColor={
              usePrimaryControlledColor(WhereToColor.profileBottomHalf2)
            } stopOpacity="1" />
            <Stop offset="1" stopColor={
              usePrimaryControlledColor(WhereToColor.profileBottomHalf1)
            } stopOpacity="1" />
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

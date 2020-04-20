import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const StackNavigator = () => {
  
  return ( 
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

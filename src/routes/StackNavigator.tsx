import React, { useState, createContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer'
import { StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';

const Stack = createStackNavigator()
//@ts-ignore

const StackNavigator = () => {
  //connect all the components that previously depended on the context in here to redux instead
  // defaultScreenOptions
  // PaoAppContext

  return (

    <NavigationContainer>
      {/* <StatusBar backgroundColor={theme.olors.primary} /> */}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

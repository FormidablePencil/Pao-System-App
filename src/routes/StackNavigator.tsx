import React, { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer'

const Stack = createStackNavigator()
//@ts-ignore
export const PaoAppContext = createContext();

const StackNavigator = () => {

  // const tokenRefreshing = useHandleTokenRefreshing()
  //~ leave it here for testing out the proformance later on
  const defaultScreenOptions = { // its here and not in tab navigator where it would make sense to keep because there's a proformance hit
    fabVisibility: false,
    screen: null,
    config: { editMode: null, pagination: true },
    fabActionsProperties: null,
    mainFabProperties: null
  }
  const defaultArrangment = {
    FlashcardsScreen: arrangmentOpt.ascending,
    PaoTableScreen: arrangmentOpt.ascending
  }
  const [tabScreenOptions, setTabScreenOptions] = useState(defaultScreenOptions)
  const [arrangment, setArrangment] = useState(defaultArrangment)

  return (
    <PaoAppContext.Provider value={{
      tabScreenOptions, setTabScreenOptions,
      arrangment, setArrangment
    }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaoAppContext.Provider>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

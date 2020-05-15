import React, { useState, createContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer'
import { StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';
import { tabScreens } from '../constants/constants';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import useSettingTabScreenOptions from '../hooks/useSettingTabScreenOptions';
import FabActionBtn from '../components/FabActionBtn';

const Stack = createStackNavigator()
//@ts-ignore
export const TabNavContext = createContext()

const StackNavigator = () => {
  //connect all the components that previously depended on the context in here to redux instead
  // defaultScreenOptions
  // PaoAppContext
  const [modalOpen, setModalOpen] = useState(false) //@ keep
  // useSettingTabScreenOptions()



  return (
    <TabNavContext.Provider value={{ modalOpen, setModalOpen, }}>
      <NavigationContainer>
        {/* <StatusBar backgroundColor={theme.olors.primary} /> */}
        <Stack.Navigator
          initialRouteName={tabScreens.Paotable}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name={tabScreens.Flashcards} component={FlashcardsScreen} />
          <Stack.Screen name={tabScreens.Paotable} component={PaotableScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabNavContext.Provider>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

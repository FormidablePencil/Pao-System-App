import React, { useState, createContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHandleTokenRefreshing from '../hooks/useHandleTokenRefreshing';
import { tabScreens } from '../constants/constants';
import { Portal, FAB } from 'react-native-paper';
import { fabActions } from '../constants/constants';
import { useNavigationState } from '@react-navigation/native';
import FabActionBtn from '../components/FabActionBtn';

const Tab = createBottomTabNavigator()
//@ts-ignore
export const PaoAppContext = createContext();

//~ from here:
//~ check if logged in, if so then: 
//~ get pao data 
//~ else redirect user back to WelcomeScreen
// Change out inputs for texts and render then conditionally when user presses on the test
const TabNavigator = () => {
  const initialRouteName = tabScreens.Paotable
  const [modalOpen, setModalOpen] = useState(false)
  const tokenRefreshing = useHandleTokenRefreshing()
  const [toggleFlashcardEffectDirectionVertical, setToggleFlashcardEffectDirectionVertical] = useState(true)
  const [currentScreen, setCurrentScreen] = useState(null)

  //@ this could become a seperate component as a useHook
  //likely there will be two parameters. One for edit text input, another for flashcard modes, and likely even more.

  const [fabAction, setFabAction] = useState({
    fabVisibility: true,
    flashcardMode: fabActions.accending,
    paotableEditMode: false,
    paginationMode: true
  })


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaoAppContext.Provider value={{
        modalOpen, setModalOpen,
        toggleFlashcardEffectDirectionVertical, setToggleFlashcardEffectDirectionVertical,
        currentScreen, setCurrentScreen,
        fabAction, setFabAction
      }}>
        <Tab.Navigator
          initialRouteName={initialRouteName}
          tabBarOptions={{
            keyboardHidesTabBar: true
          }}
        >
          <Tab.Screen name={tabScreens.Paotable} component={PaotableScreen} />
          <Tab.Screen name={tabScreens.Flashcards} component={FlashcardsScreen} />
          <Tab.Screen name={tabScreens.Settings} component={SettingsScreen} />
          {/* <Tab.Screen name='TestingAnimations' component={TestingAnimationsScreen} /> */}
        </Tab.Navigator>
        <FabActionBtn />
      </PaoAppContext.Provider>
    </SafeAreaView>
  )
}


export default TabNavigator

import React, { useState, createContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHandleTokenRefreshing from '../hooks/useHandleTokenRefreshing';

const Tab = createBottomTabNavigator()
//@ts-ignore
export const PaoAppContext = createContext();

//~ from here:
//~ check if logged in, if so then: 
//~ get pao data 
//~ else redirect user back to WelcomeScreen

const TabNavigator = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const tokenRefreshing = useHandleTokenRefreshing()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaoAppContext.Provider value={{ modalOpen, setModalOpen }}>
        <Tab.Navigator >
          <Tab.Screen name='Paotable' component={PaotableScreen} />
          <Tab.Screen name='Flashcards' component={FlashcardsScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
          {/* <Tab.Screen name='TestingAnimations' component={TestingAnimationsScreen} /> */}
        </Tab.Navigator>
      </PaoAppContext.Provider>
    </SafeAreaView>
  )
}

export default TabNavigator

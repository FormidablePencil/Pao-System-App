import React, { useState, createContext } from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestingAnimationsScreen from '../screens/TestingAnimationsScreen';

const Tab = createBottomTabNavigator()
export const PaoAppContext = createContext();

const TabNavigator = () => {
  const [modalOpen, setModalOpen] = useState(false)
  
  return (
    <PaoAppContext.Provider value={{modalOpen, setModalOpen}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Paotable' component={PaotableScreen} />
          <Tab.Screen name='Flashcards' component={FlashcardsScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
          {/* <Tab.Screen name='TestingAnimations' component={TestingAnimationsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </PaoAppContext.Provider>
  )
}

export default TabNavigator

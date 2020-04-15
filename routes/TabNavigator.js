import React, { useState, createContext } from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestingAnimationsScreen from '../screens/TestingAnimationsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator()
export const PaoAppContext = createContext();

const TabNavigator = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaoAppContext.Provider value={{ modalOpen, setModalOpen }}>
        <Tab.Navigator>
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

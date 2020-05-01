import React, { createContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tabScreens } from '../constants/constants';
import FabActionBtn from '../components/FabActionBtn';
import FavScreen from '../screens/FavScreen';
import { IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator()

//@ts-ignore
export const TabNavContext = createContext()

const TabNavigator = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false) //@ keep

  // autoPlayFlashcards, setautoPlayFlashcards,
  // flashcardItemDisplayedFront, setflashcardItemDisplayedFront
  return (
    <TabNavContext.Provider value={{ modalOpen, setModalOpen, }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={tabScreens.Paotable}
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeBackgroundColor: '#191D2E',
            inactiveBackgroundColor: '#191D2E'
          }}>
          <Tab.Screen name={tabScreens.Paotable} component={PaotableScreen} />
          <Tab.Screen name={tabScreens.Flashcards} component={FlashcardsScreen} />
        </Tab.Navigator>
        {/* <FabActionBtn navigation={navigation} /> */}
      </SafeAreaView>
    </TabNavContext.Provider>
  )
}


export default TabNavigator

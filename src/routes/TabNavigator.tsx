import React, { createContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tabScreens } from '../constants/constants';
import FabActionBtn from '../components/FabActionBtn';
import FavScreen from '../screens/FavScreen';

const Tab = createBottomTabNavigator()
//@ts-ignore
export const TabNavContext = createContext()

const TabNavigator = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [flashcardItemDisplayedFront, setflashcardItemDisplayedFront] = useState([
    { number: true },
    { person: false },
    { action: false },
    { object: false },
  ])
  const defaultautoPlayFlashcards = { play: false, duration: 5 } //rename to flashcard related
  const [autoPlayFlashcards, setautoPlayFlashcards] = useState(defaultautoPlayFlashcards) //rename to flashcard related



  return (
    <TabNavContext.Provider value={{
      modalOpen, setModalOpen,
      
      autoPlayFlashcards, setautoPlayFlashcards,
      flashcardItemDisplayedFront, setflashcardItemDisplayedFront
    }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={tabScreens.Paotable}
          tabBarOptions={{ keyboardHidesTabBar: true }}>
          <Tab.Screen name={tabScreens.Paotable} component={PaotableScreen} />
          <Tab.Screen name={tabScreens.Flashcards} component={FlashcardsScreen} />
        </Tab.Navigator>
        <FabActionBtn navigation={navigation} />
      </SafeAreaView>
      </TabNavContext.Provider>
  )
}


export default TabNavigator

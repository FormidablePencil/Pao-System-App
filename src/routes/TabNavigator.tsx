import React, { createContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tabScreens } from '../constants/constants';
import FabActionBtn from '../components/FabActionBtn';
import FavScreen from '../screens/FavScreen';
import { IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import useSettingTabScreenOptions from '../hooks/useSettingTabScreenOptions';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

//@ts-ignore

const TabNavigator = ({ navigation }) => {
  

  // autoPlayFlashcards, setautoPlayFlashcards,
  // flashcardItemDisplayedFront, setflashcardItemDisplayedFront
  return (
    <></>
  )
}


export default TabNavigator

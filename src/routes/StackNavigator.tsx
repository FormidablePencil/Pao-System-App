import React, { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { tabScreens } from '../constants/constants';
import FlashcardsScreen from '../screens/flashcard-screen';
import NavigateToPaoTable, { NavigateToFlashcards } from '../components/ScreenHeaderComponents';
import PaotableScreen from '../screens/PaotableScreen';
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth';

const Stack = createStackNavigator()
//@ts-ignore
export const TabNavContext = createContext({ tableReady: false, setTableReady: null })

export const ControlledThemeContext = createContext({
  tableReady: false
})

const StackNavigator = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showNavigationIcons, setShowNavigationIcons] = useState(true)
  const [tableReady, setTableReady] = useState(false)
  useHandleSystemMesgAuth()

  return (
    <NavigationContainer>
      <TabNavContext.Provider value={{
        modalOpen, setModalOpen,
        showHints, setShowHints,
        showNavigationIcons, setShowNavigationIcons,
        tableReady, setTableReady,
      }}>
        <Stack.Navigator
          initialRouteName={tabScreens.WelcomeScreen}
          screenOptions={{}}>
          <Stack.Screen
            options={{
              headerTransparent: true,
              title: null,
              headerLeft: props => <NavigateToPaoTable tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
              headerRight: props => <NavigateToFlashcards tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
            }}
            name={tabScreens.Paotable} component={PaotableScreen} />
          <Stack.Screen options={{
            headerShown: false,
          }}
            name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name={tabScreens.WelcomeScreen} component={WelcomeScreen} />
          <Stack.Screen
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerTransparent: true,
              title: null,
              headerLeft: props => <NavigateToPaoTable tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
              headerRight: props => <NavigateToFlashcards tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
            }}
            name={tabScreens.Flashcards} component={FlashcardsScreen} />
        </Stack.Navigator>
      </TabNavContext.Provider>
    </NavigationContainer>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

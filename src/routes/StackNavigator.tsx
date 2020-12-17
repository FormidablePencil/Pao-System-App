import React, { useState, createContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { tabScreens } from '../constants/constants';
import FlashcardsScreen from '../screens/flashcard-screen/index';
import NavigateToPaoTable, { NavigateToFlashcards } from '../components/ScreenHeaderComponents';
import PaotableScreen from '../screens/paotable-screen';
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth';
import { tableHeaderHeight } from '../components/TableHeader';
import { useDispatch } from 'react-redux';
import { SET_PAO_TABLE_ROW_HEIGHT } from '../actions/types';
import { Dimensions, Text } from 'react-native';
import FabActionBtn from '../screens/components/fab-action-btns';
import { enumFabAction } from '../constants/fabConstants';
import { navigationRef } from '../screens/components/fab-action-btns/useFabActionVariousProperties';

const SCREEN_HEIGHT = Dimensions.get('window').height

const Stack = createStackNavigator()
//@ts-ignore
export const TabNavContext = createContext({ tableReady: false, setTableReady: null })

export const ControlledThemeContext = createContext({
  tableReady: false
})

const StackNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState(navigationRef.current?.getCurrentRoute().name)
  const [modalOpen, setModalOpen] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showNavigationIcons, setShowNavigationIcons] = useState(true)
  const [tableReady, setTableReady] = useState(false)
  const dispatch = useDispatch()
  useHandleSystemMesgAuth()

  useEffect(() => {
    dispatch({ type: SET_PAO_TABLE_ROW_HEIGHT, payload: ((SCREEN_HEIGHT - (tableHeaderHeight * 2)) / 10) })
  }, [])

  return (
    <NavigationContainer
      onStateChange={(state: any) => setCurrentScreen(state.routes[state.routes.length - 1].name)}
      ref={navigationRef}>
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
            name={tabScreens.ProfileScreen} component={ProfileScreen} />
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
        <FabActionBtn
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          setGoToUnfilledTrigger={null}
          setModalOpen={setModalOpen}
        />
      </TabNavContext.Provider>
    </NavigationContainer>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

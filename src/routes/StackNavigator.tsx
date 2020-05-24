import React, { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { tabScreens } from '../constants/constants';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import NavigateToPaoTable, { NavigateToFlashcards } from '../components/ScreenHeaderComponents';
import PaotableScreen from '../screens/PaotableScreen';
import { SAVE_CONTROLLED_THEME_COLOR, RESET_CONTROLLED_THEME_COLOR } from '../actions/types';

const Stack = createStackNavigator()
//@ts-ignore
export const TabNavContext = createContext()
//@ts-ignore
export const ControlledThemeContext = createContext()

const StackNavigator = () => {
  //connect all the components that previously depended on the context in here to redux instead
  const [modalOpen, setModalOpen] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showNavigationIcons, setShowNavigationIcons] = useState(true)
  const [tableReady, setTableReady] = useState(false)
  // const [controlledThemeColor, setControlledThemeColor] = useState(null)
  
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <TabNavContext.Provider value={{
      modalOpen, setModalOpen,
      showHints, setShowHints,
      showNavigationIcons, setShowNavigationIcons,
      tableReady, setTableReady,
    }}>
      {/* <ControlledThemeContext.Provider value={{
      }}> */}
        <NavigationContainer>
          {/* <StatusBar backgroundColor={theme.olors.primary} /> */}
          <Stack.Navigator
            initialRouteName={tabScreens.Paotable}
            screenOptions={{}}>
            <Stack.Screen options={{
              headerShown: false,
            }}
              name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen
              options={{ headerShown: false }}
              name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen
              options={{
                headerTransparent: true,
                title: null,
                headerLeft: props => <NavigateToPaoTable tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
                headerRight: props => <NavigateToFlashcards tableReady={tableReady} showNavigationIcons={showNavigationIcons} />,
              }}
              name={tabScreens.Paotable} component={PaotableScreen} />
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
        </NavigationContainer>
      {/* </ControlledThemeContext.Provider> */}
    </TabNavContext.Provider>
  )
}

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

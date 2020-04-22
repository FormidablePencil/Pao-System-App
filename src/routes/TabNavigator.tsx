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


const Tab = createMaterialBottomTabNavigator()
//@ts-ignore
export const PaoAppContext = createContext();

//~ from here:
//~ check if logged in, if so then: 
//~ get pao data 
//~ else redirect user back to WelcomeScreen

const TabNavigator = () => {
  const initialRouteName = tabScreens.Paotable
  const [modalOpen, setModalOpen] = useState(false)
  const tokenRefreshing = useHandleTokenRefreshing()
  const [toggleFlashcardEffectDirectionVertical, setToggleFlashcardEffectDirectionVertical] = useState(true)
  const [fabVisible, setFabVisible] = useState(false)
  const [showFab, setShowFab] = useState(false)

  //@ this could become a seperate component as a useHook
  const [currentScreen, setCurrentScreen] = useState(null)
  //likely there will be two parameters. One for edit text input, another for flashcard modes, and likely even more.
  const [fabAction, setFabAction] = useState({
    fabVisibility: false,
    flashcardMode: fabActions.accending,
    paotableEditMode: false
  })
  console.log(currentScreen)

  useEffect(() => {
    if (fabAction.paotableEditMode === true) {
      console.log('TRUE')
    } else if (fabAction.paotableEditMode === false) {
      console.log('FALSE')
    }
    console.log(fabAction)
  }, [fabAction])

  useEffect(() => {
    if (currentScreen === 0) {
      setFabVisible(true)
    } else if (currentScreen === 1) {
      setFabVisible(false)
    }
  }, [currentScreen])

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
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#694fad' }}
        >
          <Tab.Screen name={tabScreens.Paotable} component={PaotableScreen} />
          {/* <Tab.Screen name={tabScreens.Flashcards} component={FlashcardsScreen} /> */}
          <Tab.Screen name={tabScreens.Settings} component={SettingsScreen} />
          {/* <Tab.Screen name='TestingAnimations' component={TestingAnimationsScreen} /> */}
        </Tab.Navigator>
      </PaoAppContext.Provider>
      <Portal>
        <FAB.Group
          style={{ position: "absolute", bottom: 45 }}
          visible={fabVisible}
          open={showFab}
          icon={showFab ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'square-edit-outline', label: 'Edit list', onPress: () => setFabAction({ ...fabAction, paotableEditMode: !fabAction.paotableEditMode }) },
            { icon: 'triangle', label: `${fabActions.accending}`, onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.accending }) },
            { icon: 'triangle-outline', label: `${fabActions.deccending}`, onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.deccending }) },
            { icon: 'shuffle-variant', label: `${fabActions.random}`, onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.random }) },
          ]}
          onStateChange={() => setShowFab(!showFab)}
          onPress={() => setShowFab(!showFab)}
        />
      </Portal>
    </SafeAreaView>
  )
}

export default TabNavigator

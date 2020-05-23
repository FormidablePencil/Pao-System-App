import React, { useState, createContext } from 'react'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/SettingsScreen'
import { tabScreens } from '../constants/constants';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import PaotableScreen from '../screens/PaotableScreen';
import { AntDesign } from '@expo/vector-icons';
import { Image, Animated } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import styled from 'styled-components';
import playingCards from './../assets/playing-cards-png-11-original.png'

const Stack = createStackNavigator()
//@ts-ignore
export const TabNavContext = createContext()
//@ts-ignore
export const ControlledThemeContext = createContext()

const StackNavigator = () => {
  //connect all the components that previously depended on the context in here to redux instead
  const [modalOpen, setModalOpen] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showNavigationIcons, setShowNavigationIcons] = useState(false)
  const [controlledThemeColor, setControlledThemeColor] = useState(1)

  return (
    <TabNavContext.Provider value={{
      modalOpen, setModalOpen,
      showHints, setShowHints,
      showNavigationIcons, setShowNavigationIcons
    }}>
      <ControlledThemeContext.Provider value={{
        controlledThemeColor, setControlledThemeColor,
      }}>
        <NavigationContainer>
          {/* <StatusBar backgroundColor={theme.olors.primary} /> */}
          <Stack.Navigator
            initialRouteName={tabScreens.Paotable}
            screenOptions={{}}>
            <Stack.Screen options={{ headerShown: false }}
              name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen
              options={{ headerShown: false }}
              name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen
              options={{
                headerTransparent: true,
                title: null,
                headerLeft: props => <NavigateToPaoTable showNavigationIcons={showNavigationIcons} />,
                headerRight: props => <NavigateToFlashcards showNavigationIcons={showNavigationIcons} />,
              }}
              name={tabScreens.Paotable} component={PaotableScreen} />
            <Stack.Screen
              options={{
                headerTransparent: true,
                title: null,
                headerLeft: props => <NavigateToPaoTable showNavigationIcons={showNavigationIcons} />,
                headerRight: props => <NavigateToFlashcards showNavigationIcons={showNavigationIcons} />,
              }}
              name={tabScreens.Flashcards} component={FlashcardsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ControlledThemeContext.Provider>
    </TabNavContext.Provider>
  )
}

const NavigateToPaoTable = ({ showNavigationIcons }) => {
  const navigation = useNavigation()
  const route = useRoute()
  return ( //spin animation!
    <>
      {showNavigationIcons &&
        <NavigationBtn left onPress={() => navigation.navigate(tabScreens.Paotable)} style={{}}>
          {route.name === tabScreens.Flashcards ?
            <AntDesign size={20} style={{ marginHorizontal: 15, color: 'white', transform: [{ scaleX: -1 }] }} name='arrowright' />
            :
            <Image style={{ resizeMode: 'contain', height: 20, width: 20, marginHorizontal: 15, }} source={playingCards} />
          }
        </NavigationBtn>
      }
    </>
  )
}

const NavigateToFlashcards = ({ showNavigationIcons }) => {
  const navigation = useNavigation()
  const route = useRoute()
  return (
    <>
      {showNavigationIcons &&
        <NavigationBtn onPress={() => navigation.navigate(tabScreens.Flashcards)} style={{}} >
          {route.name === tabScreens.Paotable ?
            <AntDesign size={20} style={{ marginHorizontal: 15, color: 'white' }} name='arrowright' />
            :
            <Image style={{ resizeMode: 'contain', height: 20, width: 20, marginHorizontal: 15, }} source={playingCards} />
          }
        </NavigationBtn>
      }
    </>
  )
}

const NavigationBtn = styled<any>(TouchableRipple)`
  background-color: rgba(3,19,40,.5); margin-top: 5; padding: 10px 0px;
  border-bottom-left-radius: ${({ left }) => left ? 0 : 20}px;
  border-top-left-radius: ${({ left }) => left ? 0 : 20}px;
  border-top-right-radius: ${({ left }) => left ? 20 : 0}px;
  border-bottom-right-radius: ${({ left }) => left ? 20 : 0}px;
  align-items: center; justify-content: center;
`;

//~react-native-swipe-gestures
//~react-native-deck-swiper
// react-native-card-stack-swiper
// @react-navigation/material-bottom-tabs

export default StackNavigator

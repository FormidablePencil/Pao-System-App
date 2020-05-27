import React, { useRef } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native"
import { tabScreens } from "../constants/constants"
import { AntDesign } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import playingCards from '../assets/playing-cards-png-11-original.png'
import styled from 'styled-components';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';
import * as Animatable from 'react-native-animatable'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const NavigateToPaoTable = ({ tableReady, showNavigationIcons }) => {
  const navigation = useNavigation()
  const route = useRoute()
  const spinAnim = useRef(null)

  const bgColor = route.name === tabScreens.Flashcards ?
    usePrimaryControlledColor(WhereToColor.screenHeaderBack) : 'transparent'

  const onPressHandler = () => navigation.navigate(tabScreens.Paotable)
  const onPressHandlerImg = () => spinAnim.current.rotate()

  return ( //spin animation!
    <>
      {tableReady && showNavigationIcons &&
        <NavigationBtn
          left
          disabled={route.name !== tabScreens.Flashcards}
          bgColor={bgColor}
          onPress={() => onPressHandler()}
        >
          {route.name === tabScreens.Flashcards ?
            <AntDesign size={20} style={{ marginHorizontal: 15, color: 'white', transform: [{ scaleX: -1 }] }} name='arrowright' />
            :
            <TouchableWithoutFeedback onPress={() => onPressHandlerImg()}>
              <Animatable.Image ref={spinAnim} style={{ resizeMode: 'contain', height: 20, width: 20, marginHorizontal: 15, }} source={playingCards} />
            </TouchableWithoutFeedback>
          }

        </NavigationBtn>
      }
    </>
  )
}

export const NavigateToFlashcards = ({ tableReady, showNavigationIcons }) => {
  const navigation = useNavigation()
  const route = useRoute()

  const bgColor = route.name === tabScreens.Paotable ?
    usePrimaryControlledColor(WhereToColor.screenHeaderBack) : null

  const onPressHandler = () => navigation.navigate(tabScreens.Flashcards)
  return (
    <>
      {tableReady && showNavigationIcons &&
        <NavigationBtn
          disabled={route.name !== tabScreens.Paotable}
          bgColor={bgColor}
          onPress={onPressHandler}
        >
          {route.name === tabScreens.Paotable ?
            <AntDesign size={20} style={{ marginHorizontal: 15, color: 'white' }} name='arrowright' />
            :
            <></>
            // <Image style={{ resizeMode: 'contain', height: 20, width: 20, marginHorizontal: 15, }} source={playingCards} />
          }
        </NavigationBtn>
      }
    </>
  )
}

const NavigationBtn = styled<any>(TouchableRipple)`
  z-index: 40;
  background-color: ${({ bgColor }) => bgColor ?? 'transparent'};
  margin-top: 5; padding: 10px 0px;
  border-bottom-left-radius: ${({ left }) => left ? 0 : 20}px;
  border-top-left-radius: ${({ left }) => left ? 0 : 20}px;
  border-top-right-radius: ${({ left }) => left ? 20 : 0}px;
  border-bottom-right-radius: ${({ left }) => left ? 20 : 0}px;
  align-items: center; justify-content: center;
`;

export default NavigateToPaoTable
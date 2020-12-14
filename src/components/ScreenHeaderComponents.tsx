import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native"
import { tabScreens } from "../constants/constants"
import { AntDesign } from '@expo/vector-icons';
import { TouchableRipple, useTheme } from 'react-native-paper';
import styled from 'styled-components';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';
import LogoBtnImg from './LogoBtnImg';
import { useSelector } from 'react-redux';
import { RootReducerT } from '../store';
import { PaoThemeType } from '../styles/theming';
import { View } from 'react-native';

const NavigateToPaoTable = ({ tableReady, showNavigationIcons }) => {
  const study = useSelector((state: RootReducerT) => state.study)
  const navigation = useNavigation()
  const route = useRoute()
  const theme: PaoThemeType = useTheme()

  const bgColor = route.name === tabScreens.Flashcards ?
    usePrimaryControlledColor(WhereToColor.screenHeaderBack) : 'transparent'

  const onPressHandler = () => navigation.navigate(tabScreens.Paotable)

  const btnBgColor = study.study ? theme.colors.accent : 'transparent'

  return ( //spin animation!
    <>
      {showNavigationIcons &&
        <NavigationBtn
          left
          disabled={route.name !== tabScreens.Flashcards}
          bgColor={bgColor}
          onPress={() => onPressHandler()}
        >
          {route.name === tabScreens.Flashcards ?
            <AntDesign size={20} style={{ marginHorizontal: 15, color: 'white', transform: [{ scaleX: -1 }] }} name='arrowright' />
            :
            <BtnImgContainer>
              <LogoBtnImg btnBgColor={'transparent'} onlyToggleOffAllowed={true} />
            </BtnImgContainer>
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
      {showNavigationIcons &&
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

const BtnImgContainer = styled(View)`
  margin: -5px 10px;
`
const NavigationBtn = styled<any>(TouchableRipple)`
  /* padding: 25px; */
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
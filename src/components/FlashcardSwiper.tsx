import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { FAB, Colors, useTheme, Button, Text, DefaultTheme, Title, Headline } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import FlashcardItSelf from './FlashcardItSelf';
import Swiper from 'react-native-swiper'
import sortPaoList from '../components/logic/sortPaoList'
import initialStatePao from '../reducer/paoReducer'
import { LinearGradient } from 'expo-linear-gradient';
import { PaoThemeType } from '../styles/theming';
import { TabNavContext } from '../routes/StackNavigator';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';
import { tabScreens } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import {currentCardIndexTextControlledColor} from '../hooks/usePrimaryControlledColor'

const SCREEN_WIDTH = Dimensions.get('window').width

const FlashcardSwiper = ({ currentDeckOfCard, setCurrentDeckOfCard, pao }) => {
  const { flashcardOptions } = useSelector((state: any) => state)
  const { autoPlayFlashcards: { play, duration } } = useSelector((state: any) => state.flashcardOptions)
  const { retreivedPaoDataFromDb } = useSelector((state: any) => state.systemMessages)
  const [tenDeckOfCardsAtOneTime, setTenDeckOfCardsAtOneTime] = useState(null)
  const [flashcardOrderAssortment, setFlashcardOrderAssortment] = useState([{
    "action": null,
    "number": null,
    "object": null,
    "person": null,
  }])
  const theme: PaoThemeType = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    if (pao) setFlashcardOrderAssortment(pao)
  }, [pao])

  const bgColor = [
    usePrimaryControlledColor(WhereToColor.flashcardBackground),
    usePrimaryControlledColor(WhereToColor.flashcardBackground2)
  ]
  const btnColorBg = usePrimaryControlledColor(WhereToColor.flashcardBtnGoToPaoList, theme.colors.primary)

  const noDocsInPaoList = () => {
    if (flashcardOrderAssortment) {
      if (flashcardOrderAssortment.length === 1 && flashcardOrderAssortment[0].number === null) {
        return true
      } else {
        return false
      }
    } else return true
  }

  const noItemsInPaoList = flashcardOrderAssortment[0].number === null
  const textColor = 'white'

  return (
    <Container style={{ ...styles2.slide1, }}>
      <LinearGradient
        colors={bgColor}
        end={[.75, .2]} start={[.01, .75]}>

        {!noItemsInPaoList &&
          <Swiper
            // autoplay={play}
            // autoplayTimeout={duration} //~ make this a setting
            showsPagination={false}
            // loop={true}
            // loadMinimal={false}
            // loadMinimalSize={20}
            onIndexChanged={(index) => setCurrentDeckOfCard(index + 1)}
          >
            {!noItemsInPaoList &&
              flashcardOrderAssortment.map((collection: any, index: number) => {
                let render
                for (let i = currentDeckOfCard - 3; i <= currentDeckOfCard + 3; i++) {
                  if (collection.number === i) render = true
                }
                return (
                  <AlignCenterWrapper key={index}>
                    {render &&
                      <FlashcardItSelf collection={collection} />
                    }
                  </AlignCenterWrapper>
                )
              })}
          </Swiper>
        }
        {noItemsInPaoList &&
          <AlignCenterWrapper style={{ width: SCREEN_WIDTH }}>
            <StyledHeadline color={textColor}>Add items to your pao list</StyledHeadline>
            <ButtonStyled
              // color={usePrimaryControlledColor(WhereToColor.flashcardBtnGoToPaoList, null)}
              color={btnColorBg}
              mode='contained'
              onPress={() => navigation.navigate(tabScreens.Paotable)}>
              <StyledText color={textColor}>Go to pao list</StyledText>
            </ButtonStyled>
          </AlignCenterWrapper>
        }
      </LinearGradient>
    </Container>
  )
}

export default FlashcardSwiper

const ButtonStyled = styled(Button)`
  margin: 30px 0px 0px 0px;
`;
const StyledHeadline = styled<any>(Headline)`
  color: ${({ color }) => color};
`;
const StyledText = styled<any>(Text)`
  color: ${({ color }) => color};
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AlignCenterWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const styles2 = StyleSheet.create({
  wrapper: {},
  slide1: {
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

const GoBackButton = styled(FAB)`
  position: absolute;
  bottom: 0;
  left: 0;
`;
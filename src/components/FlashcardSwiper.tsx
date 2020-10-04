import React, { useEffect, useState, useContext, useRef } from 'react'
import styled from 'styled-components';
import { FAB, Colors, useTheme, Button, Text, DefaultTheme, Title, Headline } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet, Dimensions, FlatList } from 'react-native';
import FlashcardItSelf from './FlashcardItSelf';
import Swiper from 'react-native-swiper'
import sortPaoList from '../components/logic/sortPaoList'
import initialStatePao from '../reducer/paoReducer'
import { LinearGradient } from 'expo-linear-gradient';
import { PaoThemeType } from '../styles/theming';
import { TabNavContext } from '../routes/StackNavigator';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';
import { tabScreens, swipeDirection } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import { currentCardIndexTextControlledColor } from '../hooks/usePrimaryControlledColor'
import studyReducer, { listItemsT } from '../reducer/studyReducer';
import { RootReducerT } from '../store';
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer';

const SCREEN_WIDTH = Dimensions.get('window').width

const FlashcardSwiper = ({ currentDeckOfCard, pao }) => {
  const { flashcardOptions, study } = useSelector((state: RootReducerT) => state)
  const { autoPlayFlashcards: { play, duration } } = useSelector((state: any) => state.flashcardOptions)
  const { retreivedPaoDataFromDb } = useSelector((state: any) => state.systemMessages)
  const [tenDeckOfCardsAtOneTime, setTenDeckOfCardsAtOneTime] = useState(null)
  const [flashcardOrderAssortment, setFlashcardOrderAssortment] = useState([{
    id: null,
    number: null,
    action: null,
    object: null,
    person: null,
  }])
  const [listOfTen, setListOfTen] = useState([{
    id: null,
    number: null,
    action: null,
    object: null,
    person: null,
  }])
  const [arrToRenderOfTen, setArrToRenderOfTen] = useState([0, 1, 2, 3, 4])
  const keepTrack = useRef(null)

  const theme: PaoThemeType = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    if (pao) {
      (async () => {
        await setFlashcardOrderAssortment(sortPaoList({ list: pao, order: arrangmentOpt.ascending })); // now would this be less proformant since we're replacing the list completely when one thing in the list needs updating or does react compares prev and new and rerenders only the things that are new. is that how the vertual dom works?
        setListOfTen(flashcardOrderAssortment.filter((item, index) => index <= 10));
      })()
    }
  }, [pao])

  useEffect(() => {
    setListOfTen(flashcardOrderAssortment.filter((item, index) => index <= 10));
  }, [])

  const onSwipeCardHandler = async (index) => {
    if (study.study) {
      // dispatch({ type: CURRENT_STUDY_CARD, payload: index })
    } else {
      await saveDeckOfCardBasedOnSwipeDirection(determineWhatDirectionSwiped(index))
    }
  }

  const saveDeckOfCardBasedOnSwipeDirection = (swipe: swipeDirection) => {
    /* */if (swipe === swipeDirection.right) currentDeckOfCard.current = currentDeckOfCard.current + 1
    else if (swipe === swipeDirection.left) currentDeckOfCard.current = currentDeckOfCard.current - 1
    changeArrToRenderOfTen()
  }

  const determineWhatDirectionSwiped = (swipedTo: swipeDirection) => {
    switch (true) {
      case swipedTo === 0 && keepTrack.current === 4:
        keepTrack.current = swipedTo
        return swipeDirection.right

      case swipedTo === 4 && keepTrack.current === 0:
        keepTrack.current = swipedTo
        return swipeDirection.left

      case swipedTo > keepTrack.current:
        keepTrack.current = swipedTo
        return swipeDirection.right

      case swipedTo < keepTrack.current:
        keepTrack.current = swipedTo
        return swipeDirection.left

      default:
        break;
    }
  }

  
  const changeArrToRenderOfTen = () => {
    console.log(currentDeckOfCard.current, '!currentDeckOfCard.current');
    if (currentDeckOfCard.current === 5) {
      setArrToRenderOfTen([5, 6, 7, 8, 9])
      // onSwipeCardHandler(0)
      // setArrToRenderOfTen(prev => [prev[0] + 5, prev[1] + 5, prev[2] + 5, prev[3] + 5, prev[4] + 5])
      // setListOfTen(flashcardOrderAssortment.filter((item, index) => index >= 20 && index <= 10));
    }
  }

  // useEffect(() => {
  // if (study.study) setFlashcardOrderAssortment(study.paoStudySets)
  // else if (!study.study) setFlashcardOrderAssortment(pao)
  // }, [study.study])


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

  const swiperReff = useRef(null)
  
  return (
    <Container style={{ ...styles2.slide1, }}>
      <LinearGradient
        colors={bgColor}
        end={[.75, .2]} start={[.01, .75]}>

        {!noItemsInPaoList &&
          <Swiper
          ref={swiperReff}
            // autoplay={play}
            // autoplayTimeout={duration} //~ make this a setting
            showsPagination={false}
            loop={true}
            // loadMinimal={false}
            loadMinimalSize={1}
            // index={0}
            // onIndexChanged={async (index) =>} // the way we can know what direction the user swiped is by comparing prev to new index
            onIndexChanged={async (index) => await console.log(index, 'lol')} // the way we can know what direction the user swiped is by comparing prev to new index
          >
            {!noItemsInPaoList &&
              study.study ?

              study.paoStudySets.person.map((item, index) => {
                return (
                  <AlignCenterWrapper key={index}>
                    <FlashcardItSelf collection={study.paoStudySets} index={index} studyMode={true} />
                  </AlignCenterWrapper>
                )
              })
              :
              // flashcardOrderAssortment.map((collection, index) => { //! just like we've mapped out the pao itemes here We have to study pao fpr study cards here as well
              // })
              arrToRenderOfTen.map(num => {
                // console.log(currentDeckOfCard, 'sd');
                return (
                  <AlignCenterWrapper key={num}>
                    <FlashcardItSelf collection={flashcardOrderAssortment[num]} />
                  </AlignCenterWrapper>
                )
              })
            }
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
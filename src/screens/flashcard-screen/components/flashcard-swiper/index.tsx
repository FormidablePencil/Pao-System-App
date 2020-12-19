import React, { useEffect, useState, useRef, Suspense } from 'react'
import styled from 'styled-components'
import { FAB, Button, Text, Headline } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import FlashcardItSelf from './flashcard-it-self'
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient'
import usePrimaryControlledColor, {
  WhereToColor,
} from '../../../../hooks/usePrimaryControlledColor'
import { RootReducerT } from '../../../../store'
import sortBy from 'lodash.sortby'
import shuffle from 'shuffle-array'
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload'
import randomlyGeneratedPaoList from '../../functions/randomlyGeneratedPaoList'
import { arrangmentOpt } from '../../../../reducer/flashcardOptionsReducer'

const defaultFlashcards = [
  {
    id: null,
    number: null,
    action: null,
    object: null,
    person: null,
  },
]

const FlashcardSwiper = () => {
  const pao = useSelector((state: RootReducerT) => state.pao)
  const study = useSelector((state: RootReducerT) => state.study.study)
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const flashcardOrder = useSelector((state: RootReducerT) => state.flashcardOptions.flashcardOrder)
  const studyList = useSelector((state: RootReducerT) => state.study.list)
  const [flashcardOrderAssortment, setFlashcardOrderAssortment] = useState<any>(defaultFlashcards)
  const swiperReff = useRef(null)

  const bgColor = [
    usePrimaryControlledColor(WhereToColor.flashcardBackground),
    usePrimaryControlledColor(WhereToColor.flashcardBackground2),
  ]
  const noItemsInPaoList = flashcardOrderAssortment[0].number === null

  useEffect(() => {
    // if (study.study) setFlashcardOrderAssortment(study.paoStudySets)
    // else if (!study.study) {
    setFlashcardOrderAssortment(sortBy(pao, 'number'))
    // }
  }, [])

  useEffect(() => {
    console.log('hittttterer')
    console.log(flashcardOrder === arrangmentOpt.random)
    if (flashcardOrder === arrangmentOpt.random) setFlashcardOrderAssortment(shuffle(pao))
    else if (flashcardOrder === arrangmentOpt.sorted) setFlashcardOrderAssortment(sortBy(pao, 'number'))
  }, [flashcardOrder])

  return (
    <Container style={{ ...styles2.slide1 }}>
      <LinearGradient colors={bgColor} end={[0.75, 0.2]} start={[0.01, 0.75]}>
        {!noItemsInPaoList && (
          <Swiper
            ref={swiperReff}
            // autoplay={play}
            // autoplayTimeout={duration} //~ make this a setting
            showsPagination={false}
            loop={true}
            // loadMinimal={false}
            loadMinimal={true}
            loadMinimalSize={2}
            // index={0}
            // onIndexChanged={async (index) =>} // the way we can know what direction the user swiped is by comparing prev to new index
            onIndexChanged={async (index) => await console.log(index)} // the way we can know what direction the user swiped is by comparing prev to new index
          >
            {/*       <AlignCenterWrapper key={index}>
                    <FlashcardItSelf collection={study.paoStudySets} index={index} studyMode={true} />
                  </AlignCenterWrapper> */}

            {flashcardOrderAssortment.map((item, index) => {
              // console.log(currentDeckOfCard, 'sd');
              if (!study || (study && studyList.filter((studyNum) => studyNum === item.number)[0]))
                return (
                  <AlignCenterWrapper key={item}>
                    <FlashcardItSelf index={index} collection={item} />
                  </AlignCenterWrapper>
                )
            })}
          </Swiper>
        )}
        {/* {noItemsInPaoList &&
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
        } */}
      </LinearGradient>
    </Container>
  )
}

export default FlashcardSwiper

const ButtonStyled = styled(Button)`
  margin: 30px 0px 0px 0px;
`
const StyledHeadline = styled<any>(Headline)`
  color: ${({ color }) => color};
`
const StyledText = styled<any>(Text)`
  color: ${({ color }) => color};
`
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const AlignCenterWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const styles2 = StyleSheet.create({
  wrapper: {},
  slide1: {
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})

const GoBackButton = styled(FAB)`
  position: absolute;
  bottom: 0;
  left: 0;
`

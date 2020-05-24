import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { FAB, Colors, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import FlashcardItSelf from './FlashcardItSelf';
import Swiper from 'react-native-swiper'
import sortPaoList from '../components/logic/sortPaoList'
import initialStatePao from '../reducer/paoReducer'
import { LinearGradient } from 'expo-linear-gradient';
import { PaoThemeType } from '../styles/theming';
import { TabNavContext } from '../routes/StackNavigator';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor';

const FlashcardSwiper = ({ }) => {
  const pao = useSelector((state: any) => state.pao)
  const { flashcardOptions } = useSelector((state: any) => state)
  const { autoPlayFlashcards: { play, duration } } = useSelector((state: any) => state.flashcardOptions)
  const { retreivedPaoDataFromDb } = useSelector((state: any) => state.systemMessages)
  const theme: PaoThemeType = useTheme()


  const [flashcardOrderAssortment, setFlashcardOrderAssortment] = useState(null)
  useEffect(() => {
    if (pao !== initialStatePao) {
      const sortedPao = sortPaoList({ list: pao, order: flashcardOptions.flashcardOrder })
      // console.log(sortedPao)
      setFlashcardOrderAssortment(sortedPao)
    } else setFlashcardOrderAssortment(null)
  }, [flashcardOptions])

  const bgColor = [
    usePrimaryControlledColor(WhereToColor.flashcardBackground),
    usePrimaryControlledColor(WhereToColor.flashcardBackground2)
  ]
  return (
    <Container style={{ ...styles2.slide1 }}>
      <LinearGradient
        colors={bgColor}
        end={[.75, .2]} start={[.01, .75]}>
        <Swiper
          // showsButtons={true}
          autoplay={play}
          autoplayTimeout={duration} //~ make this a setting
          showsPagination={false}
          loop={true}
          loadMinimal={true}
          loadMinimalSize={20}
        >
          {flashcardOrderAssortment ? flashcardOrderAssortment.map((collection: any, index: number) => {
            return (
              <AlignCenterWrapper key={index}>
                <FlashcardItSelf collection={collection} />
              </AlignCenterWrapper>
            )
          })
            : pao.map((collection: any, index: number) => {
              return (
                <AlignCenterWrapper key={index}>
                  <FlashcardItSelf collection={collection} />
                </AlignCenterWrapper>
              )
            })
          }
        </Swiper>
      </LinearGradient>
    </Container>
  )
}

export default FlashcardSwiper

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
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import FlashcardItSelf from './FlashcardItSelf';
import Swiper from 'react-native-swiper'
import { TabNavContext } from '../routes/TabNavigator';
import { fabActions } from '../constants/constants';
import sortPaoList from '../components/logic/sortPaoList'

const FlashcardSwiper = ({ }) => {
  const pao = useSelector((state: any) => state.pao[0] ? state.pao : [{ number: null, person: null, action: null, object: null }])
  const { arrangment, autoPlayFlashcards, autoPlayFlashcards: { play, duration } } = useContext(TabNavContext)
  const [flashcardOrderAssortment, setFlashcardOrderAssortment] = useState()
  useEffect(() => {
    const sortedPao = sortPaoList({ list: pao, mode: arrangment })
    console.log(sortedPao)
    setFlashcardOrderAssortment(sortedPao)
  }, [arrangment])


  //! hook up:
  // order for both screens

  return (
    <Container style={{ ...styles2.slide1 }}>
      <Swiper
        showsButtons={true}
        autoPlayFlashcards={autoPlayFlashcards.play}
        autoPlayFlashcardsTimeout={duration} //~ make this a setting
        showsPagination={false}
        loop={true}
        loadMinimal={true}
        loadMinimalSize={1}
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
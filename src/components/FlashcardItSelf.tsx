import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Animated, Easing, PanResponder, StyleSheet, Dimensions } from 'react-native'
import { Button, Card, FAB, IconButton, TextInput, Surface } from 'react-native-paper'
import styled from 'styled-components';
import { createAnimatableComponent } from 'react-native-animatable';
// import CardStack from 'react-native-card-stack-swiper';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Swiper from 'react-native-deck-swiper'
import { TabNavContext } from '../routes/TabNavigator';
import { DefaultTheme } from '@react-navigation/native';
import { PaoTheme } from '../Index'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { PaoAppContext } from '../routes/StackNavigator'
import { tabScreens } from '../constants/constants';
import useAnimation from '../hooks/useAnimation';

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

interface FlashcardsTypes {
  collection: any
}

const FlashcardItSelf = ({ collection }: FlashcardsTypes) => {
  const { flashcardItemDisplayedFront } = useContext(TabNavContext)
  const { tabScreenOptions: { screen, config: { editMode } } } = useContext(PaoAppContext)

  let frontInterpolation: any = useRef(new Animated.Value(0)).current
  let backInterpolation: any = useRef(new Animated.Value(0)).current

  const flipFrontSide = useRef(new Animated.Value(0)).current
  const flipBackSide = useRef(new Animated.Value(0)).current

  let backSideOpacity = useRef(new Animated.Value(1)).current
  let frontSideOpacity = useRef(new Animated.Value(1)).current

  const [toggle, setToggle] = useState(true)
  const { flipCard } = useAnimation({
    flipFrontSide,
    frontSideOpacity,
    backSideOpacity,
    flipBackSide,
    setToggle,
    toggle,
  })

  backInterpolation = flipFrontSide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1.57],
    // extrapolate: 'clamp',
  })
  frontInterpolation = flipBackSide.interpolate({
    inputRange: [0, 1],
    outputRange: [1.57, 0],
    // extrapolate: 'clamp',
  })


  const sides = [
    { side: 'front', interpolation: backInterpolation, opacity: backSideOpacity, symbol: true },
    { side: 'back', interpolation: frontInterpolation, opacity: frontSideOpacity, symbol: false }
  ]
  const paoDisplayOrder = ['number', 'person', 'action', 'object']

  const cardFliperOnPressProp = () => flipCard()
  const cardFliperOnPressPropDisabled = () => { }

  return (
    <>
      {sides.map((sidesDocument: any) =>
        <>
          <AnimatedFlashcard
            key={sidesDocument.side}
            style={{ opacity: sidesDocument.opacity, transform: [{ rotateY: sidesDocument.interpolation }] }}>
            <TouchableWithoutFeedback
              style={{ ...styles.cardDimensions, width: SCREEN_WIDTH / 1.5, height: SCREEN_HEIGHT / 1.8 }}
              onPress={editMode && tabScreens.Flashcards === screen ? cardFliperOnPressPropDisabled : cardFliperOnPressProp}
            >
              <>
                {paoDisplayOrder.map((name: any, index) => {
                  const gotObjectsByName = flashcardItemDisplayedFront.filter(document => Object.keys(document)[0] === name)[0]
                  const key = Object.keys(gotObjectsByName)[0]
                  const valuePair = Object.values(gotObjectsByName)[0]
                  if (valuePair === sidesDocument.symbol) {
                    return (
                      <Wrapper key={index}>
                        <Text style={{color: PaoTheme.colors.primary}}>{key}</Text>
                        <TextInputWrapper>
                          <TextInput
                            style={styles.textInput}
                            disabled={editMode && tabScreens.Flashcards === screen ? false : true}
                            placeholder={'blank'}
                            value={collection[key] ? `${collection[key]}` : null}
                          />
                          {editMode &&
                            <MaterialCommunityIcons size={15} style={{ borderBottomColor: PaoTheme.colors.primary, position: 'absolute', right: -6, top: -3 }} name='pencil' color='lightgrey' />
                          }
                        </TextInputWrapper>
                      </Wrapper>
                    )
                  } else return null
                })}
                <PaoEmpty flashcardItemDisplayedFront={flashcardItemDisplayedFront} symbol={sidesDocument.symbol} />
              </>
            </TouchableWithoutFeedback>
          </AnimatedFlashcard>
        </>
      )}
    </>
  )
}

const PaoEmpty = ({ flashcardItemDisplayedFront, symbol }: any) => {
  //if one side of the card contains no content then display "PAO"
  const arrOfTrues = flashcardItemDisplayedFront.filter(item => Object.values(item)[0] === !symbol)
  if (arrOfTrues[3]) {
    return (
      <Text style={{ fontSize: 30 }}>Pao</Text>
    )
  } else return null
}

const styles = StyleSheet.create({
  cardDimensions: {
    justifyContent: 'center', alignItems: "center", borderRadius: 10, backgroundColor: 'white'
  },
  textInput: {
    height: 25, fontSize: 20, backgroundColor: 'transparent', alignSelf: 'flex-end'
  }

})

const TextInputWrapper = styled.View`
   background-color: transparent;
   flex-direction: row;
   border-radius: 5;
`;
const Wrapper = styled.View`
  align-items: center; 
`;
const FlashcardView = styled.View`
  position: absolute;
  /* top: 0; */
`;
const AnimatedFlashcard = createAnimatableComponent(FlashcardView)





export default FlashcardItSelf

import React, { useRef, useState, useEffect } from 'react'
import { TextInput, Animated, StyleSheet, Dimensions, View } from 'react-native'
import {  useTheme, Text } from 'react-native-paper'
import styled from 'styled-components';
import { createAnimatableComponent } from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useAnimation from '../hooks/useAnimation';
import { useSelector, useDispatch } from 'react-redux';
import { saveControlledInputsToPao } from '../actions/paoAc';
import { PaoThemeType } from '../styles/theming';
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText } from '../hooks/usePrimaryControlledColor';

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

interface FlashcardsTypes {
  collection: any
  studyMode?: boolean
  index?: number
}
export interface ControlledInputsTypes {
  data: {
    [index: number]: {
      number: number
      name: string
      value: string
    }
  }
}

const FlashcardItSelf = ({ collection, studyMode, index }: FlashcardsTypes) => {
  const flashcardOptions = useSelector((state: any) => state.flashcardOptions)
  const flashcardItemDisplayedFront = useSelector((state: any) => state.flashcardOptions.flashcardItemDisplayedFront)
  const editMode = useSelector((state: any) => state.fabProperties.config.editMode)
  const [controlledInputs, setControlledInputs] = useState<ControlledInputsTypes>({
    data: [{ number: null, name: null, value: null }]
  })
  const theme: PaoThemeType = useTheme()
  const [frontSideCurrentlyDisplayed, setFrontSideCurrentlyDisplayed] = useState(true)
  const dispatch = useDispatch()

  let frontInterpolation: any = useRef(new Animated.Value(0)).current
  let backInterpolation: any = useRef(new Animated.Value(0)).current

  let flipFrontSide: any = useRef(new Animated.Value(0)).current
  let flipBackSide: any = useRef(new Animated.Value(0)).current

  let backSideOpacity: any = useRef(new Animated.Value(1)).current
  let frontSideOpacity: any = useRef(new Animated.Value(1)).current

  const [toggle, setToggle] = useState(true)
  const { flipCard } = useAnimation({
    flipFrontSide,
    frontSideOpacity,
    backSideOpacity,
    flipBackSide,
    setToggle,
    toggle,
  })

  useEffect(() => {
    if (!frontSideCurrentlyDisplayed) {
      flipCard()
      setFrontSideCurrentlyDisplayed(true)
    }
  }, [flashcardOptions])

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

  const cardFliperOnPressProp = () => {
    flipCard()
    setFrontSideCurrentlyDisplayed(false)
  }

  const onChangeHandler = ({ number, name, value }) => {
    const newControlledInput = { number, name, value }
    if (controlledInputs.data.filter(input => input.number === number)) {
      const modifiedData = controlledInputs.data.filter(collection => {
        if (collection.number === number) {
          return newControlledInput
        } else {
          collection
        }
      })
      setControlledInputs({ ...controlledInputs, data: modifiedData })
    } else setControlledInputs({ ...controlledInputs, data: { ...controlledInputs.data, ...{ number, name, value } } })
  }
  const handleOnBlur = () => {
    dispatch(saveControlledInputsToPao(controlledInputs))
  }
  const formatPaoItems = (key) => {
    if (typeof collection[key] === 'number' || typeof collection[key] === 'string') {
      if (typeof collection[key] === 'number' && collection[key].toString().length === 1) return `0${collection[key]}`
      else return `${collection[key]}`
    } else return 'pao'
  }

  const bgColor = usePrimaryControlledColor(WhereToColor.flashcardItself)
  const controlledTextColor = distinguishingTextColorFromRestOfText().color
  const textColorRenderConditionally = controlledTextColor ?? '#828282'
  const textColor = (key) => {
    return typeof collection[key] === 'number' || typeof collection[key] === 'string' ? textColorRenderConditionally : 'rgba(51,51,51,.2)'
  }


  return (
    <>
      {sides.map((sidesDocument: any) =>
        <AnimatedFlashcard
          key={sidesDocument.side}
          style={{ opacity: sidesDocument.opacity, transform: [{ rotateY: sidesDocument.interpolation }] }}
        >
          <TouchableWithoutFeedback
            style={{
              ...styles.cardDimensions,
              width: SCREEN_WIDTH / 1.5,
              height: SCREEN_HEIGHT / 1.8,
              backgroundColor: bgColor,
            }}
            onPress={() => cardFliperOnPressProp()}
          >
            <>
              {studyMode ?
                <StudyMode collection={collection} index={index} side={sidesDocument.side} />
                :
                <RegularMode
                  paoDisplayOrder={paoDisplayOrder}
                  editMode={editMode}
                  flashcardItemDisplayedFront={flashcardItemDisplayedFront}
                  sidesDocument={sidesDocument}
                  collection={collection}
                  handleOnBlur={handleOnBlur}
                  textColor={textColor}
                  formatPaoItems={formatPaoItems}
                  onChangeHandler={onChangeHandler}
                />
              }
            </>
            <PaoEmpty flashcardItemDisplayedFront={flashcardItemDisplayedFront} symbol={sidesDocument.symbol} />
          </TouchableWithoutFeedback>
        </AnimatedFlashcard>
      )}
    </>
  )
}

const StudyMode = ({ collection, index, side }) => {
  return (
    <Wrapper>
      {['person', 'action', 'object'].map(name => {
        return (
          <StudyCardContainer key={name} side={side}>
            <StudyCardText>
              {collection[name][index].item}
            </StudyCardText>
            {side === 'back' &&
              <StudyCardText>
                {collection[name][index].number}
              </StudyCardText>
            }
          </StudyCardContainer>
        )
      })}
    </Wrapper>
  )
}

const RegularMode = ({
  paoDisplayOrder, editMode, flashcardItemDisplayedFront, sidesDocument,
  collection, handleOnBlur, textColor, formatPaoItems, onChangeHandler }) => {
  const theme = useTheme()

  return (
    <>
      {paoDisplayOrder.map((name: any, index) => {
        const gotObjectsByName = flashcardItemDisplayedFront.filter(document => Object.keys(document)[0] === name)[0]
        const key = Object.keys(gotObjectsByName)[0]
        const valuePair = Object.values(gotObjectsByName)[0]

        if (valuePair === sidesDocument.symbol) {
          return (
            <Wrapper key={name}>
              <PaoName color={theme.colors.primary}>{key}</PaoName>
              <>
                {editMode ?
                  <TextInput
                    style={styles.textInput}
                    placeholder={'edit'}
                    value={collection[key] ? `${collection[key]}` : null}
                    onChangeText={(value) => onChangeHandler({ number: collection.number, name, value })}
                    onBlur={() => handleOnBlur()}
                    textAlign={'center'}
                  />
                  :
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[styles.textInput,
                    {
                      alignSelf: "center",
                      textAlign: 'center',
                      color: textColor(key)
                    }
                    ]}>
                      {formatPaoItems(key)}
                    </Text>
                  </View>
                }
              </>
            </Wrapper>
          )
        } else return null
      })}
    </>
  )
}

const PaoEmpty = ({ flashcardItemDisplayedFront, symbol }: any) => {
  const arrOfTrues = flashcardItemDisplayedFront.filter(item => Object.values(item)[0] === !symbol)
  if (arrOfTrues[3]) {
    return (
      <Text style={{ fontSize: 30, fontFamily: 'MontserratReg' }}>Pao</Text>
    )
  } else return null
}

const styles = StyleSheet.create({
  cardDimensions: { justifyContent: 'center', alignItems: "center", borderRadius: 10, backgroundColor: 'white' },
  textInput: { height: 40, fontSize: 30, backgroundColor: 'transparent', fontFamily: 'MontserratReg', width: '100%' }
})
const StudyCardText = styled(Text)`
  align-self: center;
  text-align: center;
  font-family: MontserratReg; 
  font-size: 30;
`
const StudyCardContainer = styled<any>(View)`
  height: 60;
  background-color: transparent;
  flex-direction: row;
  width: 100%;
  justify-content: ${({ side }) => side === 'front' ? 'center' : 'space-between'};
`
const PaoName = styled<any>(Text)`
  color: ${({ color }) => color};
`;
const TextInputWrapper = styled(View)`
   background-color: transparent;
   flex-direction: row;
   border-radius: 5;
   height: 50;
`;
const Wrapper = styled(View)`
  align-items: center; 
  width: 100%;
`;
const FlashcardView = styled(View)`
  position: absolute;
`;
const AnimatedFlashcard = createAnimatableComponent(FlashcardView)

export default FlashcardItSelf

import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components';
import { createAnimatableComponent } from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useAnimation from '../../../../../hooks/useAnimation';
import { useSelector, useDispatch } from 'react-redux';
import { saveControlledInputsToPao } from '../../../../../actions/paoAc';
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText } from '../../../../../hooks/usePrimaryControlledColor';
import { RootReducerT } from '../../../../../store';
import StudyModeTxt from './StudyModeTxt';
import RenderPaoItems from './RenderPaoItems';
import GuessingFeature from '../guessing-feature';

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
    filter?: any
  }
}

const FlashcardItSelf = ({ collection, index }: FlashcardsTypes) => {
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped)
  const flashcardOptions = useSelector((state: any) => state.flashcardOptions)
  const flashcardItemDisplayedFront = useSelector((state: any) => state.flashcardOptions.flashcardItemDisplayedFront)
  const editMode = useSelector((state: any) => state.fabProperties.config.editMode)
  const [controlledInputs, setControlledInputs] = useState<ControlledInputsTypes>({
    data: [{ number: null, name: null, value: null }]
  })
  const [frontSideCurrentlyDisplayed, setFrontSideCurrentlyDisplayed] = useState(true)
  const dispatch = useDispatch()


  const [toggle, setToggle] = useState(true)
  const {
    flipCard,
    frontInterpolation,
    backInterpolation,
    backSideOpacity,
    frontSideOpacity,
  } = useAnimation({ setToggle, toggle })

  const sides = [
    { side: 'front', interpolation: backInterpolation, opacity: backSideOpacity, symbol: true },
    { side: 'back', interpolation: frontInterpolation, opacity: frontSideOpacity, symbol: false }
  ]
  const paoDisplayOrder = ['number', 'person', 'action', 'object']

  const cardFliperOnPressProp = () => {
    flipCard()
    setFrontSideCurrentlyDisplayed(false)
  }

  useEffect(() => {
    if (!frontSideCurrentlyDisplayed) {
      flipCard()
      setFrontSideCurrentlyDisplayed(true)
    }
  }, [flashcardOptions])

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
        <>
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
                {isRandomStudyMode ?
                  <StudyModeTxt isFlipped={isFlipped} index={index} side={sidesDocument.side} />

                  :
                  <RenderPaoItems
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
          {sidesDocument.side === 'back' && <GuessingFeature />}
        </>
      )}
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
})


const FlashcardView = styled(View)`
  position: absolute;
`;
const AnimatedFlashcard = createAnimatableComponent(FlashcardView)

export default FlashcardItSelf

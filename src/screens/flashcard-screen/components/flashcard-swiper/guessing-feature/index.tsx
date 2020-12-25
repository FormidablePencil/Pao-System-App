import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootReducerT } from '../../../../../store'
import { formatNum } from '../../../../utilities/formatNum'
import useGetStudyModeRandom from '../../../functions/useGetStudyModeRandom'
import generateGuessingFeatureArr from './generateGuessingFeatureArr'
import getColorIfCorrect from './getColorIfCorrect'
import paoItemsForGuessingFeature from './paoItemsForGuessingFeature'

// toggle game
// label each correct number by a given color. Give all others the same color to indicate incorrect


const GuessingFeature = ({ index }) => {
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped)
  const [arrOfNumbersToGuess, setArrOfNumbersToGuess] = useState<number[]>([])
  const [selected, setSelected] = useState([])
  const { getNumberRandomMode } = useGetStudyModeRandom()
  const correctNumbers = [
    parseInt(getNumberRandomMode('person', index)),
    parseInt(getNumberRandomMode('action', index)),
    parseInt(getNumberRandomMode('object', index)),
  ]
  // const getTheColorIfCorrect = getColorIfCorrect({index, num: number, selected, correctNumbers })
  const { arrOfPaoItemTextToGuess } = paoItemsForGuessingFeature({
    correctNumbers, arrOfNumbersToGuess, index
  })

  useEffect(() => {
    const generatedGuessingFeatureArr = generateGuessingFeatureArr({ correctNumbers })
    setArrOfNumbersToGuess(generatedGuessingFeatureArr)
  }, [])

  const updateSelected = (number: number, index: number) => {
    if (selected.find(item => item[1] === index)) return
    const newlySelected = [number, index]
    setSelected(prev => [...prev, newlySelected])
  }

  return (
    <View style={styles.container}>
      {isFlipped
        ? arrOfNumbersToGuess.map((number, i) =>
          <ButtonComp
            text={formatNum(number)}
            onPressHandler={() => updateSelected(number, i)}
            flippedTxtStyles={getColorIfCorrect({ index: i, num: number, selected, correctNumbers })?.textProps}
            linearGradientStyles={getColorIfCorrect({ index: i, num: number, selected, correctNumbers }).color}
          />
        ) : arrOfPaoItemTextToGuess.map((paoArr, i) =>
          <ButtonComp
            text={paoArr[1]}
            onPressHandler={() => updateSelected(paoArr[0], i)}
            flippedTxtStyles={getColorIfCorrect({ index: i, num: paoArr[0], selected, correctNumbers })?.textProps}
            linearGradientStyles={getColorIfCorrect({ index: i, num: paoArr[0], selected, correctNumbers }).color}
          />
        )
      }
    </View>
  )
}

const ButtonComp = ({
  linearGradientStyles,
  onPressHandler,
  flippedTxtStyles,
  text,
}) => {
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped)

  return (
    <TouchableOpacity
      style={[styles.numberButton, styles.sharedBtn]}
      onPress={onPressHandler}>
      <LinearGradient
        style={styles.sharedBtn}
        colors={linearGradientStyles}
        start={[0.8, 0.8]}
      >
        {isFlipped ?
          <Text style={[styles.textColor, flippedTxtStyles]}>
            {text}
          </Text>
          :
          <Text style={[styles.textColor, flippedTxtStyles]}>
            {text?.substr(0, 6)}
            {/* {number} */}
          </Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 75,
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    margin: 5,
    elevation: 6,
  },
  sharedBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 60,
    width: 60,
  },
  textColor: {
    color: 'white',
    fontFamily: 'MontserratMed',
  },
  personBtn: {},
  actionBtn: {},
  objectBtn: {},
})


export default GuessingFeature

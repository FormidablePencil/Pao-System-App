import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootReducerT } from '../../../../../store'
import useGetStudyModeRandom from '../../../functions/useGetStudyModeRandom'
import generateGuessingFeatureArr from './generateGuessingFeatureArr'
import getColorIfCorrect from './getColorIfCorrect'
import paoItemsForGuessingFeature from './paoItemsForGuessingFeature'

// toggle game
// label each correct number by a given color. Give all others the same color to indicate incorrect


const GuessingFeature = ({ index }) => {
  const [arrOfNumbersToGuess, setArrOfNumbersToGuess] = useState<number[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const theme = useTheme()
  const { getPaoItemRandomMode, getNumberRandomMode } = useGetStudyModeRandom()
  const correctNumbers = [
    parseInt(getNumberRandomMode('person', index)),
    parseInt(getNumberRandomMode('action', index)),
    parseInt(getNumberRandomMode('object', index)),
  ]
  const { arrOfPaoItemTextToGuess } = paoItemsForGuessingFeature({ correctNumbers, arrOfNumbersToGuess, index })
  const getTheColorIfCorrect = getColorIfCorrect({ selected, correctNumbers })
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped)

  useEffect(() => {
    // console.log(arrOfPaoItemTextToGuess)
  }, [arrOfPaoItemTextToGuess])
  
  useEffect(() => {
  // console.log(selected, correctNumbers)
  }, [selected])

  useEffect(() => {
    const generatedGuessingFeatureArr = generateGuessingFeatureArr({ correctNumbers })
    setArrOfNumbersToGuess(generatedGuessingFeatureArr)
  }, [])


  const onPressHandler = (number: number) => {
    console.log(typeof number)
    setSelected(prev => prev.concat(number))
  }

  return (
    <View style={styles.container}>
      {isFlipped
        ? arrOfNumbersToGuess.map(number =>
          <ButtonComp
            text={number}
            ifFlippedText={number}
            onPressHandler={() => onPressHandler(number)}
            flippedTxtStyles={getTheColorIfCorrect(number)?.textProps}
            linearGradientStyles={getTheColorIfCorrect(number).color}
          />
        ) : arrOfPaoItemTextToGuess.map(paoArr =>
          <></>
          // <ButtonComp
          //   text={paoArr}
          //   ifFlippedText={paoArr}
          //   // onPressHandler={() => onPressHandler(paoArr)}
          //   onPressHandler={console.log('object')}
          //   flippedTxtStyles={getTheColorIfCorrect(paoArr)?.textProps}
          //   linearGradientStyles={getTheColorIfCorrect(paoArr).color}
          // />
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
  ifFlippedText
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
            {ifFlippedText}
          </Text>
          :
          <Text style={styles.textColor}>
            {text}
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

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// toggle game
//  create a counter to count correct/all
const amountOfNumbersToGuess = 10

const GuessingFeature = ({ }) => {
  const [arrOfNumbersToGuess, setArrOfNumbersToGuess] = useState<number[]>([])
  const [selected, setSelected] = useState<number[]>([])

  const generateArrOfNumbers = () => {
    let generatedArrOfNumbers = []
    for (let i = 0; i < 10; i++)
      generatedArrOfNumbers.push(Math.floor(Math.random() * 99))
    setArrOfNumbersToGuess(generatedArrOfNumbers)
  }
  const shuffleCorrectNumbersInGeneratedArrOfNumbers = () => {
    // replace the first three with the correct three
    // then shuffle
    // then set as new
  }

  useEffect(() => {
    generateArrOfNumbers()
    shuffleCorrectNumbersInGeneratedArrOfNumbers()

  }, [])


  const onHandleSelect = () => {
    // check every time if number was correct
    // and check if whether 3 numbers have been selected
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Guessing feature</Text>
        {arrOfNumbersToGuess.map(number =>
          <TouchableOpacity onPress={onHandleSelect}><Text>{number}</Text></TouchableOpacity>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 0,
    width: '65%',
  }
})


export default GuessingFeature

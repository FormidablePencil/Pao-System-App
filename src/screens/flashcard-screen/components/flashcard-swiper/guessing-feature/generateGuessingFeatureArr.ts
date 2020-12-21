import shuffle from "shuffle-array"
import { generateRandomNumEqualToCertain } from "./paoItemsForGuessingFeature"

export const totalPaoItemsToGuess = 9

const generateGuessingFeatureArr = ({ correctNumbers }: { correctNumbers: number[] }) => {
  let generatedArrOfNumbers: number[] = []

  const generateGuessingFeatureMethods = {
    generateArrOfNumbers() {
      for (let i = 0; i < totalPaoItemsToGuess - 3; i++) {
        const number = generateRandomNumEqualToCertain({
          correctNumbers,
          arrToCompareForEquality: generatedArrOfNumbers
        })
        generatedArrOfNumbers.push(number)
      }
    },
    mergeCorrectNumbersToGeneratedArr() {
      const merged = [...generatedArrOfNumbers, ...correctNumbers]
      generatedArrOfNumbers = merged
    },
  }

  const {
    generateArrOfNumbers,
    mergeCorrectNumbersToGeneratedArr,
  } = generateGuessingFeatureMethods

  generateArrOfNumbers()
  mergeCorrectNumbersToGeneratedArr()
  shuffle(generatedArrOfNumbers)

  return generatedArrOfNumbers
}


export default generateGuessingFeatureArr

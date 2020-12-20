import shuffle from "shuffle-array"

export const totalPaoItemsToGuess = 9

const generateGuessingFeatureArr = ({ correctNumbers }: { correctNumbers: number[] }) => {
  let generatedArrOfNumbers: number[] = []


  const generateGuessingFeatureMethods = {
    searchGeneratedNumbers(search) {
      return generatedArrOfNumbers.find(generatedNumb => search === generatedNumb)
    },

    generateArrOfNumbers() {
      for (let i = 0; i < totalPaoItemsToGuess - 3; i++)
        generatedArrOfNumbers.push(Math.floor(Math.random() * 100))
    },

    getArrOfCorrectNumbersNotExistentInGeneratedArr() {
      const arrOfCorrectNumbersNotExistentInGeneratedArr = []
      correctNumbers.map(correctNum => {
        const found = generateGuessingFeatureMethods.searchGeneratedNumbers(correctNum)
        if (typeof found !== 'number') arrOfCorrectNumbersNotExistentInGeneratedArr.push(correctNum)
      })
      return arrOfCorrectNumbersNotExistentInGeneratedArr
    },

    mergeCorrectNumbersToGeneratedArr({ arrOfCorrectNumbers }) {
      const merged = [...generatedArrOfNumbers, ...arrOfCorrectNumbers]
      generatedArrOfNumbers = merged
    },
  }

  const {
    generateArrOfNumbers,
    getArrOfCorrectNumbersNotExistentInGeneratedArr,
    mergeCorrectNumbersToGeneratedArr,
  } = generateGuessingFeatureMethods

  generateArrOfNumbers()
  mergeCorrectNumbersToGeneratedArr({
    arrOfCorrectNumbers: getArrOfCorrectNumbersNotExistentInGeneratedArr()
  })
  shuffle(generatedArrOfNumbers)

  return generatedArrOfNumbers
}


export default generateGuessingFeatureArr

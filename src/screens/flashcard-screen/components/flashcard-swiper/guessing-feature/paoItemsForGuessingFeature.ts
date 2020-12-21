import { useEffect, useState } from "react"
import ascertainPaoType, { PaoTypesT } from "../../../../functions/ascertainPaoType"
import useGetStudyModeRandom from "../../../functions/useGetStudyModeRandom"

const generateGuessingFeatureArr = ({ correctNumbers, arrOfNumbersToGuess, index }) => {
  const [arrOfPaoItemTextToGuess, setArrOfPaoItemTextToGuess] = useState([])
  const { getPaoItemRandomMode } = useGetStudyModeRandom()

  const generatePaoItemTxt = () => {
    let newlyGeneratedArr = []
    arrOfNumbersToGuess.map(number => {
      const foundPaoType = ascertainPaoType({ evalNum: number, correctNumbers })
      let createdItem
      if (foundPaoType) {
        createdItem = [number, getPaoItemRandomMode(foundPaoType, index)]
        newlyGeneratedArr.push(createdItem)
      } else {
        const uniqueNumber = generateRandomNumEqualToCertain({
          correctNumbers,
          arrToCompareForEquality: newlyGeneratedArr
        })
        createdItem = [
          uniqueNumber,
          getPaoItemRandomMode(generatePaoTypes(), number)
        ]
        newlyGeneratedArr.push(createdItem)
      }
    })
    return newlyGeneratedArr
  }

  useEffect(() => {
    setArrOfPaoItemTextToGuess(generatePaoItemTxt())
  }, [arrOfNumbersToGuess])


  return { arrOfPaoItemTextToGuess }
}

export const generateRandomNumEqualToCertain = ({ correctNumbers, arrToCompareForEquality }) => {
  let equal = false
  let generateUniqueNum
  do {
    generateUniqueNum = Math.floor(Math.random() * 100)
    if (
      typeof correctNumbers.find(correctNum => generateUniqueNum === correctNum) === 'number'
      || typeof arrToCompareForEquality.find(item => generateUniqueNum === item) === 'number'
    ) {
      equal = true
      // console.log(generateUniqueNum, 'is index')
    } else equal = false
  } while (equal === true);
  return generateUniqueNum
}

export const generatePaoTypes = () => {
  const arrPaoTypes = [PaoTypesT.person, PaoTypesT.action, PaoTypesT.object]
  return arrPaoTypes[Math.floor(Math.random() * 2)]
}

export default generateGuessingFeatureArr

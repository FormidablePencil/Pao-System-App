import { useEffect, useState } from "react"
import ascertainPaoType, { PaoTypesT } from "../../../../functions/ascertainPaoType"
import useGetStudyModeRandom from "../../../functions/useGetStudyModeRandom"

const paoItemsForGuessingFeature = (
  { correctNumbers, arrOfNumbersToGuess, index }: { correctNumbers, arrOfNumbersToGuess, index }
) => {
  const { getPaoItemRandomMode } = useGetStudyModeRandom()
  const [arrOfPaoItemTextToGuess, setArrOfPaoItemTextToGuess] = useState([])

  const generatePaoItemTxt = () => {
    let newlyGeneratedArr = []
    arrOfNumbersToGuess.map(number => {
      const foundPaoType = ascertainPaoType({ evalNum: number, correctNumbers })
      let createdItem
      if (foundPaoType) {
        createdItem = [number, getPaoItemRandomMode(foundPaoType, index)]
        if (!createdItem[1] || !createdItem[0]) return
        newlyGeneratedArr.push(createdItem)
      } else {
        const { generatedPaoItem, paoNum } = generateUniquePaoItem({ compareArr: newlyGeneratedArr, number })
        createdItem = [number, generatedPaoItem]
        newlyGeneratedArr.push(createdItem)
      }
    })
    // console.log(newlyGeneratedArr, 'newlyGeneratedArr')
    return newlyGeneratedArr
  }


  const generateUniquePaoItem = ({ compareArr, number }: { compareArr, number }) => {
    let generatedPaoItem = getPaoItemRandomMode(generatePaoTypes(), number)
    let hasChanged = false

    const isItemUnique = ({ generatedPaoItem }) => {
      let isUnique = true
      compareArr.map(item => { if (item[1] === generatedPaoItem) isUnique = false })
      return isUnique
    }

    const keepGeneratingUntilPaoItemUnique = () => {
      let stopIteration = false
      do {
        if (isItemUnique({ generatedPaoItem }) === false) {
          console.log(generatedPaoItem, 'generatedPaoItem')
          number = Math.floor(Math.random() * 100)
          generatedPaoItem = getPaoItemRandomMode(generatePaoTypes(), number)
          hasChanged = true
          console.log(hasChanged ? { hasChanged, k: 'hasChanged' } : 'no')
          console.log(generatedPaoItem, 'new')
        } else {
          stopIteration = true
        }
      } while (stopIteration === false)
      return { generatedPaoItem, paoNum: number }
    }

    return keepGeneratingUntilPaoItemUnique()
  }

  useEffect(() => {
    setArrOfPaoItemTextToGuess(generatePaoItemTxt())
  }, [arrOfNumbersToGuess])


  return { arrOfPaoItemTextToGuess }
}

export const generatePaoTypes = () => {
  const arrPaoTypes = [PaoTypesT.person, PaoTypesT.action, PaoTypesT.object]
  return arrPaoTypes[Math.floor(Math.random() * 2)]
}

export default paoItemsForGuessingFeature

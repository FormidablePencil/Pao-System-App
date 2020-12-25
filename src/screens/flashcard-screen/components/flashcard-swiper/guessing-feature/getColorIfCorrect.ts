import ascertainType, { PaoTypesT } from "../../../../utilities/ascertainPaoType"

const getColorIfCorrect = ({ index, num, selected, correctNumbers }) => {

  const generateNewColorIfDuplicates = ({ ascertained }) => {
    const duplicates = selected.filter(item => (item[0] === num))
    // if (duplicates.length === 1) {
    //   if (duplicates[0][1] === index) return PaoTypesT.person
    // }
     if (duplicates.length === 2) {
      if (duplicates[0][1] === index) return PaoTypesT.person
      if (duplicates[1][1] === index) return PaoTypesT.action
    }
    else if (duplicates.length === 3) {
      if (duplicates[0][1] === index) return PaoTypesT.person
      if (duplicates[1][1] === index) return PaoTypesT.action
      if (duplicates[2][1] === index) return PaoTypesT.object
    }
    else return ascertained
  }

  // return (num, index) => {
  const defaultColor = ['#61A8FF', '#507FC7']
  const incorrectColor = ['#FF559E', '#C51241']
  const personColor = ['#61FFFA', '#4EBCFF']
  const actionColor = ['#F9FF67', '#FFBF42']
  const objectColor = ['#7EFF79', '#18FFD0']
  const textProps = { color: 'black', }

  if (selected.find(item => (item[0] === num && item[1] === index)) === undefined)
    return { color: defaultColor }
  let ascertained = ascertainType({ evalNum: num, correctNumbers })
  ascertained = generateNewColorIfDuplicates({ ascertained })

  switch (ascertained) {
    case PaoTypesT.person: return { color: personColor, textProps }
    case PaoTypesT.action: return { color: actionColor, textProps }
    case PaoTypesT.object: return { color: objectColor, textProps }
    default: return { color: incorrectColor }
  }
  // }
}

export default getColorIfCorrect
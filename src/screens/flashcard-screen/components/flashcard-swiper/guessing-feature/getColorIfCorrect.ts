import ascertainType, { PaoTypesT } from "../../../../functions/ascertainPaoType"

const getColorIfCorrect = ({ selected, correctNumbers }) => {
  return (num) => {
    const defaultColor = ['#391491', '#4F3A91']
    const incorrectColor = ['#FF559E', '#C51241']
    const personColor = ['#61FFFA', '#4EBCFF']
    const actionColor = ['#F9FF67', '#FFBF42']
    const objectColor = ['#7EFF79', '#18FFD0']
    const textProps = { color: 'black', }

    if (!selected.find(selectedNum => selectedNum === num)) {
      return { color: defaultColor }
    }

    const ascertained = ascertainType({ evalNum: num, correctNumbers })
    switch (ascertained) {
      case PaoTypesT.person: return { color: personColor, textProps }
      case PaoTypesT.action: return { color: actionColor, textProps }
      case PaoTypesT.object: return { color: objectColor, textProps }
      default: return { color: incorrectColor }
    }
  }
}

export default getColorIfCorrect
import ascertainType, { PaoTypesT } from "../../../../functions/ascertainPaoType"

const getColorIfCorrect = ({ selected, correctNumbers }) => {
  return (num) => {
    console.log(selected, correctNumbers)
    // console.log(num, 'onPressHandler')
    const defaultColor = ['#391491', '#4F3A91']
    const incorrectColor = ['#F5467D', '#C51241']
    const personColor = ['#61FFFA', '#4EBCFF']
    const actionColor = ['#FEFF67', '#FFC373']
    const objectColor = ['#7EFF79', '#18FFD0']
    const textProps = { color: 'black', }

    if (!selected.find(selectedNum => selectedNum === selected))
      return { color: defaultColor }

    const ascertained = ascertainType({ evalNum: selected, correctNumbers })
    switch (ascertained) {
      case PaoTypesT.person: return { color: personColor, textProps }
      case PaoTypesT.action: return { color: actionColor, textProps }
      case PaoTypesT.object: return { color: objectColor, textProps }
      default: return { color: incorrectColor }
    }
  }
}

export default getColorIfCorrect
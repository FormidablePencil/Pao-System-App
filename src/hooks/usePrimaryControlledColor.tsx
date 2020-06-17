import { useContext } from "react"
import { ControlledThemeContext } from "../routes/StackNavigator"
import { PaoTheme } from "../styles/theming"
import { useSelector } from "react-redux"


export const textControlledColor = () => useTextColorFormula(210, 30)
export const textControlledColorPagination = () => useTextColorFormula(180, 180).color ?? { color: 'rgba(255,255,255,.4)' }

export const placeholderControlledColor = () => useTextColorFormula(220, 30)
export const distinguishingTextColorFromRestOfText = () => useTextColorFormula(255, 30)
export const currentCardIndexTextControlledColor = () => useTextColorFormula(175, 255)

const useTextColorFormula = (firstNum: number, secondNum: number) => {
  const { controlledThemeColor } = useSelector((state: any) => state)
  if (controlledThemeColor > .5) {
    return { color: `rgba(${firstNum},${firstNum},${firstNum},1.0)` }
  } else if (controlledThemeColor !== null && controlledThemeColor <= .5) {
    return { color: `rgba(${secondNum},${secondNum},${secondNum},1.0)` }
  } else return { color: null }
}

export enum WhereToColor {
  profileTopHalf,
  profileBottomHalf1,
  profileBottomHalf2,
  profileHeader,
  flashcardBackground,
  flashcardItself,
  tableHeader,
  tableHeader2,
  rowEven,
  rowOdd,
  pagination,
  pagination2,
  primaryColor,
  accentColor,
  paginationBtns,
  paginationSideBtn,
  screenHeaderBack,
  flashcardBackground2,
  fabActionEdit,
  fabActonProfile,
  goToUnfilledBtn,
  flashcardBtnGoToPaoList,
  orderBtnSelected,
  fabActionContentBg,
  switchBtnSelected,
  studyModeOn,
  studyModeOff,
}
const defaultRgb = (dynamicValue) => Math.floor(255 - 255 * dynamicValue)
const usePrimaryControlledColor = (where?: WhereToColor, color?: string) => {
  const controlledThemeColor = useSelector((state: any) => state.controlledThemeColor)

  let rgb
  let opacity = 1

  switch (where) {
    case WhereToColor.flashcardItself:
      if (controlledThemeColor) rgb = Math.floor(255 - 155 * controlledThemeColor)
      else rgb = 255
      break;

    case WhereToColor.pagination:
    case WhereToColor.tableHeader:
    case WhereToColor.profileHeader:
    case WhereToColor.flashcardBackground:
    case WhereToColor.profileBottomHalf2:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 100,
          second: 50,
          third: 10,
          fourth: color,
          _default: 255
        })
      }
      else return PaoTheme.colors.linearGradientBgColors.first
      break


    case WhereToColor.flashcardBackground2:
    case WhereToColor.pagination2:
    case WhereToColor.tableHeader2:
    case WhereToColor.profileBottomHalf1:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 100,
          second: 50,
          third: 10,
          fourth: color,
          _default: 255
        })
      }
      // if (controlledThemeColor) rgb = defaultRgb(controlledThemeColor)
      else return PaoTheme.colors.linearGradientBgColors.second
      break;

    case WhereToColor.profileTopHalf:
    case WhereToColor.rowEven:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: Math.floor(255 - 75 * controlledThemeColor),
          second: Math.floor(255 - 205 * controlledThemeColor),
          third: Math.floor(255 - 205 * controlledThemeColor),
          fourth: color, _default: 255
        })
      } else return 'rgba(242,249,255,1.0)'
      break;

    case WhereToColor.rowOdd:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: Math.floor(255 - 235 * controlledThemeColor),
          second: Math.floor(255 - 255 * controlledThemeColor),
          third: Math.floor(255 - 225 * controlledThemeColor),
          fourth: color, _default: 255
        })
      } else return 'rgba(218,238,255,1.0)'
      break

    case WhereToColor.studyModeOff:
    case WhereToColor.paginationBtns:
    case WhereToColor.accentColor:
    case WhereToColor.primaryColor:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 150,
          second: 150,
          third: 100,
          fourth: color,
          _default: 255
        })
      } else return color
      // opacity = .8
      break;

    case WhereToColor.screenHeaderBack:
    case WhereToColor.paginationSideBtn:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 150,
          second: 150,
          third: 100,
          fourth: color,
          _default: 255
        })
        opacity = .5
      } else {
        rgb = 255
        opacity = .13
      }
      break

    case WhereToColor.studyModeOn:
    case WhereToColor.switchBtnSelected:
    case WhereToColor.orderBtnSelected:
    case WhereToColor.flashcardBtnGoToPaoList:
    case WhereToColor.goToUnfilledBtn:
    case WhereToColor.fabActionEdit:
    case WhereToColor.fabActonProfile:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 150,
          second: 150,
          third: 100,
          fourth: color,
          _default: 255
        })
      } else return color
      // opacity = .8
      break;

    case WhereToColor.fabActionContentBg:
      if (controlledThemeColor) {
        rgb = primaryControllerColorFormula({
          controlledThemeColor,
          first: 20,
          second: 200,
          third: 290,
          fourth: color,
          _default: 255
        })
        rgb = '#1A4749'
      } else return color


    default:
      if (controlledThemeColor) rgb = defaultRgb(controlledThemeColor)
      else rgb = 240
      break;
  }
  return `rgba(${rgb}, ${rgb}, ${rgb}, ${opacity})`
}

const primaryControllerColorFormula = ({ controlledThemeColor, first, second, third, fourth, _default }) => {
  if (controlledThemeColor <= .4) {
    return first
  } else if (controlledThemeColor > .4 && controlledThemeColor < .7) {
    return second
  } else if (controlledThemeColor >= .7) {
    return third
  } else if (fourth) {
    return fourth
  } else return _default
}

export default usePrimaryControlledColor
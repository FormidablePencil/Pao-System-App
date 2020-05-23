import { useContext } from "react"
import { ControlledThemeContext } from "../routes/StackNavigator"
import { PaoTheme } from "../styles/theming"

export const textControlledColor = () => textColorFormula(210, 30)
export const textControlledColorPagination = () => textColorFormula(180, 180)

export const placeholderControlledColor = () => textColorFormula(220, 30)
export const distinguishingTextColorFromRestOfText = () => textColorFormula(255, 30)

const textColorFormula = (firstNum: number, secondNum: number) => {
  const { controlledThemeColor } = useContext(ControlledThemeContext)
  if (controlledThemeColor > .5) {
    return { color: `rgba(${firstNum},${firstNum},${firstNum},1.0)` }
  } else if (controlledThemeColor <= .5) {
    return { color: `rgba(${secondNum},${secondNum},${secondNum},1.0)` }
  } else return
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
}
const defaultRgb = (dynamicValue) => Math.floor(255 - 255 * dynamicValue)
const usePrimaryControlledColor = (where?: WhereToColor, color?: string) => {
  const { controlledThemeColor } = useContext(ControlledThemeContext)

  let rgb
  let opacity = 1

  switch (where) {
    case WhereToColor.flashcardItself:
      if (controlledThemeColor) rgb = Math.floor(255 - 155 * controlledThemeColor)
      else rgb = 220
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

    case WhereToColor.paginationBtns:
    case WhereToColor.accentColor:
    case WhereToColor.primaryColor:
      rgb = primaryControllerColorFormula({
        controlledThemeColor,
        first: 100,
        second: 150,
        third: 100,
        fourth: color,
        _default: 255
      })
      // opacity = .8
      break;

    case WhereToColor.paginationSideBtn:
      rgb = primaryControllerColorFormula({
        controlledThemeColor,
        first: 100,
        second: 150,
        third: 100,
        fourth: color,
        _default: 255
      })
      opacity = .5
      break

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
import { PaoTheme } from "../../styles/theming"
import { useContext } from "react"
import { ControlledThemeContext } from "../../routes/StackNavigator"

export const capitalizeFirstCharFunc = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

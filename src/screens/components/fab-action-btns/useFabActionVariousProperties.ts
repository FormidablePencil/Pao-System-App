import { useNavigation } from "@react-navigation/native"
import { createRef } from "react"
import { useTheme } from "react-native-paper"
import { tabScreens } from "../../../constants/constants"
import { fabActionOptions } from "../../../constants/fabConstants"
import usePrimaryControlledColor, { WhereToColor } from "../../../hooks/usePrimaryControlledColor"
import { PaoThemeType } from "../../../styles/theming"

export const navigationRef: any = createRef();

const useFabActionVariousProperties = ({
  setCurrentScreen,
  fabConsts,
  showHints,
  handleOnPressFabActions,
  handleOnPressGeneral,
}) => {
  const theme: PaoThemeType = useTheme()
  const navigation = navigationRef.current

  const haveNavigated = (page) => setCurrentScreen(page)

  const fabActionsVariousProperties = {
    paoTableFabActions: [
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActonProfile, theme.colors.fabActionColors[3]) },
        // icon: fabConsts.goToPaoList.icon.list,
        icon: fabConsts.goToFlashcards.icon.card,

        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.Flashcards)
          haveNavigated(tabScreens.Flashcards)
          handleOnPressGeneral()
        }
      },
    ],
    flashcardFabActions: [
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActonProfile, theme.colors.fabActionColors[3]) },
        icon: fabConsts.goToPaoList.icon.list,
        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.Paotable)
          haveNavigated(tabScreens.Paotable)
          handleOnPressGeneral()
        }
      },
    ],
    favListFabActions: [],
    sharedFabActions: [
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActonProfile, theme.colors.fabActionColors[1]) },
        icon: fabConsts.accountSettings.icon.accountSettings,
        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.ProfileScreen)
          haveNavigated(tabScreens.ProfileScreen)
          handleOnPressGeneral()
        }
      },
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActionEdit, theme.colors.accent) },
        icon: fabConsts.editMode.icon.pencil,
        label: showHints ? fabConsts.editMode.mesg : null,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.editMode)
        }
      },
    ],
  }
  return fabActionsVariousProperties
}

export default useFabActionVariousProperties

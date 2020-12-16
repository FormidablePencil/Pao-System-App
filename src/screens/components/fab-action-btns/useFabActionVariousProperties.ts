import { useNavigation } from "@react-navigation/native"
import { useTheme } from "react-native-paper"
import { tabScreens } from "../../../constants/constants"
import { fabActionOptions } from "../../../constants/fabConstants"
import usePrimaryControlledColor, { WhereToColor } from "../../../hooks/usePrimaryControlledColor"
import { PaoThemeType } from "../../../styles/theming"

const useFabActionVariousProperties = ({
  fabConsts,
  showHints,
  handleOnPressFabActions,
  handleOnPressGeneral
}) => {
  const theme: PaoThemeType = useTheme()
  const navigation = useNavigation()

  const fabActionsVariousProperties = {
    paoTableFabActions: [
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActonProfile, theme.colors.fabActionColors[3]) },
        // icon: fabConsts.goToPaoList.icon.list,
        icon: fabConsts.goToFlashcards.icon.card,

        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.Flashcards)
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
          handleOnPressGeneral()
        }
      },
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActionEdit, theme.colors.fabActionColors[0]) },
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

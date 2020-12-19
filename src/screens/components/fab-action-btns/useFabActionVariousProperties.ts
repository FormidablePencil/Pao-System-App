import { useNavigation } from '@react-navigation/native'
import { createRef } from 'react'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { TOGGLE_EDIT_MODE } from '../../../actions/types'
import { tabScreens } from '../../../constants/constants'
import { fabActionOptions, fabOpt } from '../../../constants/fabConstants'
import usePrimaryControlledColor, { WhereToColor } from '../../../hooks/usePrimaryControlledColor'
import { PaoThemeType } from '../../../styles/theming'
import useOnPressFabsHandlers from './useOnPressFabsHandlers'

export const navigationRef: any = createRef()

const useFabActionVariousProperties = ({
  loading,
  currentFabProps,
  fabConsts,
  setLoading,
  setFlashcardSettings,
  flashcardSettings,
  sliderValueautoPlayFlashcardsDuration,
  currentScreen,
  fabActionContentRef,
  fabActionContentRef2,
  setCurrentFabProps,
  setShowNavigationIcons,
  setCurrentScreen,
  showHints,
}) => {
  const theme: PaoThemeType = useTheme()
  const dispatch = useDispatch()
  const navigation = navigationRef.current

  const { handleOnPressGeneral } = useOnPressFabsHandlers({
    loading,
    currentFabProps,
    fabConsts,
    setLoading,
    setFlashcardSettings,
    flashcardSettings,
    sliderValueautoPlayFlashcardsDuration,
    currentScreen,
    fabActionContentRef,
    fabActionContentRef2,
    setCurrentFabProps,
    setShowNavigationIcons,
  })

  const haveNavigated = (page) => setCurrentScreen(page)

  const fabActionsVariousProperties = {
    paoTableFabActions: [
      {
        style: {
          backgroundColor: usePrimaryControlledColor(
            WhereToColor.fabActonProfile,
            theme.colors.fabActionColors[3]
          ),
        },
        // icon: fabConsts.goToPaoList.icon.list,
        icon: fabConsts.goToFlashcards.icon.card,

        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.Flashcards)
          haveNavigated(tabScreens.Flashcards)
          handleOnPressGeneral()
        },
      },
    ],
    flashcardFabActions: [
      {
        style: {
          backgroundColor: usePrimaryControlledColor(
            WhereToColor.fabActonProfile,
            theme.colors.fabActionColors[3]
          ),
        },
        icon: fabConsts.goToPaoList.icon.list,
        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.Paotable)
          haveNavigated(tabScreens.Paotable)
          handleOnPressGeneral()
        },
      },
    ],
    favListFabActions: [],
    sharedFabActions: [
      {
        style: {
          backgroundColor: usePrimaryControlledColor(
            WhereToColor.fabActonProfile,
            theme.colors.fabActionColors[1]
          ),
        },
        icon: fabConsts.accountSettings.icon.accountSettings,
        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate(tabScreens.ProfileScreen)
          haveNavigated(tabScreens.ProfileScreen)
          handleOnPressGeneral()
        },
      },
      {
        style: {
          backgroundColor: usePrimaryControlledColor(
            WhereToColor.fabActionEdit,
            theme.colors.accent
          ),
        },
        icon: fabConsts.editMode.icon.pencil,
        label: showHints ? fabConsts.editMode.mesg : null,
        onPress: () => {
          console.log('fabActionOptions.editMode sd')
          // if (currentScreen === tabScreens.Flashcards)
          dispatch({ type: TOGGLE_EDIT_MODE })
          // dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
          setCurrentFabProps((prev) => ({ ...prev, mainFab: fabOpt.editMode })) //REPLACE... OR KEEP
        },
      },
    ],
  }
  return { fabActionsVariousProperties, handleOnPressGeneral }
}

export default useFabActionVariousProperties

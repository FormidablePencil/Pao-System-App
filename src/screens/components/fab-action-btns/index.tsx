import React, { useState, useEffect, useContext, useRef } from 'react'
import { Portal, Provider, FAB, useTheme } from 'react-native-paper'
import {
  fabProperties as fabConsts,
  fabModeOptions,
  fabActionOptions,
  fabOpt,
  enumFabAction,
} from '../../../constants/fabConstants'
import { tabScreens } from '../../../constants/constants'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PaoThemeType } from '../../../styles/theming'
import { TabNavContext } from '../../../routes/StackNavigator'
import { FlashcardSettingsTypes } from '../../../reducer/flashcardOptionsReducer'
import { arrangmentOpt } from '../../../reducer/flashcardOptionsReducer'
import usePrimaryControlledColor, { WhereToColor } from '../../../hooks/usePrimaryControlledColor'
import useOnPressFabsHandlers from './useOnPressFabsHandlers'
import useFabActionVariousProperties, { navigationRef } from './useFabActionVariousProperties'
import { RootReducerT } from '../../../store'
import OptsMenus from './OptsMenus'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SAVED_FLASHCARD_SETTINGS_FROM_MODAL } from '../../../actions/types'

interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes
  fabActionsVariousProperties: any
}

const getWhatFabPropsKey = (currentScreen: tabScreens) => {
  if (currentScreen === tabScreens.Paotable) return enumFabAction.paoTableFabActions
  else if (currentScreen === tabScreens.Flashcards) return enumFabAction.flashcardFabActions
  else return ''
}

const FabActionBtn = ({ currentScreen, setCurrentScreen, setModalOpen }) => {
  const { showHints, setShowHints, showNavigationIcons, setShowNavigationIcons } = useContext(
    TabNavContext
  )
  const editMode = useSelector((state: RootReducerT) => state.fabProperties.config.editMode)
  const theme: PaoThemeType = useTheme()
  const dispatch = useDispatch()
  const fabActionContentRef = useRef(null)
  const fabActionContentRef2 = useRef(null)
  const [loading, setLoading] = useState(false)
  const [whatFabProps, setWhatFabProps] = useState(() =>
    getWhatFabPropsKey(navigationRef.current?.getCurrentRoute().name)
  )
  const [currentFabProps, setCurrentFabProps] = useState({ mainFab: fabOpt.standby })
  const [
    sliderValueautoPlayFlashcardsDuration,
    setSliderValueautoPlayFlashcardsDuration,
  ] = useState()
  const [flashcardSettings, setFlashcardSettings] = useState<FlashcardSettingsTypes>({
    flashcardItemDisplayedFront: [
      { number: true },
      { person: false },
      { action: true },
      { object: false },
    ],
    autoPlayFlashcards: { play: false, duration: 5 },
    flashcardOrder: arrangmentOpt.sorted,
  })
  const controlledColor = usePrimaryControlledColor(WhereToColor.primaryColor, theme.colors.primary)
  const bgColor = usePrimaryControlledColor(WhereToColor.goToUnfilledBtn, theme.colors.accent)
  const mainFabBackgroundColor =
    currentFabProps.mainFab.mode === fabModeOptions.editing
      ? currentFabProps.mainFab.color
      : controlledColor

  const { fabActionsVariousProperties, handleOnPressGeneral } = useFabActionVariousProperties({
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
  })

  useEffect(() => {
    setWhatFabProps(getWhatFabPropsKey(navigationRef.current?.getCurrentRoute().name))
  }, [currentScreen])

  return (
    <View style={styles.container}>
      {whatFabProps.length > 1 && (
        <>
          <Provider>
            <Portal>
              <FAB.Group
                fabStyle={{
                  backgroundColor: editMode ? fabOpt.editMode.color : mainFabBackgroundColor,
                }}
                style={{ top: 0 }}
                visible={true}
                color="white"
                open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
                icon={editMode ? fabOpt.editMode.icon : currentFabProps.mainFab.icon}
                actions={[
                  ...fabActionsVariousProperties[whatFabProps],
                  ...fabActionsVariousProperties.sharedFabActions,
                ]}
                onStateChange={() => handleOnPressGeneral()}
                // onPress={() => handleOnPressGeneral()}
                theme={{
                  colors: {
                    /* backdrop: 'transparent' */
                  },
                }}
                contentStyles={styles.contentStyles}
              >
                <OptsMenus
                  currentScreen={currentScreen}
                  bgColor={bgColor}
                  flashcardSettings={flashcardSettings}
                  setFlashcardSettings={setFlashcardSettings}
                />
              </FAB.Group>
            </Portal>
          </Provider>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'absolute', height: '100%', width: '100%' },
  contentStyles: {
    backgroundColor: Colors.purple900,
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    width: '90%',
    // height: '25%',
    // width: '50%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})

export default FabActionBtn

import React, { useState, useEffect, useContext, useRef } from 'react'
import { Portal, Provider, FAB, useTheme, TouchableRipple, Button } from 'react-native-paper'
import { fabProperties, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import { View, TouchableOpacity, LayoutAnimation, Animated, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { PaoThemeType } from '../styles/theming'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';
import { TabNavContext } from '../routes/StackNavigator'
import useCheckAmountOfPaoFilled from '../hooks/useCheckAmountOfPaoFilled'
import { createNativeWrapper } from 'react-native-gesture-handler'
import OptionsModal from './OptionsModal'
import { FlashcardSettingsTypes } from '../reducer/flashcardOptionsReducer'
import { usePrevious } from '../hooks/usePrevious'
import { UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE, TOGGLE_EDIT_MODE } from '../actions/types'
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor'


interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes
  fabActions: any
}

const FabActionBtn = ({ currentScreen, whatFabProps, setModalOpen, editModeTrue, setEditModeTrue, setGoToUnfilledTrigger }) => {
  const { showHints, setShowHints, showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const theme: PaoThemeType = useTheme()
  const actionBtnsFadeAnim = useRef(new Animated.Value(1)).current
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null)

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

  const fabActions = {
    paoTableFabActions: [],
    flashcardFabActions: [],
    favListFabActions: [],
    sharedFabActions: [
      {
        style: { backgroundColor: theme.colors.fabActionColors[0] },
        icon: fabProperties.editMode.icon.pencil,
        label: showHints ? fabProperties.editMode.mesg : null,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.editMode)
        }
      },
      {
        style: { backgroundColor: theme.colors.fabActionColors[1] },
        icon: fabProperties.accountSettings.icon.accountSettings,
        label: showHints ? fabProperties.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate('ProfileScreen')
          handleOnPressGeneral()
        }
      },
    ],
  }


  const [currentFabProps, setCurrentFabProps] = useState({ mainFab: fabOpt.standby })

  //~ settings for flashcard screen
  const [loading, setLoading] = useState(false)
  const [sliderValueautoPlayFlashcardsDuration, setSliderValueautoPlayFlashcardsDuration] = useState()
  const [flashcardSettings, setFlashcardSettings] = useState<FlashcardSettingsTypes>({
    flashcardItemDisplayedFront: [
      { number: true },
      { person: false },
      { action: true },
      { object: false },
    ],
    autoPlayFlashcards: { play: false, duration: 5 },
    flashcardOrder: arrangmentOpt.ascending
  })

  const handleOnPressGeneral = async () => {
    if (currentFabProps.mainFab.icon === fabProperties.mainBtn.flashcardChangingSettings.icon.settings) {
      setLoading(true)
      console.log('klklklk');
      await setFlashcardSettings({
        ...flashcardSettings, autoPlayFlashcards: {
          ...flashcardSettings.autoPlayFlashcards,
          duration: sliderValueautoPlayFlashcardsDuration
        }
      })
      await dispatch({ type: UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE, payload: flashcardSettings })
      setLoading(false)
    }
    switch (currentFabProps.mainFab.mode) {
      case fabOpt.menuOpen.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        setShowNavigationIcons(true)

        break;
      case fabOpt.standby.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen })
        setShowNavigationIcons(false)

        break;
      case fabOpt.editMode.mode:
        if (currentScreen === tabScreens.Flashcards) dispatch({ type: TOGGLE_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        setEditModeTrue(false)
        setShowNavigationIcons(true)

      default:
        break;
    }

  }


  const handleOnPressFabActions = (whatFabAction) => {
    switch (whatFabAction) {
      case fabActionOptions.editMode:
        if (currentScreen === tabScreens.Flashcards) dispatch({ type: TOGGLE_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.editMode })
        setEditModeTrue(true)
        break;

      default:
        break;
    }
  }

  const onPressHandler = () => setGoToUnfilledTrigger(true)

  const controlledColor = usePrimaryControlledColor(WhereToColor.primaryColor, theme.colors.primary)

  const mainFabBackgroundColor = currentFabProps.mainFab.mode === fabModeOptions.editing ?
    currentFabProps.mainFab.color : controlledColor

  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <Provider>
        <Portal>
          <Portal>
            {currentFabProps.mainFab.mode === fabModeOptions.menuOpen &&
              <>
                <View style={[currentFabProps.mainFab.mode === fabModeOptions.menuOpen && { height: '50%' }, { alignItems: "center", justifyContent: 'flex-end' }]}>
                  <Animatable.View
                    animation='bounceIn'
                    style={{ margin: 8, alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontFamily: 'MontserratMed' }}>Filled: {paoDocumentsFilled}/100</Text>
                    {paoDocumentsFilled !== 100 &&
                      <TouchableRipple onPress={() => onPressHandler()} style={{ marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: theme.colors.accent, borderRadius: 15, padding: 5, elevation: 10 }}>
                        <>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'black', textAlign: 'center', fontFamily: 'MontserratReg' }}>
                              Go to unfilled</Text>
                            <View>
                              <AntDesign style={{ marginHorizontal: 3 }} size={10} name='arrowright' />
                            </View>
                          </View>
                        </>
                      </TouchableRipple>
                    }
                  </Animatable.View>
                </View>

                {currentScreen === tabScreens.Flashcards &&
                  <OptionsModal
                    sliderValueautoPlayFlashcardsDuration={sliderValueautoPlayFlashcardsDuration}
                    setSliderValueautoPlayFlashcardsDuration={setSliderValueautoPlayFlashcardsDuration}
                    currentScreen={currentScreen}
                    flashcardSettings={flashcardSettings}
                    setFlashcardSettings={setFlashcardSettings}
                    loading={loading}
                    setLoading={setLoading}
                    setModalOpen={setModalOpen}
                  />
                }
              </>
            }
          </Portal>
          <FAB.Group
            fabStyle={{ backgroundColor: mainFabBackgroundColor }}
            visible={true}
            color='white'
            open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
            icon={currentFabProps.mainFab.icon}
            actions={[...fabActions.sharedFabActions, ...fabActions[whatFabProps]]}
            onStateChange={() => { }}
            onPress={() => handleOnPressGeneral()} //@
            onPressBackground={() => handleOnPressGeneral()}
          />
        </Portal>
      </Provider>
    </View>
  )
}

const AntDesignStyled = styled<any>(AntDesign)`
  position:absolute;
  right: 20px;
  top: 10px;
`;
const AnimatableBtn = Animatable.createAnimatableComponent(AntDesignStyled)

export default FabActionBtn

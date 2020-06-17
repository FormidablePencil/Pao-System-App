import React, { useState, useEffect, useContext, useRef } from 'react'
import { Portal, Provider, FAB, useTheme, TouchableRipple } from 'react-native-paper'
import { fabProperties as fabConsts, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import { View, Animated, Text, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { PaoThemeType } from '../styles/theming'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';
import { TabNavContext } from '../routes/StackNavigator'
import useCheckAmountOfPaoFilled from '../hooks/useCheckAmountOfPaoFilled'
import OptionsModal from './OptionsModal'
import { FlashcardSettingsTypes } from '../reducer/flashcardOptionsReducer'
import { UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE, TOGGLE_EDIT_MODE, TOGGLE_FAB_VISIBILITY, TOGGLE_FAB_VISIBILITY_FALSE, TOGGLE_FAB_VISIBILITY_TRUE } from '../actions/types'
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor'
import { RootReducerT } from '../store'

const SCREEN_WIDTH = Dimensions.get('window').width

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
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null)
  const actionBtnsFadeAnim = useRef(new Animated.Value(1)).current
  const fabActionContentRef = useRef(null)
  const fabActionContentRef2 = useRef(null)

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

  const fabActions = {
    paoTableFabActions: [],
    flashcardFabActions: [],
    favListFabActions: [],
    sharedFabActions: [
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActionEdit, theme.colors.fabActionColors[0]) },
        icon: fabConsts.editMode.icon.pencil,
        label: showHints ? fabConsts.editMode.mesg : null,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.editMode)
        }
      },
      {
        style: { backgroundColor: usePrimaryControlledColor(WhereToColor.fabActonProfile, theme.colors.fabActionColors[1]) },
        icon: fabConsts.accountSettings.icon.accountSettings,
        label: showHints ? fabConsts.accountSettings.mesg : null,
        onPress: () => {
          navigation.navigate('ProfileScreen')
          handleOnPressGeneral()
        }
      },
    ],
  }

  const [currentFabProps, setCurrentFabProps] = useState({ mainFab: fabOpt.standby })

  useEffect(() => {
    if (editModeTrue === true) setCurrentFabProps({ mainFab: fabOpt.editMode })
  }, [editModeTrue])

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

  //* solution is to fire a function from parent to toggle fab visibility 

  const handleOnPressGeneral = async () => {
    if (loading) return
    if (currentFabProps.mainFab.icon === fabConsts.mainBtn.flashcardChangingSettings.icon.settings) {
      setLoading(true)
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
        if (currentScreen === tabScreens.Flashcards) {
          if (!loading) {
            fabActionContentRef.current.fadeOutUpBig()
            fabActionContentRef2.current.fadeOutDownBig()
            setLoading(true)
            await setTimeout(() => {
              setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //replace
              dispatch({ type: TOGGLE_FAB_VISIBILITY_FALSE })
              setShowNavigationIcons(true)
            }, 500);
            setLoading(false)
          }
        } else {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //replace 
          dispatch({ type: TOGGLE_FAB_VISIBILITY_FALSE })
          setShowNavigationIcons(true)
        }
        break;
      case fabOpt.standby.mode:
        if (currentScreen === tabScreens.Flashcards) {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen }) //REPLACE
          dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
          setShowNavigationIcons(false)
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 1250);
        } else {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen }) //REPLACE
          setShowNavigationIcons(false)
        }

        break;
      case fabOpt.editMode.mode:
        if (currentScreen === tabScreens.Flashcards) dispatch({ type: TOGGLE_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //REPLACE
        dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
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
        dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.editMode }) //REPLACE... OR KEEP
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
  const bgColor = usePrimaryControlledColor(WhereToColor.goToUnfilledBtn, theme.colors.accent)
  const themeIsUncontrolled = bgColor === theme.colors.accent

  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <Provider>
        <Portal>
          <Portal>
            {currentFabProps.mainFab.mode === fabModeOptions.menuOpen &&
              <View style={{ height: '100%', width: SCREEN_WIDTH / 1.8, alignSelf: "center", flex: 1, justifyContent: 'center', }}>
                <>
                  {currentScreen === tabScreens.Paotable &&
                    <BounceAnimationView animation='bounceIn'>
                      <RegText>Filled: {paoDocumentsFilled}/100</RegText>
                      {paoDocumentsFilled !== 100 &&
                        <TouchableRippleStyled
                          bgColor={bgColor}
                          onPress={() => onPressHandler()}>
                          <Row>
                            <RegText black={themeIsUncontrolled}>Go to unfilled</RegText>
                            <AntDesignStyled black={themeIsUncontrolled} size={10} name='arrowright' />
                          </Row>
                        </TouchableRippleStyled>
                      }
                    </BounceAnimationView>
                  }

                  {currentScreen === tabScreens.Flashcards &&
                    <OptionsModal
                      fabActionContentRef={fabActionContentRef}
                      fabActionContentRef2={fabActionContentRef2}
                      theme={theme}
                      sliderValueautoPlayFlashcardsDuration={sliderValueautoPlayFlashcardsDuration}
                      currentScreen={currentScreen}
                      flashcardSettings={flashcardSettings}
                      setFlashcardSettings={setFlashcardSettings}
                      setLoading={setLoading}
                      setModalOpen={setModalOpen}
                    />
                  }
                </>
              </View>
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

const AntDesignStyled = styled(AntDesign)`
  margin: 0px 3px;
  color: ${({ black }) => black ? 'black' : 'white'};
`;
const AligningContainer = styled(View)`
  justify-content: flex-end;
`;
const Row = styled(View)`
  flex-direction: row;
  align-items: center
`;
const RegText = styled<any>(Text)`
  color: ${({ black }) => black ? 'black' : 'white'};
  font-family: 'MontserratMed';
`;
const BounceAnimationView = styled(Animatable.View)`
  margin: 8px;
  align-items: center;
`;
const TouchableRippleStyled = styled<any>(TouchableRipple)`
 padding: 0px 10px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  padding: 5px;
  elevation: 10px;
`;

export default FabActionBtn

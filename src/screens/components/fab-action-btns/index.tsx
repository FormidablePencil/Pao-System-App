import React, { useState, useEffect, useContext, useRef } from 'react'
import { Portal, Provider, FAB, useTheme, TouchableRipple } from 'react-native-paper'
import { fabProperties as fabConsts, fabModeOptions, fabActionOptions, fabOpt } from '../../../constants/fabConstants'
import { tabScreens } from '../../../constants/constants'
import { View, Animated, Text, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { PaoThemeType } from '../../../styles/theming'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';
import { TabNavContext } from '../../../routes/StackNavigator'
import useCheckAmountOfPaoFilled from '../../../hooks/useCheckAmountOfPaoFilled'
import OptionsModal from '../../flashcard-screen/components/options-modal/modal-options'
import { FlashcardSettingsTypes } from '../../../reducer/flashcardOptionsReducer'
import { UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE, TOGGLE_EDIT_MODE, TOGGLE_FAB_VISIBILITY_TRUE } from '../../../actions/types'
import { arrangmentOpt } from '../../../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor } from '../../../hooks/usePrimaryControlledColor'
import useOnPressFabsHandlers from './useOnPressFabsHandlers'
import useFabActionVariousProperties from './useFabActionVariousProperties'

const SCREEN_WIDTH = Dimensions.get('window').width

interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes
  fabActionsVariousProperties: any
}

const FabActionBtn = ({ currentScreen, whatFabProps, setModalOpen, editModeTrue, setEditModeTrue, setGoToUnfilledTrigger }) => {
  const { showHints, setShowHints, showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const dispatch = useDispatch()
  const theme: PaoThemeType = useTheme()
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null)
  const actionBtnsFadeAnim = useRef(new Animated.Value(1)).current
  const fabActionContentRef = useRef(null)
  const fabActionContentRef2 = useRef(null)

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

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

  const { handleOnPressFabActions, handleOnPressGeneral } = useOnPressFabsHandlers({
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
    setEditModeTrue,
  })

  const fabActionVariousProperties = useFabActionVariousProperties({
    fabConsts,
    showHints,
    handleOnPressFabActions,
    handleOnPressGeneral
  })

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
            actions={[...fabActionVariousProperties.sharedFabActions, ...fabActionVariousProperties[whatFabProps]]}
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

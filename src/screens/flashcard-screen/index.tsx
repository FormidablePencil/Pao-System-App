import React, { useState, useContext, useEffect, useRef } from 'react';
import { View } from 'react-native-tailwind';
import { reusableStyles, WhiteText } from '../../styles/global'
import { Button, useTheme, TouchableRipple, Modal, Portal } from 'react-native-paper';
import styled from 'styled-components';
import FlashcardSwiper from './components/flashcard-swiper';
import FabActionBtn from '../components/fab-action-btns';
import { enumFabAction } from '../../constants/fabConstants';
import { tabScreens } from '../../constants/constants';
import { TabNavContext } from '../../routes/StackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import usePrimaryControlledColor, { currentCardIndexTextControlledColor, WhereToColor } from '../../hooks/usePrimaryControlledColor'
import { PaoThemeType } from '../../styles/theming';
import { RootReducerT } from '../../store';
import { STUDY_MODE_TOGGLE, STUDY_MODE_TOGGLE_OFF, CURRENT_STUDY_CARD } from '../../actions/types';
import LogoBtnImg from '../../components/LogoBtnImg';
import InputSpinner from "react-native-input-spinner";
import { LinearGradient } from 'expo-linear-gradient';
import shuffle from 'shuffle-array'
import { swipeDirection } from '../../constants/constants';
import { listItemsT } from '../../reducer/studyReducer';
import { useCallbackRef } from 'use-callback-ref';
import SelectorComp from '../components/fab-action-btns/shared-opts/SelectorComp';

export const FlashcardsScreen = () => {
  const { showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const pao = useSelector((state: RootReducerT) => state.pao)
  const study = useSelector((state: RootReducerT) => state.study)
  const fabProperties = useSelector((state: RootReducerT) => state.fabProperties)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [studyAmount, setStudyAmount] = useState<number | null>(10)
  const [openStudyModalOpts, setOpenStudyModalOpts] = useState(false)
  const [prevIndexSwipedFrom, setPrevIndexSwipedFrom] = useState(0)
  const currentDeckOfCard = useRef(null)
  const theme: PaoThemeType = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalOpen) setShowNavigationIcons(prev => false)
  }, [modalOpen])

  const dynamicTextColor = currentCardIndexTextControlledColor().color ?? 'white'
  const renderCardsLeft = () => {
    if (study.study) return study.paoStudySets.person.length - study.currentStudyCard
    else {
      return pao.length === 1 && pao[0].number === null ? null : pao.length - currentDeckOfCard.current
    }
  }

  const studyButtonColor = study.study ? { colors: { primary: theme.colors.fabActionColors[1] } } : { colors: { primary: theme.colors.accent } }
  const studyButtonText = study.study ? 'Done Study' : 'Study'

  const btnBgColorUncontrolled = study.study ? theme.colors.accent : theme.colors.fabActionColors[1]
  const bgColorStudyOn = usePrimaryControlledColor(WhereToColor.studyModeOn, btnBgColorUncontrolled)
  const bgColorStudyOff = usePrimaryControlledColor(WhereToColor.studyModeOff, btnBgColorUncontrolled)
  const studyBtnTextColor = study.study ? 'black' : 'white'

  const LinearGradientColors = [
    usePrimaryControlledColor(WhereToColor.flashcardBackground),
    usePrimaryControlledColor(WhereToColor.flashcardBackground2)
  ]

  return (
    <>
      <View className="w-full h-full flex flex-row justify-center" style={{}} >
        <View className="flex" style={{}}>
          <FlashcardSwiper />
        </View>
      </View>

      {/* <FabActionBtn
        setGoToUnfilledTrigger={null}
        currentScreen={tabScreens.Flashcards}
        editModeTrue={editModeTrue}
        setEditModeTrue={setEditModeTrue}
        setModalOpen={setModalOpen}
        whatFabProps={enumFabAction.flashcardFabActions}
      /> */}
    </>
  )
}

const LinearGradientStyled = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const InputSpinnerContainer = styled.View`
  background-color: rgba(36,36,36,.7);
  margin: 20px;
  padding: 20px;
  border-radius: 30px;
`
const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CardsLeftText = styled<any>(Text)`
  align-items: center;
  bottom: 10%;
  position: absolute;
  width: 100%;
  font-family: MontserratLight;
  font-size: 35px;
  color: ${({ color }) => color};
  text-align: center;
  z-index: 5;
`;

export default FlashcardsScreen
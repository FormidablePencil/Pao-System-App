import React, { useState, useContext, useEffect, useRef } from 'react';
import { View } from 'react-native-tailwind';
import { globalStyles, WhiteText } from '../styles/global'
import { Button, useTheme, TouchableRipple, Modal, Portal } from 'react-native-paper';
import styled from 'styled-components';
import FlashcardSwiper from '../components/FlashcardSwiper';
import FabActionBtn from '../components/FabActionBtn';
import { enumFabAction } from '../constants/fabConstants';
import { tabScreens } from '../constants/constants';
import { TabNavContext } from '../routes/StackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import usePrimaryControlledColor, { currentCardIndexTextControlledColor, WhereToColor } from '../hooks/usePrimaryControlledColor'
import { PaoThemeType } from '../styles/theming';
import { RootReducerT } from '../store';
import { STUDY_MODE_TOGGLE, STUDY_MODE_TOGGLE_OFF, CURRENT_STUDY_CARD } from '../actions/types';
import LogoBtnImg from '../components/LogoBtnImg';
import InputSpinner from "react-native-input-spinner";
import { LinearGradient } from 'expo-linear-gradient';
import shuffle from 'shuffle-array'
import { swipeDirection } from '../constants/constants';
import { listItemsT } from '../reducer/studyReducer';
import { useCallbackRef } from 'use-callback-ref';

export const FlashcardsScreen = () => {
  const { showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const { pao, study, fabProperties } = useSelector((state: RootReducerT) => state)
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

  const noItemsInPaoList = pao[0].number === null

  const randomlyGeneratedPaoList = () => {
    let unshuffledPersonList = []
    let unshuffledActionList = []
    let unshuffledObjectList = []
    pao.map((collection, index) => {
      // if (index >= studyAmount - 1) return
      const person = { item: collection.person, number: collection.number }
      unshuffledPersonList.push(person)
      const action = { item: collection.action, number: collection.number }
      unshuffledActionList.push(action)
      const object = { item: collection.object, number: collection.number }
      unshuffledObjectList.push(object)
    })
    const shuffledPersonList = shuffle(unshuffledPersonList)
    const shuffledActionList = shuffle(unshuffledActionList)
    const shuffledObjectList = shuffle(unshuffledObjectList)

    const person = shuffledPersonList.splice(0, studyAmount)
    const action = shuffledActionList.splice(0, studyAmount)
    const object = shuffledObjectList.splice(0, studyAmount)

    return { person, action, object }
  }

  const openStudyModal = () => {
    if (study.study) {
      dispatch({ type: STUDY_MODE_TOGGLE_OFF })
    } else setOpenStudyModalOpts(prev => !prev)
  }
  const toggleStudyMode = () => {
    dispatch({ type: STUDY_MODE_TOGGLE, payload: randomlyGeneratedPaoList() })
    // openStudyModal()
    setOpenStudyModalOpts(prev => !prev)
  }

  const studyButtonColor = study.study ? { colors: { primary: theme.colors.fabActionColors[1] } } : { colors: { primary: theme.colors.accent } }
  const studyButtonText = study.study ? 'Done Study' : 'Study'

  const btnBgColorUncontrolled = study.study ? theme.colors.accent : theme.colors.fabActionColors[1]
  const bgColorStudyOn = usePrimaryControlledColor(WhereToColor.studyModeOn, btnBgColorUncontrolled)
  const bgColorStudyOff = usePrimaryControlledColor(WhereToColor.studyModeOff, btnBgColorUncontrolled)
  const bgColor = study.study ? bgColorStudyOn : bgColorStudyOff
  const studyBtnTextColor = study.study ? 'black' : 'white'

  const LinearGradientColors = [
    usePrimaryControlledColor(WhereToColor.flashcardBackground),
    usePrimaryControlledColor(WhereToColor.flashcardBackground2)
  ]

  return (
    <>
      <View className="w-full h-full flex flex-row justify-center" style={{}} >
        <View className="flex" style={{}}>
          {fabProperties.fabVisibility === false &&
            <>
              {!noItemsInPaoList &&
                <ButtonPositionView>
                  <TouchableRippleStyled bgColor={bgColor} onPress={openStudyModal} mode='contained'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <LogoBtnImg disableToggle={true} />
                      <WhiteText style={{ color: studyBtnTextColor }}>{studyButtonText}</WhiteText>
                    </View>
                  </TouchableRippleStyled>
                </ButtonPositionView>
              }
              <CardsLeftText color={dynamicTextColor}>{renderCardsLeft()}</CardsLeftText>
              {openStudyModalOpts &&
                <Portal>
                  <LinearGradientStyled
                    end={[.75, .2]} start={[.01, .75]}
                    colors={LinearGradientColors}

                  >
                    <Modal visible={openStudyModal}>
                      <ModalContainer>
                        <InputSpinnerContainer>
                          <InputSpinner
                            inputStyle={{ ...globalStyles.whiteText }}
                            colorLeft={theme.colors.fabActionColors[1]}
                            colorRight={theme.colors.fabActionColors[1]}
                            colorPress='#4880A5'
                            buttonPressStyle={{ backgroundColor: '#4880A5' }}
                            colorMax={'#4880A5'}
                            colorMin={'#4880A5'}
                            max={30}
                            min={2}
                            step={2}
                            value={studyAmount}
                            color='orange'
                            onChange={(num) => {
                              setStudyAmount(num)
                            }}
                          >
                          </InputSpinner>
                        </InputSpinnerContainer>
                        <WhiteText>x numbers in total</WhiteText>
                        <Button mode='contained' onPress={toggleStudyMode} color={theme.colors.accent}>Selected</Button>
                      </ModalContainer>
                    </Modal>
                  </LinearGradientStyled>
                </Portal>
              }
            </>
          }
          <FlashcardSwiper
            pao={pao}
            currentDeckOfCard={currentDeckOfCard}
          />
        </View>
      </View>
      <FabActionBtn
        setGoToUnfilledTrigger={null}
        currentScreen={tabScreens.Flashcards}
        editModeTrue={editModeTrue}
        setEditModeTrue={setEditModeTrue}
        setModalOpen={setModalOpen}
        whatFabProps={enumFabAction.flashcardFabActions}
      />
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
const TouchableRippleStyled = styled<any>(TouchableRipple)`
  background-color: ${({ bgColor }) => bgColor};
  padding: 5px 10px 5px 0px;
  border-radius: 10px;
`
const ButtonPositionView = styled.View`
  z-index: 100;
  position: absolute;
  top: 10%;
  left: 0px; right: 0px;
  align-items: center;
  justify-content: center;
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
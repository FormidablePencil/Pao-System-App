import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import { IconButton, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import FlashcardSwiper from '../components/FlashcardSwiper';
import OptionsModal from '../components/OptionsModal';
import FabActionBtn from '../components/FabActionBtn';
import { enumFabAction } from '../constants/fabConstants';
import { tabScreens } from '../constants/constants';
import { TabNavContext } from '../routes/StackNavigator';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { currentCardIndexTextControlledColor } from '../hooks/usePrimaryControlledColor'

export const FlashcardsScreen = () => {
  const { showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [currentDeckOfCard, setCurrentDeckOfCard] = useState(0)
  const pao = useSelector((state: any) => state.pao)


  useEffect(() => {
    if (modalOpen) setShowNavigationIcons(prev => false)
  }, [modalOpen])

  const dynamicTextColor = currentCardIndexTextControlledColor().color ?? 'white'
  const renderCardsLeft = pao.length === 1 && pao[0].number === null ?
    null : pao.length - currentDeckOfCard
  return (
    <>
      <View className="w-full h-full flex flex-row justify-center" style={{}} >
        <View className="flex" style={{}}>
          <CardsLeftText color={dynamicTextColor}>{renderCardsLeft}</CardsLeftText>
          <FlashcardSwiper
            pao={pao}
            currentDeckOfCard={currentDeckOfCard}
            setCurrentDeckOfCard={setCurrentDeckOfCard}
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

const CardsLeftText = styled<any>(Text)`
  align-items: center;
  top: 10%;
  position: absolute;
  width: 100%;
  font-family: MontserratLight;
  font-size: 35px;
  color: ${({ color }) => color};
  text-align: center;
  z-index: 5;
`;

export default FlashcardsScreen
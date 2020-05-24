import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import { IconButton } from 'react-native-paper';
import styled from 'styled-components';
import FlashcardSwiper from '../components/FlashcardSwiper';
import OptionsModal from '../components/OptionsModal';
import FabActionBtn from '../components/FabActionBtn';
import { enumFabAction } from '../constants/fabConstants';
import { tabScreens } from '../constants/constants';
import { TabNavContext } from '../routes/StackNavigator';
import { CardStyleInterpolators } from '@react-navigation/stack';

export const FlashcardsScreen = () => {
  const { showNavigationIcons, setShowNavigationIcons } = useContext(TabNavContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)

  useEffect(() => {
    if (modalOpen) setShowNavigationIcons(prev => false)
  }, [modalOpen])

  return (
    <>
      {/* <OptionsModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currentScreen={tabScreens.Flashcards}
      /> */}
      <View className="w-full h-full flex flex-row justify-center">
        <View className="relative" style={globalStyles.centerEverything}>
          <FlashcardSwiper />
        </View>
      </View>
      <FabActionBtn
        currentScreen={tabScreens.Flashcards}
        editModeTrue={editModeTrue}
        setEditModeTrue={setEditModeTrue}
        setModalOpen={setModalOpen}
        whatFabProps={enumFabAction.flashcardFabActions}
      />
    </>
  )
}

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 30;
`;




export default FlashcardsScreen
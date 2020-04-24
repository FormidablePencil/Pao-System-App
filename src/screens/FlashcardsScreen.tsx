import React, { useState, useContext, useEffect, createContext } from 'react';
import { View } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import OptionsModal from '../components/OptionsModal';
import { PaoAppContext } from '../routes/TabNavigator';
import Flashcard from '../components/Flashcard';
import { IconButton, Colors } from 'react-native-paper';
import styled from 'styled-components';

//@ts-ignore
export const FlashcardsContext = createContext()

export enum arrangmentOpt {
  ascending,
  descending,
  random
}

interface FlashcardsDisplayTypes {
  number: boolean
  person: boolean
  action: boolean
  object: boolean
}

export const FlashcardsScreen = () => {
  const { setModalOpen } = useContext(PaoAppContext)

  const [flashcardItemDisplayedFront, setflashcardItemDisplayedFront] = useState<FlashcardsDisplayTypes>({
    number: true,
    person: false,
    action: false,
    object: false,
  })
  const [arrangment, setArrangment] = useState(arrangmentOpt.ascending)

  return (
    <FlashcardsContext.Provider value={{ flashcardItemDisplayedFront, setflashcardItemDisplayedFront, arrangment, setArrangment }}>
      <OptionsModal />
      <View className="w-full h-full flex flex-row justify-center">
        <StyledIconButton
          icon="settings"
          color={Colors.blueGrey600}
          size={30}
          onPress={() => setModalOpen(true)}
        />
        <View className="relative" style={globalStyles.centerEverything}>
          <Flashcard />
        </View>
      </View>
    </FlashcardsContext.Provider>
  )
}

const StyledIconButton = styled(IconButton)`
        position: absolute;
        right: 10;
        top: 10;
        `;




export default FlashcardsScreen
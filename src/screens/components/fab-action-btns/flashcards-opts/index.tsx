import React from 'react'
import { View } from 'react-native-tailwind'
import { arrangmentOpt } from '../../../../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../../../../hooks/usePrimaryControlledColor';
import { useDispatch, useSelector } from 'react-redux';
import CardOpts from './reg-mode-opts/CardOpts';
import ListOpts from './reg-mode-opts/ListOpts';
import RandomStudyModeOpts from './random-mode-opts';
import { RootReducerT } from '../../../../store';
import RegModeOpts from './reg-mode-opts';


const FlashcardsOptsModal = ({
  sliderValueautoPlayFlashcardsDuration,
  setModalOpen,
  setFlashcardSettings, flashcardSettings,
  setLoading,
  currentScreen, theme,
  fabActionContentRef, fabActionContentRef2
}) => {
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)


  return (
    <>
      {!isRandomStudyMode ?
        <RegModeOpts
          sliderValueautoPlayFlashcardsDuration={sliderValueautoPlayFlashcardsDuration}
          setModalOpen={setModalOpen}
          setFlashcardSettings={setFlashcardSettings}
          flashcardSettings={flashcardSettings}
          setLoading={setLoading}
          currentScreen={currentScreen}
          theme={theme}
          fabActionContentRef={fabActionContentRef}
          fabActionContentRef2={fabActionContentRef2}
        />
        :
        <RandomStudyModeOpts />
      }
    </>
  )
}

export default FlashcardsOptsModal

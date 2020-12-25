import React from 'react'
import { useSelector } from 'react-redux'
import RandomStudyModeOpts from './random-mode-opts'
import { RootReducerT } from '../../../../store'
import RegModeOpts from './reg-mode-opts'

const FlashcardsOptsModal = ({
  setFlashcardSettings,
  flashcardSettings,
  theme,
}) => {
  const isRandomStudyMode = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isRandomStudyMode
  )

  return (
    <>
      {isRandomStudyMode ? (
        <RandomStudyModeOpts />
      ) : (
          <RegModeOpts
            setFlashcardSettings={setFlashcardSettings}
            flashcardSettings={flashcardSettings}
            theme={theme}
          />
        )}
    </>
  )
}

export default FlashcardsOptsModal

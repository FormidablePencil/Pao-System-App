import React from "react";
import { useSelector } from "react-redux";
import RandomStudyModeOpts from "./random-mode-opts";
import { RootReducerT } from "../../../../store";
import RegModeOpts from "./reg-mode-opts";

const FlashcardsOptsModal = ({
  sliderValueautoPlayFlashcardsDuration,
  setModalOpen,
  setFlashcardSettings,
  flashcardSettings,
  setLoading,
  currentScreen,
  theme,
  fabActionContentRef,
  fabActionContentRef2,
}) => {
  const isRandomStudyMode = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isRandomStudyMode
  );
  return (
    <>
      {!isRandomStudyMode ? (
        <RegModeOpts
          sliderValueautoPlayFlashcardsDuration={
            sliderValueautoPlayFlashcardsDuration
          }
          setModalOpen={setModalOpen}
          setFlashcardSettings={setFlashcardSettings}
          flashcardSettings={flashcardSettings}
          setLoading={setLoading}
          currentScreen={currentScreen}
          theme={theme}
          fabActionContentRef={fabActionContentRef}
          fabActionContentRef2={fabActionContentRef2}
        />
      ) : (
        <RandomStudyModeOpts />
      )}
    </>
  );
};

export default FlashcardsOptsModal;

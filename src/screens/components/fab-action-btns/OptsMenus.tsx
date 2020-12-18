import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { tabScreens } from "../../../constants/constants";
import useCheckAmountOfPaoFilled from "../../../hooks/useCheckAmountOfPaoFilled";
import { PaoThemeType } from "../../../styles/theming";
import FlashcardsOptsModal from "./flashcards-opts";
import PaoTableOptsModal from "./paotable-opts/PaoTableOptsModal";
import SharedOptions from "./shared-opts";
import AmountOfCardsAccumulator from "./shared-opts/AmountOfCardsAccumulator";
import { dividerMarginsStyles } from "./functions/sizingDependedOnScreen";
import { useSelector } from "react-redux";
import { RootReducerT } from "../../../store";
import GoToUnfilled from "./GoToUnfilled";

const OptsMenu = ({
  currentFabProps,
  currentScreen,
  bgColor,
  fabActionContentRef,
  fabActionContentRef2,
  sliderValueautoPlayFlashcardsDuration,
  flashcardSettings,
  setFlashcardSettings,
  setLoading,
  setModalOpen,
  handleOnPressGeneral,
}) => {
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null);
  const theme: PaoThemeType = useTheme();
  const themeIsUncontrolled = bgColor === theme.colors.accent;
  const [goToUnfilledTrigger, setGoToUnfilledTrigger] = useState(false);
  const isRandomStudyMode = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isRandomStudyMode
  );

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled });

  return (
    <View style={{ ...styles.container }}>
      <SharedOptions />

      <View style={styles.divider} />

      {isRandomStudyMode && (
        <>
          <AmountOfCardsAccumulator />
          <View style={styles.divider} />
        </>
      )}

      {currentScreen === tabScreens.Paotable ? (
        <PaoTableOptsModal
          paoDocumentsFilled={paoDocumentsFilled}
          bgColor={bgColor}
          setGoToUnfilledTrigger={setGoToUnfilledTrigger}
          themeIsUncontrolled={themeIsUncontrolled}
        />
      ) : (
        currentScreen === tabScreens.Flashcards && (
          <FlashcardsOptsModal
            fabActionContentRef={fabActionContentRef}
            fabActionContentRef2={fabActionContentRef2}
            theme={theme}
            sliderValueautoPlayFlashcardsDuration={
              sliderValueautoPlayFlashcardsDuration
            }
            currentScreen={currentScreen}
            flashcardSettings={flashcardSettings}
            setFlashcardSettings={setFlashcardSettings}
            setLoading={setLoading}
            setModalOpen={setModalOpen}
          />
        )
      )}
      <GoToUnfilled
        paoDocumentsFilled={paoDocumentsFilled}
        setGoToUnfilledTrigger={setGoToUnfilledTrigger}
        themeIsUncontrolled={themeIsUncontrolled}
        bgColor={bgColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    backgroundColor: "rgba(67, 9, 122, 0.507)",
  },
  backdrop: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(36,40,118,.5)",
  },
  divider: {
    backgroundColor: "white",
    width: "70%",
    height: 1,
    ...dividerMarginsStyles(),
  },
  amountOfCardsAccumulator: {
    position: "absolute",
    alignItems: "center",
    width: "50%",
    left: "15%",
    bottom: 50,
    // backgroundColor: 'orange',
  },
});

export default OptsMenu;

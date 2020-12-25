import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerT } from "../../../../../store";
import {
  FLIP_STUDY_RANDOM_MODE_CARDS_FALSE,
  FLIP_STUDY_RANDOM_MODE_CARDS_TRUE,
  SET_GUESSING_FEATURE,
} from "../../../../../actions/types";
import SelectorComp from "../../SelectorComp";
import ButtonSave from "../../ButtonSave";

const RandomStudyModeOpts = () => {
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped);
  const guessingFeatureOn = useSelector((state: RootReducerT) => state.studyRandomMode.guessingFeatureOn);
  const [switchSelectorValues, setSwitchSelectorValues] = useState(() => ({
    invertCard: isFlipped ? 1 : 0,
    guessingFeature: guessingFeatureOn ? 1 : 0
  }));
  const switchSelectors = [
    {
      title: "Pao",
      leftLabel: "back",
      rightLabel: "front",
      initial: isFlipped,
      onPress: (toggle) => setSwitchSelectorValues((prev) => ({ ...prev, invertCard: toggle })),
    },
    {
      title: "Guess",
      leftLabel: "false",
      rightLabel: "true",
      initial: guessingFeatureOn,
      onPress: (toggle) => setSwitchSelectorValues((prev) => ({ ...prev, guessingFeature: toggle })),
    },
  ];
  const dispatch = useDispatch();


  const onPressSaveBtn = () => {
    dispatch({
      type: switchSelectorValues.invertCard
        ? FLIP_STUDY_RANDOM_MODE_CARDS_TRUE
        : FLIP_STUDY_RANDOM_MODE_CARDS_FALSE
    });
    dispatch({
      type: SET_GUESSING_FEATURE,
      payload: switchSelectorValues.guessingFeature ? true : false
    })
  };

  return (
    <>
      {switchSelectors.map((switchSelectorItem) => {
        return (
          <SelectorComp
            initial={switchSelectorItem.initial}
            onPress={switchSelectorItem.onPress}
            title={switchSelectorItem.title}
            options={[
              { value: 0, label: switchSelectorItem.leftLabel },
              { value: 1, label: switchSelectorItem.rightLabel },
            ]}
          />
        );
      })}
      <ButtonSave onPress={onPressSaveBtn} />
    </>
  );
};

// fabProperties.fabVisibility === false

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RandomStudyModeOpts;

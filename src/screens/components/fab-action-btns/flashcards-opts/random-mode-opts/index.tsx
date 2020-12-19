import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerT } from "../../../../../store";
import {
  FLIP_STUDY_RANDOM_MODE_CARDS_FALSE,
  FLIP_STUDY_RANDOM_MODE_CARDS_TRUE,
} from "../../../../../actions/types";
import SelectorComp from "../../SelectorComp";
import ButtonSave from "../../ButtonSave";

const RandomStudyModeOpts = () => {
  const isFlipped = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isFlipped
  );
  const [switchSelectorValues, setSwitchSelectorValues] = useState(() => ({
    invertCard: isFlipped ? 1 : 0,
  }));
  const switchSelectors = [
    {
      title: "Pao",
      leftLabel: "back",
      rightLabel: "front",
      toggleState: switchSelectorValues.invertCard,
      onPress: (toggle) =>
        setSwitchSelectorValues((prev) => ({ ...prev, invertCard: toggle })),
    },
  ];
  const dispatch = useDispatch();
  const theme = useTheme();

  const onPressSaveBtn = () => {
    dispatch({
      type: switchSelectorValues.invertCard
        ? FLIP_STUDY_RANDOM_MODE_CARDS_TRUE
        : FLIP_STUDY_RANDOM_MODE_CARDS_FALSE
    });
  };

  return (
    <>
      {switchSelectors.map((switchSelectorItem) => {
        return (
          <SelectorComp
            initial={isFlipped ? "front" : "back"}
            onPress={(toggle) =>
              setSwitchSelectorValues((prev) => ({
                ...prev,
                invertCard: toggle,
              }))
            }
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

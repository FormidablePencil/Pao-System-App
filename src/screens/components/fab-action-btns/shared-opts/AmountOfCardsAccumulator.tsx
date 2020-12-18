import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_STUDY_RANDOM_AMOUNT,
  TOGGLE_STUDY_RANDOM_MODE_TRUE,
} from "../../../../actions/types";
import { RootReducerT } from "../../../../store";
import { scaleStyles } from "../functions/sizingDependedOnScreen";

const AmountOfCardsAccumulator = () => {
  const studyAmount = useSelector(
    (state: RootReducerT) => state.studyRandomMode.studyAmount
  );
  const pao = useSelector((state: RootReducerT) => state.pao);
  const dispatch = useDispatch();
  let changed = useRef(false).current;
  const theme = useTheme();

  useEffect(() => {
    return () => {
      if (changed)
        dispatch({ type: TOGGLE_STUDY_RANDOM_MODE_TRUE, payload: pao });
      changed = false;
    };
  }, []);

  const onChangeHandler = (payload) => {
    dispatch({ type: SET_STUDY_RANDOM_AMOUNT, payload });
    changed = true;
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Cards</Text>
    <InputSpinner
      colorLeft={theme.colors.primary}
      colorRight={theme.colors.primary}
      buttonPressTextColor={"pink"}
      textColor="white"
      fontSize={25}
      // inputStyle={{ ...reusableStyles.whiteText }}
      // colorLeft={theme.colors.fabActionColors[1]}
      // colorRight={theme.colors.fabActionColors[1]}
      colorPress="#4880A5"
      // buttonPressStyle={{ backgroundColor: "#4880A5" }}
      colorMax={"#4880A5"}
      colorMin={"#4880A5"}
      max={30}
      min={2}
      step={2}
      value={studyAmount}
      color="orange"
      onChange={onChangeHandler}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '90%',
    ...scaleStyles()
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'MontserratReg'
  }
})


export default AmountOfCardsAccumulator;

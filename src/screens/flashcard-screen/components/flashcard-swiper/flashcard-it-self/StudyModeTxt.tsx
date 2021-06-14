import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import useGetStudyModeRandom from "../../../functions/useGetStudyModeRandom";

const StudyModeTxt = ({ isFlipped, index, side }) => {
  const { getNumberRandomMode, getPaoItemRandomMode } = useGetStudyModeRandom();
  const [showAnswer, setShowAnswer] = useState({
    person: false,
    action: false,
    object: false,
  });

  const showNumber = (!isFlipped && side === "front") || side === "back";
  const showPaoItem = (isFlipped && side === "front") || side === "back";

  const onPressHandler = (name) =>
    setShowAnswer((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <View style={styles.wrapper}>
      {["person", "action", "object"].map((name) => {
        return (
          <View style={styles.studyCardContainer} key={name} side={side}>
            <TouchableTxtBtn
              disabled={showPaoItem}
              onPress={() => onPressHandler(name)}
            >
              <View
                style={[
                  styles.numbers,
                  styles.studyCardText,
                  !showNumber ? styles.hiddenNumber : styles.visibleNumber,
                ]}
              >
                {showNumber || showAnswer[name]
                  ? getNumberRandomMode(name, index)
                  : ""}
              </View>
              <View
                style={[
                  !showPaoItem && styles.hiddenPaoText,
                  styles.studyCardText,
                ]}
              >
                {showPaoItem || showAnswer[name]
                  ? getPaoItemRandomMode(name, index)
                  : ""}
              </View>
            </TouchableTxtBtn>
          </View>
        );
      })}
    </View>
  );
};

const TouchableTxtBtn = ({ children, onPress, disabled }) => {
  if (disabled) return <>{children}</>;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ height: "100%", width: "100%", flexDirection: "row" }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  numbers: {
    width: 40,
  },
  visibleNumber: {
    color: "blue",
    marginLeft: 10,
    alignItems: "center",
  },
  hiddenNumber: {
    borderBottomWidth: 1,
    margin: 5,
  },
  hiddenPaoText: {
    borderBottomWidth: 1,
  },
  wrapper: {
    alignItems: "center",
    width: "100%",
  },
  studyCardContainer: {
    height: "60",
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "100%",
    /* padding-horizontal: 10px; */
  },
  studyCardText: {
    alignSelf: "center",
    fontFamily: "MontserratReg",
    fontSize: 30,
    /* height: 100%; */
    textAlign: "center",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "75%",
  },
});

export default StudyModeTxt;

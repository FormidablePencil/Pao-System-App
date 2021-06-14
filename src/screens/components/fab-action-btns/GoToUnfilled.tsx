import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const GoToUnfilled = ({
  paoDocumentsFilled,
  setGoToUnfilledTrigger,
  themeIsUncontrolled,
  bgColor,
}) => {
  const goToUnfilled = () => setGoToUnfilledTrigger(true);

  return (
    <>
      <Text style={styles.regText}>Rows filled: {paoDocumentsFilled}/100</Text>
      {paoDocumentsFilled !== 100 && (
        <View>
          <TouchableRipple
            style={{ ...styles.touchableRipple, backgroundColor: bgColor }}
            onPress={() => goToUnfilled()}
          >
            <View style={styles.row}>
              <Text
                style={{
                  color: themeIsUncontrolled ? "black" : "white",
                }}
              >
                Go to unfilled
              </Text>
              <AntDesign
                style={{
                  ...styles.antDesign,
                  color: themeIsUncontrolled ? "black" : "white",
                }}
                size={10}
                name="arrowright"
              />
            </View>
          </TouchableRipple>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  antDesign: {
    margin: "0px 3px",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  regText: {
    fontFamily: "MontserratMed",
  },
  touchableRipple: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    padding: 5,
    elevation: 10,
  },
});

export default GoToUnfilled;

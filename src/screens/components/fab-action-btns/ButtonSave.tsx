import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, useTheme, Text } from "react-native-paper";
import {
  saveBtnStyles,
  scaleStyles,
} from "./functions/sizingDependedOnScreen";

// git+https://github.com/FormidablePencil/react-native-paper.git
const ButtonSave = ({ onPress }) => {
  const theme = useTheme();
  const bgColor = { backgroundColor: theme.colors.primary };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // mode='text'
        // labelStyle={{ color: 'white' }}
        style={[styles.saveBtn, bgColor]}
        onPress={onPress}
        // theme={{colors: {onSurface: 'transparent'}}}
      >
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  saveBtn: {
    backgroundColor: "purple",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    height: 40,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    ...scaleStyles(),
    ...saveBtnStyles(),
  },
  text: {
    color: "white",
  },
});

export default ButtonSave;

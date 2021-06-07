import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components";

const RenderPaoItems = ({
  editMode,
  flashcardItemDisplayedFront,
  sidesDocument,
  collection,
  handleOnBlur,
  textColor,
  formatPaoItems,
  onChangeHandler,
}) => {
  const theme = useTheme();
  const paoDisplayOrder = ["number", "person", "action", "object"];

  return (
    <>
      {paoDisplayOrder.map((name: any) => {
        const gotObjectsByName = flashcardItemDisplayedFront.filter(
          (document) => Object.keys(document)[0] === name
        )[0];
        // console.log(flashcardItemDisplayedFront);
        const key = Object.keys(gotObjectsByName)[0];
        const valuePair = Object.values(gotObjectsByName)[0];

        if (valuePair === sidesDocument.symbol) {
          return (
            <View style={styles.wrapper} key={name}>
              <PaoName color={theme.colors.primary}>{key}</PaoName>
              <>
                {editMode ? (
                  <TextInput
                    style={styles.textInput}
                    placeholder={"edit"}
                    value={collection[key] ? `${collection[key]}` : null}
                    onChangeText={(value) =>
                      onChangeHandler({
                        number: collection.number,
                        name,
                        value,
                      })
                    }
                    onBlur={() => handleOnBlur()}
                    textAlign={"center"}
                  />
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        styles.textInput,
                        {
                          alignSelf: "center",
                          textAlign: "center",
                          color: textColor(key),
                        },
                      ]}
                    >
                      {formatPaoItems(key)}
                    </Text>
                  </View>
                )}
              </>
            </View>
          );
        } else return null;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 30,
    backgroundColor: "transparent",
    fontFamily: "MontserratReg",
    width: "100%",
  },
  // paoName: {
  // color: ${({ color }) => color};
  // },
  wrapper: {
  alignItems: "center",
  width: "100%",
  }
});
// const PaoName = styled<any>(Text)`
//   color: ${({ color }) => color};
// `;

// const Wrapper = styled(View)`
//   align-items: center;
//   width: 100%;
// `;

export default RenderPaoItems;


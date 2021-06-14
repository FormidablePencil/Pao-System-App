import React from "react";
import { Button, Text, withTheme } from "react-native-paper";
import { reusableStyles } from "../styles/global";

const ChooseEnteringOption = ({ setEnteringMethod, comps, theme }: any) => {
  const funcOnPressHandler = (setComp: any) => {
    setEnteringMethod(setComp);
  };

  return (
    <>
      <Button
        style={{
          marginVertical: 10,
          color: "white",
        }}
        contentStyle={{ padding: 10 }}
        mode="contained"
        onPress={() => funcOnPressHandler(comps.signin)}
      >
        <Text style={reusableStyles.whiteText}>Login</Text>
      </Button>
      <Button
        style={{
          marginVertical: 10,
          color: "white",
        }}
        contentStyle={{ padding: 10 }}
        mode="contained"
        onPress={() => funcOnPressHandler(comps.signup)}
      >
        <Text style={reusableStyles.whiteText}>New account</Text>
      </Button>
    </>
  );
};

export default withTheme(ChooseEnteringOption);

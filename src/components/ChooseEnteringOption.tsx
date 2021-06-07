import React from "react";
import { Button, withTheme } from "react-native-paper";
import { WhiteText } from "../styles/global";

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
        <WhiteText>Login</WhiteText>
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
        <WhiteText>New account</WhiteText>
      </Button>
    </>
  );
};

export default withTheme(ChooseEnteringOption);

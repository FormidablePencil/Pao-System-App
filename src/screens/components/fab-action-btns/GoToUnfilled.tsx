import React from "react";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import styled from "styled-components";
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
      <RegText>Rows filled: {paoDocumentsFilled}/100</RegText>
      {paoDocumentsFilled !== 100 && (
        <View>
          <TouchableRippleStyled
            bgColor={bgColor}
            onPress={() => goToUnfilled()}
          >
            <Row>
              <RegText black={themeIsUncontrolled}>Go to unfilled</RegText>
              <AntDesignStyled
                black={themeIsUncontrolled}
                size={10}
                name="arrowright"
              />
            </Row>
          </TouchableRippleStyled>
        </View>
      )}
    </>
  );
};

const AntDesignStyled = styled(AntDesign)`
  margin: 0px 3px;
  color: ${({ black }) => (black ? "black" : "white")};
`;
const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const RegText = styled<any>(Text)`
  color: ${({ black }) => (black ? "black" : "white")};
  font-family: "MontserratMed";
`;
const TouchableRippleStyled = styled<any>(TouchableRipple)`
  width: 150;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 0px 10px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  padding: 5px;
  elevation: 10px;
`;

export default GoToUnfilled;

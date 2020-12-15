import React from 'react'
import { View, Text } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';

const PaoTableOptsModal = ({ paoDocumentsFilled, bgColor, setGoToUnfilledTrigger, themeIsUncontrolled }) => {
  const onPressHandler = () => setGoToUnfilledTrigger(true)

  return (
    <BounceAnimationView animation='bounceIn'>
      <RegText>Filled: {paoDocumentsFilled}/100</RegText>
      {paoDocumentsFilled !== 100 &&
        <TouchableRippleStyled
          bgColor={bgColor}
          onPress={() => onPressHandler()}>
          <Row>
            <RegText black={themeIsUncontrolled}>Go to unfilled</RegText>
            <AntDesignStyled black={themeIsUncontrolled} size={10} name='arrowright' />
          </Row>
        </TouchableRippleStyled>
      }
    </BounceAnimationView>
  )
}


const AntDesignStyled = styled(AntDesign)`
  margin: 0px 3px;
  color: ${({ black }) => black ? 'black' : 'white'};
`;
const AligningContainer = styled(View)`
  justify-content: flex-end;
`;
const Row = styled(View)`
  flex-direction: row;
  align-items: center
`;
const RegText = styled<any>(Text)`
  color: ${({ black }) => black ? 'black' : 'white'};
  font-family: 'MontserratMed';
`;
const BounceAnimationView = styled(Animatable.View)`
  margin: 8px;
  align-items: center;
`;
const TouchableRippleStyled = styled<any>(TouchableRipple)`
 padding: 0px 10px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  padding: 5px;
  elevation: 10px;
`;

export default PaoTableOptsModal
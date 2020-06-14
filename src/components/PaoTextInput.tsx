import React, { useEffect, useState } from 'react'
import { useTheme, Text } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming'
import { textControlledColor, placeholderControlledColor } from '../hooks/usePrimaryControlledColor'
import { TextInput, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const PaoTextInput = ({
  tableData,
  index,
  name,
  paotableEditMode,
  saveControlledInputToReduxPaoList,
  textInputValue,
  onChangeTextHandler,
  prevTextInput,
  nextTextInput,
  currentlyFocusedTextInput,
  setCurrentlyFocusedTextInput,
  firstOfTableTextInput,
  lastOfTableTextInput,
  firstUnfilledTextInput,
  setFirstUnfilledTextInput,
}) => {


 
  return (

  
  )
}

const PaoText = styled(Text)`
  textAlign: center;
`;
const TextInputContainer = styled<any>(Animatable.View)`
  border-radius: 10; margin: 10px 2px;
`;
const TextInputStyled = styled<any>(TextInput)`
   align-self: center;
    height: 100%;
    color: ${({ textColor }) => textColor};
    width: 100%;
`;

export default PaoTextInput

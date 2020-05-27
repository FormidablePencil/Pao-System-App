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
  const theme: PaoThemeType = useTheme()
  const { controlledThemeColor } = useSelector((state: any) => state)
  const [editOn, setEditOn] = useState(false)

  interface Btn {
    number: number
    name: string
    show: boolean
  }


  const controlledTextColor = textControlledColor().color
  const textColor = controlledThemeColor ? controlledTextColor : theme.colors.text
  const placeholderColor = placeholderControlledColor().color

  const assignRef = (input) => {
    if (name === 'person' && index === 0) firstOfTableTextInput.current = input
    if (name === 'object' && index === 9) lastOfTableTextInput.current = input
    switch (true) {
      case currentlyFocusedTextInput.name === 'person':
        /* */if (name === 'person' && currentlyFocusedTextInput.index === index) return
        else if (name === 'action' && currentlyFocusedTextInput.index === index) nextTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index + 1) prevTextInput.current = input

        break;
      case currentlyFocusedTextInput.name === 'action':
          /* */if (name === 'person' && currentlyFocusedTextInput.index === index) prevTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index) return
        else if (name === 'object' && currentlyFocusedTextInput.index === index) nextTextInput.current = input

        break;
      case currentlyFocusedTextInput.name === 'object':
            /* */if (name === 'person' && currentlyFocusedTextInput.index === index - 1) nextTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index) prevTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index) return

        break;

      default:
        break;
    }
  }

  const onFocusHandler = () => {
    setFirstUnfilledTextInput({ number: null, name: null })
    setCurrentlyFocusedTextInput({ index, name })
  }

  useEffect(() => {
    if (!paotableEditMode) setFirstUnfilledTextInput({ number: null, name: null })
  }, [paotableEditMode])

  const onBlurHandler = () => {
    setEditOn(false)
    saveControlledInputToReduxPaoList()
  }
  const onPressHandlerTextChange = () => {
    if (paotableEditMode) setEditOn(true)
  }

  const computed = tableData.filter(doc => doc.number === firstUnfilledTextInput.number)[0] ?? { number: null }
  const bgColor = tableData[index].number === computed.number
    && firstUnfilledTextInput.name === name ? theme.colors.accent : null

  return (
    <>
      <TextInputContainer animation={bgColor && 'bounceIn'} iterationCount={1} style={{ backgroundColor: bgColor }}>
        {/* {!editOn ?
          <TouchableWithoutFeedback onPress={() => onPressHandlerTextChange()}>
            <PaoText>tap</PaoText>
          </TouchableWithoutFeedback>
          :
          <></> */}
          <TextInputStyled
            selectTextOnFocus={true}
            autoFocus={true}
            onFocus={() => onFocusHandler()}
            blurOnSubmit={false}
            ref={(input) => { assignRef(input) }}
            editable={paotableEditMode}
            onBlur={() => onBlurHandler()}
            placeholder={name}
            placeholderTextColor={bgColor ? 'white' : placeholderColor}
            textAlign='center'
            textColor={textColor}
            value={textInputValue}
            onChangeText={text => onChangeTextHandler({ text, number: tableData[index].number, name })}
          />
         {/* } */}
      </TextInputContainer>
    </>
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

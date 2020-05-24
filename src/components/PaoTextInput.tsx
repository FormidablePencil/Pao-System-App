import React, { useContext, useRef, useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming'
import { textControlledColor, placeholderControlledColor } from '../hooks/usePrimaryControlledColor'
import { TabNavContext } from '../routes/StackNavigator'
import { LayoutAnimation, View, Animated } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';

const PaoTextInput = ({
  tenPaoItemsArr,
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
  firstUnfilledTextInput
}) => {
  const theme: PaoThemeType = useTheme()
  const { controlledThemeColor } = useSelector((state: any) => state)

  interface Btn {
    number: number
    name: string
    show: boolean
  }

  const onBlurHandler = () => {
    saveControlledInputToReduxPaoList()
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

  const onFocusHandler = () => setCurrentlyFocusedTextInput({ index, name })

  const computed = tenPaoItemsArr.filter(doc => doc.number === firstUnfilledTextInput.number)[0] ?? { number: null }
  const bgC = tenPaoItemsArr[index].number === computed.number
    && firstUnfilledTextInput.name === name ? theme.colors.accent : 'transparent'

  return (
    <>
      <TextInputContainer animation={bgC !== 'transparent' && 'bounceIn'} iterationCount={1} style={{ backgroundColor: bgC }}>
        <TextInput
          onFocus={() => onFocusHandler()}
          blurOnSubmit={false}
          ref={(input) => { assignRef(input) }}
          editable={paotableEditMode}
          onBlur={() => onBlurHandler()}
          placeholder={name}
          placeholderTextColor={placeholderColor}
          style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: textColor }}
          value={textInputValue}
          onChangeText={text => onChangeTextHandler({ text, number: tenPaoItemsArr[index].number, name })}
        />
      </TextInputContainer>
    </>
  )
}

const TextInputContainer = styled<any>(Animatable.View)`
  border-radius: 10; margin: 10px 2px;
`;

export default PaoTextInput

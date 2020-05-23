import React, { useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming'
import { textControlledColor, placeholderControlledColor } from '../hooks/usePrimaryControlledColor'
import { ControlledThemeContext } from '../routes/StackNavigator'
import { LayoutAnimation } from 'react-native'

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
  setCurrentlyFocusedTextInput
}) => {
  const theme: PaoThemeType = useTheme()
  const { controlledThemeColor } = useContext(ControlledThemeContext)
  console.log(controlledThemeColor);

  interface Btn {
    number: number
    name: string
    show: boolean
  }

  const onBlurHandler = () => {
    saveControlledInputToReduxPaoList()
  }
  const textColor = controlledThemeColor ? textControlledColor().color : theme.colors.text
  const placeholderColor = placeholderControlledColor().color

  const assignRef = (input) => {
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

  return (
    <>
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
    </>
  )
}

export default PaoTextInput

import React, { useState, useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { DefaultTheme } from '@react-navigation/native'
import { StyledText } from '../styles/global'
import { Button, useTheme } from 'react-native-paper'
import { PaoThemeType } from '../styles/theming'

interface InputTypes {
  tenPaoItemsArr: any
  index: any
  name: any
  paotableEditMode: any
  saveControlledInputToReduxPaoList: any
  textInputValue: any
  onChangeTextHandler: any
}
const PaoTextInput = ({
  tenPaoItemsArr,
  index,
  name,
  paotableEditMode,
  saveControlledInputToReduxPaoList,
  textInputValue,
  onChangeTextHandler,
}: InputTypes) => {
  const theme: PaoThemeType = useTheme()

  interface Btn {
    number: number
    name: string
    show: boolean
  }

  const onBlurHandler = () => saveControlledInputToReduxPaoList()

  return (
    <TextInput
      editable={paotableEditMode}
      onBlur={() => onBlurHandler()}
      placeholder={name}
      placeholderTextColor={'rgba(36,138,135,.4)'}
      style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: theme.colors.text }}
      value={textInputValue}
      onChangeText={text => onChangeTextHandler({ text, number: tenPaoItemsArr[index].number, name })}
    />
  )
}

export default PaoTextInput

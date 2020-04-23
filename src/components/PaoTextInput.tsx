import React, { useState, useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { DefaultTheme } from '@react-navigation/native'
import { StyledText } from '../styles/global'
import { Button } from 'react-native-paper'

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

  interface Btn {
    number: number
    name: string
    show: boolean
  }

  return (
    <TextInput
      editable={paotableEditMode}
      onBlur={() => saveControlledInputToReduxPaoList()}
      placeholder={name}
      placeholderTextColor={'grey'}
      style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: DefaultTheme.colors.primary }}
      value={textInputValue}
      onChangeText={text => onChangeTextHandler({ text, number: tenPaoItemsArr[index].number, name })}
    />
  )
}

export default PaoTextInput

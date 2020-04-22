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
  btnBgColor: any
  textColor: any
  toggleTextInputShow: any
  setToggleTextInputShow: any
}
const PaoTextInput = ({
  tenPaoItemsArr,
  index,
  name,
  paotableEditMode,
  saveControlledInputToReduxPaoList,
  textInputValue,
  onChangeTextHandler,
  btnBgColor,
  textColor,
  toggleTextInputShow,
  setToggleTextInputShow
}: InputTypes) => {

  interface Btn {
    number: number
    name: string
    show: boolean
  }
  const buttonOnPressHandler = ({ number, name, show }: Btn) => {
    if (paotableEditMode) {
      setToggleTextInputShow({ number, name, show })
    }
  }

  return (
    <>
      {toggleTextInputShow.number !== tenPaoItemsArr[index].number
        && toggleTextInputShow.name !== name ?
        <TextInput
          autoFocus={true}
          onBlur={() => saveControlledInputToReduxPaoList()}
          placeholder={name}
          placeholderTextColor={'grey'}
          style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: DefaultTheme.colors.primary }}
          value={textInputValue}
          onChangeText={text => onChangeTextHandler({ text, number: tenPaoItemsArr[index].number, name })}
        />
        :
        <>
          <Button
            style={{ backgroundColor: btnBgColor }}
            onPress={() => buttonOnPressHandler({ number: tenPaoItemsArr[index].number, name, show: true })}
          >
            <StyledText style={{ color: textColor }}>{textInputValue ? textInputValue : name}</StyledText>
          </Button>
        </>
      }
    </>
  )
}

export default PaoTextInput

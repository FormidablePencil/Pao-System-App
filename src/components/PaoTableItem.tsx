import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { ItemInRow } from '../styles/paoTableStyles'
import { DefaultTheme } from 'react-native-paper'

const PaoTableItem = ({
  index,
  name,
  paotableEditMode,
  textInputValue,
  onChangeTextHandler,
  tenPaoItemsArr,
  saveControlledInputToReduxPaoList
}: {
  index: number,
  name: string,
  paotableEditMode: boolean,
  textInputValue: string,
  onChangeTextHandler: any,
  tenPaoItemsArr: any,
  saveControlledInputToReduxPaoList: any
}) => {

  return (
    <ItemInRow key={name}>
      <TextInput
        editable={paotableEditMode}
        onBlur={() => saveControlledInputToReduxPaoList()}
        placeholder={name}
        placeholderTextColor={'grey'}
        style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: DefaultTheme.colors.primary }}
        value={textInputValue}
        onChangeText={text => onChangeTextHandler({ text, number: tenPaoItemsArr[index].number, name })}
      />
    </ItemInRow>
  )
}

export default PaoTableItem

import React, { useContext, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { DefaultTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { PaoAppContext } from '../routes/TabNavigator'
import { listMode } from '../constants/constants'

const ListModeTable = ({
  bgColorByIndex,
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  arr
}: {
  bgColorByIndex: any
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  arr: any
}) => {
  const { fabAction: { paotableEditMode } } = useContext(PaoAppContext)
  const {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
  } = useTextInputHandler({
    controlledInput,
    setControlledInput,
    arr
  })

  return (
    <>
      {arr.map((document: any, index: number) => {

        const bgColor = bgColorByIndex(index)

        return (
          <Row
            key={document._id ? document._id : document.number}
            style={{ backgroundColor: bgColor, height: heightOfScrollView }}>
            <FirstItemInRow>
              {arr[index].number}
            </FirstItemInRow>
            {['person', 'action', 'object'].map((name: string) => {

              const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.wholeList })

              return (
                <ItemInRow key={name}>
                  <TextInput
                    editable={paotableEditMode}
                    // onBlur={() => saveControlledInputToReduxPaoList()}
                    placeholder={name}
                    placeholderTextColor={'grey'}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: DefaultTheme.colors.primary }}
                  value={textInputValue}
                  // onChangeText={text => onChangeTextHandler({ text, number: paoList[index].number, name })}
                  />
                </ItemInRow>
              )
            }
            )}
          </Row>
        )
      })}
    </>
  )
}


export default ListModeTable

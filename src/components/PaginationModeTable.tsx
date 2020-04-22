import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, TextInput } from 'react-native'
import PaoTableItem from './PaoTableItem'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { DefaultTheme, Button } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { PaoAppContext } from '../routes/TabNavigator'
import { useSelector } from 'react-redux'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import PaoTextInput from './PaoTextInput'

const PaginationModeTable = ({
  bgColorByIndex,
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  tenPaoItemsArr,
}: {
  bgColorByIndex: any
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  tenPaoItemsArr: any
}) => {
  const { fabAction: { paotableEditMode } } = useContext(PaoAppContext)
  const {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
  } = useTextInputHandler({
    controlledInput,
    setControlledInput,
    tenPaoItemsArr,
  })
  interface ToggleInputTypes {
    number: number | null
    name: string | null
    show: boolean | null
  }
  const [toggleTextInputShow, setToggleTextInputShow] = useState<ToggleInputTypes>({ number: null, name: null, show: false })


  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => {

        const bgColor = bgColorByIndex(index)

        return (
          <Row
            key={index}
            style={{ backgroundColor: bgColor, height: heightOfScrollView }}>
            <FirstItemInRow>
              {tenPaoItemsArr[index].number}
            </FirstItemInRow>
            {['person', 'action', 'object'].map((name: string) => {

              const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.pagination })
              // console.log(textInputValue)
              let btnBgColor
              let textColor
              if (textInputValue) textColor = DefaultTheme.colors.accent

              let selected = false
              if (selected) btnBgColor = 'teal'

              return (
                <ItemInRow key={name}>
                  <PaoTextInput
                    toggleTextInputShow={toggleTextInputShow}
                    setToggleTextInputShow={setToggleTextInputShow}
                    tenPaoItemsArr={tenPaoItemsArr}
                    index={index}
                    name={name}
                    paotableEditMode={paotableEditMode}
                    saveControlledInputToReduxPaoList={saveControlledInputToReduxPaoList}
                    textInputValue={textInputValue}
                    onChangeTextHandler={onChangeTextHandler}
                    btnBgColor={btnBgColor}
                    textColor={textColor}
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

const StyledText = styled.Text`
  align-self: center;
`;





export default PaginationModeTable
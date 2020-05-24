import React, { useRef, useState } from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { useTheme, Button } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import PaoTextInput from './PaoTextInput'
import { PaoThemeType } from '../styles/theming'
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText } from '../hooks/usePrimaryControlledColor'

const PaginationModeTable = ({
  bgColorByIndex,
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  tenPaoItemsArr,
  editModeTrue,
  prevTextInput,
  nextTextInput,
  currentlyFocusedTextInput,
  setCurrentlyFocusedTextInput,
  firstOfTableTextInput,
  lastOfTableTextInput,
  firstUnfilledTextInput,
}: {
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  tenPaoItemsArr: any
  editModeTrue
  prevTextInput
  nextTextInput
  currentlyFocusedTextInput
  setCurrentlyFocusedTextInput
  firstOfTableTextInput
  lastOfTableTextInput
  firstUnfilledTextInput
}) => {
  const {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
  } = useTextInputHandler({
    controlledInput,
    setControlledInput,
    tenPaoItemsArr,
  })
  const theme: PaoThemeType = useTheme()

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => {

        const bgColor = index % 2 == 1 ?
          usePrimaryControlledColor(WhereToColor.rowEven)
          : usePrimaryControlledColor(WhereToColor.rowOdd)

        const paoNumText = distinguishingTextColorFromRestOfText().color ?? theme.colors.text

        const paoNumbers = tenPaoItemsArr[index].number >= 0 && tenPaoItemsArr[index].number <= 9 ?
          `0${tenPaoItemsArr[index].number}` : tenPaoItemsArr[index].number

        return (
          <Row
            key={index}
            style={{ backgroundColor: bgColor, height: heightOfScrollView }}>
            <FirstItemInRow color={paoNumText}>
              {paoNumbers}
            </FirstItemInRow>
            {['person', 'action', 'object'].map((name: string) => {

              const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.pagination })

              return (
                <ItemInRow key={name}>
                  <PaoTextInput
                    firstUnfilledTextInput={firstUnfilledTextInput}
                    firstOfTableTextInput={firstOfTableTextInput}
                    lastOfTableTextInput={lastOfTableTextInput}
                    currentlyFocusedTextInput={currentlyFocusedTextInput}
                    setCurrentlyFocusedTextInput={setCurrentlyFocusedTextInput}
                    prevTextInput={prevTextInput}
                    nextTextInput={nextTextInput}
                    tenPaoItemsArr={tenPaoItemsArr}
                    index={index}
                    name={name}
                    paotableEditMode={editModeTrue}
                    saveControlledInputToReduxPaoList={saveControlledInputToReduxPaoList}
                    textInputValue={textInputValue}
                    onChangeTextHandler={onChangeTextHandler}
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

import React, { useRef, useState } from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { useTheme, Button } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import PaoTextInput from './PaoTextInput'
import { PaoThemeType } from '../styles/theming'
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText } from '../hooks/usePrimaryControlledColor'
import { ScrollView, FlatList } from 'react-native'

const PaginationModeTable = ({
  bgColorByIndex,
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  tableData,
  editModeTrue,
  prevTextInput,
  nextTextInput,
  currentlyFocusedTextInput,
  setCurrentlyFocusedTextInput,
  firstOfTableTextInput,
  lastOfTableTextInput,
  firstUnfilledTextInput,
  setFirstUnfilledTextInput,
}: {
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  tableData: any
  editModeTrue
  prevTextInput
  nextTextInput
  currentlyFocusedTextInput
  setCurrentlyFocusedTextInput
  firstOfTableTextInput
  lastOfTableTextInput
  firstUnfilledTextInput,
  setFirstUnfilledTextInput
}) => {
// console.log(tableData, 'tableDatatableData');
  const {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
  } = useTextInputHandler({
    controlledInput,
    setControlledInput,
    tableData,
  })
  const theme: PaoThemeType = useTheme()
  const rowEvenBgColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const rowOddBgColor = usePrimaryControlledColor(WhereToColor.rowOdd)
  const textColor = distinguishingTextColorFromRestOfText().color

  return (
    <>
      {/* <ScrollView keyboardShouldPersistTaps={'always'} style={{ height: 30 }}> */}
      {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => { */}
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        
        renderItem={({ item }) => {
          const index = item
          const bgColor = index % 2 == 1 ? rowEvenBgColor : rowOddBgColor

          const paoNumText = textColor ?? theme.colors.text

          const paoNumbers = tableData[index].number >= 0 && tableData[index].number <= 9 ?
            `0${tableData[index].number}` : tableData[index].number
          return (

            <Row
              key={item}
              style={{ backgroundColor: bgColor, height: heightOfScrollView }}
              >
              <FirstItemInRow color={paoNumText}>
                {paoNumbers}
              </FirstItemInRow>
              {['person', 'action', 'object'].map((name: string) => {

                const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.pagination })

                return (
                  <ItemInRow key={name}>
                    <PaoTextInput
                      setFirstUnfilledTextInput={setFirstUnfilledTextInput}
                      firstUnfilledTextInput={firstUnfilledTextInput}
                      firstOfTableTextInput={firstOfTableTextInput}
                      lastOfTableTextInput={lastOfTableTextInput}
                      currentlyFocusedTextInput={currentlyFocusedTextInput}
                      setCurrentlyFocusedTextInput={setCurrentlyFocusedTextInput}
                      prevTextInput={prevTextInput}
                      nextTextInput={nextTextInput}
                      tableData={tableData}
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
        }}
      />
      {/* // } */}
      {/* ) */}
      {/* } */}
      {/* </ScrollView> */}
    </>
  )
}

const StyledText = styled.Text`
  align-self: center;
`;





export default PaginationModeTable

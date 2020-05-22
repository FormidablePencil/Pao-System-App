import React from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { useTheme } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import PaoTextInput from './PaoTextInput'
import { PaoThemeType } from '../styles/theming'

const PaginationModeTable = ({
  bgColorByIndex,
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  tenPaoItemsArr,
  editModeTrue
}: {
  bgColorByIndex: any
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  tenPaoItemsArr: any
  editModeTrue
}) => {
  // const { config: { editMode } } = useSelector((state: any) => state.fabProperties)
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

        const bgColor = bgColorByIndex(index)

        return (
          <Row
            key={index}
            style={{ backgroundColor: bgColor, height: heightOfScrollView }}>
            <FirstItemInRow
              color={theme.colors.text}
            >
              {tenPaoItemsArr[index].number}
            </FirstItemInRow>
            {['person', 'action', 'object'].map((name: string) => {

              const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.pagination })
              // console.log(textInputValue)
              // let btnBgColor
              // let textColor
              // if (textInputValue) textColor = theme.colors.text

              // let selected = false
              // if (selected) btnBgColor = 'red'

              return (
                <ItemInRow key={name}>
                  <PaoTextInput
                    tenPaoItemsArr={tenPaoItemsArr}
                    index={index}
                    name={name}
                    paotableEditMode={editModeTrue}
                    saveControlledInputToReduxPaoList={saveControlledInputToReduxPaoList}
                    textInputValue={textInputValue}
                    onChangeTextHandler={onChangeTextHandler}
                    // btnBgColor={btnBgColor}
                    // textColor={textColor}
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

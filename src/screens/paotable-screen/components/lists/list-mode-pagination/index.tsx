import React, { useEffect, useRef, useState } from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../../../../../styles/paoTableStyles'
import { useTheme } from 'react-native-paper'
import useTextInputHandler, { Control } from '../../../../../hooks/useTextInputHandler'
import { listMode } from '../../../../../constants/constants'
import styled from 'styled-components'
import { PaoThemeType } from '../../../../../styles/theming'
import usePrimaryControlledColor, {
  WhereToColor,
  textControlledColor,
  placeholderControlledColor,
} from '../../../../../hooks/usePrimaryControlledColor'
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RootReducerT } from '../../../../../store'
import { ADD_ITEM_TO_STUDY, ADD_OR_REMOVE_ITEM_STUDY } from '../../../../../actions/types'
import DisplayNoStarted from '../../../../../components/DisplayNoStarted'
import { tableHeaderHeight } from '../../../../../components/TableHeader'
import { getPaoNumber } from '../../../../flashcard-screen/functions/various'

const SCREEN_HEIGHT = Dimensions.get('window').height

const ListModePagination = ({
  listSortedInTens,
  currentRenderItemsRange,
  controlledInput,
  setControlledInput,
  tableData,
  prevTextInput,
  nextTextInput,
  currentlyFocusedTextInput,
  setCurrentlyFocusedTextInput,
  firstOfTableTextInput,
  lastOfTableTextInput,
  firstUnfilledTextInput,
  setFirstUnfilledTextInput,
}: {
  listSortedInTens
  currentRenderItemsRange
  controlledInput: Control
  setControlledInput: any
  tableData: any
  prevTextInput
  nextTextInput
  currentlyFocusedTextInput
  setCurrentlyFocusedTextInput
  firstOfTableTextInput
  lastOfTableTextInput
  firstUnfilledTextInput
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
  const editModeTrue = useSelector((state: RootReducerT) => state.fabProperties.config.editMode)
  const theme: PaoThemeType = useTheme()
  const rowEvenBgColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const rowOddBgColor = usePrimaryControlledColor(WhereToColor.rowOdd)
  const [itemExistsInFavOfCurrentRange, setItemExistsInFavOfCurrentRange] = useState(false)

  const study = useSelector((state: RootReducerT) => state.study.study)
  const studyList = useSelector((state: RootReducerT) => state.study.list)
  const controlledThemeColor = useSelector((state: RootReducerT) => state.controlledThemeColor)
  const paoTableRowHeight = useSelector((state: RootReducerT) => state.misc.paoTableRowHeight)
  const [editOn, setEditOn] = useState(false)
  const coloredRowRef = useRef(false)

  const controlledTextColor = textControlledColor().color
  const textColor = controlledThemeColor ? controlledTextColor : theme.colors.text
  const placeholderColor = placeholderControlledColor().color
  const dispatch = useDispatch()

  const toggleItemExistsInFavOfCurrentRange = () => {
    if (
      studyList.filter(
        (studyNumber) =>
          studyNumber >= currentRenderItemsRange && studyNumber <= currentRenderItemsRange + 9
      ).length > 0
    ) {
      setTimeout(() => {
        setItemExistsInFavOfCurrentRange(true)
      }, 500)
    } else setItemExistsInFavOfCurrentRange(false)
  }

  useEffect(() => {
    if (study) toggleItemExistsInFavOfCurrentRange()
    else setItemExistsInFavOfCurrentRange(true)
  }, [currentRenderItemsRange, study, studyList])

  const assignRef = (input, index, name) => {
    if (name === 'person' && index === 0) firstOfTableTextInput.current = input
    if (name === 'object' && index === 9) lastOfTableTextInput.current = input
    switch (true) {
      case currentlyFocusedTextInput.name === 'person':
        if (name === 'person' && currentlyFocusedTextInput.index === index) return
        else if (name === 'action' && currentlyFocusedTextInput.index === index)
          nextTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index + 1)
          prevTextInput.current = input

        break
      case currentlyFocusedTextInput.name === 'action':
        if (name === 'person' && currentlyFocusedTextInput.index === index)
          prevTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index) return
        else if (name === 'object' && currentlyFocusedTextInput.index === index)
          nextTextInput.current = input

        break
      case currentlyFocusedTextInput.name === 'object':
        if (name === 'person' && currentlyFocusedTextInput.index === index - 1)
          nextTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index)
          prevTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index) return

        break

      default:
        break
    }
  }

  const onFocusHandler = (index, name) => {
    setFirstUnfilledTextInput({ number: null, name: null })
    setCurrentlyFocusedTextInput({ index, name })
  }
  const onBlurHandler = () => {
    setEditOn(false)
    saveControlledInputToReduxPaoList()
  }
  const onPressHandlerTextChange = () => editModeTrue && setEditOn(true)

  const starPaoItemHandler = (paoNumber) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({ type: ADD_OR_REMOVE_ITEM_STUDY, payload: paoNumber })
  }

  return (
    <View style={{ height: SCREEN_HEIGHT - tableHeaderHeight * 2, width: '100%' }}>
      <DisplayNoStarted
        itemExistsInFavOfCurrentRange={itemExistsInFavOfCurrentRange}
        currentRenderItemsRange={currentRenderItemsRange}
      />
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }: any) => {
          const bgColor = item % 2 == 1 ? rowEvenBgColor : rowOddBgColor
          const paoNumText = textColor ?? theme.colors.text
          const stared = studyList.filter(
            (studyNumber) => studyNumber === currentRenderItemsRange + item
          )[0]
          // * if no stared items then display msg
          if (!study || (study && stared)) {
            coloredRowRef.current = !coloredRowRef.current
            return (
              <TouchableOpacity onPress={() => starPaoItemHandler(currentRenderItemsRange + item)}>
                <Row
                  key={item}
                  style={{
                    backgroundColor: coloredRowRef.current ? rowEvenBgColor : rowOddBgColor,
                    height: paoTableRowHeight,
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      flexDirection: 'row',
                    }}
                  >
                    <Icon
                      name={stared ? 'star' : 'star-o'}
                      size={13}
                      color={stared ? '#D9BF14' : '#CDC78E'}
                    />
                    <FirstItemInRow color={paoNumText}>
                      {getPaoNumber(item, currentRenderItemsRange)}
                    </FirstItemInRow>
                  </View>
                  {['person', 'action', 'object'].map((name: string, whatIndex) => {
                    const textInputValue = returnValueDependingOnWeatherItemsAreSame({
                      index: currentRenderItemsRange + item,
                      name,
                      mode: listMode.pagination,
                    })

                    return (
                      <View
                        pointerEvents="none"
                        style={paoTableStyles.itemInRow}
                        key={currentRenderItemsRange + whatIndex}
                      >
                        <TextInputStyled
                          style={editModeTrue ? { height: '100%' } : {}}
                          selectTextOnFocus={true}
                          autoFocus={true}
                          onFocus={() => onFocusHandler(whatIndex, name)}
                          blurOnSubmit={false}
                          ref={(input) => {
                            assignRef(input, whatIndex, name)
                          }}
                          editable={editModeTrue}
                          onBlur={() => onBlurHandler()}
                          placeholder={name}
                          placeholderTextColor={bgColor ? textColor : placeholderColor}
                          // textAlignVertical='top'
                          textAlign="center"
                          textColor={textColor}
                          value={textInputValue}
                          onChangeText={(text) =>
                            onChangeTextHandler({
                              text,
                              number: currentRenderItemsRange + item,
                              name,
                            })
                          }
                        />
                      </View>
                    )
                  })}
                </Row>
              </TouchableOpacity>
            )
          }
        }}
      />
    </View>
  )
}

const PaoText = styled(Text)`
  textalign: center;
`
const TextInputStyled = styled<any>(TextInput)`
  /* align-self: center; */
  color: ${({ textColor }) => textColor};
  width: 100%;
`

export const paoTableStyles = StyleSheet.create({
  itemInRow: {
    width: '33%',
    height: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 2,
  },
})

export default ListModePagination

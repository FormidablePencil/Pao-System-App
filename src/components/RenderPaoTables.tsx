import React, { useState } from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { useTheme } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import { PaoThemeType } from '../styles/theming'
import usePrimaryControlledColor, { WhereToColor, textControlledColor, placeholderControlledColor } from '../hooks/usePrimaryControlledColor'
import { FlatList, Text, TextInput, View } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/FontAwesome"
import { RootReducerT } from '../store'
import { ADD_ITEM_TO_STUDY, ADD_OR_REMOVE_ITEM_STUDY } from '../actions/types'

const RenderPaoTables = ({
  listSortedInTens,
  currentRenderItemsRange,
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
  listSortedInTens
  currentRenderItemsRange
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

  const studyList = useSelector((state: RootReducerT) => state.study.list)
  const controlledThemeColor = useSelector((state: RootReducerT) => state.controlledThemeColor)
  const [editOn, setEditOn] = useState(false)

  const controlledTextColor = textControlledColor().color
  const textColor = controlledThemeColor ? controlledTextColor : theme.colors.text
  const placeholderColor = placeholderControlledColor().color
  const dispatch = useDispatch()

  const assignRef = (input, index, name) => {
    if (name === 'person' && index === 0) firstOfTableTextInput.current = input
    if (name === 'object' && index === 9) lastOfTableTextInput.current = input
    switch (true) {
      case currentlyFocusedTextInput.name === 'person':
        /* */if (name === 'person' && currentlyFocusedTextInput.index === index) return
        else if (name === 'action' && currentlyFocusedTextInput.index === index) nextTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index + 1) prevTextInput.current = input

        break;
      case currentlyFocusedTextInput.name === 'action':
          /* */if (name === 'person' && currentlyFocusedTextInput.index === index) prevTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index) return
        else if (name === 'object' && currentlyFocusedTextInput.index === index) nextTextInput.current = input

        break;
      case currentlyFocusedTextInput.name === 'object':
            /* */if (name === 'person' && currentlyFocusedTextInput.index === index - 1) nextTextInput.current = input
        else if (name === 'action' && currentlyFocusedTextInput.index === index) prevTextInput.current = input
        else if (name === 'object' && currentlyFocusedTextInput.index === index) return

        break;

      default:
        break;
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
  const getPaoNumber = (index) => {
    return currentRenderItemsRange + index >= 0 && currentRenderItemsRange + index <= 9 ?
      `0${currentRenderItemsRange + index}` : currentRenderItemsRange + index
  }

  const starPaoItemHandler = (paoNumber) =>
    dispatch({ type: ADD_OR_REMOVE_ITEM_STUDY, payload: paoNumber })

  return (
    <>
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={item => item.toString()}
        renderItem={({ item, index }: any) => {
          const bgColor = item % 2 == 1 ? rowEvenBgColor : rowOddBgColor
          const paoNumText = textColor ?? theme.colors.text
          const stared = studyList.filter(studyNumber => studyNumber === currentRenderItemsRange + item)[0]
          return (
            <TouchableOpacity onPress={() => starPaoItemHandler(currentRenderItemsRange + item)}>
              <Row
                key={item}
                style={{ backgroundColor: bgColor, height: heightOfScrollView, alignItems: 'center', position: 'relative' }}
              >
                <View style={{ alignItems: 'center', top: -7, zIndex: 3 }}>

                  <Icon style={{}} name={stared ? 'star' : 'star-o'} size={15} color='#D9BF14' />
                  <FirstItemInRow color={paoNumText}>
                    {/* <Icon name='star-o' size={20} color='#D9BF14' /> */}
                    {getPaoNumber(item)}
                  </FirstItemInRow>
                </View>
                {['person', 'action', 'object'].map((name: string, whatIndex) => {

                  const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index: currentRenderItemsRange + item, name, mode: listMode.pagination })

                  return (
                    <ItemInRow key={whatIndex}>
                      <TextInputContainer animation={bgColor && 'bounceIn'} iterationCount={1} style={{ backgroundColor: bgColor }}>
                        {editOn ?
                          <TouchableWithoutFeedback onPress={() => onPressHandlerTextChange()}>
                            <PaoText>tap</PaoText>
                          </TouchableWithoutFeedback>
                          :
                          <TextInputStyled
                            selectTextOnFocus={true}
                            autoFocus={true}
                            onFocus={() => onFocusHandler(whatIndex, name)}
                            blurOnSubmit={false}
                            ref={(input) => { assignRef(input, whatIndex, name) }}
                            editable={editModeTrue}
                            onBlur={() => onBlurHandler()}
                            placeholder={name}
                            placeholderTextColor={bgColor ? textColor : placeholderColor}
                            textAlign='center'
                            textColor={textColor}
                            value={textInputValue}
                            onChangeText={text => onChangeTextHandler({ text, number: currentRenderItemsRange + item, name })}
                          />
                        }
                      </TextInputContainer>
                    </ItemInRow>
                  )
                }
                )}
              </Row>
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

const StyledText = styled.Text`
  align-self: center;
`;

const PaoText = styled(Text)`
  textAlign: center;
`;
const TextInputContainer = styled<any>(Animatable.View)`
  border-radius: 10; margin: 10px 2px;
`;
const TextInputStyled = styled<any>(TextInput)`
  align-self: center;
  height: 100%;
  color: ${({ textColor }) => textColor};
  width: 100%;
`;




export default RenderPaoTables

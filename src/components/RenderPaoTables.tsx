import React, { useRef, useState } from 'react'
import { ItemInRow, Row, FirstItemInRow } from '../styles/paoTableStyles'
import { useTheme, Button } from 'react-native-paper'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import styled from 'styled-components'
import PaoTextInput from './PaoTextInput'
import { PaoThemeType } from '../styles/theming'
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText, textControlledColor, placeholderControlledColor } from '../hooks/usePrimaryControlledColor'
import { ScrollView, FlatList, Text, TextInput } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';

const RenderPaoTables = ({
  currentRenderItemsRange,
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
  const textColor2 = distinguishingTextColorFromRestOfText().color

  const { controlledThemeColor } = useSelector((state: any) => state)
  const [editOn, setEditOn] = useState(false)

  interface Btn {
    number: number
    name: string
    show: boolean
  }

  const controlledTextColor = textControlledColor().color
  const textColor = controlledThemeColor ? controlledTextColor : theme.colors.text
  const placeholderColor = placeholderControlledColor().color

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

  // useEffect(() => {
  //   if (!editModeTrue) setFirstUnfilledTextInput({ number: null, name: null })
  // }, [editModeTrue])

  const onBlurHandler = () => {
    setEditOn(false)
    saveControlledInputToReduxPaoList()
  }
  const onPressHandlerTextChange = () => {
    if (editModeTrue) setEditOn(true)
  }

  const computed = tableData.filter(doc => doc.number === firstUnfilledTextInput.number)[0] ?? { number: null }
  // const bgColor = tableData[index].number === computed.number
  //   && firstUnfilledTextInput.name === name ? theme.colors.accent : null



  return (
    <>
      {/* <ScrollView keyboardShouldPersistTaps={'always'} style={{ height: 30 }}> */}
      {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => { */}
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const index = item
          const bgColor = index % 2 == 1 ? rowEvenBgColor : rowOddBgColor

          const paoNumText = textColor ?? theme.colors.text

          const paoNumbers = tableData[index].number >= 0 && tableData[index].number <= 9 ?
            `0${tableData[index].number}` : tableData[index].number
          return (
            <>
              <Row
                key={item}
                style={{ backgroundColor: bgColor, height: heightOfScrollView }}
              >
                <FirstItemInRow color={paoNumText}>
                  {paoNumbers}
                </FirstItemInRow>
                {['person', 'action', 'object'].map((name: string, index) => {

                  const textInputValue = returnValueDependingOnWeatherItemsAreSame({ index, name, mode: listMode.pagination })

                  return (
                    <ItemInRow key={index}>
                      {/* <TouchableNativeFeedback> */}
                      {/* <Text>tap</Text> */}
                      {/* </TouchableNativeFeedback> */}
                      <TextInputContainer key={index} animation={bgColor && 'bounceIn'} iterationCount={1} style={{ backgroundColor: bgColor }}>
                        {editOn ?
                          <TouchableWithoutFeedback onPress={() => onPressHandlerTextChange()}>
                            <PaoText>tap</PaoText>
                          </TouchableWithoutFeedback>
                          :
                          <TextInputStyled

                            selectTextOnFocus={true}
                            autoFocus={true}
                            onFocus={() => onFocusHandler(index, name)}
                            blurOnSubmit={false}
                            ref={(input) => { assignRef(input, index, name) }}
                            editable={editModeTrue}
                            onBlur={() => onBlurHandler()}
                            placeholder={name}
                            placeholderTextColor={bgColor ? textColor : placeholderColor}
                            textAlign='center'
                            textColor={textColor}
                            value={textInputValue}
                            onChangeText={text => onChangeTextHandler({ text, number: tableData[index].number, name })}
                          />
                        }
                      </TextInputContainer>
                      {/* <PaoTextInput
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
                      editModeTrue={editModeTrue}
                      saveControlledInputToReduxPaoList={saveControlledInputToReduxPaoList}
                      textInputValue={textInputValue}
                      onChangeTextHandler={onChangeTextHandler}
                    /> */}
                    </ItemInRow>
                  )
                }
                )}
              </Row>
            </>
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

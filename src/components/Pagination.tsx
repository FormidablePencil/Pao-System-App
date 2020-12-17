import React, { useContext } from 'react'
import styled from 'styled-components';
import { Button, IconButton, useTheme, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { PaoThemeType } from '../styles/theming';
import { Animated, Dimensions } from 'react-native';
import usePrimaryControlledColor, { WhereToColor, textControlledColorPagination } from '../hooks/usePrimaryControlledColor';
import { PaoTableScreenContext } from '../screens/paotable-screen'
import { useSelector } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get("window").width

interface PaginationType {
  currentRenderItemsRange
  setCurrentRenderItemsRange
  navigateTextInputs
  currentlyFocusedTextInput
  swiperIndex
  jumpToCertainTable
}
export enum paginateDirection {
  previous,
  next,
  firstOfTable, // had to add these variables that don't make sematical/contextual sense
  lastOfTable,
}

const Pagination = ({
  currentRenderItemsRange, setCurrentRenderItemsRange,
  navigateTextInputs,
  currentlyFocusedTextInput,
  jumpToCertainTable,
  swiperIndex
}: PaginationType) => {
  const { keyboardPresent, editModeTrue } = useContext(PaoTableScreenContext)
  const theme: PaoThemeType = useTheme()

  // console.log(swiperIndex.current, 'swiperIndex from pagination');
  const paginateTo = (num: number) => {
    const newNum = num * 10
    jumpToCertainTable(num)
    setCurrentRenderItemsRange(newNum)
  } //table pagination option

  const renderItemsToCurrentPage = (selected: number) => {
    if (selected === paginateDirection.next) {
      setCurrentRenderItemsRange((prevState: any) => prevState < 89 ? prevState + 10 : prevState)
    } else if (selected === paginateDirection.previous) {
      if (currentRenderItemsRange <= 0) return
      setCurrentRenderItemsRange((prevState: any) => prevState - 10)
    }
  } //table pagination option

  const paginationBtnOnPressHandler = (direction) => {
    let atTheBeginningOrEndOfTable = false
    if (currentlyFocusedTextInput.index === 0 &&
      currentlyFocusedTextInput.name === 'person' &&
      direction === paginateDirection.previous ||
      currentlyFocusedTextInput.index === 9 &&
      currentlyFocusedTextInput.name === 'object' &&
      direction === paginateDirection.next
    ) atTheBeginningOrEndOfTable = true
    //Todo - focus in on the first/last (depending on where your at) of the table when navigated there
    //~ idea: pass a type and handle it in paoTextInputs accordingly
    if (direction === paginateDirection.previous) {
      if (atTheBeginningOrEndOfTable) {
        renderItemsToCurrentPage(paginateDirection.previous)
        navigateTextInputs(paginateDirection.lastOfTable)
      } else if (keyboardPresent) navigateTextInputs(paginateDirection.previous)
      else renderItemsToCurrentPage(paginateDirection.previous)
    } else if (direction === paginateDirection.next) {
      if (atTheBeginningOrEndOfTable) {
        renderItemsToCurrentPage(paginateDirection.next)
        navigateTextInputs(paginateDirection.firstOfTable)
      } else if (keyboardPresent) navigateTextInputs(paginateDirection.next)
      else renderItemsToCurrentPage(paginateDirection.next)
    }
  }

  const controlledPgColor = usePrimaryControlledColor(WhereToColor.paginationSideBtn)
  const paginationBtnColor = editModeTrue ? theme.colors.accent : controlledPgColor

  return (
    <LinearGradient
      colors={[usePrimaryControlledColor(WhereToColor.pagination), usePrimaryControlledColor(WhereToColor.pagination2)]}
      // colors={[theme.colors.linearGradientBgColors.first, theme.colors.linearGradientBgColors.second]}
      start={[.8, 0.8]}
    >
      <PaginationContainer>
        <PaginationBtnAnimated
          style={{
            backgroundColor: paginationBtnColor,
            marginRight: SCREEN_WIDTH > 380 ? 4 : 0,
            width: SCREEN_WIDTH > 380 ? 50 : 40
          }}
          icon='menu-left'
          size={35}
          color='white'
          onPress={() => paginationBtnOnPressHandler(paginateDirection.previous)}
          mode="contained" />
        <Column>
          <Row>
            {[0, 1, 2, 3, 4].map((num) => <PaginationBtnComponent key={num} num={num} currentRenderItemsRange={currentRenderItemsRange} paginateTo={paginateTo} theme={theme} />)}
          </Row>
          <Row>
            {[5, 6, 7, 8, 9].map((num) => <PaginationBtnComponent key={num} num={num} currentRenderItemsRange={currentRenderItemsRange} paginateTo={paginateTo} theme={theme} />)}
          </Row>
        </Column>
        <Row style={{ justifyContent: 'space-around' }}>
          <PaginationBtnAnimated
            style={{
              backgroundColor: paginationBtnColor,
              marginLeft: SCREEN_WIDTH > 380 ? 4 : 0,
              width: SCREEN_WIDTH > 380 ? 50 : 40
            }}
            icon='menu-right'
            size={35}
            color='white'
            onPress={() => paginationBtnOnPressHandler(paginateDirection.next)}
            mode="contained" />
        </Row>
      </PaginationContainer>
    </LinearGradient >
  )
}

const PaginationBtnComponent = ({ num, currentRenderItemsRange, paginateTo, theme }) => {
  const controlledThemeColor = useSelector((state: any) => state.controlledThemeColor)
  const active = currentRenderItemsRange.toString()[0] === num.toString()
  const textColor = active ? 'white' : textControlledColorPagination()
  const dynamicBackgroundColor = active && { backgroundColor: usePrimaryControlledColor(WhereToColor.paginationBtns, theme.colors.primary) }
  return (
    <Button style={controlledThemeColor ? dynamicBackgroundColor : null} onPress={() => paginateTo(num)} key={num} compact={true}>
      <PaginationBtnText style={textColor}>{`${num}0`}</PaginationBtnText>
    </Button>
  )
}

const PaginationBtnText = styled(Text)`
  color: white;
`;
const PaginationBtn = styled(IconButton)`
  border-radius: 3px;
  /* background-color: rgba(27,27,27,.2); */
  elevation: 0;
  margin: 0px;
`;
const PaginationBtnAnimated = Animated.createAnimatedComponent(PaginationBtn)/* this is what show that 'functions cannot be given refs.' warning */


const Column = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
`;
const PaginationContainer = styled.View`
/* height: ${({ height }) => height}; */
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 25px;
`;


export default Pagination

import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Button, DefaultTheme, IconButton, useTheme, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { PaoThemeType } from '../styles/theming';
import { Animated } from 'react-native';
import usePrimaryControlledColor, { WhereToColor, distinguishingTextColorFromRestOfText, textControlledColor, textControlledColorPagination } from '../hooks/usePrimaryControlledColor';
import { PaoTableScreenContext } from '../screens/PaotableScreen'

interface PaginationType {
  currentRenderItemsRange
  setCurrentRenderItemsRange
  navigateTextInputs
}
export enum paginateDirection {
  previous,
  next
}

const Pagination = ({ currentRenderItemsRange, setCurrentRenderItemsRange, navigateTextInputs }: PaginationType) => {
  const { keyboardPresent, animateWhenKeyboard } = useContext(PaoTableScreenContext)
  const theme: PaoThemeType = useTheme()
  
  // const interpolatePaginBtnColor = animateWhenKeyboard.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['rgba(153,121,255,1.0)', 'rgba(255,247,151,1.0)']
  // })
  
  const paginateTo = (num: number) => {
    const newNum = num * 10
    setCurrentRenderItemsRange(newNum)
  } //table pagination option

  const renderItemsToCurrentPage = (selected: number) => {
    if (selected === paginateDirection.next) {
      setCurrentRenderItemsRange((prevState: any) => prevState + 10)
    } else if (selected === paginateDirection.previous) {
      if (currentRenderItemsRange <= 0) return
      setCurrentRenderItemsRange((prevState: any) => prevState - 10)
    }
  } //table pagination option

  const paginationBtnOnPressHandler = (direction) => {
    if (direction === paginateDirection.previous) {
      if (keyboardPresent) navigateTextInputs(paginateDirection.previous)
      else renderItemsToCurrentPage(paginateDirection.previous)
    } else if (direction === paginateDirection.next) {
      if (keyboardPresent) navigateTextInputs(paginateDirection.next)
      else renderItemsToCurrentPage(paginateDirection.next)
    }
  }

  const paginationBtnColor = keyboardPresent ? '#9979FF' : usePrimaryControlledColor(WhereToColor.paginationSideBtn)


  return (
    <LinearGradient
      colors={[usePrimaryControlledColor(WhereToColor.pagination), usePrimaryControlledColor(WhereToColor.pagination2)]}
      // colors={[theme.colors.linearGradientBgColors.first, theme.colors.linearGradientBgColors.second]}
      start={[.8, 0.8]}
    >
      <PaginationContainer>

        <PaginationBtnAnimated
          style={{ backgroundColor: paginationBtnColor }}
          icon='menu-left'
          size={35}
          color='white'
          onPress={() => paginationBtnOnPressHandler(paginateDirection.previous)}
          mode="contained" />
        <Column>
          <Row>
            {[0, 1, 2, 3, 4].map((num) => <PaginationBtnComponent num={num} currentRenderItemsRange={currentRenderItemsRange} paginateTo={paginateTo} theme={theme} />)}
          </Row>
          <Row>
            {[5, 6, 7, 8, 9].map((num) => <PaginationBtnComponent num={num} currentRenderItemsRange={currentRenderItemsRange} paginateTo={paginateTo} theme={theme} />)}
          </Row>
        </Column>
        <Row style={{ justifyContent: 'space-around' }}>
          <PaginationBtn
            style={{ backgroundColor: usePrimaryControlledColor(WhereToColor.paginationSideBtn) }}
            icon='menu-right'
            size={35}
            color='white'
            onPress={() => paginationBtnOnPressHandler(paginateDirection.next)}
            mode="contained" />
        </Row>
      </PaginationContainer>
    </LinearGradient>
  )
}

const PaginationBtnComponent = ({ num, currentRenderItemsRange, paginateTo, theme }) => {
  const active = currentRenderItemsRange.toString()[0] === num.toString()
  const textColor = active ? 'white' : textControlledColorPagination()
  // const dynamicBackgroundColor = active && { backgroundColor: usePrimaryControlledColor(WhereToColor.paginationBtns, theme.colors.primary) }
  return (
    <Button /* style={dynamicBackgroundColor} */ onPress={() => paginateTo(num)} key={num} compact={true}>
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
const PaginationBtnAnimated = Animated.createAnimatedComponent(PaginationBtn)

const Column = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
`;
const PaginationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 25px;
`;


export default Pagination

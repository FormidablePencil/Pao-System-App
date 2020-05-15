import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native-tailwind'
import styled from 'styled-components';
import { Button, DefaultTheme, IconButton } from 'react-native-paper';

interface PaginationType {
  currentRenderItemsRange: any
  setCurrentRenderItemsRange: any
}

const Pagination = ({ currentRenderItemsRange, setCurrentRenderItemsRange }: PaginationType) => {
  enum paginateDirection {
    next,
    previous
  }


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



  return (
    <PaginationContainer style={{ backgroundColor: DefaultTheme.colors.accent }}>
      <PaginationBtn icon='menu-left' size={35} color='white' onPress={() => renderItemsToCurrentPage(paginateDirection.previous)} mode="contained" />
      <Column>
        <Row>
          {[0, 1, 2, 3, 4].map((num: number) =>
            <Button onPress={() => paginateTo(num)} key={num} compact={true}>
              <Text className='p-3'>{`${num}0`}</Text>
            </Button>
          )}
        </Row>
        <Row>
          {[5, 6, 7, 8, 9].map((num: number) =>
            <Button onPress={() => paginateTo(num)} key={num} compact={true}>
              <Text className='p-3'>{`${num}0`}</Text>
            </Button>
          )}
        </Row>
      </Column>
      <Row style={{ justifyContent: 'space-around' }}>
        <PaginationBtn icon='menu-right' size={35} color='white' onPress={() => renderItemsToCurrentPage(paginateDirection.next)} mode="contained" />
      </Row>
    </PaginationContainer>
  )
}

const PaginationBtn = styled(IconButton)`
  border-radius: 3px;
  background-color: rgba(27,27,27,.2);
  elevation: 0;
  margin: 0px;
`;
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

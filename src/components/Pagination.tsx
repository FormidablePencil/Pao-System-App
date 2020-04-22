import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native-tailwind'
import styled from 'styled-components';
import { Button, DefaultTheme } from 'react-native-paper';

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
    <Row style={{ backgroundColor: DefaultTheme.colors.accent }}>
      <Column>
        <Row>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) =>
            <Button onPress={() => paginateTo(num)} key={num} compact={true}>
              <Text className='p-3'>{`${num}0`}</Text>
            </Button>
          )}
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          <PaginationBtn onPress={() => renderItemsToCurrentPage(paginateDirection.previous)} mode="contained" >
            previous
          </PaginationBtn>
          <PaginationBtn onPress={() => renderItemsToCurrentPage(paginateDirection.next)} mode="contained" >
            Next
      </PaginationBtn>
        </Row>
      </Column>
    </Row>
  )
}

const PaginationBtn = styled(Button)`
  width: 100px;
  /* height: 100%; */
`;
const Column = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
`;

export default Pagination

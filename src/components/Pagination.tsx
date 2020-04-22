import React from 'react'
import { View, Text } from 'react-native-tailwind'
import styled from 'styled-components';
import { Button, DefaultTheme } from 'react-native-paper';

interface PaginationType {
  renderItemsToCurrentPage: any
  paginateTo: any
}

const Pagination = ({ renderItemsToCurrentPage, paginateTo }: PaginationType) => {
  return (
    <Row style={{backgroundColor: DefaultTheme.colors.accent}}>
      <Column>
        <Row>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) =>
            <Button onPress={() => paginateTo(num)} key={num} compact={true}>
              <Text className='p-3'>{`${num}0`}</Text>
            </Button>
          )}
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          <PaginationBtn onPress={() => renderItemsToCurrentPage(0)} mode="contained" >
            previous
          </PaginationBtn>
          <PaginationBtn onPress={() => renderItemsToCurrentPage(1)} mode="contained" >
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

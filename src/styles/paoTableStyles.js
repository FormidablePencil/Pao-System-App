import styled from 'styled-components';

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0px 15px;
`
export const FirstItemInRow = styled.Text`
  align-self: center;
  color: ${({ color }) => color ?? 'white'};
  width: 20px;
  text-align: center;
  justify-content: center;
`;
export const FirstItemInRowImage = styled(FirstItemInRow)`
  height: 30;
`;
export const ItemInRow = styled.View`
  width: 33%;
  flex: 1;
  justify-content: center;
`;
export const StyledTextInRowItem = styled.Text`
  text-align: center;
  color: ${({ color }) => color ?? 'white'};
  font-size: 20px;
`
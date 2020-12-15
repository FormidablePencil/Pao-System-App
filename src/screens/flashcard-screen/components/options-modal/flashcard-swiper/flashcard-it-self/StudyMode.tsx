import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootReducerT } from '../../../../../../store';

const StudyMode = ({ index, side }) => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  console.log(index);
  return (
    <Wrapper>
      {['person', 'action', 'object'].map(name => {
        return (
          <StudyCardContainer key={name} side={side}>
            <StudyCardText>
              {studyRandomMode[name][index]?.item}
            </StudyCardText>
            {side === 'back' &&
              <StudyCardText>
                {studyRandomMode[name][index]?.number}
              </StudyCardText>
            }
          </StudyCardContainer>
        )
      })}
    </Wrapper>
  )
}


const Wrapper = styled(View)`
  align-items: center; 
  width: 100%;
`;
const StudyCardContainer = styled<any>(View)`
  height: 60;
  background-color: transparent;
  flex-direction: row;
  width: 100%;
  justify-content: ${({ side }) => side === 'front' ? 'center' : 'space-between'};
  padding-horizontal: 10px;
`
const StudyCardText = styled(Text)`
  align-self: center;
  text-align: center;
  font-family: MontserratReg; 
  font-size: 30;
`

export default StudyMode

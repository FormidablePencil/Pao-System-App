import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components';
import useGetStudyModeRandom from '../../../functions/useGetStudyModeRandom';

const StudyModeTxt = ({ isFlipped, index, side }) => {
  const { getNumberRandomMode, getPaoItemRandomMode } = useGetStudyModeRandom()

  const showNumber = !isFlipped && side === 'front' || side === 'back'
  const showPaoItem = isFlipped && side === 'front' || side === 'back'

  return (
    <Wrapper>
      {['person', 'action', 'object'].map(name => {
        return (
          <StudyCardContainer key={name} side={side}>
            <StudyCardText style={[
              styles.numbers,
              !showNumber ? styles.hiddenNumber : styles.visibleNumber
            ]}>
              {showNumber ? getNumberRandomMode(name, index) : ''}
            </StudyCardText>
            <StudyCardText style={[
              !showPaoItem && styles.hiddenPaoText
            ]}>
              {showPaoItem ? getPaoItemRandomMode(name, index) : ''}
            </StudyCardText>
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
  /* padding-horizontal: 10px; */
`
const StudyCardText = styled(Text)`
  align-self: center;
  font-family: MontserratReg; 
  font-size: 30;
  width: 100%;
  /* border-col */
`

const styles = StyleSheet.create({
  numbers: {
    width: 45,
  },
  visibleNumber: {
    color: 'blue',
    marginLeft: 10,
  },
  hiddenNumber: {
    borderBottomWidth: 1,
    margin: 5,
  },
  hiddenPaoText: {
    borderBottomWidth: 1,
    width: "63%"
  }
})

export default StudyModeTxt

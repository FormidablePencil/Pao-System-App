import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { amber50 } from 'react-native-paper/lib/typescript/styles/colors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootReducerT } from '../../../../../store';

const StudyModeTxt = ({ isFlipped, index, side }) => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const showNumber = !isFlipped && side === 'front' || side === 'back'
  const showPaoItem = isFlipped && side === 'front' || side === 'back'
  const paoItem = (name) => studyRandomMode[name][index]?.item
  const number = (name) => {
    let num = studyRandomMode[name][index]?.number.toString()
    if (!num) return
    if (num.length === 1) num = `0${num}`
    return num
  }

  return (
    <Wrapper>
      {['person', 'action', 'object'].map(name => {
        return (
          <StudyCardContainer key={name} side={side}>
            <StudyCardText style={[
              styles.numbers,
              !showNumber ? styles.hiddenNumber : styles.visibleNumber
            ]}>
              {showNumber ? number(name) : ''}
            </StudyCardText>
            <StudyCardText style={[
              !showPaoItem && styles.hiddenPaoText
            ]}>
              {showPaoItem ? paoItem(name) : ''}
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

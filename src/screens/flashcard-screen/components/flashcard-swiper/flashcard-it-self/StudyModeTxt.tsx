import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components';
import useGetStudyModeRandom from '../../../functions/useGetStudyModeRandom';

const StudyModeTxt = ({ isFlipped, index, side }) => {
  const { getNumberRandomMode, getPaoItemRandomMode } = useGetStudyModeRandom()
  const [showAnswer, setShowAnswer] = useState({
    person: false,
    action: false,
    object: false,
  })

  const showNumber = !isFlipped && side === 'front' || side === 'back'
  const showPaoItem = isFlipped && side === 'front' || side === 'back'

  const onPressHandler = (name) => setShowAnswer(prev => ({ ...prev, [name]: !prev[name] }))

  return (
    <Wrapper>
      {['person', 'action', 'object'].map(name => {
        return (
          <StudyCardContainer key={name} side={side}>
            <TouchableTxtBtn disabled={showPaoItem} onPress={() => onPressHandler(name)}>
              <StudyCardText style={[
                styles.numbers,
                !showNumber ? styles.hiddenNumber : styles.visibleNumber
              ]}>
                {showNumber || showAnswer[name] ? getNumberRandomMode(name, index) : ''}
              </StudyCardText>
              <StudyCardText style={[
                !showPaoItem && styles.hiddenPaoText
              ]}>
                {showPaoItem || showAnswer[name] ? getPaoItemRandomMode(name, index) : ''}
              </StudyCardText>
            </TouchableTxtBtn>
          </StudyCardContainer>
        )
      })}
    </Wrapper>
  )
}

const TouchableTxtBtn = ({ children, onPress, disabled }) => {
  if (disabled) return <>{children}</>
  return <TouchableWithoutFeedback onPress={onPress}>
    <View style={{ height: '100%', width: "100%", flexDirection: 'row', }}>
      {children}
    </View>
  </TouchableWithoutFeedback>
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
  /* height: 100%; */
  text-align: center;
  align-items: flex-end;
  justify-content: flex-end;
  width: 75%;
`

const styles = StyleSheet.create({
  numbers: {
    width: 40,
  },
  visibleNumber: {
    color: 'blue',
    marginLeft: 10,
    alignItems: 'center',
  },
  hiddenNumber: {
    borderBottomWidth: 1,
    margin: 5,
  },
  hiddenPaoText: {
    borderBottomWidth: 1,
    
  }
})

export default StudyModeTxt

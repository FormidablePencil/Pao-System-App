import React, { useRef, useContext, useState } from 'react'
import { View, Text } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import CardFlip from 'react-native-card-flip';
import { TouchableHighlight, Directions } from 'react-native-gesture-handler';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import styled from 'styled-components';
import { DefaultTheme, Button, FAB } from 'react-native-paper';
import { PaoAppContext } from '../routes/TabNavigator';
import sortPaoList from './logic/sortPaoList';
import { fabActions, swipeDirection } from '../constants/constants';
import { useSelector } from 'react-redux';
import useFlashcardModes from '../hooks/useFlashcardModes';
import { FlashcardsContext } from '../screens/FlashcardsScreen'

//~ unless paper has it implement swipe card gesture...

const CardStyled = styled(Card)`
  height: 100px;
  width: 100px;
  background: pink;
`;
const CardStackStyled = styled(CardStack)`
   flex: 1;
   justify-content:center;
   align-items: center;
   /* width: 80%; */
`;
const CoverupTextView = styled.View`
  position: absolute;
  align-self: center;
  height: 100px;
  width: 100px;
`;
const GoBackButton = styled(FAB)`
  position: absolute;
  bottom: 0;
  left: 0;
`;
const PaoText = styled.Text`
  text-align: center;
  font-size: 20px;
  padding-vertical: 10px;
`;
const PaoTextGrey = styled(PaoText)`
  color: lightgrey;
`;

const Flashcard = ({ }) => {
  // const {flashcardMode, setFlashcardMode} = useContext(FlashcardsContext)
  const pao = useSelector((state: any) => state.pao[0] ? state.pao : [{ number: null, person: null, action: null, object: null }])
  console.log(pao)
  let swiper: any = useRef(null)
  let cardRef: any = useRef(null)
  let cardRef2: any = useRef(null)
  // console.log(paoList, 'did I grab the paoList????')

  const [paoDocNum, setPaoDocNum] = useState(0)
  const [previouslySwipeDirection, setPreviouslySwipeDirection] = useState(0)
  // const sortedPaoList = sortPaoList({ list: paoList, mode: flashcardMode })

  const flipCard = () => {
    cardRef.current.flip()
    cardRef2.current.flip()
  }
  //~ front will have one item and back the 2 others and the number
  //various settings: 
  //~ 1. study all person action object all shuffled randomly. 
  //~ 2. study only person, action or object with number in the back
  //~ 3. study number with person, action, object in the back
  //@ but first I must have a list to work with. CrUD firstly
  //  // * study in accending order
  /////  //* study in deccending order


  const swipeHandler = ({ direction }: any) => {
    setPreviouslySwipeDirection(direction)
    setPaoDocNum(paoDocNum + 1)
  }

  // console.log(swipeDirection)

  const handleGoBackButton = () => {
    if (paoDocNum === 0) return
    setPaoDocNum(prev => prev - 1)
    switch (previouslySwipeDirection) {

      case Directions.LEFT:
        swiper.current.goBackFromLeft()
        setPreviouslySwipeDirection(Directions.RIGHT)
        break;
      case Directions.RIGHT:
        swiper.current.goBackFromRight()
        setPreviouslySwipeDirection(Directions.LEFT)
        break;
      case Directions.UP:
        swiper.current.goBackFromTop()
        setPreviouslySwipeDirection(Directions.UP)
        break;
      case Directions.DOWN:
        swiper.current.goBackFromBottom()
        setPreviouslySwipeDirection(Directions.DOWN)
        break;

      default:
        break;

    }
  }


  //% wtf is this?!?: An Ingenious way to make swipe and flip work with two different libraries without going in and creating the effects/funcitonality from scratch
  return (
    <>
      <GoBackButton icon='keyboard-backspace' onPress={() => handleGoBackButton()} />
      <View style={{ height: '80%', width: '80%' }}>
        <CardStackStyled
          loop
          ref={swiper}
          onSwipedLeft={() => swipeHandler({ direction: Directions.LEFT })}
          onSwipedRight={() => swipeHandler({ direction: Directions.RIGHT })}
          onSwipedTop={() => swipeHandler({ direction: Directions.UP })}
          onSwipedBottom={() => swipeHandler({ direction: Directions.DOWN })}
          secondCardZoom={.1}
          verticalSwipe={false}
          horizontalSwipe={pao[paoDocNum + 1] ? true : false}
          horizontalThreshold={1}
        >
          <Card style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CoverupTextView />
            <View>
              <CardFlip flipDirection={'y'} style={{ ...globalStyles.cardFlip, backgroundColor: DefaultTheme.colors.background }} ref={cardRef} duration={350} >
                <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                  <View className="flex flex-col h-full items-center justify-center">
                    <View className="w-full">
                      {['number', 'person', 'action', 'object'].map((name: any) => {
                        console.log(pao[paoDocNum][name], 'pao[paoDocNum]pao[paoDocNum]pao[paoDocNum]')
                        if (pao[paoDocNum][name]) {
                          return (
                            <PaoText key={name}>
                              {pao[paoDocNum][name]}
                            </PaoText>
                          )
                        } else {
                          return (
                            <PaoTextGrey key={name}>
                              {[name]}
                            </PaoTextGrey>
                          )
                        }
                      })}
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                  <View className="flex flex-col h-full items-center justify-center">
                    <View className="w-full h-12">
                      <Text className="text-center text-3xl">
                        back
                    </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </CardFlip>
            </View>
          </Card>
          <Card style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <CardFlip flipDirection={'y'} style={{ ...globalStyles.cardFlip, backgroundColor: DefaultTheme.colors.background }} ref={cardRef2} duration={350} >
                <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                  <View className="flex flex-col h-full items-center justify-center">
                    <View className="w-full h-12">
                      <Text className="text-center text-3xl">
                        fronts
                    </Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                  <View className="flex flex-col h-full items-center justify-center">
                    <View className="w-full h-12">
                      <Text className="text-center text-3xl">
                        back
                    </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </CardFlip>
            </View>
          </Card>
        </CardStackStyled>
      </View>
    </>
  )
}

export default Flashcard

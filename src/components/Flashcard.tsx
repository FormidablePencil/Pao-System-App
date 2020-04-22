import React, { useRef, useContext, useState } from 'react'
import { View, Text } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import CardFlip from 'react-native-card-flip';
import { TouchableHighlight } from 'react-native-gesture-handler';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import styled from 'styled-components';
import { DefaultTheme } from 'react-native-paper';
import { PaoAppContext } from '../routes/TabNavigator';
import sortPaoList from './logic/sortPaoList';
import { fabActions, swipeDirection } from '../constants/constants';
import { useSelector } from 'react-redux';

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

const Flashcard = ({ flashcardMode }) => {
  const { toggleFlashcardEffectDirectionVertical } = useContext(PaoAppContext)
  const paoList = useSelector(state => state.paoList)
  const swiper = useRef(null)
  const cardRef = useRef(null)
  const cardRef2 = useRef(null)
  console.log(paoList, 'did I grab the paoList????')
  
  const [paoDoc, setPaoDoc] = useState(0)
  const sortedPaoList = sortPaoList({ list: paoList, mode: flashcardMode })
  
  
  //~ front will have one item and back the 2 others and the number
  //various settings: 
  //~ 1. study all person action object all shuffled randomly. 
  //~ 2. study only person, action or object with number in the back
  //~ 3. study number with person, action, object in the back
  //@ but first I must have a list to work with. CrUD firstly
//  // * study in accending order
/////  //* study in deccending order


  const swipeHandler = ({ direction }: any) => {
    if (direction === swipeDirection.left) setPaoDoc(paoDoc - 1)
    if (direction === swipeDirection.right) setPaoDoc(paoDoc + 1)
  }

  // 'swipeLeft - 1 in array'
  // 'swipeRight + 1 in array'

  const flipCard = () => {
    cardRef.current.flip()
    cardRef2.current.flip()
  }


  //% wtf is this?!?: An Ingenious way to make swipe and flip work with two different libraries without going in and creating the effects/funcitonality from scratch
  return (
    <View style={{ height: '80%', width: '80%' }}>
      <CardStackStyled
        onSwipedLeft={() => swipeHandler({ direction: swipeDirection.left })}
        onSwipedRight={() => swipeHandler({ direction: swipeDirection.right })}
        secondCardZoom={.1} loop horizontalSwipe={false} verticalThreshold={1} duration={150} ref={swiper}>
        <Card style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <CoverupTextView />
          <View>
            <CardFlip flipDirection={'y'} style={{ ...globalStyles.cardFlip, backgroundColor: DefaultTheme.colors.background }} ref={cardRef} duration={350} >
              <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                <View className="flex flex-col h-full items-center justify-center">
                  <View className="w-full h-12">
                    {/* <Text className="text-center text-3xl">{paoList[swipeHandler].number}</Text> */}
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                <View className="flex flex-col h-full items-center justify-center">
                  <View className="w-full h-12">
                    {/* <Text className="text-center text-3xl">{paoList[swipeHandler].person}</Text>
                    <Text className="text-center text-3xl">{paoList[swipeHandler].action}</Text>
                    <Text className="text-center text-3xl">{paoList[swipeHandler].object}</Text> */}
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
                    <Text className="text-center text-3xl">{'dynamicData'}</Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => flipCard()} >
                <View className="flex flex-col h-full items-center justify-center">
                  <View className="w-full h-12">
                    <Text className="text-center text-3xl">P A O</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </CardFlip>
          </View>
        </Card>
      </CardStackStyled>
    </View>

  )
}

export default Flashcard

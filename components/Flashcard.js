import React, { useRef } from 'react'
import { View, Text } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
import CardFlip from 'react-native-card-flip';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Flashcard = () => {
  const cardRef = useRef(null)

  return (
    <CardFlip style={globalStyles.cardFlip} ref={cardRef} duration={350} >
      <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => cardRef.current.flip()} >
        <View className="flex flex-col h-full items-center justify-center">
          <View className="w-full h-12">
            <Text className="text-center text-3xl">Number</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'white'} style={globalStyles.card} onPress={() => cardRef.current.flip()} >
        <View className="flex flex-col h-full items-center justify-center">
          <View className="w-full h-12">
            <Text className="text-center text-3xl">P A O</Text>
          </View>
        </View>
      </TouchableHighlight>
    </CardFlip>
  )
}

export default Flashcard

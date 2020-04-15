import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import playingCards from './../assets/playing-cards-png-11-original.png'
const TableHeader = () => {
  return (
    <LinearGradient
      start={[.8, 0.8]}
      colors={['#2CC3DB', '#17739B']}
      style={{ borderRadius: 5,  paddingBottom: 5, position: 'relative' }}>
      <View className="absolute mx-2" style={{ top: 10 }}>
        <Image style={{ width: 30, height: 30 }} source={playingCards} />
      </View>
      <View className="flex flex-row justify-around mx-2 self-center">
        <View className="w-5">
          <Text className="text-transparent">00</Text>
        </View>
        <View className="w-1/3">
          <Text className="text-center text-white text-xl py-3">P</Text>
        </View>
        <View className="w-1/3">
          <Text className="text-center text-white text-xl py-3">A</Text>
        </View>
        <View className="w-1/3">
          <Text className="text-center text-white text-xl py-3">O</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

export default TableHeader

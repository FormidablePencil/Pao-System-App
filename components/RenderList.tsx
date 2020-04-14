import React from 'react'
import { FlatList, Image, } from 'react-native'
import { View, Text } from 'react-native-tailwind'

const RenderList = ({sets}) => {
  return (
    <FlatList
      data={sets}
      renderItem={({ item }) => {
        if (item.number % 2 == 1) {
          return (
            <View className="flex flex-row justify-around items px-4 bg-grey-lighter">
              <View className="w-5 self-center">
                <Text className="text-center mr-2">{item.number}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                <Text className="text-center">{item.person}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                <Text className="text-center">{item.action}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                <Text className="text-center">{item.object}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View className="flex flex-row justify-around items px-4">
              <View className="w-5 h-12 flex justify-center">
                <Text className="text-center mr-2">{item.number}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                <Text className="text-center">{item.person}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center" >
                <Text className="text-center">{item.action}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                <Text className="text-center">{item.object}</Text>
              </View>
            </View>
          )
        }
      }}
    />
  )
}

export default RenderList

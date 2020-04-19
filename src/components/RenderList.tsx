import React from 'react'
import { FlatList, Image, } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-paper'

const RenderList = () => {
  const paoList = useSelector((state: any) => state.pao)
  const editModeOff = true

  const arr = Array.from({ length: 100 }).map((collection, index) => {
    const structure = {
      id: null,
      number: index,
      person: 'person',
      action: 'action',
      object: 'object'
    }
    return structure
  })

  console.log(arr[arr.length -1])

  return (
    <FlatList
      data={arr}
      keyExtractor={item => item.number.toString()}
      renderItem={({ item }) => {
        let person = item.person
        let action = item.action
        let object = item.object
        let number
        if (item.number < 10) {
          number = `0${item.number}`
        } else number = item.number
        if (item.number % 2 == 1) {
          return (
            <View className="flex flex-row justify-around items px-4" style={{ backgroundColor: 'lightgrey' }}>
              <View className="w-5 self-center">
                <Text className="text-center mr-2">{number}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center" >
                {/* <Text className="text-center">{person}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={person}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                {/* <Text className="text-center">{action}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={action}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <View className="w-1/3 h-12 flex justify-center" >
                {/* <Text className="text-center">{object}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={object}
                  onChangeText={text => console.log(text)}
                />
              </View>
            </View>
          )
        } else {
          return (
            <View className="flex flex-row justify-around items px-4" style={{ backgroundColor: 'white' }}>
              <View className="w-5 h-12 flex justify-center">
                <Text className="text-center mr-2">{number}</Text>
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                {/* <Text className="text-center">{person}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={person}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <View className="w-1/3 h-12 flex justify-center" >
                {/* <Text className="text-center">{action}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={action}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <View className="w-1/3 h-12 flex justify-center">
                {/* <Text className="text-center">{object}</Text> */}
                <TextInput
                  disabled={editModeOff}
                  style={{ backgroundColor: 'transparent' }}
                  // label='empty'
                  value={object}
                  onChangeText={text => console.log(text)}
                />
              </View>
            </View>
          )
        }
      }}
    />
  )
}

export default RenderList

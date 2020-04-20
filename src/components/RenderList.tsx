import React, { useState, useEffect } from 'react'
import { FlatList, Image, } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import { useSelector } from 'react-redux'
import { TextInput, Button } from 'react-native-paper'
import styled from 'styled-components'

//@sometime turn this into a reusable component that gives you an option to render as one list or with pagination or at least the function that make it possible
const RenderList = () => {
  const paoList: any = useSelector((state: any) => state.pao)
  const editModeOff = true
  const [currentRenderItemsRange, setCurrentRenderItemsRange] = useState(0)
  const [modePagination, setModePagination] = useState(true)
  const [tenPaoItemsArr, setTenPaoItemsArr] = useState([])
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
  const [flatlistItems, setFlatlistItems] = useState(arr)

  enum paginateDirection {
    previous,
    next
  }

  const renderItemsToCurrentPage = (selected: number) => {
    if (selected === paginateDirection.next) {
      setCurrentRenderItemsRange(currentRenderItemsRange + 10)
    } else if (selected === paginateDirection.previous) {
      if (currentRenderItemsRange <= 0) return
      setCurrentRenderItemsRange(currentRenderItemsRange - 10)
    }
  }

  useEffect(() => {
    (() => {
      console.log('worked 123')
      let tenValuesOfArr: any = []
      for (let i = currentRenderItemsRange; i < currentRenderItemsRange + 10; i++) {
        tenValuesOfArr.push(flatlistItems[i])
      }
      setTenPaoItemsArr(tenValuesOfArr)
    })()
  }, [currentRenderItemsRange, paoList])

  return (
    <View style={{ height: '96%', width: '100%' }}>
      <FlatList
        data={modePagination ? tenPaoItemsArr : flatlistItems}
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
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                    // label='empty'
                    value={person}
                    onChangeText={text => console.log(text)}
                  />
                </View>
                <View className="w-1/3 h-12 flex justify-center">
                  {/* <Text className="text-center">{action}</Text> */}
                  <TextInput
                    disabled={editModeOff}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                    // label='empty'
                    value={action}
                    onChangeText={text => console.log(text)}
                  />
                </View>
                <View className="w-1/3 h-12 flex justify-center" >
                  {/* <Text className="text-center">{object}</Text> */}
                  <TextInput
                    disabled={editModeOff}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
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
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                    // label='empty'
                    value={person}
                    onChangeText={text => console.log(text)}
                  />
                </View>
                <View className="w-1/3 h-12 flex justify-center" >
                  {/* <Text className="text-center">{action}</Text> */}
                  <TextInput
                    disabled={editModeOff}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                    // label='empty'
                    value={action}
                    onChangeText={text => console.log(text)}
                  />
                </View>
                <View className="w-1/3 h-12 flex justify-center">
                  {/* <Text className="text-center">{object}</Text> */}
                  <TextInput
                    disabled={editModeOff}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
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
      <View className='flex-row'>
        <PaginationBtn onPress={() => renderItemsToCurrentPage(0)} mode="contained" >
          previous
      </PaginationBtn>
        <View className='flex-column'>
          <View className='flex-row'>
            {[0, 1, 2, 3, 4].map((num, index) =>
              <Text key={index} className='p-3'>{`${num}0`}</Text>
              )}
          </View>
          <View className='flex-row'>
            {[5, 6, 7, 8, 9].map((num, index) =>
              <Text key={index} className='p-3'>{`${num}0`}</Text>
            )}
          </View>
        </View>
        <PaginationBtn onPress={() => renderItemsToCurrentPage(1)} mode="contained" >
          Next
      </PaginationBtn>
      </View>
    </View>
  )
}

const PaginationBtn = styled(Button)`
  /* height: 100%; */

`;

export default RenderList

import React, { useState, useEffect, useContext, useRef } from 'react'
import { FlatList, Image, KeyboardAvoidingView, TextInput, } from 'react-native'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, DefaultTheme } from 'react-native-paper'
import styled from 'styled-components'
import { PaoAppContext } from '../routes/TabNavigator'
import Pagination from './Pagination'
import { FirstItemInRow, Row, ItemInRow } from '../styles/paoTableStyles'
import { ScrollView } from 'react-native-gesture-handler'
import { PaoAction } from '../reducerTypes/paoTypes'
import useHandleTablePaginationOption from '../hooks/useHandleTablePaginationOption'
import PaoTableItem from './PaoTableItem'
import PaginationModeTable from './PaginationModeTable'
import ListModeTable from './ListModeTable'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { mergePaoArrays } from './logic/sortPaoList'

const RenderPaoItems = () => {
  enum paginateDirection { previous, next }
  const { fabAction: { paginationMode } } = useContext(PaoAppContext)
  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  }) //~
  const [tenPaoItemsArr, setTenPaoItemsArr]: any = useState(arr) //~ 
  const [controlledInput, setControlledInput] = useState<Control>({ number: null, name: null, value: null }) //~ 
  const [heightOfScrollView, setheightOfScrollView] = useState<number>()
  const flatListRef = useRef(null)

  const [currentRenderItemsRange, setCurrentRenderItemsRange] = useState(0) //@
  const paoList: any = useSelector((state: any) => state.pao)  //@
  const [flatlistItems, setFlatlistItems] = useState(arr) //@ !!!

  console.log(flatlistItems)
  useEffect(() => {
    const newFlatListItem = mergePaoArrays(paoList, flatlistItems)
    setFlatlistItems(newFlatListItem)
  }, [paoList]) //pagination option  //@

  useEffect(() => {
    (() => {
      let tenValuesOfArr: any = []
      for (let i = currentRenderItemsRange; i < currentRenderItemsRange + 10; i++) {
        tenValuesOfArr.push(flatlistItems[i])
      }
      setTenPaoItemsArr(tenValuesOfArr)
    })()
  }, [currentRenderItemsRange, flatlistItems]) //pagination option  //@ !!!


  const bgColorByIndex = (index: number) => {
    if (index % 2 == 1) return 'lightgrey'; else return 'white'
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <ScrollView
      
        keyboardDismissMode={'none'}
        blurOnSubmit={false}
        keyboardShouldPersistTaps={'always'}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          if (!heightOfScrollView) {
            setheightOfScrollView(height / 10)
          }
        }}
        ref={flatListRef}
        style={{ flex: 1, height: "100%", backgroundColor: 'pink' }}
      >
        {paginationMode ?
          <PaginationModeTable
            tenPaoItemsArr={tenPaoItemsArr}
            controlledInput={controlledInput}
            setControlledInput={setControlledInput}
            bgColorByIndex={bgColorByIndex}
            heightOfScrollView={heightOfScrollView}
          />
          :
          <ListModeTable
            arr={arr}
            bgColorByIndex={bgColorByIndex}
            heightOfScrollView={heightOfScrollView}
            controlledInput={controlledInput}
            setControlledInput={setControlledInput}
          />
        }
      </ScrollView>
      {paginationMode &&
        <Pagination
          currentRenderItemsRange={currentRenderItemsRange}
          setCurrentRenderItemsRange={setCurrentRenderItemsRange}
        />
      }
    </View>
  )
}


// {/* :
// <ListModeTable
//  /> */}
export default RenderPaoItems


   //~ code this first (oh how I love TypeScript) then work with the phone. Try to code a result without testing it first
  //1. controlled inputText by having one state listen to the the inputtext and when user taps away fire a function to save that item into state and execute a POST action to update/create item. 
  //2. we'll need a useHook to handle the testing of weather we make a update or create request. That's testing if redux state contains the document... first save to redux then fire actions
  //3. the merging of states to render into paoTable is already done. 
  //4. if user offline then suspend/disable all editing actions. We'll know if user is offline by some React-Native api: check if internet connection
  //5. that's all folks
  //6. replace FlatList for a higher proforment list. There's a bug that keeps popping up ever so often, replacing the list could be a solution or we'll have to create a new expo instance and move the code there and see what's up

  //% onPress => will inharit a controlled state in which will copy into itself the specific value from the array.
  //% ~ typing will change that state and the second the user onBlurs/offFocus save item to redux 
  //% now only save to db if the user switches screens or the user click "off editMode" icon. => that will execute an action to save whole list (useSelector) to backend
  //~ there you have it folks!
  //* from here the paoTable will be done and only need a recycleableFlatList
  //% Now we can move onto Flashcards and implement the diffrent study modes (including study stared), auto changing cards and update item functionality.
  //% implement stared section... giving documents 'stared' property
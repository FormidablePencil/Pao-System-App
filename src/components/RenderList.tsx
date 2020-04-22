import React, { useState, useEffect, useContext, useRef } from 'react'
import { FlatList, Image, KeyboardAvoidingView, TextInput, } from 'react-native'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, DefaultTheme } from 'react-native-paper'
import styled from 'styled-components'
import { PaoAppContext } from '../routes/TabNavigator'
import { mergePaoArrays } from './logic/sortPaoList'
import Pagination from './Pagination'
import { FirstItemInRow, Row, ItemInRow } from '../styles/paoTableStyles'
import { ScrollView } from 'react-native-gesture-handler'
import { updatePaoItem } from '../actions/paoAc'
import { PaoAction } from '../reducerTypes/paoTypes'

export interface Control {
  number: number | null
  name: any
  value: string | null
}

//! try to different things to get rid of the input text err. render input feild on when the user presses on a text element or move all code into a new expo instance and see if it keeps doing it.

const RenderList = () => {
  enum paginateDirection { previous, next }
  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  })
  const paoList: any = useSelector((state: any) => state.pao)
  const { fabAction: { paotableEditMode } } = useContext(PaoAppContext)
  const [currentRenderItemsRange, setCurrentRenderItemsRange] = useState(0)
  const [modePagination, setModePagination] = useState(true)
  const [tenPaoItemsArr, setTenPaoItemsArr] = useState(arr) //! elemiate
  const [flatlistItems, setFlatlistItems] = useState(arr)
  const [controlledInput, setControlledInput] = useState<Control>({ number: null, name: null, value: null })
  const [heightOfRowBasedOffFlatListHeight, setHeightOfRowBasedOffFlatListHeight] = useState<number>()
  const dispatch = useDispatch()
  const flatListRef = useRef(null)

  console.log(paotableEditMode)

  useEffect(() => {
    const newFlatListItem = mergePaoArrays(paoList, flatlistItems)
    setFlatlistItems(newFlatListItem)
  }, [paoList])

  useEffect(() => {
    (() => {
      let tenValuesOfArr: any = []
      for (let i = currentRenderItemsRange; i < currentRenderItemsRange + 10; i++) {
        tenValuesOfArr.push(flatlistItems[i])
      }
      setTenPaoItemsArr(tenValuesOfArr)
    })()
  }, [currentRenderItemsRange, flatlistItems])

  const paginateTo = (num: number) => {
    const newNum = num * 10
    setCurrentRenderItemsRange(newNum)
  }

  const renderItemsToCurrentPage = (selected: number) => {
    if (selected === 0) {
      setCurrentRenderItemsRange(prevState => prevState + 10)
    } else if (selected === 1) {
      if (currentRenderItemsRange <= 0) return
      setCurrentRenderItemsRange(prevState => prevState - 10)
    }
  }
  const handleOnFocus = ({ number, name, value }: { number: number, name: string, value: string }) => {
    let val
    if (value === 'person' || value === 'action' || value === 'object') {
      val = ''
    } else val = value

    setControlledInput({ number, name, value: val })
  }

  const changeBgWhenOnFocus = ({ item, name }: { item: any, name: string }) => {
    if (controlledInput.name === item[name] &&
      controlledInput.number === item.number) {
      return 'lightblue'
    } else return
  }
  const saveControlledInputToReduxPaoList = async () => {
    let docExists: boolean | null = false
    paoList.forEach((document: any) => {
      if (document.number === controlledInput.number) {
        docExists = true
        if (document[controlledInput.name] === controlledInput.value) {
          docExists = null
        }
      }
    })
    if (controlledInput.value && docExists !== null) {
      dispatch(updatePaoItem(controlledInput, docExists))
    } else console.log('nope')
  }

  // console.log(paoList)

  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <ScrollView onLayout={(event) => {
        const { height } = event.nativeEvent.layout
        if (!heightOfRowBasedOffFlatListHeight) {
          setHeightOfRowBasedOffFlatListHeight(height / 10)
        }
      }}
        ref={flatListRef}
        style={{ flex: 1, height: "100%", backgroundColor: 'pink' }}
      >
        {/* flatlistItems */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((arrNum: number) => {
          // let number: string | number | null = null
          let bgColor: string | null = null

          if (arrNum % 2 == 1) { 
            bgColor = 'lightgrey'
          } else {
            bgColor = 'white'
          }

          const whatDoc = currentRenderItemsRange + arrNum

          return ( 
            <Row key={arrNum} style={{ backgroundColor: bgColor, height: heightOfRowBasedOffFlatListHeight }}>
              <FirstItemInRow>{flatlistItems[whatDoc].number}</FirstItemInRow>
              {['person', 'action', 'object'].map((name: string) => {
                // console.log(whatDoc, 'whatDocwhatDocwhatDoc')
                // if (tenPaoItemsArr[whatDoc][name] !== null) {
                //   console.log(tenPaoItemsArr[whatDoc][name], 'sdsd')
                // }
                return (
                  <ItemInRow key={name} style={{
                    // backgroundColor: changeBgWhenOnFocus({ item, name }) ? changeBgWhenOnFocus({ item, name }) : 'transparent'
                  }}>
                    <TextInput /* //% solution to the inputText problem:   */
                      editable={paotableEditMode}
                      // onFocus={() => handleOnFocus({ number: number, name, value: [name] })}
                      onBlur={() => saveControlledInputToReduxPaoList()}
                      // disabled={paotableEditMode}
                      placeholder={name}
                      placeholderTextColor={DefaultTheme.colors.primary}
                      style={{ backgroundColor: 'transparent', alignSelf: 'center', height: '100%', color: 'grey' }}
                      // caretHidden={true}
                      value={flatlistItems[whatDoc][name]}
                      onChangeText={text => setControlledInput({ ...controlledInput, value: text })}
                    />
                  </ItemInRow>
                )
              }
              )}
            </Row>
          )
        })}
      </ScrollView>
      <Pagination renderItemsToCurrentPage={renderItemsToCurrentPage} paginateTo={paginateTo} />
    </View>
  )
}


export default RenderList


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

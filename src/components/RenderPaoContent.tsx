import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, LayoutAnimation, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Pagination, { paginateDirection } from './Pagination'
import RenderPaoTables from './RenderPaoTables'
import { mergePaoArrays } from './logic/sortPaoList'
import { TabNavContext } from '../routes/StackNavigator'
import Swiper from 'react-native-swiper'

const RenderPaoContent = ({ editModeTrue, goToUnfilledTrigger, setGoToUnfilledTrigger }) => {
  const fabProps = useSelector((state: any) => state.fabProperties)
  const pagination = fabProps.config.pagination
  const { tableReady, setTableReady } = useContext(TabNavContext)
  const paoList: any = useSelector((state: any) => state.pao)  //@

  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  })

  const [tenPaoItemsArr, setTenPaoItemsArr]: any = useState([null, null, null,])
  const [controlledInput, setControlledInput] = useState<Control>({ number: null, name: null, value: null }) //~ 
  const [heightOfScrollView, setheightOfScrollView] = useState<number>()
  const flatListRef = useRef(null)

  const [currentRenderItemsRange, setCurrentRenderItemsRange] = useState(0) //@
  const [test, setTest] = useState<number>(null)
  const [flatlistItems, setFlatlistItems] = useState(arr) //@ !!!
  const [listSortedInTens, setListSortedInTens] = useState([])



  const [currentlyFocusedTextInput, setCurrentlyFocusedTextInput] = useState({ index: null, name: null })
  const prevTextInput = useRef(null)
  const nextTextInput = useRef(null)
  const firstOfTableTextInput = useRef(null)
  const lastOfTableTextInput = useRef(null)
  const [firstUnfilledTextInput, setFirstUnfilledTextInput] = useState({ number: null, name: null })
  const swiperIndex = useRef(null)

  const onIndexChangeHandler = (index) => {
    setCurrentRenderItemsRange(index)
  }

  const navigateTextInputs = (direction) => {
    if (direction === paginateDirection.next) nextTextInput.current.focus()
    else if (direction === paginateDirection.previous) prevTextInput.current.focus()
    else if (direction === paginateDirection.lastOfTable) {
      if (!tenPaoItemsArr.filter(doc => doc.number === 0)[0]) lastOfTableTextInput.current.focus()
    }
    else if (direction === paginateDirection.firstOfTable) {
      if (!tenPaoItemsArr.filter(doc => doc.number === 99)[0]) firstOfTableTextInput.current.focus()
    }
  }

  const findUnfilled = () => {
    let foundUnfilled = { number: null, name: null }
    flatlistItems.forEach(doc => {
      ['person', 'action', 'object'].forEach(name => {
        if (foundUnfilled.number !== null) return
        if (!doc[name]) foundUnfilled.number = doc.number; foundUnfilled.name = name;
      })
    })
    goToUnfilled(foundUnfilled)
  }
  const goToUnfilled = async ({ number, name }) => {
    await navigateToUnfillledTable({ number, name })
    setFirstUnfilledTextInput({ number, name })
  }

  const navigateToUnfillledTable = ({ number, name }) => {
    const amountOfDigits = number.toString().length
    const firstDigitStr = number.toString()[number.toString().length - 1]
    const firstDigitNum = parseInt(firstDigitStr)
    if (amountOfDigits === 2) setCurrentRenderItemsRange(firstDigitNum)
    else if (amountOfDigits === 1) setCurrentRenderItemsRange(0)
  }

  useEffect(() => {
    const newFlatListItem = mergePaoArrays(paoList, flatlistItems)
    setFlatlistItems(newFlatListItem)
  }, [paoList])

  useEffect(() => {
    if (goToUnfilledTrigger) {
      setGoToUnfilledTrigger(prev => !prev)
      findUnfilled()
    }
  }, [goToUnfilledTrigger])

  const oraganizeListInTens = () => {
    const lisfOfTenPaoItems = flatlistItems.filter(doc => doc.number >= currentRenderItemsRange && doc.number <= currentRenderItemsRange + 9)
    setListSortedInTens(lisfOfTenPaoItems)
  }

  useEffect(() => {
    oraganizeListInTens()
  }, [currentRenderItemsRange])

  const jumpToCertainTable = (index) => console.log('hello');

  return (
    <View style={{ flex: 1 }}>
      <View
        keyboardDismissMode={'none'}
        blurOnSubmit={false}
        keyboardShouldPersistTaps={'always'}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          if (!heightOfScrollView) {
            setheightOfScrollView(height / 10)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            if (setTableReady !== null) setTableReady(true)
          }
        }}
        ref={flatListRef}
        style={{ flex: 1, height: "80%" }}
      >
        {tableReady &&
            <View>
              {!editModeTrue &&
                <View style={{ position: "absolute", height: '100%', width: '100%', zIndex: 300 }}></View>
              }
              <RenderPaoTables
                listSortedInTens={listSortedInTens}
                currentRenderItemsRange={currentRenderItemsRange}
                setFirstUnfilledTextInput={setFirstUnfilledTextInput}
                firstUnfilledTextInput={firstUnfilledTextInput}
                firstOfTableTextInput={firstOfTableTextInput}
                lastOfTableTextInput={lastOfTableTextInput}
                prevTextInput={prevTextInput}
                nextTextInput={nextTextInput}
                currentlyFocusedTextInput={currentlyFocusedTextInput}
                setCurrentlyFocusedTextInput={setCurrentlyFocusedTextInput}
                editModeTrue={editModeTrue}
                tableData={flatlistItems}
                controlledInput={controlledInput}
                setControlledInput={setControlledInput}
                heightOfScrollView={heightOfScrollView}
              />
            </View>
        }
      </View>
      <Pagination
        swiperIndex={swiperIndex}
        jumpToCertainTable={jumpToCertainTable}
        currentlyFocusedTextInput={currentlyFocusedTextInput} //! will go
        navigateTextInputs={navigateTextInputs}
        currentRenderItemsRange={currentRenderItemsRange}
        setCurrentRenderItemsRange={setCurrentRenderItemsRange}
      />
    </View >
  )
}


// {/* :
// <ListModeTable
//  /> */}
export default RenderPaoContent


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

import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, LayoutAnimation } from 'react-native'
import { useSelector } from 'react-redux'
import Pagination, { paginateDirection } from './Pagination'
import RenderPaoTables from './RenderPaoTables'
import { mergePaoArrays } from './logic/sortPaoList'
import { TabNavContext } from '../routes/StackNavigator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RootReducerT } from '../store'

const RenderPaoContent = ({ editModeTrue, goToUnfilledTrigger, setGoToUnfilledTrigger }) => {
  const { setTableReady } = useContext(TabNavContext)
  const paoList: any = useSelector((state: RootReducerT) => state.pao)  //@

  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  })

  const [tenPaoItemsArr, setTenPaoItemsArr]: any = useState([null, null, null,])
  const [controlledInput, setControlledInput] = useState<Control>({ number: null, name: null, value: null }) //~ 
  const [heightOfScrollView, setheightOfScrollView] = useState<number>()
  const flatListRef = useRef(null)

  const [currentRenderItemsRange, setCurrentRenderItemsRange] = useState(0) //@
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
        {/* {tableReady && */}
        <View>
          {!editModeTrue &&
            <View style={{ position: "absolute", height: '100%', width: '100%', zIndex: 300 }}></View>
          }
          <KeyboardAwareScrollView style={{height: '100%',}}>
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
          </KeyboardAwareScrollView>
        </View>
        {/* } */}
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


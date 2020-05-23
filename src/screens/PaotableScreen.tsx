import React, { useState, useEffect, useContext, createContext } from 'react'
import TableHeader from '../components/TableHeader'
import RenderPaoItems from '../components/RenderPaoItems'
import { useSelector } from 'react-redux'
import FabActionBtn from '../components/FabActionBtn'
import { enumFabAction } from '../constants/fabConstants'
import OptionsModal from '../components/OptionsModal'
import { tabScreens } from '../constants/constants'
import { Keyboard, View, LayoutAnimation, Animated } from 'react-native'
import { TabNavContext } from '../routes/StackNavigator'

//~ everything has to work before CRUD with pao lists

//@ts-ignore
export const PaoTableScreenContext = createContext()

export const PaotableScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  // const animateWhenKeyboard = new Animated.Value(1)

  // const executeAnimation = () => {
  //   let toValue = 1
  //   if (animateWhenKeyboard.__getValue() === 1) toValue = 0
  //   Animated.timing(animateWhenKeyboard, {
  //     duration: 2000,
  //     toValue: 0
  //   })
  // }


  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      // executeAnimation()
      setKeyboardPresent(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      // executeAnimation()
      setKeyboardPresent(false)
    })

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => { })
      Keyboard.removeListener('keyboardDidHide', () => { })
    }
  })

  return (
    <PaoTableScreenContext.Provider value={{ keyboardPresent }}>
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        {!keyboardPresent &&
          <TableHeader />
        }
        <RenderPaoItems
          editModeTrue={editModeTrue}
        />
        <FabActionBtn
          currentScreen={tabScreens.Paotable}
          editModeTrue={editModeTrue}
          setEditModeTrue={setEditModeTrue}
          setModalOpen={setModalOpen}
          whatFabProps={enumFabAction.paoTableFabActions}
        />
      </View>
    </PaoTableScreenContext.Provider>
  )
}

export default PaotableScreen
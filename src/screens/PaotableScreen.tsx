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

export const PaoTableScreenContext = createContext()

export const PaotableScreen = ({ navigation }) => {
  const { controlledThemeColor } = useSelector((state: any) => state)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [keyboardPresent, setKeyboardPresent] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setKeyboardPresent(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setKeyboardPresent(false)
    })

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => { })
      Keyboard.removeListener('keyboardDidHide', () => { })
    }
  })

  const bgColor = controlledThemeColor > .5 ? 'black' : 'white'
  return (
    <PaoTableScreenContext.Provider value={{ keyboardPresent, editModeTrue }}>
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
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
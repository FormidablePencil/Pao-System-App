import React, { useState, useEffect, createContext } from 'react'
import TableHeader from '../components/TableHeader'
import RenderPaoItems from '../components/RenderPaoItems'
import { useSelector } from 'react-redux'
import FabActionBtn from '../components/FabActionBtn'
import { enumFabAction, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import { Keyboard, View, LayoutAnimation } from 'react-native'
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor'

export const PaoTableScreenContext = createContext()

export const PaotableScreen = ({ navigation }) => {
  const { controlledThemeColor } = useSelector((state: any) => state)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModeTrue, setEditModeTrue] = useState(false)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  const [goToUnfilledTrigger, setGoToUnfilledTrigger] = useState(false)

  useEffect(() => {
    if (goToUnfilledTrigger === true) setEditModeTrue(true)
  }, [goToUnfilledTrigger])

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

  const controlledBgColor = controlledThemeColor > .5 ? 'black' : 'white'
  const bgColor = controlledThemeColor ? controlledBgColor : usePrimaryControlledColor(WhereToColor.rowEven)

  return (
    <PaoTableScreenContext.Provider value={{ keyboardPresent, editModeTrue }}>
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        {!keyboardPresent &&
          <TableHeader />
        }
        <RenderPaoItems
          goToUnfilledTrigger={goToUnfilledTrigger}
          setGoToUnfilledTrigger={setGoToUnfilledTrigger}
          editModeTrue={editModeTrue}
        />
        <FabActionBtn
          setGoToUnfilledTrigger={setGoToUnfilledTrigger}
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
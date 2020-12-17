import React, { useState, useEffect, createContext, useRef } from 'react'
import TableHeader from '../../components/TableHeader'
import RenderPaoContent from './components'
import { useSelector } from 'react-redux'
import FabActionBtn from '../components/fab-action-btns'
import { enumFabAction, fabOpt } from '../../constants/fabConstants'
import { tabScreens } from '../../constants/constants'
import { Keyboard, View, LayoutAnimation } from 'react-native'
import usePrimaryControlledColor, { WhereToColor } from '../../hooks/usePrimaryControlledColor'

export const PaoTableScreenContext = createContext()

export const PaotableScreen = ({ navigation }) => {
  const controlledThemeColor = useSelector((state: any) => state.controlledThemeColor)
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
  const rowEvenColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const bgColor = controlledThemeColor ? controlledBgColor : rowEvenColor

  return (
    <PaoTableScreenContext.Provider value={{ keyboardPresent, editModeTrue }}>
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        {!keyboardPresent &&
          <TableHeader />
        }
          <RenderPaoContent
            goToUnfilledTrigger={goToUnfilledTrigger}
            setGoToUnfilledTrigger={setGoToUnfilledTrigger}
            editModeTrue={editModeTrue}
            />
      </View>
    </PaoTableScreenContext.Provider>
  )
}

export default PaotableScreen
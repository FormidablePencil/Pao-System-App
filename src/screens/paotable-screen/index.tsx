import React, { useState, useEffect, createContext, useRef } from 'react'
import TableHeader from '../../components/TableHeader'
import RenderPaoContent from './components/RenderPaoContent'
import { useDispatch, useSelector } from 'react-redux'
import FabActionBtn from '../components/fab-action-btns'
import { enumFabAction, fabOpt } from '../../constants/fabConstants'
import { tabScreens } from '../../constants/constants'
import { Keyboard, View, LayoutAnimation } from 'react-native'
import usePrimaryControlledColor, { WhereToColor } from '../../hooks/usePrimaryControlledColor'
import {
  KEYBOARD_PRESENT_FALSE,
  KEYBOARD_PRESENT_TRUE,
  TOGGLE_EDIT_MODE,
} from '../../actions/types'
import { RootReducerT } from '../../store'

export const PaotableScreen = ({ navigation }) => {
  const keyboardPresent = useSelector((state: RootReducerT) => state.misc.keyboardPresent)
  const controlledThemeColor = useSelector((state: any) => state.controlledThemeColor)
  const [goToUnfilledTrigger, setGoToUnfilledTrigger] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (goToUnfilledTrigger === true) dispatch({ type: TOGGLE_EDIT_MODE })
  }, [goToUnfilledTrigger])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      dispatch({ type: KEYBOARD_PRESENT_TRUE })
    })
    Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      dispatch({ type: KEYBOARD_PRESENT_FALSE })
    })

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {})
      Keyboard.removeListener('keyboardDidHide', () => {})
    }
  })

  const controlledBgColor = controlledThemeColor > 0.5 ? 'black' : 'white'
  const rowEvenColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const bgColor = controlledThemeColor ? controlledBgColor : rowEvenColor

  return (
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        {!keyboardPresent && <TableHeader />}
        <RenderPaoContent
          goToUnfilledTrigger={goToUnfilledTrigger}
          setGoToUnfilledTrigger={setGoToUnfilledTrigger}
        />
      </View>
  )
}

export default PaotableScreen

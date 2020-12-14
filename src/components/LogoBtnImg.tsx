import React, { useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import playingCards from '../assets/playing-cards-png-11-original.png'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducerT } from '../store'
import { STUDY_MODE_TOGGLE } from '../actions/types'
import { Animated } from 'react-native'

export default function LogoBtnImg({ btnBgColor, onlyToggleOffAllowed, disableToggle }: { btnBgColor?: string, onlyToggleOffAllowed?: boolean, disableToggle?: boolean }) {
  const study = useSelector((state: RootReducerT) => state.study)
  const spinAnim = useRef(null)
  const dispatch = useDispatch()

  const onPressHandlerImg = () => {
    if (!disableToggle) {
      spinAnim.current.rotate()
      if (onlyToggleOffAllowed && !study.study) return
      dispatch({ type: STUDY_MODE_TOGGLE })
    }
  }
  // marginHorizontal: 15, borderRadius: 5
  return (
    //  {/* //~ add a smooth transition between colors */}
    <Animated.View style={{ backgroundColor: btnBgColor }}>
      <TouchableWithoutFeedback style={{ padding: 5, }} onPress={() => onPressHandlerImg()}>
        <Animatable.Image ref={spinAnim} style={{ resizeMode: 'contain', height: 20, width: 20, }} source={playingCards} />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

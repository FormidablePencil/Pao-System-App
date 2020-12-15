import React, { useEffect, useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import playingCards from '../assets/playing-cards-png-11-original.png'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducerT } from '../store'
import { STUDY_MODE_TOGGLE } from '../actions/types'
import { Animated, LayoutAnimation } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"

export default function LogoBtnImg({ btnBgColor, onlyToggleOffAllowed, disableToggle }: { btnBgColor?: string, onlyToggleOffAllowed?: boolean, disableToggle?: boolean }) {
  const study = useSelector((state: RootReducerT) => state.study.study)
  const cardRef = useRef(null)
  const starRef = useRef(null)
  const dispatch = useDispatch()

  const zoomAnim = (firstRef, secondRef) => {
    firstRef.current.zoomOut()
    secondRef.current.zoomIn()
  }

  useEffect(() => {
    if (disableToggle) return
    if (study) zoomAnim(cardRef, starRef)
    else zoomAnim(starRef, cardRef)
  }, [study])

  const onPressHandlerImg = () => {
    if (disableToggle) return
    dispatch({ type: STUDY_MODE_TOGGLE })
  }

  return (
    //  {/* //~ add a smooth transition between colors */}
    <Animated.View style={{ backgroundColor: btnBgColor, }}>
      <TouchableWithoutFeedback style={{ padding: 15, marginLeft: 5, position: 'relative', justifyContent: 'center', alignItems: 'center' }} onPress={onPressHandlerImg}>
        <Animatable.View ref={starRef}><Icon name='star' size={20} color='#D9BF14' /></Animatable.View>
        <Animatable.Image ref={cardRef} style={{ resizeMode: 'contain', height: 20, width: 20, position: "absolute" }} source={playingCards} />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

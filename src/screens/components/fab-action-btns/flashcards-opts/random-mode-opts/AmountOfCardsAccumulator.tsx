import React, { useEffect, useRef, useState } from "react"
import InputSpinner from 'react-native-input-spinner'
import { useDispatch, useSelector } from "react-redux"
import { SET_STUDY_RANDOM_AMOUNT, TOGGLE_STUDY_RANDOM_MODE_TRUE } from "../../../../../actions/types"
import { RootReducerT } from "../../../../../store"


const AmountOfCardsAccumulator = () => {
  const studyAmount = useSelector((state: RootReducerT) => state.studyRandomMode.studyAmount)
  const pao = useSelector((state: RootReducerT) => state.pao)
  const dispatch = useDispatch()
  let changed = useRef(false).current

  useEffect(() => {
    return () => {
      if (changed)
      dispatch({ type: TOGGLE_STUDY_RANDOM_MODE_TRUE, payload: pao })
      changed = false
    }
  }, [])

  const onChangeHandler = (payload) => {
    dispatch({ type: SET_STUDY_RANDOM_AMOUNT, payload })
    changed = true
  }

  return (
    <InputSpinner
      // inputStyle={{ ...reusableStyles.whiteText }}
      // colorLeft={theme.colors.fabActionColors[1]}
      // colorRight={theme.colors.fabActionColors[1]}
      colorPress='#4880A5'
      buttonPressStyle={{ backgroundColor: '#4880A5' }}
      colorMax={'#4880A5'}
      colorMin={'#4880A5'}
      max={30}
      min={2}
      step={2}
      value={studyAmount}
      color='orange'
      onChange={onChangeHandler}
    />
  )
}

export default AmountOfCardsAccumulator

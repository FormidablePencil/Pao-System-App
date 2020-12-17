import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { STUDY_MODE_TOGGLE, TOGGLE_STUDY_RANDOM_MODE } from '../../../../actions/types'
import { RootReducerT } from '../../../../store'
import AmountOfCardsAccumulator from './AmountOfCardsAccumulator'
import SelectorComp from '../SelectorComp'

const SharedOptions = () => {
  const dispatch = useDispatch()
  const pao = useSelector((state: RootReducerT) => state.pao)
  const study = useSelector((state: RootReducerT) => state.study.study)
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)
  const studyAmount = useSelector((state: RootReducerT) => state.studyRandomMode.studyAmount)
  const [amountOfCards, setAmountOfCards] = useState(studyAmount)

  const toggleStaredList = () => dispatch({ type: STUDY_MODE_TOGGLE })
  const toggleStudyRandomMode = () => dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })

  return (
    <>
      <SelectorComp
        initial={!study}
        onPress={toggleStaredList}
        title={'List'}
        options={[
          { value: 0, label: 'all' },
          { value: 1, label: 'started' }
        ]}
      />
      <SelectorComp
        initial={!isRandomStudyMode}
        onPress={toggleStudyRandomMode}
        title={'Mode'}
        options={[
          { value: 0, label: 'normal' },
          { value: 1, label: 'study' }
        ]}
      />
      <AmountOfCardsAccumulator />
      {/* <ToggleStaredListSelector /> */}
      {/* navigation fab */}
      {/* list  */}
    </>
  )
}



export default SharedOptions

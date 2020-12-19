import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STUDY_MODE_TOGGLE, TOGGLE_STUDY_RANDOM_MODE } from '../../../../actions/types'
import { RootReducerT } from '../../../../store'
import SelectorComp from '../SelectorComp'

const SharedOptions = () => {
  const dispatch = useDispatch()
  const pao = useSelector((state: RootReducerT) => state.pao)
  const study = useSelector((state: RootReducerT) => state.study.study)
  const isRandomStudyMode = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isRandomStudyMode
  )

  const toggleStaredList = () => dispatch({ type: STUDY_MODE_TOGGLE })
  const toggleStudyRandomMode = () => dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })

  return (
    <>
      <SelectorComp
        initial={study ? 1 : 0}
        onPress={toggleStaredList}
        title={'List'}
        options={[
          { value: 0, label: 'all' },
          { value: 1, label: 'started' },
        ]}
      />
      <SelectorComp
        initial={isRandomStudyMode ? 1 : 0}
        onPress={toggleStudyRandomMode}
        title={'Mode'}
        options={[
          { value: 0, label: 'normal' },
          { value: 1, label: 'study' },
        ]}
      />
    </>
  )
}

export default SharedOptions

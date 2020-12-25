import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STUDY_MODE_FALSE, STUDY_MODE_TOGGLE, STUDY_MODE_TRUE, TOGGLE_STUDY_RANDOM_MODE } from '../../../../actions/types'
import { RootReducerT } from '../../../../store'
import SelectorComp from '../SelectorComp'

const SharedOptions = () => {
  const dispatch = useDispatch()
  const pao = useSelector((state: RootReducerT) => state.pao)
  const study = useSelector((state: RootReducerT) => state.study.study)
  const isRandomStudyMode = useSelector(
    (state: RootReducerT) => state.studyRandomMode.isRandomStudyMode
  )

  const toggleStaredList = (value) => {

    dispatch({ type: value ? STUDY_MODE_TRUE : STUDY_MODE_FALSE })
  }
  const toggleStudyRandomMode = (value) => {
    if (value === 0 && isRandomStudyMode === true)
      dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })
    if (value === 1 && isRandomStudyMode === false)
      dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })
  }

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

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { STUDY_MODE_TOGGLE, TOGGLE_STUDY_RANDOM_MODE } from '../../../../actions/types'
import { RootReducerT } from '../../../../store'
import SelectorComp from './SelectorComp'

const SharableOptions = () => {
  const dispatch = useDispatch()
  const pao = useSelector((state: RootReducerT) => state.pao)
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)
  const study = useSelector((state: RootReducerT) => state.study.study)

  const toggleStudyRandomMode = () => dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })
  const toggleStaredList = () => dispatch({ type: STUDY_MODE_TOGGLE })

  return (
    <View style={styles.container}>
      <SelectorComp
        initial={!isRandomStudyMode}
        onPress={toggleStudyRandomMode}
        title={'mode'}
        options={[
          { value: 0, label: 'normal' },
          { value: 1, label: 'study' }
        ]}
      />
      <SelectorComp
        initial={study}
        onPress={toggleStaredList}
        title={'list'}
        options={[
          { value: 0, label: 'all' },
          { value: 1, label: 'started' }
        ]}
      />
      {/* <ToggleStaredListSelector /> */}
      {/* navigation fab */}
      {/* list  */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SharableOptions

import React, { useState } from 'react'
import { View } from 'react-native'
import SelectorComp from '../SelectorComp';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerT } from '../../../../store';
import { DISPLAY_NUMBERS_IN_FRONT_FALSE, DISPLAY_NUMBERS_IN_FRONT_TRUE, ROW_TO_DISPLAY_FALSE, ROW_TO_DISPLAY_TRUE, TOGGLE_PAGINATION_MODE, TOGGLE_PAGINATION_MODE_FALSE, TOGGLE_PAGINATION_MODE_TRUE, TOGGLE_ROW_TO_DISPLAY } from '../../../../actions/types';
import ButtonSave from '../ButtonSave';

const PaoTableOptsModal = () => {
  const isPagination = useSelector((state: RootReducerT) => state.fabProperties.config.pagination)

  const toggleRow = useSelector((state: RootReducerT) => state.studyRandomMode.toggleRow)
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)

  const dispatch = useDispatch()
  const [paoTableOpts, setPaoTableOpts] = useState(() => ({
    isPagination,
    toggleRow,
    displayNumberInFront,
  }))


  const togglePaginationMode = (toggle) => setPaoTableOpts(prev => ({ ...prev, isPagination: toggle ? false : true }))
  const toggleToggleRowHandler = (toggle) => setPaoTableOpts(prev => ({ ...prev, toggleRow: toggle ? false : true }))
  const toggleDisplayNumberInFront = (toggle) => setPaoTableOpts(prev => ({ ...prev, displayNumberInFront: toggle ? false : true }))

  const onPressSave = () => {
    dispatch({ type: paoTableOpts.isPagination ? TOGGLE_PAGINATION_MODE_TRUE : TOGGLE_PAGINATION_MODE_FALSE })
    dispatch({ type: paoTableOpts.toggleRow ? ROW_TO_DISPLAY_TRUE : ROW_TO_DISPLAY_FALSE })
    dispatch({ type: paoTableOpts.displayNumberInFront ? DISPLAY_NUMBERS_IN_FRONT_TRUE : DISPLAY_NUMBERS_IN_FRONT_FALSE })
  }

  return (
    <>

      <SelectorComp
        initial={isPagination}
        onPress={togglePaginationMode}
        title={'Table'}
        options={[
          { value: 0, label: 'pagination' },
          { value: 1, label: 'scroll' }
        ]}
      />

      <SelectorComp
        initial={toggleRow}
        onPress={toggleToggleRowHandler}
        title={'Toggle'}
        options={[
          { value: 0, label: 'item' },
          { value: 1, label: 'row' }
        ]}
      />

      <SelectorComp
        initial={displayNumberInFront}
        onPress={toggleDisplayNumberInFront}
        title={'Front'}
        options={[
          { value: 0, label: 'pao' },
          { value: 1, label: 'number' }
        ]}
      />

      <ButtonSave onPress={onPressSave} />
    </>
  )
}


export default PaoTableOptsModal
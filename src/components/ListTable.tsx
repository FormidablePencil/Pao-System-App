import React, { useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import PaoTableItem from './PaoTableItem'
import { useSelector } from 'react-redux'
import { PaoAppContext } from '../routes/TabNavigator'

const ListTable = () => {
  const paoList: any = useSelector((state: any) => state.pao)
  const { fabAction: { paotableEditMode } } = useContext(PaoAppContext)

  return (
    <ScrollView>
      {paoList.map((document: any, index: number) =>
        <View key={index}>
          {['person', 'action', 'object'].map((name: string) =>
            <PaoTableItem
              index={document.number}
              name={name}
              paotableEditMode={paotableEditMode}
              textInputValue={textInputValue}
              onChangeTextHandler={onChangeTextHandler}
              tenPaoItemsArr={tenPaoItemsArr}
              saveControlledInputToReduxPaoList={saveControlledInputToReduxPaoList}
            />
          )}
        </View>
      )}
    </ScrollView>
  )
}

export default ListTable

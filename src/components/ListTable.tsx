import React, { useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import PaoTableItem from './PaoTableItem'
import { useSelector } from 'react-redux'

const ListTable = () => {
  const paoList: any = useSelector((state: any) => state.pao)
  const { fabAction: { paotableEditMode } } = useSelector((state: any) => state.fabProperties)

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

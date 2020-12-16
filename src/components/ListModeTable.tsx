import React, { useEffect, useState } from 'react'
import { TextInput, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { ItemInRow, Row as RowStyle, FirstItemInRow } from '../styles/paoTableStyles'
import { DefaultTheme, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import useTextInputHandler, { Control } from '../hooks/useTextInputHandler'
import { listMode } from '../constants/constants'
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor'
import { RootReducerT } from '../store'
import { View } from 'react-native-animatable'

const ListModeTable = ({
  heightOfScrollView,
  controlledInput,
  setControlledInput,
  // arr
}: {
  heightOfScrollView: number | undefined
  controlledInput: Control
  setControlledInput: any
  // arr: any
}) => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  // const {
  //   saveControlledInputToReduxPaoList,
  //   onChangeTextHandler,
  //   returnValueDependingOnWeatherItemsAreSame,
  // } = useTextInputHandler({
  //   controlledInput,
  //   setControlledInput,
  //   // arr
  // })

  return (
    <>
      {studyRandomMode.person.map((document, index) =>
        <Row document={document} index={index} />
      )}
      <View style={{ height: 85 }} />
    </>
  )
}

const Row = ({ index, document }) => {
  const isPagination = useSelector((state: RootReducerT) => state.fabProperties.config.pagination)
  const rowEvenBgColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const rowOddBgColor = usePrimaryControlledColor(WhereToColor.rowOdd)
  const bgColor = index % 2 == 1 ? rowOddBgColor : rowEvenBgColor
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)
  const [isNumber, setIsNumber] = useState(displayNumberInFront)

  useEffect(() => setIsNumber(displayNumberInFront), [displayNumberInFront])
  const onPressRow = () => setIsNumber(prev => !prev)

  return (
    <TouchableOpacity onPress={onPressRow}>
      <RowStyle
        key={document._id ? document._id : document.number}
        style={{ backgroundColor: bgColor, height: 50 }}>
        {/* heightOfScrollView */}
        {['person', 'action', 'object'].map((name: string) =>
          <RowItem index={index} isNumberFromRow={isNumber} key={name} name={name} />
        )}

      </RowStyle>
    </TouchableOpacity>
  )
}

const RowItem = ({ index, isNumberFromRow, name }) => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const toggleRow = useSelector((state: RootReducerT) => state.studyRandomMode.toggleRow)
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)
  const [isNumber, setIsNumber] = useState(displayNumberInFront)

  useEffect(() => setIsNumber(displayNumberInFront), [displayNumberInFront])
  const onPressRow = () => setIsNumber(prev => !prev)

  return (
    <ItemInRow>
      {toggleRow ?
        <TouchableOpacity onPress={onPressRow} style={styles.itemBtn}>
          <ItemTxt studyRandomMode={studyRandomMode} name={name} index={index} isNumber={isNumber} />
        </TouchableOpacity>
        : <ItemTxt studyRandomMode={studyRandomMode} name={name} index={index} isNumber={isNumberFromRow} />
      }
    </ItemInRow>
  )
}

const ItemTxt = ({ studyRandomMode, name, index, isNumber }) => {

  return (
    <Text style={{ backgroundColor: 'transparent', alignSelf: 'center' }}>
      {studyRandomMode[name][index][isNumber ? 'number' : 'item']}
    </Text>
  )
}

const styles = StyleSheet.create({
  itemBtn: {
    width: '100%', height: "100%", justifyContent: 'center',
  }

})


export default ListModeTable

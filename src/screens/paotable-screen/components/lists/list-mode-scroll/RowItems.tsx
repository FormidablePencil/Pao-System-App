import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from "react-redux"
import { RootReducerT } from "../../../../../store"
import { FirstItemInRow, ItemInRow } from '../../../../../styles/paoTableStyles'
import { getPaoNumber } from '../../../../flashcard-screen/functions/various'


const RowItemNormalMode = ({ index, name }) => {
  const pao = useSelector((state: RootReducerT) => state.pao)
  return (<ItemInRow><Text>{pao[index][name]}</Text></ItemInRow>)
}


const RowItemStudyMode = ({ index, isNumberFromRow, name }) => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const toggleRow = useSelector((state: RootReducerT) => state.studyRandomMode.toggleRow)
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)
  const [isNumber, setIsNumber] = useState(displayNumberInFront)

  useEffect(() => setIsNumber(displayNumberInFront), [displayNumberInFront])
  const onPressRow = () => setIsNumber(prev => !prev)
  // paoNumText
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
const ItemTxt = ({ studyRandomMode, name, index, isNumber }) =>
  <Text style={{fontSize: 14}}>{studyRandomMode[name][index][isNumber ? 'number' : 'item']}</Text>

const styles = StyleSheet.create({
  itemBtn: {
    width: '100%', height: "100%", justifyContent: 'center',
  }
})

export { RowItemNormalMode, RowItemStudyMode }
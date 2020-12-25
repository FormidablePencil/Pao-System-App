import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from "react-redux"
import { RootReducerT } from "../../../../../store"
import { FirstItemInRow, ItemInRow } from '../../../../../styles/paoTableStyles'
import { getPaoNumber } from '../../../../flashcard-screen/functions/various'
import { formatNum } from '../../../../utilities/formatNum'


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
const ItemTxt = ({ studyRandomMode, name, index, isNumber }) => {
  const number = formatNum(studyRandomMode[name][index]['number'])
  const text = studyRandomMode[name][index]['item']

  return (
    <Text style={{ fontSize: 14 }}>{isNumber ? number : text}</Text>
  )
}

const styles = StyleSheet.create({
  itemBtn: {
    width: '100%', height: "100%", justifyContent: 'center',
  }
})

export { RowItemNormalMode, RowItemStudyMode }
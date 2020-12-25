import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import usePrimaryControlledColor, { WhereToColor } from '../../../../../hooks/usePrimaryControlledColor'
import { RootReducerT } from '../../../../../store'
import { FirstItemInRow, Row as RowStyle } from '../../../../../styles/paoTableStyles'
import { paoTableStyles } from '../list-mode-pagination'
import { RowItemStudyMode, RowItemNormalMode } from './RowItems'
import Icon from "react-native-vector-icons/FontAwesome"

const Row = ({ index }) => {
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)
  const [isNumber, setIsNumber] = useState(displayNumberInFront)

  const rowEvenBgColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const rowOddBgColor = usePrimaryControlledColor(WhereToColor.rowOdd)
  const bgColor = (index) => index % 2 == 1 ? rowEvenBgColor : rowOddBgColor
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)

  useEffect(() => setIsNumber(displayNumberInFront), [displayNumberInFront])
  const onPressRow = () => setIsNumber(prev => !prev)

  return (
    <View style={{ height: '100%', backgroundColor: bgColor(index), flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: "center", zIndex: 3, flexDirection: 'row' }}>

        <Icon name={'star'} size={13} color='#D9BF14' />
        <FirstItemInRow>
          {index}
        </FirstItemInRow>
      </View>
      <View style={{ ...paoTableStyles.itemInRow }}>
        <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={onPressRow}>
          <RowStyle>
            {['person', 'action', 'object'].map((name: string) =>
              isRandomStudyMode
                ? <RowItemStudyMode index={index} isNumberFromRow={isNumber} key={name} name={name} />
                : <RowItemNormalMode index={index} key={name} name={name} />
            )}
          </RowStyle>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Row
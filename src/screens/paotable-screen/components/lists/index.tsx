import React from 'react'
import { useSelector } from 'react-redux'
import { Control } from '../../../../hooks/useTextInputHandler'
import { RootReducerT } from '../../../../store'
import { View } from 'react-native-animatable'
import RecyclerListViewComponent from './list-mode-scroll/RecyclerListViewComponent'
import { Dimensions, Text } from 'react-native'
import Row from './list-mode-scroll/Row'
import usePrimaryControlledColor, { WhereToColor } from '../../../../hooks/usePrimaryControlledColor'
import { tableHeaderHeight } from '../../../../components/TableHeader'

const SCREEN_HEIGHT = Dimensions.get('window').height;


const ListModeScroll = () => {
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const paoTableRowHeight = useSelector((state: RootReducerT) => state.misc.paoTableRowHeight)
  const pao = useSelector((state: RootReducerT) => state.pao)  //@
  const rowEvenBgColor = usePrimaryControlledColor(WhereToColor.rowEven)
  const rowOddBgColor = usePrimaryControlledColor(WhereToColor.rowOdd)

  return (
    <>
      <View style={{ height: SCREEN_HEIGHT - tableHeaderHeight }}>
        {studyRandomMode.person.length > 0 &&
          <RecyclerListViewComponent
            rowRenderer={(type, item, index) => <Row index={index} />}
            iterator={isRandomStudyMode ? studyRandomMode.person : pao}
            bgColors={{ rowOddBgColor, rowEvenBgColor }}
            rowHeight={paoTableRowHeight}
          />
        }
      </View>
    </>
  )
}

export default ListModeScroll
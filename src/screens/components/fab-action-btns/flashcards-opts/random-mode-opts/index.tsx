import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerT } from '../../../../../store'
import { FLIP_STUDY_RANDOM_MODE_CARDS_FALSE, FLIP_STUDY_RANDOM_MODE_CARDS_TRUE } from '../../../../../actions/types'
import { reusableStyles } from '../../../../../styles/global'
import AmountOfCardsAccumulator from './AmountOfCardsAccumulator'
import SwitchSelector from 'react-native-switch-selector'
import usePrimaryControlledColor, { WhereToColor } from '../../../../../hooks/usePrimaryControlledColor'


const RandomStudyModeOpts = () => {
  const isFlipped = useSelector((state: RootReducerT) => state.studyRandomMode.isFlipped)
  const [switchSelectorValues, setSwitchSelectorValues] = useState(() => ({
    invertCard: isFlipped ? 1 : 0,
  }))
  const switchSelectors = [

    {
      title: 'display number', leftLabel: 'back', rightLabel: 'front',
      toggleState: switchSelectorValues.invertCard,
      onPress: toggle => setSwitchSelectorValues(prev => ({ ...prev, invertCard: toggle }))
    },
  ]
  const dispatch = useDispatch()
  const theme = useTheme()

  const onPressSaveBtn = () => {
    dispatch({ type: switchSelectorValues.invertCard ? FLIP_STUDY_RANDOM_MODE_CARDS_TRUE : FLIP_STUDY_RANDOM_MODE_CARDS_FALSE })
  }

  return (
    <View style={styles.container}>

      {switchSelectors.map(switchSelectorItem => {
        const switchBtnSelected = usePrimaryControlledColor(WhereToColor.switchBtnSelected, theme.colors.primary)
        return (
          <>
            <Text style={{ ...reusableStyles.lgText, color: 'white' }}>{switchSelectorItem.title}</Text>
            <SwitchSelector
              // paddingSwitch={10}
              selectedTextStyle={{ height: 30, fontFamily: 'MontserratReg' }}
              textStyle={{ height: 30, fontFamily: 'MontserratReg', color: switchBtnSelected }}
              height={30}
              initial={switchSelectorItem.toggleState}
              onPress={whatSide => switchSelectorItem.onPress(whatSide)}
              // textControlledColor={theme.colors.primary}
              buttonColor={switchBtnSelected}
              borderColor={switchBtnSelected}
              animationDuration={500}
              hasPadding
              fontSize={20}
              options={[
                { value: 0, label: switchSelectorItem.leftLabel },
                { value: 1, label: switchSelectorItem.rightLabel }
              ]}
            />
          </>
        )
      })}
      <AmountOfCardsAccumulator />

      <Button onPress={onPressSaveBtn}>Save - always</Button>
    </View>
  )
}

// fabProperties.fabVisibility === false

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default RandomStudyModeOpts

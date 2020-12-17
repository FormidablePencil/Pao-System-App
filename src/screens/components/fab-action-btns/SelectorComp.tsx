import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import SwitchSelector from 'react-native-switch-selector'
import usePrimaryControlledColor, { WhereToColor } from '../../../hooks/usePrimaryControlledColor'
import { reusableStyles } from '../../../styles/global'
import { scaleStyles, paddingStyles } from './functions/sizingDependedOnScreen'

const SelectorComp = ({ onPress, initial, options, title }) => {
  const theme = useTheme()
  const switchBtnSelected = usePrimaryControlledColor(WhereToColor.switchBtnSelected, theme.colors.primary)

  return (
    <View style={{ ...styles.container, ...styles.scaleIfSmallScreen }}>
      <Text style={{ ...reusableStyles.lgText, ...styles.title, }}>{title}</Text>
      <SwitchSelector
        style={{ ...styles.switchSelector, ...styles.scaleIfSmallScreen }}
        // paddingSwitch={10}
        selectedTextStyle={{ height: 30, fontFamily: 'MontserratReg' }}
        textStyle={{ height: 30, fontFamily: 'MontserratReg', color: switchBtnSelected }}
        height={40}
        initial={initial ? 0 : 1}
        onPress={onPress}
        // textControlledColor={theme.colors.primary}
        buttonColor={switchBtnSelected}
        borderColor={switchBtnSelected}
        animationDuration={500}
        hasPadding
        fontSize={20}
        options={options}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...paddingStyles()
  },
  switchSelector: {
    width: 235,
  },
  title: {
    color: 'white', 
    width: 100,
  },
  scaleIfSmallScreen: {
    ...scaleStyles()
  },
})

export default SelectorComp

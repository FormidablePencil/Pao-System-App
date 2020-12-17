import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import SwitchSelector from 'react-native-switch-selector'
import usePrimaryControlledColor, { WhereToColor } from '../../../hooks/usePrimaryControlledColor'
import { reusableStyles } from '../../../styles/global'

const SelectorComp = ({ onPress, initial, options, title }) => {
  const theme = useTheme()
  const switchBtnSelected = usePrimaryControlledColor(WhereToColor.switchBtnSelected, theme.colors.primary)

  return (
    <View style={styles.container}>
      <Text style={{ ...reusableStyles.lgText, ...styles.title }}>{title}</Text>
      <SwitchSelector
        style={styles.switchSelector}
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
    marginTop: 5,
    marginBottom: 5,
  },
  switchSelector: {
    width: 250,
  },
  title: {
    color: 'white', marginBottom: 2
  }
})

export default SelectorComp

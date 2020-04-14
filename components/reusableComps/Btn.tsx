import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
//@ reusable comp

const styles = StyleSheet.create({
  defaultBtnStyles: {
    height: 10,
    width: 20,
    borderRadius: 5,
    color: '#FFDF5B'
  },
  defaultTextStyles: {
    color: 'grey'
  }
})
interface BtnTypes {
  btnText: string
  overRideBtnStyles?: object
  overRideTextStyles?: object
}
export const Btn = ({ btnText, overRideBtnStyles, overRideTextStyles }: BtnTypes) => {
  return (
    <View style={{ ...styles.defaultBtnStyles, ...overRideBtnStyles }}>
      <Text style={{...styles.defaultTextStyles, ...overRideTextStyles}} >{btnText}</Text>
    </View>
  )
}

export default Btn

import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EnterMethodContext } from '../../screens/WelcomeScreen'
//@ reusable comp

const styles = StyleSheet.create({
  defaultBtnStyles: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#B6F4FF'
  },
  defaultTextStyles: {
    color: 'grey',
    alignSelf: 'center'
  }
})
interface BtnTypes {
  btnText?: string
  overRideBtnStyles?: object
  overRideTextStyles?: object
  funcOnPress?: object
  children?: any
}
export const Btn = ({ btnText, overRideBtnStyles, overRideTextStyles, funcOnPress, children }: BtnTypes) => {

  return (
    <TouchableOpacity onPress={funcOnPress} style={{ ...styles.defaultBtnStyles, ...overRideBtnStyles }}>
      {children}
      {btnText &&
        <Text style={{ ...styles.defaultTextStyles, ...overRideTextStyles }} >{btnText}</Text>
      }
    </TouchableOpacity>
  )
}

export default Btn

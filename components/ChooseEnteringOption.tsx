import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Btn from './reusableComps/Btn'

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: '#FFE5A3',
  }
})

const ChooseEnteringOption = () => {
  return (
    <View style={styles.optionsContainer}>
      <Btn btnText='new account' />
      <Btn btnText='login' />
    {/* <Text>Hello from ChooseEnteringOption Component</Text> */}
    </View>
  )
}

export default ChooseEnteringOption

import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native-tailwind'
import Btn from './reusableComps/Btn'

const ChooseEnteringOption = ({ setCompToRender, comps }: any) => {

  const funcOnPressHandler = (setComp: any) => {
    setCompToRender(setComp)
  }
  
  
  return (
    <View className='flex-row w-4/5' style={{top: 75}}>
      <View className='flex-1 mx-3'>
        <Btn btnText='login' overRideTextStyles={{ fontSize: 20 }} funcOnPress={() => funcOnPressHandler(comps.signin)} />
      </View>
      <View className='flex-1 mx-3'>
        <Btn btnText='new account' overRideTextStyles={{ fontSize: 20 }} funcOnPress={() => funcOnPressHandler(comps.signup)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: '#FFE5A3',
  }
})

export default ChooseEnteringOption

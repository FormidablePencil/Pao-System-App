import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import ChooseEnteringOption from './ChooseEnteringOption'
import EnteringOptionComp from './DynamicFormFields'
import Btn from './reusableComps/Btn'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, LayoutAnimation } from 'react-native'
import { EnterMethodContext } from '../screens/WelcomeScreen'

interface FormCompTypes {
  onClickBtns: {
    compToRender: any,
    setCompToRender: any
  },
  comps: any
}

const FormComp = ({ onClickBtns, comps }: FormCompTypes) => {

  const funcOnPressHandler = (setComp: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onClickBtns.setCompToRender(setComp)
  }
  
  return (
    <View className='bg-blue-200 items-center py-6 rounded-lg px-8' style={{ width: 300, backgroundColor: '#A0D2F9' }}>
      <EnteringOptionComp
        overRideTextInput={{ width: '100%' }}
        initialInputFields={[{ input: 'QQQ23', placeholder: '1AA2' }, { input: 'dSDf', placeholder: '134' }]}
      />
      <View className='w-full flex-row h-12 justify-between mt-3'>
        <Btn overRideBtnStyles={styles.overRideBtnStyles} funcOnPress={() => funcOnPressHandler(comps.enterOptions)}>
          <Ionicons style={{ left: -10 }} name='md-arrow-back' size={20} color='white' />
          <Text className='text-lg text-white -mt-1 '>back</Text>
        </Btn>
        <Btn overRideBtnStyles={styles.overRideBtnStyles} funcOnPress={() => funcOnPressHandler(comps.enterOptions)}>
          <Text className='text-lg text-white -mt-1'>Signin</Text>
        </Btn>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overRideBtnStyles: { width: 90, backgroundColor: '#4E6ADD', alignItems: 'center', justifyContent: 'center', height: '80%', flexDirection: 'row' }
})

export default FormComp

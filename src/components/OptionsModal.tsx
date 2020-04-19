import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Modal, Button, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles } from '../styles/global'
import { StyledText } from '../styles/global'
import * as Animatable from 'react-native-animatable';
import { PaoAppContext } from '../routes/TabNavigator';
import ToggleSwitchComp from './ToggleSwitchComp';
import SimpleBtn, { BtnSlider } from './BtnComps';

const OptionsModal = (props) => {
  const { modalOpen } = useContext(PaoAppContext)


  return (
    <Modal visible={modalOpen} transparent={true} >
      <View style={{ ...globalStyles.centerEverything, ...globalStyles.flashcardModal, backgroundColor: '#a6a4a3' }}>
        <View className="bg-white p-8 flex" style={{ ...globalStyles.flashcard, borderRadius: 25, width: '90%', height: '80%' }}>
          <View className="flex justify-center items-center justify-around h-full">

            <Animatable.View animation="pulse" iterationCount="infinite"  >
              <Image source={require('../assets/playing-cards-png-11-original.png')} style={{ height: 120, width: 120, }} />
            </Animatable.View>

            <View className="flex flex-row w-full justify-center px-8">
              <StyledText>person</StyledText>
              <ToggleSwitchComp />
              <StyledText>action</StyledText>
              <ToggleSwitchComp />
              <StyledText>object</StyledText>
              <ToggleSwitchComp />
            </View>

            <BtnSlider />

            <SimpleBtn color='red' />
            <SimpleBtn color='blue' />
            <SimpleBtn text={'btn3'} color='green' width={48} />
          </View>
        </View>

      </View>
    </Modal>
  )
}

export default OptionsModal

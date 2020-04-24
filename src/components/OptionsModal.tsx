import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Modal, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles } from '../styles/global'
import { StyledText } from '../styles/global'
import * as Animatable from 'react-native-animatable';
import { PaoAppContext } from '../routes/TabNavigator';
import ToggleSwitchComp from './ToggleSwitchComp';
import SimpleBtn, { BtnSlider } from './BtnComps';
import { Button, Provider, Portal, Title } from 'react-native-paper'
import SwitchSelector from "react-native-switch-selector";
import { FlashcardsContext, arrangmentOpt } from '../screens/FlashcardsScreen';
import styled from 'styled-components';
import { DefaultTheme } from '@react-navigation/native';


const OptionsModal = () => {
  const { modalOpen, setModalOpen } = useContext(PaoAppContext)
  const { flashcardItemDisplayedFront, setflashcardItemDisplayedFront, arrangment, setArrangment } = useContext(FlashcardsContext)
  console.log({ flashcardItemDisplayedFront, setflashcardItemDisplayedFront, arrangment, setArrangment })

  const switchSelectorsInfo: any = [
    { name: 'number' },
    { name: 'person' },
    { name: 'action' },
    { name: 'object' },
  ]

  const flashCardOrderBtnPayload: any = [
    { order: 'ascending', arrangementOption: arrangmentOpt.ascending },
    { order: 'descending', arrangementOption: arrangmentOpt.descending },
    { order: 'random', arrangementOption: arrangmentOpt.random },
  ]

  return (
    <Modal visible={modalOpen} transparent={true} >
      <View style={{ ...globalStyles.centerEverything, ...globalStyles.flashcardModal, backgroundColor: '#a6a4a3' }}>
        <View className="bg-white p-8 flex" style={{ ...globalStyles.flashcard, borderRadius: 25, width: '90%', height: '80%' }}>
          <View className="flex justify-center items-center justify-around h-full">

            <Animatable.View animation="pulse" iterationCount="infinite"  >
              <Image source={require('../assets/playing-cards-png-11-original.png')} style={{ height: 120, width: 120, }} />
            </Animatable.View>

            {/* <BtnSlider /> */}
            <View className='flex-col '>
              <View className="flex flex-col justify-center">
                {switchSelectorsInfo.map((collection: any) =>
                  <>
                    <Title style={{ alignSelf: 'center' }}>{collection.name}</Title>
                    <SwitchSelector
                      style={{ width: 250 }}
                      initial={flashcardItemDisplayedFront[collection.name] === true ? 0 : 1}
                      onPress={value => {
                        if (value === 'front') setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, [collection.name]: true })
                        else setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, [collection.name]: false })
                      }}
                      textColor={DefaultTheme.colors.primary} //'#7a44cf'
                      selectedColor={'white'}
                      buttonColor={DefaultTheme.colors.primary}
                      borderColor={DefaultTheme.colors.primary}
                      hasPadding
                      fontSize={20}
                      options={[
                        //@ts-ignore
                        { label: "front", value: 'front' },
                        { label: "back", value: 'back' }
                      ]}
                    />
                  </>
                )}
              </View>

              <View className='flex-col'>
                <Title style={{ alignSelf: 'center' }}>Order: </Title>
                {flashCardOrderBtnPayload.map((collection: any) =>
                  <>
                    <Button mode={arrangment === collection.arrangementOption ? 'contained' : 'outlined'}
                      onPress={() => setArrangment(collection.arrangementOption)}>
                      {collection.order}
                    </Button>
                  </>
                )}
                <SaveButton onPress={() => setModalOpen(false)} mode='contained'>
                  close
                </SaveButton>
              </View>
            </View>
          </View>
        </View>

      </View>
    </Modal >
  )
}

const SaveButton = styled(Button)`
  width: 150px;
  border-radius: 20px;
  margin-vertical: 5px;
  align-self: center;
`;

export default OptionsModal

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


const OptionsModal = () => {
  const { modalOpen, setModalOpen } = useContext(PaoAppContext)
  const { flashcardItemDisplayedFront, setflashcardItemDisplayedFront, arrangment, setArrangment } = useContext(FlashcardsContext)
  console.log({ flashcardItemDisplayedFront, setflashcardItemDisplayedFront, arrangment, setArrangment })

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

                <Title style={{ alignSelf: 'center' }}>person</Title>
                <SwitchSelector
                  style={{ width: 250 }}
                  initial={0}
                  onPress={value => {
                    if (value === 'front') setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, person: true })
                    else setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, person: false })
                  }}
                  textColor={'red'} //'#7a44cf'
                  selectedColor={'white'}
                  buttonColor={'blue'}
                  borderColor={'aqua'}
                  hasPadding
                  fontSize={20}
                  options={[
                    //@ts-ignore
                    { label: "front", value: 'front' },
                    { label: "back", value: 'back' }
                  ]}
                />
                <Title style={{ alignSelf: 'center' }}>action</Title>
                <SwitchSelector
                  style={{ width: 250 }}
                  selectedTextContainerStyle={{ width: 1003 }}
                  initial={0}
                  onPress={value => {
                    if (value === 'front') setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, action: true })
                    else setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, action: false })
                  }}
                  textColor={'red'} //'#7a44cf'
                  selectedColor={'white'}
                  buttonColor={'blue'}
                  borderColor={'aqua'}
                  hasPadding
                  fontSize={20}
                  options={[
                    { label: "front", value: 'front' },
                    { label: "back", value: 'back' }
                  ]}
                />
                <Title style={{ alignSelf: 'center' }}>object</Title>
                <SwitchSelector
                  style={{ width: 250 }}
                  selectedTextContainerStyle={{ width: 1003 }}
                  initial={0}
                  onPress={value => {
                    if (value === 'front') setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, object: true })
                    else setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, object: false })
                  }}
                  textColor={'red'} //'#7a44cf'
                  selectedColor={'white'}
                  buttonColor={'blue'}
                  borderColor={'aqua'}
                  hasPadding
                  fontSize={20}
                  options={[
                    { label: "front", value: 'front' },
                    { label: "back", value: 'back' }
                  ]}
                />
                <Title style={{ alignSelf: 'center' }}>number</Title>
                <SwitchSelector
                  style={{ width: 250 }}
                  selectedTextContainerStyle={{ width: 1003 }}
                  initial={0}
                  onPress={value => {
                    if (value === 'front') setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, number: true })
                    else setflashcardItemDisplayedFront({ ...flashcardItemDisplayedFront, number: false })
                  }}
                  textColor={'red'} //'#7a44cf'
                  selectedColor={'white'}
                  buttonColor={'blue'}
                  borderColor={'aqua'}
                  hasPadding
                  fontSize={20}
                  options={[
                    { label: "front", value: 'front' },
                    { label: "back", value: 'back' }
                  ]}
                />
                {/* //* choices for what'll be in the front card */}
              </View>

              {/* //* study all or only stared */}

              <View className='flex-col'>
                <Title style={{ alignSelf: 'center' }}>Order: </Title>
                <Button mode={arrangment === arrangmentOpt.ascending ? 'contained' : 'outlined'}
                  onPress={() => setArrangment(arrangmentOpt.ascending)}
                >
                  ascending
                </Button>
                <Button mode={arrangment === arrangmentOpt.descending ? 'contained' : 'outlined'}
                  onPress={() => setArrangment(arrangmentOpt.descending)}
                >
                  descending
                </Button>
                <Button mode={arrangment === arrangmentOpt.random ? 'contained' : 'outlined'}
                  onPress={() => setArrangment(arrangmentOpt.random)}
                >
                  random
                </Button>
                <Button onPress={() => setModalOpen(false)} mode='text'>
                  close
            </Button>
              </View>
            </View>
          </View>
        </View>

      </View>
    </Modal >
  )
}

export default OptionsModal

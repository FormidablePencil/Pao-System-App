import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Modal, TouchableOpacity, TextInput, Slider, Animated } from 'react-native';
import { globalStyles } from '../styles/global'
import { Button, Provider, Portal, Title } from 'react-native-paper'
import SwitchSelector from "react-native-switch-selector";
import styled from 'styled-components';
import { DefaultTheme } from '@react-navigation/native';
import { TabNavContext } from '../routes/TabNavigator'
import { PaoAppContext } from '../routes/StackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { SET_AUTO_PLAY_DURATION, TOGGLE_AUTO_PLAY_DURATION, SAVED_FLASHCARD_SETTINGS_FROM_MODAL, UPDATE_FLASHCARD_ORDER } from '../actions/types';
import { saveFlashcardSettings } from '../actions/flashcardSettingsActions'
import { FlashcardSettingsTypes, arrangmentOpt } from '../reducer/flashcardOptionsReducer';

const OptionsModal = () => {
  const { modalOpen, setModalOpen } = useContext(TabNavContext)
  const { flashcardItemDisplayedFront, autoPlayFlashcards } = useSelector((state: any) => state.flashcardOptions)
  const [loading, setLoading] = useState(false)
  const { /* arrangment, setArrangment, */ tabScreenOptions: { screen } } = useContext(PaoAppContext)
  const [fontSize, setFontSize] = useState<number>() //to theme provider
  const dispatch = useDispatch()
  const [sliderValueautoPlayFlashcardsDuration, setSliderValueautoPlayFlashcardsDuration] = useState()
  const [flashcardSettings, setFlashcardSettings] = useState<FlashcardSettingsTypes>({
    flashcardItemDisplayedFront: [
      { number: true },
      { person: false },
      { action: true },
      { object: false },
    ],
    autoPlayFlashcards: { play: false, duration: 5 },
    flashcardOrder: null
  })

  //~ text size, show pao hits, autoPlayFlashcards and it's timeout duration, ascending, descending and /* random option

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

  enum onPress {
    save,
    setOrder,
    toggleAutoPlay,
    switch
  }

  const onPressHandler = async (action: any, payload?: any) => {
    switch (action) {
      case onPress.setOrder:
        setFlashcardSettings({ ...flashcardSettings, flashcardOrder: payload })
        break;

      case onPress.save:
        await setLoading(true)
        await setFlashcardSettings({
          ...flashcardSettings, autoPlayFlashcards: {
            ...flashcardSettings.autoPlayFlashcards,
            duration: sliderValueautoPlayFlashcardsDuration
          }
        })
        await dispatch(saveFlashcardSettings(flashcardSettings))
        setModalOpen(false)
        setLoading(false)
        break;

      case onPress.switch:

        setWhatSideItemWillDisplay(payload.name, payload.whatSide)
        break

      case onPress.toggleAutoPlay:
        setFlashcardSettings({
          ...flashcardSettings,
          autoPlayFlashcards: {
            ...flashcardSettings.autoPlayFlashcards,
            play: !flashcardSettings.autoPlayFlashcards.play
          }
        })
        break

      default:
        break;
    }
  }


  const setWhatSideItemWillDisplay = (name: any, value: string) => {
    console.log('object')
    let boolean = true
    if (value === 'back') boolean = false
    const updatedState = flashcardSettings.flashcardItemDisplayedFront.map(item => {
      if (Object.keys(item)[0] === name) return { [name]: boolean }
      else return item
    })
    //@ts-ignore
    setFlashcardSettings({ ...flashcardSettings, flashcardItemDisplayedFront: updatedState })
  }


  return (
    <Modal visible={modalOpen} transparent={true}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View style={{ ...globalStyles.centerEverything, ...globalStyles.flashcardModal }}>
          <View className="bg-white p-8 flex" style={{ ...globalStyles.flashcard, borderRadius: 25, width: '90%', height: '90%' }}>
            <View className="flex justify-center items-center justify-around h-full">

              {/* <Animatable.View animation="pulse" iterationCount="infinite"  >
              <Image source={require('../assets/playing-cards-png-11-original.png')} style={{ height: 120, width: 120, }} />
            </Animatable.View> */}

              {/* <BtnSlider /> */}
              <View className='flex-col '>
                <View className="flex flex-col justify-center w-full">

                  <Button onPress={() => { onPressHandler(onPress.toggleAutoPlay) }}>Auto play {flashcardSettings.autoPlayFlashcards.play ? 'on' : 'off'}</Button>
                  <Text style={{ color: flashcardSettings.autoPlayFlashcards.play ? 'black' : 'lightgrey' }}>
                    auto play duraton {Math.floor(sliderValueautoPlayFlashcardsDuration ? sliderValueautoPlayFlashcardsDuration : autoPlayFlashcards.duration)}
                  </Text>
                  <Slider
                    disabled={!flashcardSettings.autoPlayFlashcards.play}
                    value={autoPlayFlashcards.duration}
                    onValueChange={(value) => setSliderValueautoPlayFlashcardsDuration(value)}
                    style={{ width: 200, height: 40 }}
                    minimumValue={2}
                    maximumValue={20}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                  />

                  <Animated.Text style={{ fontSize: fontSize }}>Font Size</Animated.Text>
                  <Slider
                    // value={10}
                    onValueChange={(value) => { setFontSize(value) }}
                    style={{ width: 200, height: 40 }}
                    minimumValue={15}
                    maximumValue={30}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                  />

                  {switchSelectorsInfo.map((collection, index) => {
                    const specificItem = flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === collection.name)[0]
                    const toggle = Object.values(specificItem)[0]
                    return (
                      <View key={index}>
                        <Title style={{ alignSelf: 'center' }}>{collection.name}</Title>
                        <SwitchSelector
                          paddingSwitch={10}
                          // selectedTextStyle={{ height: 100 }}
                          // textStyle={{ height: 100 }}
                          height={21}
                          style={{ width: "100%", height: 10 }}
                          initial={toggle ? 0 : 1}
                          onPress={whatSide => onPressHandler(onPress.switch, { name: Object.values(collection)[0], whatSide })}
                          // textColor={DefaultTheme.colors.primary} //'#7a44cf'
                          // selectedColor={'black'}
                          buttonColor={DefaultTheme.colors.primary}
                          borderColor={'#268776'}
                          animationDuration={500}
                          hasPadding
                          fontSize={20}
                          options={[
                            { value: 'front', label: "front" },
                            { value: 'back', label: "back" }
                          ]}
                        />
                      </View>
                    )
                  })}
                </View>

                <View className='flex-col'>
                  <Title style={{ alignSelf: 'center' }}>Order: </Title>
                  {flashCardOrderBtnPayload.map((collection, index) =>
                    <View key={index}>
                      <Button
                        mode={flashcardSettings.flashcardOrder === collection.arrangementOption ? 'contained' : 'outlined'}
                        onPress={() => onPressHandler(onPress.setOrder, collection.arrangementOption)}>
                        {collection.order}
                      </Button>
                    </View>
                  )}
                  <SaveButton
                    loading={loading}
                    onPress={() => onPressHandler(onPress.save)}
                    mode='contained'>
                    Save
                </SaveButton>
                </View>
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

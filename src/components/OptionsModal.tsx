import React, { useState } from 'react'
import { View } from 'react-native-tailwind'
import { Modal, Slider, Animated } from 'react-native';
import { globalStyles } from '../styles/global'
import { Button, Title, Text, useTheme } from 'react-native-paper'
import SwitchSelector from "react-native-switch-selector";
import styled from 'styled-components';
import { DefaultTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// import { saveFlashcardSettings } from '../actions/flashcardSettingsActions'
import { FlashcardSettingsTypes, arrangmentOpt } from '../reducer/flashcardOptionsReducer';
import { tabScreens } from '../constants/constants';
import { capitalizeFirstCharFunc } from './logic/logic';
import * as Animatable from 'react-native-animatable';


const OptionsModal = ({
  sliderValueautoPlayFlashcardsDuration, setSliderValueautoPlayFlashcardsDuration,
  setModalOpen, modalOpen,
  setFlashcardSettings, flashcardSettings,
  setLoading, loading,
  currentScreen }) => {
  const { flashcardItemDisplayedFront, autoPlayFlashcards } = useSelector((state: any) => state.flashcardOptions)
  const theme = useTheme()
  const [fontSize, setFontSize] = useState<number>() //to theme provider
  const dispatch = useDispatch()

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

      case onPress.save: //!~~
        await setLoading(true)
        await setFlashcardSettings({
          ...flashcardSettings, autoPlayFlashcards: {
            ...flashcardSettings.autoPlayFlashcards,
            duration: sliderValueautoPlayFlashcardsDuration
          }
        })

        ////~ the screen component will hold onto the settings
        //  await dispatch(saveFlashcardSettings(flashcardSettings))  

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
    // <Modal visible={modalOpen} transparent={true}>
    // <View style={{ ...globalStyles.centerEverything, ...globalStyles.flashcardModal }}>
    // <View className="bg-white p-8" style={{ ...globalStyles.flashcard, borderRadius: 25 }}>
    <View style={{}} className="flex justify-center items-center justify-around">

      {/* <Animatable.View animation="pulse" iterationCount="infinite"  >
              <Image source={require('../assets/playing-cards-png-11-original.png')} style={{ height: 120, width: 120, }} />
            </Animatable.View> */}

      {/* <BtnSlider /> */}
      <View className='flex-col' style={{ alignItems: 'center' }}>
        <Animatable.View
          animation='bounceIn'
          style={{ margin: 8, alignItems: 'center', }}>
          <View className="flex flex-col justify-center" style={{ borderRadius: 25, backgroundColor: '#DAF0FF', padding: 20, marginVertical: 10 }}>

            {/* {currentScreen === tabScreens.Flashcards &&
                    <>
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
                    </>
                  } */}

            {currentScreen === tabScreens.Flashcards &&
              <>
                {switchSelectorsInfo.map((collection, index) => {
                  const specificItem = flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === collection.name)[0]
                  const toggle = Object.values(specificItem)[0]
                  return (
                    <View style={{ width: 300 }} key={index}>
                      <Text style={{ alignSelf: 'center', fontSize: 20 }}>{capitalizeFirstCharFunc(collection.name)}</Text>
                      <SwitchSelector
                        paddingSwitch={10}
                        selectedTextStyle={{ height: 30, fontFamily: 'MontserratReg' }}
                        textStyle={{ height: 30, fontFamily: 'MontserratReg' }}
                        height={30}
                        // style={{ width: "100%", height: 10 }}
                        initial={toggle ? 0 : 1}
                        onPress={whatSide => onPressHandler(onPress.switch, { name: Object.values(collection)[0], whatSide })}
                        textControlledColor={theme.colors.primary} //'#7a44cf'
                        // selectedColor={'black'}
                        buttonColor={theme.colors.primary}
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
              </>
            }
          </View>
        </Animatable.View>
        <Animatable.View
          animation='bounceIn'
          style={{ margin: 8, alignItems: 'center' }}>
          <View className='flex-col pt-6' style={{ borderRadius: 25, backgroundColor: '#DAF0FF', padding: 20, marginVertical: 10 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>Order: </Text>
            {flashCardOrderBtnPayload.map((collection, index) =>
              <View key={index}>
                <Button
                  style={{ margin: 2 }}
                  color={flashcardSettings.flashcardOrder === collection.arrangementOption ? theme.colors.primary : 'white'}
                  mode={'contained'}
                  onPress={() => onPressHandler(onPress.setOrder, collection.arrangementOption)}>
                  <Text style={{ color: flashcardSettings.flashcardOrder === collection.arrangementOption ? 'white' : theme.colors.primary, textTransform: "lowercase", fontSize: 15 }}>
                    {collection.order}
                  </Text>
                </Button>
              </View>
            )}
            {/* <SaveButton
              loading={loading}
              onPress={() => onPressHandler(onPress.save)}
              mode='contained'>
              <Text style={{ textTransform: "lowercase", fontSize: 15, color: 'white' }}>
                Save
              </Text>
            </SaveButton> */}
          </View>
        </Animatable.View>
      </View>
    </View>
    // </View>

    // </View>
    // </Modal >
  )
}

const SaveButton = styled(Button)`
  width: 150px;
  border-radius: 20px;
  margin-vertical: 5px;
  align-self: center;
`;

export default OptionsModal

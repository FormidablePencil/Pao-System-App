import React from 'react'
import { View } from 'react-native-tailwind'
import { Dimensions } from 'react-native';
import { Button, Text, Headline } from 'react-native-paper'
import SwitchSelector from "react-native-switch-selector";
import { arrangmentOpt } from '../reducer/flashcardOptionsReducer';
import { tabScreens } from '../constants/constants';
import { capitalizeFirstCharFunc } from './logic/logic';
import * as Animatable from 'react-native-animatable';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../hooks/usePrimaryControlledColor';


const SCREEN_WIDTH = Dimensions.get('window').width

const OptionsModal = ({
  sliderValueautoPlayFlashcardsDuration,
  setModalOpen,
  setFlashcardSettings, flashcardSettings,
  setLoading,
  currentScreen, theme,
  fabActionContentRef, fabActionContentRef2 }) => {

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
    let boolean = true
    if (value === 'back') boolean = false
    const updatedState = flashcardSettings.flashcardItemDisplayedFront.map(item => {
      if (Object.keys(item)[0] === name) return { [name]: boolean }
      else return item
    })
    //@ts-ignore
    setFlashcardSettings({ ...flashcardSettings, flashcardItemDisplayedFront: updatedState })
  }

  const bgColor = usePrimaryControlledColor(WhereToColor.fabActionContentBg, theme.colors.background)
  return (
    <View className="flex justify-center items-center justify-around">

      <View className='flex-col' style={{ alignItems: 'center', }}>
        <Animatable.View
          useNativeDriver
          ref={fabActionContentRef}
          animation='fadeInRightBig'
          style={{ margin: 8, alignItems: 'center', }}>
          <View className="flex flex-col justify-center" style={{ borderRadius: 25, backgroundColor: bgColor, padding: 20, marginVertical: 10 }}>

            {currentScreen === tabScreens.Flashcards &&
              <>
                {switchSelectorsInfo.map((collection, index) => {
                  const specificItem = flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === collection.name)[0]
                  const toggle = Object.values(specificItem)[0]
                  const switchBtnSelected = usePrimaryControlledColor(WhereToColor.switchBtnSelected, theme.colors.primary)
                  return (
                    <View style={{ width: SCREEN_WIDTH / 2 }} key={index}>
                      <Headline style={{ color: 'white', alignSelf: 'center' }}>{capitalizeFirstCharFunc(collection.name)}</Headline>
                      <SwitchSelector
                        // paddingSwitch={10}
                        selectedTextStyle={{ height: 30, fontFamily: 'MontserratReg' }}
                        textStyle={{ height: 30, fontFamily: 'MontserratReg', color: switchBtnSelected }}
                        height={30}
                        initial={toggle ? 0 : 1}
                        onPress={whatSide => onPressHandler(onPress.switch, { name: Object.values(collection)[0], whatSide })}
                        // textControlledColor={theme.colors.primary}
                        buttonColor={switchBtnSelected}
                        borderColor={switchBtnSelected}
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
          useNativeDriver
          ref={fabActionContentRef2}
          animation='fadeInLeftBig'
          style={{ margin: 8, alignItems: 'center' }}>
          <View style={{ borderRadius: 25, backgroundColor: bgColor, padding: 20, marginVertical: 10, width: SCREEN_WIDTH / 1.7 }}>
            <Headline style={{ color: 'white', alignSelf: 'center' }}>Order: </Headline>
            {flashCardOrderBtnPayload.map((collection, index) => {
              //~ could have avoided this inline theming mess if simply used useTheme.
              const btnSelectedColor = usePrimaryControlledColor(WhereToColor.orderBtnSelected, theme.colors.primary)
              const btnArrangmentColor = flashcardSettings.flashcardOrder === collection.arrangementOption ? btnSelectedColor : 'white'
              const uncontrolledTextColor = flashcardSettings.flashcardOrder === collection.arrangementOption ? 'white' : theme.colors.primary
              const controlledTextColor = textControlledColor().color
              const controlledTextColorSwitchBetweenWhiteBlack = flashcardSettings.flashcardOrder === collection.arrangementOption ? 'white' : controlledTextColor
              const textColor = controlledTextColorSwitchBetweenWhiteBlack ?? uncontrolledTextColor
              return (
                <View key={index}>
                  <Button
                    style={{ margin: 2, elevation: 0 }}
                    color={btnArrangmentColor}
                    mode={'contained'}
                    onPress={() => onPressHandler(onPress.setOrder, collection.arrangementOption)}>
                    <Text style={{
                      color: textColor, textTransform: "lowercase", fontSize: 15
                    }}>
                      {collection.order}
                    </Text>
                  </Button>
                </View>
              )
            })}
          </View>
        </Animatable.View>
      </View>
    </View>
  )
}

export default OptionsModal

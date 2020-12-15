import React from 'react'
import { View } from 'react-native-tailwind'
import { Dimensions } from 'react-native';
import { Button, Text, Headline } from 'react-native-paper'
import SwitchSelector from "react-native-switch-selector";
import { arrangmentOpt } from '../../../../reducer/flashcardOptionsReducer';
import { tabScreens } from '../../../../constants/constants';
import { capitalizeFirstCharFunc } from '../../../../components/logic/logic';
import * as Animatable from 'react-native-animatable';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../../../../hooks/usePrimaryControlledColor';
import { UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE } from '../../../../actions/types';
import { useDispatch } from 'react-redux';
import CardOpts from './reg-mode-opts/CardOpts';
import ListOpts from './reg-mode-opts/ListOpts';
import RandomStudyModeOpts from './random-mode-opts';


const OptionsModal = ({
  sliderValueautoPlayFlashcardsDuration,
  setModalOpen,
  setFlashcardSettings, flashcardSettings,
  setLoading,
  currentScreen, theme,
  fabActionContentRef, fabActionContentRef2 }) => {
  const dispatch = useDispatch()

  const switchSelectorsInfo: any = [
    { name: 'number' },
    { name: 'person' },
    { name: 'action' },
    { name: 'object' },
  ]

  const flashCardOrderBtnPayload: any = [
    // { order: 'ascending', arrangementOption: arrangmentOpt.ascending },
    // { order: 'descending', arrangementOption: arrangmentOpt.descending },

    { order: 'sorted', arrangementOption: arrangmentOpt.sorted },
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
        setFlashcardSettings(prev => ({ ...prev, flashcardOrder: payload }))
        break;

      case onPress.save: //!~~
        await setLoading(true)
        await setFlashcardSettings(prev => ({
          ...prev, autoPlayFlashcards: {
            ...prev.autoPlayFlashcards,
            duration: sliderValueautoPlayFlashcardsDuration
          }
        }))

        setModalOpen(false)
        setLoading(false)
        break;

      // case onPress.switch:

      // setWhatSideItemWillDisplay(payload.name, payload.whatSide)
      // break

      case onPress.toggleAutoPlay:
        setFlashcardSettings(prev => ({
          ...prev,
          autoPlayFlashcards: {
            ...prev.autoPlayFlashcards,
            play: !prev.autoPlayFlashcards.play
          }
        }))
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
    setFlashcardSettings(prev => ({ ...prev, flashcardItemDisplayedFront: updatedState }))
  }

  const bgColor = usePrimaryControlledColor(WhereToColor.fabActionContentBg, theme.colors.background)
  return (
    <View className="flex justify-center items-center justify-around">
      <View className='flex-col' style={{ alignItems: 'center', }}>

        {/* reg mode */}
        <CardOpts
          fabActionContentRef={fabActionContentRef}
          currentScreen={currentScreen}
          switchSelectorsInfo={switchSelectorsInfo}
          flashcardSettings={flashcardSettings}
          bgColor={bgColor}
          setWhatSideItemWillDisplay={setWhatSideItemWillDisplay}
        />
        <ListOpts
          bgColor={bgColor}
          fabActionContentRef2={fabActionContentRef2}
          flashCardOrderBtnPayload={flashCardOrderBtnPayload}
          flashcardSettings={flashcardSettings}
          setFlashcardSettings={setFlashcardSettings}
        />

        {/* study mode */}
        <RandomStudyModeOpts />

      </View>
    </View>
  )
}

export default OptionsModal

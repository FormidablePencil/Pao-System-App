import React from 'react'
import { Button, Headline, useTheme, Text } from 'react-native-paper';
import { View } from 'react-native-tailwind'
import { arrangmentOpt } from '../../../../../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../../../../../hooks/usePrimaryControlledColor';
import { useDispatch, useSelector } from 'react-redux';
import RandomStudyModeOpts from '../random-mode-opts';
import { RootReducerT } from '../../../../../store';
import CardOpts from './CardOpts'
import ListOpts from './ListOpts'
import SelectorComp from '../../SelectorComp';
import { tabScreens } from '../../../../../constants/constants';
import { StyleSheet } from 'react-native';

const RegModeOpts = ({
  sliderValueautoPlayFlashcardsDuration,
  setModalOpen,
  setFlashcardSettings, flashcardSettings,
  setLoading,
  currentScreen, theme,
  fabActionContentRef, fabActionContentRef2
}) => {

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

  // const onPressHandler = async (action: any, payload?: any) => {
  //   switch (action) {
  //     case onPress.setOrder:
  //       setFlashcardSettings(prev => ({ ...prev, flashcardOrder: payload }))
  //       break;

  //     case onPress.save: //!~~
  //       await setLoading(true)
  //       await setFlashcardSettings(prev => ({
  //         ...prev, autoPlayFlashcards: {
  //           ...prev.autoPlayFlashcards,
  //           duration: sliderValueautoPlayFlashcardsDuration
  //         }
  //       }))

  //       setModalOpen(false)
  //       setLoading(false)
  //       break;

  //     // case onPress.switch:

  //     // setWhatSideItemWillDisplay(payload.name, payload.whatSide)
  //     // break

  //     case onPress.toggleAutoPlay:
  //       setFlashcardSettings(prev => ({
  //         ...prev,
  //         autoPlayFlashcards: {
  //           ...prev.autoPlayFlashcards,
  //           play: !prev.autoPlayFlashcards.play
  //         }
  //       }))
  //       break

  //     default:
  //       break;
  //   }
  // }

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

  const onPressHandler = (name, whatSide) => setWhatSideItemWillDisplay(name, whatSide)
  const onChangeArrangementSelector = (value) => console.log(value, 'onChangeArrangementSelector')

  const specificItem = flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === switchSelectorsInfo[0].name)[0]
  const toggle = Object.values(specificItem)[0]

  return (
    <>
      {currentScreen === tabScreens.Flashcards &&
        <>
          {switchSelectorsInfo.map((collection, index) =>
            <SelectorComp
              initial={toggle ? 0 : 1}
              onPress={whatSide => onPressHandler(Object.values(collection)[0], whatSide)}
              title={collection.name}
              options={[
                { value: 'front', label: "front" },
                { value: 'back', label: "back" }
              ]}
            />
          )}
          <View style={styles.separator} />
          <SelectorComp
            initial={0}
            onPress={onChangeArrangementSelector}
            title={'Order'}
            options={[
              { value: 0, label: 'sorted' },
              { value: 1, label: 'random' }
            ]}
          />
        </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  separator: {
    margin: 10,
    height: .5,
    width: '50%',
    // backgroundColor: 'white',
  }
})

export default RegModeOpts

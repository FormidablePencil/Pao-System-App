import React from 'react'
import { View } from 'react-native-tailwind'
import { arrangmentOpt } from '../../../../../reducer/flashcardOptionsReducer';
import usePrimaryControlledColor, { WhereToColor, textControlledColor } from '../../../../../hooks/usePrimaryControlledColor';
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
  const bgColor = usePrimaryControlledColor(WhereToColor.fabActionContentBg, theme.colors.background)
  const setWhatSideItemWillDisplay = (name: any, value: string) => {
    let boolean = true
    if (value === 'back') boolean = false
    const updatedState = flashcardSettings.flashcardItemDisplayedFront.map(item => {
      if (Object.keys(item)[0] === name) return { [name]: boolean }
      else return item
    })
    setFlashcardSettings(prev => ({ ...prev, flashcardItemDisplayedFront: updatedState }))
  }

  const onPressHandler = (name, whatSide) => setWhatSideItemWillDisplay(name, whatSide)
  const onChangeArrangementSelector = (value) => console.log(value, 'onChangeArrangementSelector')

  const switchSelectorsInfo = ['Number', 'Person', 'Action', 'Object']
  
  const checkSpecificItem = (name) => {
    flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === name)[0]
    return Object.values(checkSpecificItem)[0] ? 0 : 1
  }
  // const toggle = Object.values(checkSpecificItem)[0]

  return (
    <>
      {currentScreen === tabScreens.Flashcards &&
        <>
          {switchSelectorsInfo.map(name =>
            <SelectorComp
              key={name}
              initial={checkSpecificItem(name)}
              onPress={whatSide => onPressHandler(name, whatSide)}
              title={name}
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

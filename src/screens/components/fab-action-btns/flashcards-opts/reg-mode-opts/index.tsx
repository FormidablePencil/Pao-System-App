import React from 'react'
import usePrimaryControlledColor, {
  WhereToColor,
  textControlledColor,
} from '../../../../../hooks/usePrimaryControlledColor'
import SelectorComp from '../../SelectorComp'
import ButtonSave from '../../ButtonSave'
import { useDispatch } from 'react-redux'
import { SAVED_FLASHCARD_SETTINGS_FROM_MODAL } from '../../../../../actions/types'
import { arrangmentOpt } from '../../../../../reducer/flashcardOptionsReducer'

const RegModeOpts = ({ setFlashcardSettings, flashcardSettings, theme }) => {
  const dispatch = useDispatch()
  const bgColor = usePrimaryControlledColor(
    WhereToColor.fabActionContentBg,
    theme.colors.background
  )

  const onChangeArrangementSelector = (value: arrangmentOpt) =>
    setFlashcardSettings((prev) => ({ ...prev, flashcardOrder: value }))
    
  const setWhatSideItemWillDisplay = (name: any, value: string) => {
    let boolean = true
    if (value === 'back') boolean = false
    setFlashcardSettings((prev) => ({
      ...prev,
      flashcardItemDisplayedFront: prev.flashcardItemDisplayedFront.map((item) => {
        if (Object.keys(item)[0] === name)
          return {
            [name]: boolean,
          }
        else return item
      }),
    }))
  }

  const onPressHandler = (name, whatSide) =>
    setWhatSideItemWillDisplay(name.toLowerCase(), whatSide)

  const switchSelectorsInfo = ['Number', 'Person', 'Action', 'Object']

  const checkSpecificItem = (name) => {
    flashcardSettings.flashcardItemDisplayedFront.filter((item) => Object.keys(item)[0] === name)[0]
    return Object.values(checkSpecificItem)[0] ? 0 : 1
  }

  const save = () =>
    dispatch({ type: SAVED_FLASHCARD_SETTINGS_FROM_MODAL, payload: flashcardSettings })

  // const toggle = Object.values(checkSpecificItem)[0]

  return (
    <>
      {/* {currentScreen === tabScreens.Flashcards && */}
      <>
        {switchSelectorsInfo.map((name) => (
          <SelectorComp
            key={name}
            initial={checkSpecificItem(name)}
            onPress={(whatSide) => onPressHandler(name, whatSide)}
            title={name}
            options={[
              { value: 'front', label: 'front' },
              { value: 'back', label: 'back' },
            ]}
          />
        ))}
        <SelectorComp
          initial={arrangmentOpt.random}
          onPress={onChangeArrangementSelector}
          title={'Order'}
          options={[
            { value: arrangmentOpt.sorted, label: 'sorted' },
            { value: arrangmentOpt.random, label: 'random' },
          ]}
        />
      </>
      <ButtonSave onPress={save} />
      {/* } */}
    </>
  )
}

export default RegModeOpts

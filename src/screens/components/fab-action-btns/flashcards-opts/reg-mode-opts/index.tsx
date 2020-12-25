import React from 'react'
import usePrimaryControlledColor, {
  WhereToColor,
  textControlledColor,
} from '../../../../../hooks/usePrimaryControlledColor'
import SelectorComp from '../../SelectorComp'
import ButtonSave from '../../ButtonSave'
import { useDispatch, useSelector } from 'react-redux'
import { SAVED_FLASHCARD_SETTINGS_FROM_MODAL, UPDATE_FLASHCARD_ORDER } from '../../../../../actions/types'
import { arrangmentOpt } from '../../../../../reducer/flashcardOptionsReducer'
import { RootReducerT } from '../../../../../store'

const RegModeOpts = ({ setFlashcardSettings, flashcardSettings, theme }) => {
  const dispatch = useDispatch()
  const flashcardOptions = useSelector((state: RootReducerT) => state.flashcardOptions)
  const bgColor = usePrimaryControlledColor(WhereToColor.fabActionContentBg, theme.colors.background)
  const switchSelectorsInfo = [
    { title: 'Number', initial: flashcardOptions.flashcardItemDisplayedFront[0].number, },
    { title: 'Person', initial: flashcardOptions.flashcardItemDisplayedFront[1].person, },
    { title: 'Action', initial: flashcardOptions.flashcardItemDisplayedFront[2].action, },
    { title: 'Object', initial: flashcardOptions.flashcardItemDisplayedFront[3].object, },
  ]


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

  const checkSpecificItem = (name) => {
    flashcardSettings.flashcardItemDisplayedFront.filter((item) => Object.keys(item)[0] === name)[0]
    return Object.values(checkSpecificItem)[0] ? 0 : 1
  }

  const onChangeArrangementSelector = (value: arrangmentOpt) =>
    setFlashcardSettings((prev) => ({ ...prev, flashcardOrder: value }))
  const onPressHandler = (name, whatSide) =>
    setWhatSideItemWillDisplay(name.toLowerCase(), whatSide)
  const save = () =>
    dispatch({ type: SAVED_FLASHCARD_SETTINGS_FROM_MODAL, payload: flashcardSettings })

  // const toggle = Object.values(checkSpecificItem)[0]
  console.log(flashcardOptions.flashcardOrder, 'flashcardOptions.flashcardOrder')

  return (
    <>
      {/* {currentScreen === tabScreens.Flashcards && */}
      <>
        {switchSelectorsInfo.map((item) => (
          <SelectorComp
            key={item.title}
            initial={item.initial}
            onPress={(whatSide) => onPressHandler(item.title, whatSide)}
            title={item.title}
            options={[
              { value: 'back', label: 'back' },
              { value: 'front', label: 'front' },
            ]}
          />
        ))}
        <SelectorComp
          initial={flashcardOptions.flashcardOrder === arrangmentOpt.random}
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

import { useDispatch, useSelector } from 'react-redux'
import {
  TOGGLE_EDIT_MODE,
  TOGGLE_FAB_VISIBILITY_TRUE,
  UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE,
} from '../../../actions/types'
import { tabScreens } from '../../../constants/constants'
import { fabActionOptions, fabOpt } from '../../../constants/fabConstants'
import { RootReducerT } from '../../../store'
import { navigationRef } from './useFabActionVariousProperties'

const useOnPressFabsHandlers = ({
  loading,
  currentFabProps,
  fabConsts,
  setLoading,
  setFlashcardSettings,
  flashcardSettings,
  sliderValueautoPlayFlashcardsDuration,
  currentScreen,
  fabActionContentRef,
  fabActionContentRef2,
  setCurrentFabProps,
  setShowNavigationIcons,
}) => {
  const dispatch = useDispatch()
  const editMode = useSelector((state: RootReducerT) => state.fabProperties.config.editMode)

  const handleOnPressGeneral = async () => {
    if (editMode) return dispatch({ type: TOGGLE_EDIT_MODE })
    if (loading) return
    if (
      currentFabProps.mainFab.icon === fabConsts.mainBtn.flashcardChangingSettings.icon.settings
    ) {
      console.log('qwe')
      setLoading(true)
      await setFlashcardSettings((prev) => ({
        ...prev,
        autoPlayFlashcards: {
          ...prev.autoPlayFlashcards,
          duration: sliderValueautoPlayFlashcardsDuration,
        },
      }))
      await dispatch({
        type: UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE,
        payload: flashcardSettings,
      })
      setLoading(false)
    }
    switch (currentFabProps.mainFab.mode) {
      case fabOpt.menuOpen.mode:
        console.log('qwe1')
        if (currentScreen === tabScreens.Flashcards) {
          if (!loading) {
            // fabActionContentRef.current.fadeOutUpBig()
            // fabActionContentRef2.current.fadeOutDownBig()
            setLoading(true)
            // await setTimeout(() => {
            setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //replace
            // dispatch({ type: TOGGLE_FAB_VISIBILITY_FALSE })
            setShowNavigationIcons(true)
            // }, 500);
            setLoading(false)
          }
        } else {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //replace
          // dispatch({ type: TOGGLE_FAB_VISIBILITY_FALSE })
          setShowNavigationIcons(true)
        }
        break
      case fabOpt.standby.mode:
        console.log('qwe2')
        if (currentScreen === tabScreens.Flashcards) {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen }) //REPLACE
          dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
          setShowNavigationIcons(false)
          setLoading(true)
          // setTimeout(() => {
          setLoading(false)
          // }, 1250);
        } else {
          setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen }) //REPLACE
          setShowNavigationIcons(false)
        }

        break
      case fabOpt.editMode.mode:
        console.log('qwe2')
        if (currentScreen === tabScreens.Flashcards) dispatch({ type: TOGGLE_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby }) //REPLACE
        // dispatch({ type: TOGGLE_FAB_VISIBILITY_TRUE })
        setShowNavigationIcons(true)

      default:
        break
    }
  }

  return { handleOnPressGeneral }
}

export default useOnPressFabsHandlers

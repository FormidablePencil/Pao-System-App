import { useState, useContext, useEffect } from "react"
import { PaoAppContext } from "../routes/TabNavigator"
import { fabModeOptions, fabProperties, fabActionOptions } from "../constants/fabConstants"

interface FAV {
  currentScreen: any
  setFabVisible: any
  currentMainFab: any
  setCurrentMainFab: any
  setFabAction: any
  fabAction: any
}

interface Returned {
  handleOnPressFabActions: any
  handleOnPressMainFab: any
}

export const useFavPaoTable = ({
  currentScreen,
  setFabVisible,
  currentMainFab,
  setCurrentMainFab,
  setFabAction,
  fabAction
}: FAV): Returned => {
  const fabOpt = {
    standby: { mode: fabModeOptions.standby, icon: fabProperties.mainBtn.menu.icon.menu, color: null },
    menuOpen: { mode: fabModeOptions.menuOpen, icon: fabProperties.mainBtn.menuOpen.icon.cards, color: null },
    editMode: { mode: fabModeOptions.editing, icon: fabProperties.mainBtn.edit.icon.pencil, color: fabProperties.editMode.color }
  }


  useEffect(() => {
    if (currentScreen >= 1) {
      setFabVisible(true)
    } else if (currentScreen === 2) {
      setFabVisible(false)
    }
  }, [currentScreen])


  const handleOnPressMainFab = () => {
    switch (currentMainFab.mode) {
      case fabModeOptions.menuOpen:
        setCurrentMainFab(fabOpt.standby)
        break;
      case fabModeOptions.standby:
        setCurrentMainFab(fabOpt.menuOpen)
        break;
      case fabModeOptions.editing:
        setFabAction({ ...fabAction, paotableEditMode: false })
        setCurrentMainFab(fabOpt.standby)
      default:
        break;
    }
  }

  //rgb

  const handleOnPressFabActions = (action: fabActionOptions) => {
    switch (action) {
      case fabActionOptions.paginationMode:
        // setFabAction({ ...fabAction, paginationMode: !fabAction.paginationMode })
        //~ scroll list crash the app once in a while so this feature is disabled for now
        break
      case fabActionOptions.paotableEditMode:
        setFabAction({ ...fabAction, paotableEditMode: true })
        setCurrentMainFab(fabOpt.editMode)
        break
      case fabActionOptions.flashcardModeAscending:
        setFabAction({ ...fabAction, flashcardMode: fabActionOptions.flashcardModeAscending })
        break
      case fabActionOptions.flashcardModedDescending:
        setFabAction({ ...fabAction, flashcardMode: fabActionOptions.flashcardModedDescending })
        break
      case fabActionOptions.flashcardModedScrambled:
        setFabAction({ ...fabAction, flashcardMode: fabActionOptions.flashcardModedScrambled })
        break

      default:
        break
    }
  }

  return {
    handleOnPressFabActions,
    handleOnPressMainFab
  }

}


import { useState, useContext, useEffect } from "react"
import { PaoAppContext } from "../routes/TabNavigator"
import { fabModeOptions, fabProperties, fabActionOptions } from "../constants/fabConstants"
import { tabScreens } from "../constants/constants"

interface FAV {
  setFabVisible: (item: any) => void
  currentMainFab: any
  setCurrentMainFab: (item: any) => void
  setFabAction: (item: any) => void
  fabAction: any
  currentScreen: any
  setCurrentFabActions: (item: any) => void
}

interface Returned {
  handleOnPressFabActions: (item: any) => void
  handleOnPressMainFab: () => void
}

export const useFavFunctions = ({
  setCurrentFabActions,
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

  const paoTableFabActions = [
    {
      style: { backgroundColor: fabProperties.editMode.color },
      icon: fabProperties.editMode.icon.pencil,
      label: fabProperties.editMode.mesg,
      onPress: () => handleOnPressFabActions(fabActionOptions.paotableEditMode)
    },
    {
      style: { backgroundColor: fabProperties.listMode.color },
      icon: fabProperties.listMode.wholeList.icon.list,
      label: fabAction.paginationMode ? fabProperties.listMode.wholeList.mesg : fabProperties.listMode.pagination.mesg,
      onPress: () => handleOnPressFabActions(fabActionOptions.paginationMode)
    },
    {
      style: { backgroundColor: fabProperties.arrangement.mainBtn.color },
      icon: fabProperties.arrangement.mainBtn.icon.arrangement,
      label: fabProperties.arrangement.mainBtn.mesg,
      onPress: () => { }
    },
  ]

  //This flashcards screen will use the model to change the settings/modes of the flashcards instead of fabAction.
  const flashcardFabActions = [
    {
      style: { backgroundColor: fabProperties.editMode.color },
      icon: fabProperties.editMode.icon.pencil,
      label: fabProperties.editMode.mesg,
      onPress: () => { }
    },
  ]


  useEffect(() => {
    switch (currentScreen) {

      case tabScreens.Paotable:
        setFabVisible(true)
        setCurrentFabActions(paoTableFabActions)
        break;
      case tabScreens.Flashcards:
        setFabVisible(true)
        setCurrentFabActions(flashcardFabActions)
        break;
      case tabScreens.Settings:
        setFabVisible(false)
        setCurrentFabActions([])
        break;

      default:
        break;
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


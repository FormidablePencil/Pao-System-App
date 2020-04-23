import React, { useEffect, useState, useContext } from 'react'
import { Portal, FAB } from 'react-native-paper'
import { PaoAppContext } from '../routes/TabNavigator'
import { fabProperties, fabModeOptions, fabActionOptions } from '../constants/fabConstants'
import { useFavPaoTable } from '../hooks/useFavPaoTable'
import { tabScreens } from '../constants/constants'


interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

const FabActionBtn = () => {
  const fabOpt = {
    standby: { mode: fabModeOptions.standby, icon: fabProperties.mainBtn.menu.icon.menu, color: null },
    menuOpen: { mode: fabModeOptions.menuOpen, icon: fabProperties.mainBtn.menuOpen.icon.cards, color: null },
    editMode: { mode: fabModeOptions.editing, icon: fabProperties.mainBtn.edit.icon.pencil, color: fabProperties.editMode.color }
  }
  const { currentScreen, fabAction, setFabAction } = useContext(PaoAppContext)
  const { fabVisibility, flashcardMode, paotableEditMode, paginationMode } = fabAction
  const [fabVisible, setFabVisible] = useState(true)
  const [currentMainFab, setCurrentMainFab] = useState<FabOptTypes>(fabOpt.standby)

  const { handleOnPressFabActions, handleOnPressMainFab } = useFavPaoTable({
    currentScreen,
    setFabVisible,
    currentMainFab,
    setCurrentMainFab,
    setFabAction,
    fabAction
  })

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

  const flashcardFabActions =
    [
      {
        style: { backgroundColor: fabProperties.editMode.color },
        icon: fabProperties.editMode.icon.pencil,
        label: fabProperties.editMode.mesg,
        onPress: () => handleOnPressFabActions(fabActionOptions.paotableEditMode)
      },
      {
        style: { backgroundColor: 'black' },
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
  // console.log(DefaultTheme.colors.accent, 'default')
  console.log(currentScreen)
  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 40 }} // later on, assertain of I could turn this into an aniamted component
        //@ts-ignore
        fabStyle={currentMainFab.color && { backgroundColor: currentMainFab.color }}
        visible={fabVisible}
        open={currentMainFab.mode === fabModeOptions.menuOpen}
        icon={currentMainFab.icon}
        actions={currentScreen === 0 ? paoTableFabActions : flashcardFabActions}
        onStateChange={() => { }}
        onPress={() => handleOnPressMainFab()} //@
      />
    </Portal>
  )
}

// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.accending.icon.triangleRightSideUp,
//   label: fabProperties.arrangement.accending.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.accending })
// },
// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.deccending.icon.triangleUpSideDown,
//   label: fabProperties.arrangement.deccending.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.deccending })
// },
// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.scrambledMode.icon.shuffle,
//   label: fabProperties.arrangement.scrambledMode.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.random })
// },


export default FabActionBtn

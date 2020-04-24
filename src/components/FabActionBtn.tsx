import React, { useEffect, useState, useContext } from 'react'
import { Portal, FAB } from 'react-native-paper'
import { PaoAppContext } from '../routes/TabNavigator'
import { fabProperties, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { useFavFunctions } from '../hooks/useFavFunctions'
import { tabScreens } from '../constants/constants'


interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

const FabActionBtn = () => {
  const { currentScreen, fabAction, setFabAction } = useContext(PaoAppContext)
  const { fabVisibility, flashcardMode, paotableEditMode, paginationMode } = fabAction
  const [fabVisible, setFabVisible] = useState(true)
  const [currentMainFab, setCurrentMainFab] = useState<FabOptTypes>(fabOpt.standby)
  const [currentFabActions, setCurrentFabActions] = useState([])

  const { handleOnPressFabActions, handleOnPressMainFab } = useFavFunctions({
    setCurrentFabActions,
    currentScreen,
    setFabVisible,
    currentMainFab,
    setCurrentMainFab,
    setFabAction,
    fabAction
  })


  // console.log(DefaultTheme.colors.accent, 'default')
  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 40 }} // later on, assertain of I could turn this into an aniamted component
        //@ts-ignore
        fabStyle={currentMainFab.color && { backgroundColor: currentMainFab.color }}
        visible={fabVisible}
        open={currentMainFab.mode === fabModeOptions.menuOpen}
        icon={currentMainFab.icon}
        actions={currentFabActions}
        onStateChange={() => { }}
        onPress={() => handleOnPressMainFab()} //@
        onPressBackground={() => setCurrentMainFab(fabOpt.standby)}
      />
    </Portal>
  )
}


export default FabActionBtn

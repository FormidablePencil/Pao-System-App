import React, { useState } from 'react'
import { Portal, Provider, FAB } from 'react-native-paper'
import { fabProperties, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes
  fabActions: any
}

const FabActionBtn = ({ whatFabProps, setModalOpen, editModeTrue, setEditModeTrue }) => {
  const [showHints, setShowHints] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const fabActions = {
    paoTableFabActions: [
      {
        style: { backgroundColor: fabProperties.goToFlashcards.color },
        icon: fabProperties.goToFlashcards.icon.card,
        label: fabProperties.goToFlashcards.mesg,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.goToFlashcards)
        }
      },
    ],
    flashcardFabActions: [
      {
        style: { backgroundColor: fabProperties.goToPaoList.color },
        icon: fabProperties.goToPaoList.icon.list,
        label: fabProperties.goToPaoList.mesg,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.goToPaoList)
        }
      },
    ],
    favListFabActions: [],
    sharedFabActions: [
      // {
      //   style: { backgroundColor: fabProperties.hint.color },
      //   icon: fabProperties.hint.icon.letterH,
      //   label: fabProperties.hint.mesg,
      //   onPress: () => { setShowHints(prev => !prev) }
      // },
      {
        style: { backgroundColor: fabProperties.editMode.color },
        icon: fabProperties.editMode.icon.pencil,
        label: fabProperties.editMode.mesg,
        onPress: () => {
          handleOnPressFabActions(fabActionOptions.editMode)
        }
      },
      {
        style: { backgroundColor: fabProperties.accountSettings.color },
        icon: fabProperties.accountSettings.icon.accountSettings,
        label: fabProperties.accountSettings.mesg,
        onPress: () => {
          navigation.navigate('ProfileScreen')
          handleOnPressGeneral()
        }
      },
      {
        style: { backgroundColor: fabProperties.settingOptions.color },
        icon: fabProperties.settingOptions.icon.settings,
        label: fabProperties.settingOptions.mesg,
        onPress: () => {
          setModalOpen()
          handleOnPressGeneral()
        }
      },
    ],
  }


  const [currentFabProps, setCurrentFabProps] = useState({
    mainFab: fabOpt.standby,
    // fabActions: 'sharedFabActions',
  })


  const handleOnPressGeneral = () => { //to redux
    switch (currentFabProps.mainFab.mode) {
      case fabOpt.menuOpen.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        break;
      case fabOpt.standby.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen })
        break;
      case fabOpt.editMode.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        setEditModeTrue(false)
      default:
        break;
    }

  }

  const handleOnPressFabActions = (whatFabAction) => { // to redux
    switch (whatFabAction) {
      case fabActionOptions.editMode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.editMode })
        // dispatch({ type: TOGGLE_EDIT_MODE })
        setEditModeTrue(true)
        break;

      case fabActionOptions.goToPaoList:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        navigation.navigate(tabScreens.Paotable)
        break;

      case fabActionOptions.goToFlashcards:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        navigation.navigate(tabScreens.Flashcards)
        break;

      default:
        break;
    }
  }
  // console.log(fabprop.keyword);
  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <Provider>
        <Portal>
          <FAB.Group
            // style={{ paddingBottom: 40 }} // later on, assertain of I could turn this into an aniamted component
            fabStyle={currentFabProps.mainFab.color && { backgroundColor: currentFabProps.mainFab.color }}
            visible={true}
            open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
            icon={currentFabProps.mainFab.icon}
            actions={[...fabActions.sharedFabActions, ...fabActions[whatFabProps]]}
            onStateChange={() => { }}
            onPress={() => handleOnPressGeneral()} //@
            onPressBackground={() => handleOnPressGeneral()}
          />
        </Portal>
      </Provider>
    </View>
  )
}


export default FabActionBtn

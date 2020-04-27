import React, { useEffect, useState, useContext } from 'react'
import { Portal, Provider, FAB } from 'react-native-paper'
import { PaoAppContext } from '../routes/StackNavigator'
import { fabProperties, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import useFabFunctions from '../hooks/useFabFunctions'
import { Text, View } from 'react-native'
import { useNavigationState } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_FAB_VISIBILITY, TOGGLE_CONFIGURATION_EDIT_MODE, UPDATE_MAIN_FAB_PROPERTIES } from '../actions/types'
import { TabNavContext } from '../routes/TabNavigator'



interface FabOptTypes {
  mode: number
  icon: string
  color: string | null
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes
  fabActions: any
}

const FabActionBtn = ({ navigation }) => {
  const { currentScreen, tabScreenOptions: { screen }, setTabScreenOptions, tabScreenOptions } = useContext(PaoAppContext)
  const { modalOpen, setModalOpen } = useContext(TabNavContext)

  const fabActions = {
    paoTableFabActions: [],
    flashcardFabActions: [{
      style: { backgroundColor: fabProperties.editMode.color },
      icon: fabProperties.editMode.icon.pencil,
      label: fabProperties.editMode.mesg,
      onPress: () => {
        handleOnPressFabActions(fabActionOptions.editMode)
      }
    },],
    favListFabActions: [],
    sharedFabActions: [
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
      {
        style: { backgroundColor: fabProperties.hint.color },
        icon: fabProperties.hint.icon.letterH,
        label: fabProperties.hint.mesg,
        onPress: () => { }
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
        // dispatch({ type: UPDATE_MAIN_FAB_PROPERTIES, payload: fabOpt.standby })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        break;
      case fabOpt.standby.mode:
        // dispatch({ type: UPDATE_MAIN_FAB_PROPERTIES, payload: fabOpt.menuOpen })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen })
        break;
      case fabOpt.editMode.mode:
        // dispatch({ type: UPDATE_MAIN_FAB_PROPERTIES, payload: fabOpt.standby })
        // dispatch({ type: TOGGLE_CONFIGURATION_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        setTabScreenOptions({ ...tabScreenOptions, config: { ...tabScreenOptions.config, editMode: false } })
      default:
        break;
    }

  }

  const handleOnPressFabActions = (whatFabAction) => { // to redux
    switch (whatFabAction) {
      case fabActionOptions.editMode:
        // dispatch({ type: TOGGLE_FAB_VISIBILITY })
        // dispatch({ type: TOGGLE_CONFIGURATION_EDIT_MODE })
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.editMode })
        setTabScreenOptions({ ...tabScreenOptions, config: { ...tabScreenOptions.config, editMode: true } })
        break;

      default:
        break;
    }
  }

  // console.log(tabScreenOptions.mainFabProperties)
  // console.log(tabScreenOptions.mainFabProperties.mode)
  // console.log(fabModeOptions.menuOpen)
  // console.log(fabOpt.menuOpen)
  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 50 }}>
      <Provider>
        <Portal>
          {/* <Text>test123</Text> */}
          {tabScreenOptions.mainFabProperties &&
            <FAB.Group
              style={{ paddingBottom: 40 }} // later on, assertain of I could turn this into an aniamted component
              fabStyle={currentFabProps.mainFab.color && { backgroundColor: currentFabProps.mainFab.color }}
              visible={tabScreenOptions.fabVisibility}
              open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
              icon={currentFabProps.mainFab.icon}
              actions={fabActions[tabScreenOptions.keyword]}
              onStateChange={() => { }}
              onPress={() => handleOnPressGeneral()} //@
              onPressBackground={() => handleOnPressGeneral()}
            />
          }

        </Portal>
      </Provider>
    </View>
  )
}


export default FabActionBtn

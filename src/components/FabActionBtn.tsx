import React, { useEffect, useState, useContext } from 'react'
import { Portal, Provider, FAB } from 'react-native-paper'
// import { PaoAppContext } from '../routes/StackNavigator'
import { fabProperties, fabModeOptions, fabActionOptions, fabOpt } from '../constants/fabConstants'
import { tabScreens } from '../constants/constants'
import useFabFunctions from '../hooks/useFabFunctions'
import { Text, View } from 'react-native'
import { useNavigationState } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_FAB_VISIBILITY, TOGGLE_CONFIGURATION_EDIT_MODE, UPDATE_MAIN_FAB_PROPERTIES, TOGGLE_EDIT_MODE } from '../actions/types'
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
  // const { setTabScreenOptions, tabScreenOptions } = useContext(PaoAppContext)
  const fabprop = useSelector((state: any) => state.fabProperties)


  const { setModalOpen } = useContext(TabNavContext)
  const dispatch = useDispatch()

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
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        break;
      case fabOpt.standby.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.menuOpen })
        break;
      case fabOpt.editMode.mode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.standby })
        dispatch({ type: TOGGLE_EDIT_MODE })
      default:
        break;
    }

  }

  const handleOnPressFabActions = (whatFabAction) => { // to redux
    switch (whatFabAction) {
      case fabActionOptions.editMode:
        setCurrentFabProps({ ...currentFabProps, mainFab: fabOpt.editMode })
        dispatch({ type: TOGGLE_EDIT_MODE })
        break;

      default:
        break;
    }
  }
// console.log(fabActions[fabprop.keyword]);
  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 50 }}>
      <Provider>
        <Portal>
          {/* <Text>test123</Text> */}
          {fabprop.fabVisibility &&
            <FAB.Group
              style={{ paddingBottom: 40 }} // later on, assertain of I could turn this into an aniamted component
              fabStyle={currentFabProps.mainFab.color && { backgroundColor: currentFabProps.mainFab.color }}
              visible={fabprop.fabVisibility}
              open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
              icon={currentFabProps.mainFab.icon}
              actions={fabActions[fabprop.keyword]}
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

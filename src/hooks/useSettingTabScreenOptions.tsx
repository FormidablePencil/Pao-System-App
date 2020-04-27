import { useEffect, useContext } from "react";
import { useNavigationState } from "@react-navigation/native";
import { PaoAppContext } from "../routes/StackNavigator";
import { tabScreens } from '../constants/constants'
import { useDispatch } from "react-redux";
import { UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE } from "../actions/types";
import { fabOpt, enumFabAction } from "../constants/fabConstants";

const useSettingTabScreenOptions = () => {
  const { index } = useNavigationState(state => state);
  const { setTabScreenOptions } = useContext(PaoAppContext)
  // const dispatch = useDispatch()



  useEffect(() => {
    // let payload
    switch (index) {

      case 0:
        // payload = {
        //   fabVisibility: true,
        //   screen: tabScreens.Paotable,
        //   config: { editMode: false, pagination: true },
        //   keyword: null,
        //   mainFabProperties: null //! up the default here as well
        // }
        // dispatch({ type: UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE, payload })

        setTabScreenOptions({
          fabVisibility: true,
          screen: tabScreens.Paotable,
          config: { editMode: false, pagination: true, showHints: false },
          keyword: enumFabAction.sharedFabActions,
          mainFabProperties: fabOpt.standby
        })
        break;

      case 1:
        // payload = {
        //   fabVisibility: true,
        //   screen: tabScreens.Flashcards,
        //   config: { editMode: false, pagination: true },
        //   keyword: null,
        //   mainFabProperties: null //! up the default here as well
        // }
        // dispatch({ type: UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE, payload })

        setTabScreenOptions({
          fabVisibility: true,
          screen: tabScreens.Flashcards,
          config: { editMode: false, pagination: true, showHints: false },
          keyword: enumFabAction.sharedFabActions,
          mainFabProperties: fabOpt.standby
        })
        break;

      case 2:
        // payload = {
        //   fabVisibility: true,
        //   screen: tabScreens.FavList,
        //   config: { editMode: false, pagination: true },
        //   keyword: null,
        //   mainFabProperties: null //! up the default here as well
        // }
        // dispatch({ type: UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE, payload })

        setTabScreenOptions({
          fabVisibility: true,
          screen: tabScreens.FavList,
          config: { editMode: false, pagination: true, showHints: false },
          keyword: enumFabAction.sharedFabActions,
          mainFabProperties: fabOpt.standby
        })
        break;

      default:
        break;
    }

  }, [index])

}


export default useSettingTabScreenOptions

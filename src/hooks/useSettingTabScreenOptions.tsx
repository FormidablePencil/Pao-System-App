import { useEffect } from "react";
import { useNavigationState, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { PAOTABLE_SCREEN_SETTINGS, FLASHCARDS_SCREEN_SETTINGS } from "../actions/types";
import { tabScreens } from "../constants/constants";

const useSettingTabScreenOptions = () => {
  // const navigationState = useNavigationState(state => state)
  const route = useRoute()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!route.state) return
    console.log(route.state);
    console.log('route', 'passed');
    // if (!navigationState.routes[0].state.index) return
    // if (!navigationState.routes[0].state.index) return

    // if (navigationState.routes[0].state.index === 0) dispatch({ type: PAOTABLE_SCREEN_SETTINGS })
    // if (navigationState.routes[0].state.index === 1) dispatch({ type: FLASHCARDS_SCREEN_SETTINGS })
  }, [route])

}


export default useSettingTabScreenOptions

import { useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { PAOTABLE_SCREEN_SETTINGS, FLASHCARDS_SCREEN_SETTINGS } from "../actions/types";

const useSettingTabScreenOptions = () => {
  const { index } = useNavigationState(state => state);
  const dispatch = useDispatch()

  useEffect(() => {
    if (index === 0) dispatch({ type: PAOTABLE_SCREEN_SETTINGS })
    if (index === 0) dispatch({ type: FLASHCARDS_SCREEN_SETTINGS })
  }, [index])

}


export default useSettingTabScreenOptions

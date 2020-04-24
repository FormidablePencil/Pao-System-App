import { useEffect, useContext } from "react";
import { useNavigationState } from "@react-navigation/native";
import { PaoAppContext } from "../routes/TabNavigator";
import { tabScreens } from '../constants/constants'

const useSaveScreenIndex = () => {
  const state = useNavigationState(state => state);
  const { setCurrentScreen } = useContext(PaoAppContext)

  useEffect(() => {
    setTimeout(() => {
      useSaveScreen()
    }, 100)
  }, [state])

  const useSaveScreen = () => {
    switch (state.index) {

      case 0:
        setCurrentScreen(tabScreens.Paotable)
        break;
      case 1:
        setCurrentScreen(tabScreens.Flashcards)
        break;
      case 2:
        setCurrentScreen(tabScreens.Settings)
        break;

      default:
        break;
    }

  }


}

export default useSaveScreenIndex

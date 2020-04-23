import { useEffect, useContext } from "react";
import { useNavigationState } from "@react-navigation/native";
import { PaoAppContext } from "../routes/TabNavigator";

const useSaveScreenIndex = () => {
  const state = useNavigationState(state => state);
  const { currentScreen, setCurrentScreen } = useContext(PaoAppContext)

  useEffect(() => {
    setTimeout(() => {
      console.log('1232133121232131232@@@@')
      setCurrentScreen(state.index)
    }, 100)
  }, [state])

}

export default useSaveScreenIndex

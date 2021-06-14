import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { tabScreens } from "../constants/constants";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import usePrimaryControlledColor, {
  WhereToColor,
} from "../hooks/usePrimaryControlledColor";
import LogoBtnImg from "./LogoBtnImg";
import { useSelector } from "react-redux";
import { RootReducerT } from "../store";
import { PaoThemeType } from "../styles/theming";

const NavigateToPaoTable = ({ tableReady, showNavigationIcons }) => {
  const study = useSelector((state: RootReducerT) => state.study);
  const navigation = useNavigation();
  const route = useRoute();
  const theme: PaoThemeType = useTheme();

  const bgColor =
    route.name === tabScreens.Flashcards
      ? usePrimaryControlledColor(WhereToColor.screenHeaderBack)
      : "transparent";

  const onPressHandler = () => navigation.navigate(tabScreens.Paotable);

  const btnBgColor = study.study ? theme.colors.accent : "transparent";

  return (
    //spin animation!
    <>
      {showNavigationIcons && route.name === tabScreens.Flashcards ? (
        <TouchableRipple
          style={{
            ...styles.navigationBtn,
            backgroundColor: bgColor ?? "transparent",
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          disabled={route.name !== tabScreens.Flashcards}
          onPress={() => onPressHandler()}
        >
          <AntDesign
            size={20}
            style={{
              marginHorizontal: 15,
              color: "white",
              transform: [{ scaleX: -1 }],
            }}
            name="arrowright"
          />
        </TouchableRipple>
      ) : (
        <LogoBtnImg />
      )}
    </>
  );
};

export const NavigateToFlashcards = ({ tableReady, showNavigationIcons }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const bgColor =
    route.name === tabScreens.Paotable
      ? usePrimaryControlledColor(WhereToColor.screenHeaderBack)
      : null;

  const onPressHandler = () => navigation.navigate(tabScreens.Flashcards);
  return (
    <>
      {showNavigationIcons && (
        <TouchableRipple
          style={{
            ...styles.navigationBtn,
            backgroundColor: bgColor ?? "transparent",
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          disabled={route.name !== tabScreens.Paotable}
          onPress={onPressHandler}
        >
          {
            route.name === tabScreens.Paotable ? (
              <AntDesign
                size={20}
                style={{ marginHorizontal: 15, color: "white" }}
                name="arrowright"
              />
            ) : (
              <LogoBtnImg />
            )
            // <Image style={{ resizeMode: 'contain', height: 20, width: 20, marginHorizontal: 15, }} source={playingCards} />
          }
        </TouchableRipple>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navigationBtn: {
    zIndex: 40,
    marginTop: 5,
    padding: "10px 0px",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NavigateToPaoTable;


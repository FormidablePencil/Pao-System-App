import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const scaleStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { transform: [{ scale: 0.8 }], marginLeft: -8 }
    : {};

const paddingStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { marginTop: -3, marginBottom: -3 }
    : { marginTop: 3, marginBottom: 3 };

const dividerMarginsStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { marginTop: 15, marginBottom: 15 }
    : { marginTop: 30, marginBottom: 30 };

const saveBtnStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { marginTop: 10, width: "100%" }
    : { marginTop: 30 };

export { scaleStyles, paddingStyles, dividerMarginsStyles, saveBtnStyles };

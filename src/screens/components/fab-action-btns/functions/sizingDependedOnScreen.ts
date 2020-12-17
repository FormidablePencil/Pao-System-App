import { Dimensions } from "react-native"

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const scaleStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { transform: [{ scale: .8 }] }
    : {}

const paddingStyles = () =>
  SCREEN_WIDTH < 380 || SCREEN_HEIGHT < 750
    ? { marginTop: -3, marginBottom: -3, }
    : { marginTop: 3, marginBottom: 3, }

export { scaleStyles, paddingStyles }
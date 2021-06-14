import React, { useEffect, useState } from "react";
import { Button, useTheme, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/authActions";
import useHandleSystemMesgAuth from "../hooks/useHandleSystemMesgAuth";
import {
  LayoutAnimation,
  Animated,
  Slider,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { PaoThemeType } from "../styles/theming";
import { SAVE_CONTROLLED_THEME_COLOR } from "../actions/types";

const AppInfo = ({ navigation }: any) => {
  const controlledThemeColor = useSelector(
    (state: any) => state.controlledThemeColor
  );
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const loading = useSelector((state: any) => state.systemMessages.loading);
  const { userSignedOut } = useHandleSystemMesgAuth();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [themeControllerValue, setThemeControllerValue] = useState(
    controlledThemeColor
  );
  const dispatch = useDispatch();
  const theme: PaoThemeType = useTheme();

  useEffect(() => {
    if (userSignedOut === true || userSignedOut === false) {
      setLoadingComplete(true);
      setTimeout(() => {
        navigation.navigate("WelcomeScreen");
      }, 1150);
    }
  }, [userSignedOut]);

  useEffect(() => {
    if (controlledThemeColor === null) setThemeControllerValue(0.5);
    else setThemeControllerValue(controlledThemeColor);
  }, []);

  const handleOnPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(signOut({ refreshToken }));
  };
  const sliderOnValueChangeHandler = (value) =>
    dispatch({ type: SAVE_CONTROLLED_THEME_COLOR, payload: value });

  const onSlideCompleteHanlder = () => {
    if (controlledThemeColor === null) setThemeControllerValue(0.5);
    else setThemeControllerValue(controlledThemeColor);
  };

  const switchOnValueChangeHander = () => {
    if (!controlledThemeColor) {
      dispatch({
        type: SAVE_CONTROLLED_THEME_COLOR,
        payload: themeControllerValue,
      });
    } else {
      setThemeControllerValue(controlledThemeColor);
      dispatch({ type: SAVE_CONTROLLED_THEME_COLOR, payload: null });
    }
  };

  return (
    <View style={styles.container}>
      {/* //~ this will control the darkness of the app. Only applicable to plain mode */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Animated.Text style={{ color: "white" }}>
          Control theme opacity
        </Animated.Text>
        <Switch
          value={controlledThemeColor ? true : false}
          onValueChange={() => switchOnValueChangeHander()}
        />
      </View>
      <Slider
        value={themeControllerValue}
        disabled={controlledThemeColor ? false : true}
        onValueChange={(value) => {
          sliderOnValueChangeHandler(value);
        }}
        style={{ width: 200, height: 40 }}
        minimumValue={0.05}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor={theme.colors.accent}
        onSlidingComplete={() => onSlideCompleteHanlder()}
      />
      <Button
        loading={loading}
        mode="contained"
        icon={loadingComplete && "check"}
        onPress={() => handleOnPress()}
        style={{ marginTop: 30 }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 40,
  },
});

export default AppInfo;

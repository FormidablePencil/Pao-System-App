import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Keyboard,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { comps, tabScreens } from "../constants/constants";

import { withTheme } from "react-native-paper";
import { PaoThemeType } from "../styles/theming";
import useUserAuthentication, {
  form_res_msg,
} from "../hooks/useUserAuthentication";
import { useNavigation } from "@react-navigation/native";
import { reusableStyles } from "../styles/global";
// import { Ionicons } from "@expo/vector-icons";

interface propertyTypes {
  enteringMethod: number;
  setEnteringMethod: any;
  theme: PaoThemeType;
}
export type DefaultInputedValuesTypes = {
  email: string;
  username: string;
  password: string;
};
export enum LoadingTypes {
  notLoading = "not loading",
  loading = "loading",
  success = "successful",
}

const InputFieldsComp = ({
  enteringMethod,
  setEnteringMethod,
  theme,
}: propertyTypes) => {
  const { validate_inputs } = useUserAuthentication();
  const [loading, setLoading] = useState<LoadingTypes>(LoadingTypes.notLoading);
  const defaultInputedValues = {
    email: "",
    username: "Dennis",
    password: "Dennis",
  };
  const [inputedValues, setInputedValues] = useState<DefaultInputedValuesTypes>(
    defaultInputedValues
  );
  const [errorMsg, setErrorMsg] = useState<form_res_msg>(form_res_msg.no_err);
  let error_text_anim = useRef(null);
  const navigation = useNavigation();

  enum onPress {
    goBack,
    enter,
  }

  const onPressHandler = async (action: onPress) => {
    switch (action) {
      case onPress.goBack:
        setEnteringMethod(comps.enterOptions);
        await Keyboard.dismiss();
        break;
      case onPress.enter:
        if (errorMsg === form_res_msg.invalid_credentials) {
          error_text_anim.current.bounce();
          return;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLoading(LoadingTypes.loading);
        await validate_user();
        break;

      default:
        break;
    }
  };

  const validate_user = async () => {
    const response = await validate_inputs(inputedValues, enteringMethod);
    if (
      response === form_res_msg.signed_in ||
      response === form_res_msg.signed_up
    ) {
      await Keyboard.dismiss();
      setLoading(LoadingTypes.success);
      setTimeout(async () => {
        await navigation.navigate(tabScreens.Flashcards);
        setLoading(LoadingTypes.notLoading);
      }, 1250);
    } else {
      setErrorMsg(response);
    }
  };

  const onChangeHandler = async (text, whatInput) => {
    setErrorMsg(form_res_msg.no_err);
    await setInputedValues({ ...inputedValues, [whatInput]: text });
  };

  return (
    <View>
      <Animatable.Text
        ref={error_text_anim}
        animation={errorMsg !== form_res_msg.no_err && "bounce"}
        duration={1000}
        style={styles.errorMessage}
      >
        {errorMsg !== form_res_msg.no_err && errorMsg}
      </Animatable.Text>

      <TextInput
        style={styles.styledTextInput}
        multiline={false}
        underlineColor={theme.colors.primary}
        mode={"flat"}
        label={"username"}
        value={inputedValues.username}
        onChangeText={(text: any) => onChangeHandler(text, "username")}
        keyboardType={"default"}
        error={
          errorMsg !== form_res_msg.no_err && inputedValues.username === ""
            ? true
            : false
        }
      />
      <TextInput
        style={styles.styledTextInput}
        multiline={false}
        underlineColor={theme.colors.primary}
        mode={"flat"}
        label={"password"}
        value={inputedValues.password}
        secureTextEntry={true}
        onChangeText={(text: any) => onChangeHandler(text, "password")}
        keyboardType={"default"}
        error={
          errorMsg !== form_res_msg.no_err && inputedValues.password === ""
            ? true
            : false
        }
      />

      {enteringMethod === comps.signup ? (
        <TextInput
          style={styles.styledTextInput}
          multiline={false}
          underlineColor={theme.colors.primary}
          mode={"flat"}
          label={"email"}
          value={inputedValues.email}
          secureTextEntry={true}
          onChangeText={(text: any) => onChangeHandler(text, "email")}
          keyboardType={"email-address"}
          error={
            errorMsg !== form_res_msg.no_err && inputedValues.email === ""
              ? true
              : false
          }
        />
      ) : null}

      <View style={styles.bottomSection}>
        <Button
          style={styles.styledButton}
          contentStyle={{ height: theme.btnHeight.large }}
          mode="contained"
          onPress={() => onPressHandler(onPress.goBack)}
        >
          {/* <View style={styles.ioniconsStyled} name="ios-arrow-round-back" color="white" size={20} />{" "} */}
          <View style={styles.ioniconsStyled} />{" "}
          <Text style={reusableStyles.whiteText}>Back</Text>
        </Button>
        <Button
          style={styles.styledButton}
          contentStyle={{ height: theme.btnHeight.large }}
          mode="contained"
          onPress={() => onPressHandler(onPress.enter)}
          loading={loading === LoadingTypes.loading ? true : false}
          icon={loading === LoadingTypes.success && "check"}
        >
          <Text style={reusableStyles.whiteText}>{comps[enteringMethod]}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 15,
    color: "white",
    top: -25,
    width: "100%",
    textAlign: "center",
    position: "absolute",
  },
  styledTextInput: {
    backgroundColor: "#fff",
    // borderRadius: 15,
    // margin: "10px 0px",
    overflow: "hidden",
  },
  ioniconsStyled: {
    // margin: "0 0 20px",
  },
  styledButton: {
    margin: 2,
    flex: 1,
  },
  bottomSection: {
    marginTop: 10,
    flexDirection: "row",
  },
});

// const View style={styles.ioniconsStyled} = styled<any>(Ionicons)`

export default withTheme(InputFieldsComp);

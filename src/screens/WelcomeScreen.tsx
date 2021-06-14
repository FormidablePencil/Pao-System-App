import React, { useState, useEffect, createContext, useRef } from "react";
import { StyleSheet } from "react-native";
import RenderEnterComps from "../components/RenderEnterComps";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  ImageBackground,
  Dimensions,
  Keyboard,
  LayoutAnimation,
} from "react-native";
import useLogoAnimation from "../components/useLogoAnimation";
import paoLogo from "../assets/playing-cards-png-11-original.png";
import bgImg from "../assets/imgs/julius-drost-C8wlYF8ubBo-unsplash.jpg";
import { createAnimatableComponent } from "react-native-animatable";
import { Text, withTheme } from "react-native-paper";
import { PaoThemeType } from "../styles/theming";

export const EnterMethodContext = createContext();
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface WelcomeScreenTypes {
  navigation: any;
  theme: PaoThemeType;
}

const WelcomeScreen = ({ navigation, theme }: WelcomeScreenTypes) => {
  const [showSpinningImg, setShowSpinningImg] = useState(true);
  const { interpolatingSpinAnim, interpolationOpacity } = useLogoAnimation({
    showSpinningImg,
  });
  let headerTextRef = useRef(null);
  // let interpolatingSpinAnim = useRef(new Animated.Value(0)).current
  //! change color of logo perhaps

  useEffect(() => {
    const keyboardShowed = Keyboard.addListener("keyboardDidShow", () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setShowSpinningImg(false);
    });
    const keyboardHid = Keyboard.addListener("keyboardDidHide", () =>
      setShowSpinningImg(true)
    );
    return () => {
      keyboardShowed.remove();
      keyboardHid.remove();
    };
  });

  return (
    <EnterMethodContext.Provider>
      <ImageBackground
        style={{
          backgroundColor: "black",
          flex: 1,
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        source={bgImg}
      >
        <LinearGradient
          colors={["rgba(76,0,157,.25)", "rgba(255,0,0,.3)"]}
          end={[1, 1]}
          start={[0.1, 0.8]}
        >
          <View style={styles.container}>
            <View style={styles.headerView}>
              <AnimatedHeaderText
                ref={headerTextRef}
                style={{
                  fontFamily: theme.fonts.largeHeader.fontFamily,
                  textShadowRadius: 10,
                  color: "white",
                  fontSize: 40,
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                }}
              >
                Pao System
              </AnimatedHeaderText>
            </View>

            <View
              style={{
                flex: 3.2,
                width: "100%",
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <RenderEnterComps />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </EnterMethodContext.Provider>
  );
};

export default withTheme(WelcomeScreen);

const styles = StyleSheet.create({
  image: {
    height: 120,
    position: "absolute",
    top: "35%",
    resizeMode: "contain",
    width: 120,
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  headerView: {
    alignItems: "center",
    color: "white",
    flex: 2,
    justifyContent: "flex-end",
  },
  headerText: {
    color: "#CAC8FF",
    fontSize: 60,
  },
  linearGradient: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});

const AnimatedHeaderText = createAnimatableComponent(Text);

import React, { Component, useState, useRef, useContext } from 'react';
import { View, Text } from 'react-native-tailwind';
import { Image, Modal, Button, Animated, StyleSheet, Easing } from 'react-native';
import { globalStyles } from '../styles/global'
import Icon from "react-native-vector-icons/MaterialIcons";
import OptionsModal from '../components/OptionsModal';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import OptionsBtn from '../components/OptionsBtn';
import { PaoAppContext } from '../routes/TabNavigator';
import Flashcard from '../components/Flashcard';

export const FlashcardsScreen = () => {

  const func = (someString: string): void => {
    console.log(`hello, name's ${someString}`);
  };
  func('Grey')
  console.log('dd');

  return (
    <View className="w-full h-full flex flex-row justify-center">
      <OptionsModal />
      <View className="relative bg-blue-lightest" style={globalStyles.centerEverything}>
        <OptionsBtn />
        <Flashcard />
      </View>
    </View>
  )
}

export default FlashcardsScreen
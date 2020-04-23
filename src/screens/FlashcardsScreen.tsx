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
import { FAB, Portal, Provider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { fabActions } from '../constants/constants';

export const FlashcardsScreen = () => {
  const { modalOpen, setModalOpen, fabVisible, setFabVisible } = useContext(PaoAppContext)
  const paoList = useSelector((state: any) => state.paoList)
  const [flashcardMode, setFlashcardMode] = useState(fabActions.accending)

  const func = (someString: string): void => {
    console.log(`hello, name's ${someString}`);
  };
  func('Grey')
  console.log('dd');
  // _onStateChange = ({ open }) => this.setState({ open });
  // const { open } = this.state;

  return (
    // <Provider>
    <View className="w-full h-full flex flex-row justify-center">
      <OptionsModal />
      <View className="relative" style={globalStyles.centerEverything}>
        <Flashcard flashcardMode={flashcardMode} />

        

      </View>
    </View>
    // </Provider>
  )
}





export default FlashcardsScreen
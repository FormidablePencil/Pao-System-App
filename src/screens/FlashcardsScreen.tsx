import React from 'react';
import { View } from 'react-native-tailwind';
import { globalStyles } from '../styles/global'
// import OptionsModal from '../components/OptionsModal';
// import FlashcardSwiper from '../components/FlashcardSwiper';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components';
// import { TabNavContext } from '../routes/TabNavigator'

//@ts-ignore

export const FlashcardsScreen = () => {


  return (
    <>
      {/* <OptionsModal /> */}
      <View className="w-full h-full flex flex-row justify-center">
        <View className="relative" style={globalStyles.centerEverything}>
          {/* <FlashcardSwiper /> */}
        </View>
      </View>
    </>
  )
}

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 30;
`;




export default FlashcardsScreen
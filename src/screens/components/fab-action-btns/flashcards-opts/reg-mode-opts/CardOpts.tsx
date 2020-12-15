import React from 'react'
import { Dimensions, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Headline, useTheme } from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';
import { View } from 'react-native-tailwind'
import { tabScreens } from '../../../../../constants/constants';
import usePrimaryControlledColor, { WhereToColor } from '../../../../../hooks/usePrimaryControlledColor';
import { PaoThemeType } from '../../../../../styles/theming';
import { capitalizeFirstCharFunc } from '../../../../../components/logic/logic';

const SCREEN_WIDTH = Dimensions.get('window').width

const CardOpts = ({
  fabActionContentRef,
  currentScreen,
  switchSelectorsInfo,
  flashcardSettings,
  bgColor,
  setWhatSideItemWillDisplay
}) => {
  const theme: PaoThemeType = useTheme()

  const onPressHandler = (name, whatSide) => setWhatSideItemWillDisplay(name, whatSide)

  return (
    <Animatable.View
      useNativeDriver
      ref={fabActionContentRef}
      animation='fadeInRightBig'
      style={{ margin: 8, alignItems: 'center', }}>
      <View className="flex flex-col justify-center" style={{ borderRadius: 25, backgroundColor: bgColor, padding: 20, marginVertical: 10 }}>

        {currentScreen === tabScreens.Flashcards &&
          <>
            {switchSelectorsInfo.map((collection, index) => {
              const specificItem = flashcardSettings.flashcardItemDisplayedFront.filter(item => Object.keys(item)[0] === collection.name)[0]
              const toggle = Object.values(specificItem)[0]
              const switchBtnSelected = usePrimaryControlledColor(WhereToColor.switchBtnSelected, theme.colors.primary)
              return (
                <View style={{ width: SCREEN_WIDTH / 2 }} key={index}>
                  <Headline style={{ color: 'white', alignSelf: 'center' }}>{capitalizeFirstCharFunc(collection.name)}</Headline>
                  <SwitchSelector
                    // paddingSwitch={10}
                    selectedTextStyle={{ height: 30, fontFamily: 'MontserratReg' }}
                    textStyle={{ height: 30, fontFamily: 'MontserratReg', color: switchBtnSelected }}
                    height={30}
                    initial={toggle ? 0 : 1}
                    onPress={whatSide => onPressHandler(Object.values(collection)[0], whatSide)}
                    // textControlledColor={theme.colors.primary}
                    buttonColor={switchBtnSelected}
                    borderColor={switchBtnSelected}
                    animationDuration={500}
                    hasPadding
                    fontSize={20}
                    options={[
                      { value: 'front', label: "front" },
                      { value: 'back', label: "back" }
                    ]}
                  />
                </View>
              )
            })}
          </>
        }
      </View>
    </Animatable.View>
  )
}

export default CardOpts
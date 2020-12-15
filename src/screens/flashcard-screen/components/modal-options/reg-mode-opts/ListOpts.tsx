import React from 'react'
import { Dimensions, Text } from 'react-native'
import { View } from 'react-native-tailwind'
import * as Animatable from 'react-native-animatable';
import { Button, Headline, useTheme } from 'react-native-paper';
import usePrimaryControlledColor, { textControlledColor, WhereToColor } from '../../../../../hooks/usePrimaryControlledColor';
import { PaoThemeType } from '../../../../../styles/theming';
import { UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE } from '../../../../../actions/types';
import { useDispatch } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width

const ListOpts = ({
  bgColor,
  fabActionContentRef2,
  flashCardOrderBtnPayload,
  flashcardSettings,
  setFlashcardSettings,
}) => {
  const theme: PaoThemeType = useTheme()
  const dispatch = useDispatch()

  const onPressHandler = (payload) =>
    setFlashcardSettings(prev => ({ ...prev, flashcardOrder: payload }))

  const onPressSaveChanges = () =>
    dispatch({ type: UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE, payload: flashcardSettings })


  return (
    <>
      <Animatable.View
        useNativeDriver
        ref={fabActionContentRef2}
        animation='fadeInLeftBig'
        style={{ margin: 8, alignItems: 'center' }}>
        <View style={{ borderRadius: 25, backgroundColor: bgColor, padding: 20, marginVertical: 10, width: SCREEN_WIDTH / 1.7 }}>
          <Headline style={{ color: 'white', alignSelf: 'center' }}>Order: </Headline>
          {flashCardOrderBtnPayload.map((collection, index) => {
            //~ could have avoided this inline theming mess if simply used useTheme.
            const btnSelectedColor = usePrimaryControlledColor(WhereToColor.orderBtnSelected, theme.colors.primary)
            const btnArrangmentColor = flashcardSettings.flashcardOrder === collection.arrangementOption ? btnSelectedColor : 'white'
            const uncontrolledTextColor = flashcardSettings.flashcardOrder === collection.arrangementOption ? 'white' : theme.colors.primary
            const controlledTextColor = textControlledColor().color
            const controlledTextColorSwitchBetweenWhiteBlack = flashcardSettings.flashcardOrder === collection.arrangementOption ? 'white' : controlledTextColor
            const textColor = controlledTextColorSwitchBetweenWhiteBlack ?? uncontrolledTextColor
            return (
              <View key={index}>
                <Button
                  style={{ margin: 2, elevation: 0 }}
                  color={btnArrangmentColor}
                  mode={'contained'}
                  uppercase={false}
                  onPress={() => onPressHandler(collection.arrangementOption)}>
                  <Text style={{ color: textColor, fontSize: 15 }}>
                    {collection.order}
                  </Text>
                </Button>
              </View>
            )
          })}
        </View>
      </Animatable.View>
      <Button
        onPress={onPressSaveChanges}
        uppercase={false} mode='contained'
        style={{ backgroundColor: theme.colors.primary, borderRadius: 15 }}>
        <Text style={{ color: 'white', fontSize: 15 }}
        >Save changed</Text>
      </Button>
    </>
  )
}

export default ListOpts

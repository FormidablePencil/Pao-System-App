import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions, Animated, TouchableHighlight, Easing, LayoutAnimation, TouchableOpacity, Text } from 'react-native'
import { Portal, Provider, TouchableRipple, useTheme } from 'react-native-paper'
import { tabScreens } from '../../../constants/constants'
import { fabModeOptions } from '../../../constants/fabConstants'
import useCheckAmountOfPaoFilled from '../../../hooks/useCheckAmountOfPaoFilled'
import { PaoThemeType } from '../../../styles/theming'
import FlashcardsOptsModal from './flashcards-opts'
import PaoTableOptsModal from './paotable-opts/PaoTableOptsModal'
import SharedOptions from './shared-opts'
import * as Animatable from 'react-native-animatable'
import TransitionGroup, { FadeInOutTransition } from 'react-native-transitiongroup';
import { FadeInTransitionGroup } from '../Transition-group'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AmountOfCardsAccumulator from './shared-opts/AmountOfCardsAccumulator'

const OptsMenu = ({
  currentFabProps,
  currentScreen,
  bgColor,
  fabActionContentRef,
  fabActionContentRef2,
  sliderValueautoPlayFlashcardsDuration,
  flashcardSettings,
  setFlashcardSettings,
  setLoading,
  setModalOpen,
  handleOnPressGeneral,
}) => {
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null)
  const theme: PaoThemeType = useTheme()
  const themeIsUncontrolled = bgColor === theme.colors.accent
  const [goToUnfilledTrigger, setGoToUnfilledTrigger] = useState(false)

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

  return (
    <>
      <FadeInTransitionGroup
        style={styles.outerContainer}
        appearCondition={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}>
        <View style={{...styles.innerContainer, }}>
          <SharedOptions />

          <View style={styles.divider} />

          {currentScreen === tabScreens.Paotable ?
            <PaoTableOptsModal
              paoDocumentsFilled={paoDocumentsFilled}
              bgColor={bgColor}
              setGoToUnfilledTrigger={setGoToUnfilledTrigger}
              themeIsUncontrolled={themeIsUncontrolled}
            />
            : currentScreen === tabScreens.Flashcards &&
            <FlashcardsOptsModal
              fabActionContentRef={fabActionContentRef}
              fabActionContentRef2={fabActionContentRef2}
              theme={theme}
              sliderValueautoPlayFlashcardsDuration={sliderValueautoPlayFlashcardsDuration}
              currentScreen={currentScreen}
              flashcardSettings={flashcardSettings}
              setFlashcardSettings={setFlashcardSettings}
              setLoading={setLoading}
              setModalOpen={setModalOpen}
            />
          }

        </View>
      </FadeInTransitionGroup>
      {/* // <FadeInTransitionGroup
      //   style={styles.amountOfCardsAccumulator}
      //   appearCondition={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}>
      //   <AmountOfCardsAccumulator />
      // </FadeInTransitionGroup> */}
    </>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    top: '10%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    zIndex: 10
  },
  innerContainer: {
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(67, 9, 122, 0.507)',
  },
  backdrop: {
    height: '100%', width: '100%', backgroundColor: 'rgba(36,40,118,.5)'
  },
  divider: { backgroundColor: 'white', width: '70%', height: .5, margin: 20 },
  amountOfCardsAccumulator: { position: "absolute", bottom: 100, left: '31%', }

})

export default OptsMenu

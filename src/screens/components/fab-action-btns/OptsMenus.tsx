import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions, Animated } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Portal, useTheme } from 'react-native-paper'
import { tabScreens } from '../../../constants/constants'
import { fabModeOptions } from '../../../constants/fabConstants'
import useCheckAmountOfPaoFilled from '../../../hooks/useCheckAmountOfPaoFilled'
import { PaoThemeType } from '../../../styles/theming'
import FlashcardsOptsModal from './flashcards-opts'
import PaoTableOptsModal from './paotable-opts/PaoTableOptsModal'
import SharedOptions from './shared-opts'
import * as Animatable from 'react-native-animatable'

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
  const toggleAnim = {
    0: { opacity: 0, },
    .9: { opacity: 1, /* display: 'none' */ },
  };

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

  return (
    <>
      <TouchableWithoutFeedback onPress={handleOnPressGeneral}>
        <Animatable.View
          useNativeDriver={true}
          direction={currentFabProps.mainFab.mode === fabModeOptions.menuOpen ? 'normal' : 'reverse'}
          animation={toggleAnim}
          style={{ ...styles.backdrop }}
        >
          {currentFabProps.mainFab.mode === fabModeOptions.menuOpen &&
            <View style={styles.optsContainer}>
              <View style={styles.container}>
                <View style={styles.innerContainer}>

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
              </View>
            </View>
          }
        </Animatable.View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    top: '10%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(36,40,118,.8)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  optsContainer: { height: '100%', width: '100%', },
  divider: { backgroundColor: 'white', width: '70%', height: .5, margin: 20 },
  backdrop: { backgroundColor: 'rgba(36,40,118,.5)', height: "100%", width: '100%' },

})

export default OptsMenu

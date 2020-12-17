import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Portal, useTheme } from 'react-native-paper'
import { tabScreens } from '../../../constants/constants'
import { fabModeOptions } from '../../../constants/fabConstants'
import useCheckAmountOfPaoFilled from '../../../hooks/useCheckAmountOfPaoFilled'
import { PaoThemeType } from '../../../styles/theming'
import FlashcardsOptsModal from './flashcards-opts'
import PaoTableOptsModal from './paotable-opts/PaoTableOptsModal'
import SharedOptions from './shared-opts'

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
}) => {
  const [paoDocumentsFilled, setPaoDocumentsFilled] = useState(null)
  const theme: PaoThemeType = useTheme()
  const themeIsUncontrolled = bgColor === theme.colors.accent
  const [goToUnfilledTrigger, setGoToUnfilledTrigger] = useState(false)

  useCheckAmountOfPaoFilled({ setPaoDocumentsFilled })

  return (
    <>
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
  divider: { backgroundColor: 'white', width: '70%', height: .5, margin: 20 }
})

export default OptsMenu

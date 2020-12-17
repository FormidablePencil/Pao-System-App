import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Portal, useTheme } from 'react-native-paper'
import { tabScreens } from '../../../constants/constants'
import { fabModeOptions } from '../../../constants/fabConstants'
import useCheckAmountOfPaoFilled from '../../../hooks/useCheckAmountOfPaoFilled'
import { PaoThemeType } from '../../../styles/theming'
import FlashcardsOptsModal from './flashcards-opts'
import PaoTableOptsModal from './paotable-opts/PaoTableOptsModal'
import SharableOptions from './shared-opts'

const SCREEN_WIDTH = Dimensions.get('window').width

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
    <Portal>
      {currentFabProps.mainFab.mode === fabModeOptions.menuOpen &&
        <View style={styles.optsContainer}>
          <SharableOptions />
          <>
            {currentScreen === tabScreens.Paotable &&
              <PaoTableOptsModal
                paoDocumentsFilled={paoDocumentsFilled}
                bgColor={bgColor}
                setGoToUnfilledTrigger={setGoToUnfilledTrigger}
                themeIsUncontrolled={themeIsUncontrolled}
              />
            }

            {currentScreen === tabScreens.Flashcards &&
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
          </>
        </View>
      }
    </Portal>

  )
}

const styles = StyleSheet.create({
  optsContainer: { height: '100%', width: SCREEN_WIDTH / 1.8, alignSelf: "center", flex: 1, justifyContent: 'center', }
})

export default OptsMenu

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fabModeOptions } from '../../../constants/fabConstants'
import { FadeInTransitionGroup } from '../Transition-group'

const TouchableBackdrop = ({ currentFabPropsMode, onPress }) => {
  return (
    <>
      {/* <FadeInTransitionGroup appearCondition={currentFabPropsMode === fabModeOptions.menuOpen}>
        <View style={{ ...styles.backdrop }} />
      </FadeInTransitionGroup> */}
      <TouchableWithoutFeedback style={{
        display: currentFabPropsMode === fabModeOptions.menuOpen ? 'flex' : 'none',
        ...styles.btn,
      }} onPress={onPress} />
    </>
  )
}

const styles = StyleSheet.create({
  btn: { height: '100%', width: '100%', },
  backdrop: { height: 2000, width: 2000, backgroundColor: 'rgba(36,40,118,.5)', top: 0, position: 'absolute', },
})

export default TouchableBackdrop

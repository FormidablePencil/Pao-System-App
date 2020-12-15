import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { TOGGLE_STUDY_RANDOM_MODE } from '../../../../actions/types'
import usePrimaryControlledColor, { WhereToColor } from '../../../../hooks/usePrimaryControlledColor'
import { RootReducerT } from '../../../../store'
import { WhiteText } from '../../../../styles/global'
import { PaoThemeType } from '../../../../styles/theming'
import LogoBtnImg from '../../../../components/LogoBtnImg'

const FlashcardBtnOpt = ({ }) => {
  const theme: PaoThemeType = useTheme()
  const isRandomStudyMode = useSelector((state: RootReducerT) => state.studyRandomMode.isRandomStudyMode)
  const pao = useSelector((state: RootReducerT) => state.pao)
  const btnBgColorUncontrolled = isRandomStudyMode ? theme.colors.accent : theme.colors.fabActionColors[1]
  const bgColorStudyOn = usePrimaryControlledColor(WhereToColor.studyModeOn, btnBgColorUncontrolled)
  const bgColorStudyOff = usePrimaryControlledColor(WhereToColor.studyModeOff, btnBgColorUncontrolled)
  const bgColor = isRandomStudyMode ? bgColorStudyOn : bgColorStudyOff
  const studyBtnTextColor = isRandomStudyMode ? 'black' : 'white'
  const studyButtonText = isRandomStudyMode ? 'Toggle Study On' : 'Toggle Study Off'
  // const noItemsInPaoList = pao[0].number === null


  const dispatch = useDispatch()

  const openStudyModal = () => dispatch({ type: TOGGLE_STUDY_RANDOM_MODE, payload: pao })

  return (
    <>
      {/* {!noItemsInPaoList && */}
        <ButtonPositionView>
          <TouchableOpacity style={{ ...styles.btn, backgroundColor: bgColor }} onPress={openStudyModal} mode='contained'>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <LogoBtnImg disableToggle={true} />
              <WhiteText style={{ color: studyBtnTextColor }}>{studyButtonText}</WhiteText>
            </View>
          </TouchableOpacity>
        </ButtonPositionView>
      {/* } */}
    </>
  )
}

const ButtonPositionView = styled.View`
  z-index: 100;
  position: absolute;
  top: 10%;
  left: 0px; right: 0px;
  align-items: center;
  justify-content: center;
`
const styles = StyleSheet.create({
  btn: {
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 0,
    borderRadius: 10,
  }
})

export default FlashcardBtnOpt

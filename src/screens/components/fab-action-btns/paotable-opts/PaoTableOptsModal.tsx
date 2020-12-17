import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TouchableRipple } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable';
import SelectorComp from '../SelectorComp';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerT } from '../../../../store';
import { DISPLAY_NUMBERS_IN_FRONT_FALSE, DISPLAY_NUMBERS_IN_FRONT_TRUE, ROW_TO_DISPLAY_FALSE, ROW_TO_DISPLAY_TRUE, TOGGLE_PAGINATION_MODE, TOGGLE_PAGINATION_MODE_FALSE, TOGGLE_PAGINATION_MODE_TRUE, TOGGLE_ROW_TO_DISPLAY } from '../../../../actions/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../../../styles/styles';

const PaoTableOptsModal = ({ paoDocumentsFilled, bgColor, setGoToUnfilledTrigger, themeIsUncontrolled }) => {
  const isPagination = useSelector((state: RootReducerT) => state.fabProperties.config.pagination)

  const toggleRow = useSelector((state: RootReducerT) => state.studyRandomMode.toggleRow)
  const displayNumberInFront = useSelector((state: RootReducerT) => state.studyRandomMode.displayNumberInFront)

  const dispatch = useDispatch()
  const [paoTableOpts, setPaoTableOpts] = useState(() => ({
    isPagination,
    toggleRow,
    displayNumberInFront,
  }))

  const goToUnfilled = () => setGoToUnfilledTrigger(true)

  const togglePaginationMode = (toggle) => setPaoTableOpts(prev => ({ ...prev, isPagination: toggle ? false : true }))
  const toggleToggleRowHandler = (toggle) => setPaoTableOpts(prev => ({ ...prev, toggleRow: toggle ? false : true }))
  const toggleDisplayNumberInFront = (toggle) => setPaoTableOpts(prev => ({ ...prev, displayNumberInFront: toggle ? false : true }))

  const onPressSave = () => {
    dispatch({ type: paoTableOpts.isPagination ? TOGGLE_PAGINATION_MODE_TRUE : TOGGLE_PAGINATION_MODE_FALSE })
    dispatch({ type: paoTableOpts.toggleRow ? ROW_TO_DISPLAY_TRUE : ROW_TO_DISPLAY_FALSE })
    dispatch({ type: paoTableOpts.displayNumberInFront ? DISPLAY_NUMBERS_IN_FRONT_TRUE : DISPLAY_NUMBERS_IN_FRONT_FALSE })
  }

  return (
    <BounceAnimationView animation='bounceIn'>
      <RegText>Filled: {paoDocumentsFilled}/100</RegText>
      {paoDocumentsFilled !== 100 &&
        <View>
          <TouchableRippleStyled
            bgColor={bgColor}
            onPress={() => goToUnfilled()}>
            <Row>
              <RegText black={themeIsUncontrolled}>Go to unfilled</RegText>
              <AntDesignStyled black={themeIsUncontrolled} size={10} name='arrowright' />
            </Row>
          </TouchableRippleStyled>
        </View>
      }

      <SelectorComp
        initial={isPagination}
        onPress={togglePaginationMode}
        title={'Table'}
        options={[
          { value: 0, label: 'pagination' },
          { value: 1, label: 'scroll' }
        ]}
      />

      <SelectorComp
        initial={toggleRow}
        onPress={toggleToggleRowHandler}
        title={'toggle'}
        options={[
          { value: 0, label: 'item' },
          { value: 1, label: 'row' }
        ]}
      />

      <SelectorComp
        initial={displayNumberInFront}
        onPress={toggleDisplayNumberInFront}
        title={'display in front'}
        options={[
          { value: 0, label: 'pao' },
          { value: 1, label: 'number' }
        ]}
      />

      <ButtonSave onPress={onPressSave} mode='contained'>
        <Text>Save</Text>
      </ButtonSave>
    </BounceAnimationView>
  )
}

const ButtonSave = styled(Button)`
  margin-top: 20px;
`;

const AntDesignStyled = styled(AntDesign)`
  margin: 0px 3px;
  color: ${({ black }) => black ? 'black' : 'white'};
`;
const AligningContainer = styled(View)`
  justify-content: flex-end;
`;
const Row = styled(View)`
  flex-direction: row;
  align-items: center
`;
const RegText = styled<any>(Text)`
  color: ${({ black }) => black ? 'black' : 'white'};
  font-family: 'MontserratMed';
`;
const BounceAnimationView = styled(Animatable.View)`
  margin: 8px;
  align-items: center;
`;
const TouchableRippleStyled = styled<any>(TouchableRipple)`
  width: 150;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 0px 10px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  padding: 5px;
  elevation: 10px;
`;

export default PaoTableOptsModal
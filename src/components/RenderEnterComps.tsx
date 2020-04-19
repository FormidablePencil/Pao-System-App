import React, { useEffect, useState } from 'react'
import ChooseEnteringOption from './ChooseEnteringOption'
import styled from 'styled-components';
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { signUp, signIn } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'
import { StyleSheet } from 'react-native';
import InputFieldsComp from './InputFieldsComp';
import { comps, inputErrMessages } from '../constants/constants';
import { INVALID_CREDENTIALS_NOTIFY_MESG, INPUT_FIELDS_EMPTY_NOTIFY_MESG } from '../actions/types';

// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const RenderEnterComps = ({ navigation }: any) => {
  const [compToRender, setCompToRender] = useState(comps.enterOptions)
  const [getInputedDataEnabled, setGetInputedDataEnabled] = useState(false)
  const [valuesOfInputFields, setValuesOfInputFields] = useState({ username: undefined, password: undefined, email: undefined })
  const [displayFailedMesg, setDisplayFailedMesg] = useState(false)
  // const [displayFailedMesg, setDisplayFailedMesg] = useState(false)
  const { authenticated } = useHandleSystemMesgAuth()
  const dispatch = useDispatch()

  //loading btn &
  // tell user of their error... when user starts typing then turn off mesg

  useEffect(() => {
    // console.log(authenticated, 'authenticated true????? false, true')
    if (authenticated === true) navigation.navigate('TabNavigator', { screen: 'Paotable' })
    if (authenticated === false) dispatch({type: INVALID_CREDENTIALS_NOTIFY_MESG})
  }, [authenticated])

  useEffect(() => {
    //~ this is the credential validation should be
    if (valuesOfInputFields.password && valuesOfInputFields.username && getInputedDataEnabled) {
      if (compToRender === comps.signup && valuesOfInputFields.email) {
        dispatch(signUp({
          username: valuesOfInputFields.username,
          password: valuesOfInputFields.password,
          email: valuesOfInputFields.email
        }))
      }
      if (compToRender === comps.signin) {
        dispatch(signIn({
          username: valuesOfInputFields.username,
          password: valuesOfInputFields.password
        }))
      }
    } else {
      dispatch({type: INPUT_FIELDS_EMPTY_NOTIFY_MESG})
    }
    setGetInputedDataEnabled(false)
  }, [valuesOfInputFields])

  const onPressHandlerEnter = () => {
    setGetInputedDataEnabled(true)
  }
  const getValuesOfInputFields = (userInputs: []) => {
    let reformatedInputes: any = {}
    userInputs.map((collection: any) => {
      reformatedInputes[collection.name] = collection.input
    })
    setValuesOfInputFields(reformatedInputes)
  }

  if (compToRender === comps.signin) {
    return (
      <InputFieldsComp
        containerProps={{ signin: true }}
        getValuesOfInputFields={getValuesOfInputFields}
        getInputedDataEnabled={getInputedDataEnabled}
        setGetInputedDataEnabled={setGetInputedDataEnabled}
        initialInputFields={[{ input: undefined, name: 'username' }, { input: undefined, name: 'password' }]}
        compToRender={compToRender}
        setCompToRender={setCompToRender} />
    )
  } else if (compToRender === comps.signup) {
    return (
      <InputFieldsComp
        getValuesOfInputFields={getValuesOfInputFields}
        getInputedDataEnabled={getInputedDataEnabled}
        setGetInputedDataEnabled={setGetInputedDataEnabled}
        initialInputFields={[{ input: undefined, name: 'email' }, { input: undefined, name: 'username' }, { input: undefined, name: 'password' }]}
        compToRender={compToRender}
        setCompToRender={setCompToRender} />
    )
  } else {
    return (
      <Container>
        <ChooseEnteringOption
          compToRender={compToRender}
          setCompToRender={setCompToRender}
          comps={comps}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 15,
    color: 'white',
    top: -25,
    width: '100%',
    textAlign: 'center',
    position: 'absolute'

  }
})

const StyledButtonLeft = styled(Button)`
  flex: 1; 
  margin-right: 5;
`
const StyledButtonRight = styled(Button)`
  flex: 1;
  margin-left: 5;
`

const BottomSection = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10;
`;

const Container = styled.View`
  justify-content: flex-start;
  width: 350;
  border-radius: 15;
  height: 100%;
`;
const ContainerSignUp = styled(Container)`
  top: 50;
`

export default RenderEnterComps

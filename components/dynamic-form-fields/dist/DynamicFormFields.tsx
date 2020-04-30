import React, { useState, useEffect } from 'react'
import { StyleSheet, LayoutAnimation, View } from 'react-native'
import { TextInput, Colors, HelperText } from 'react-native-paper'

//@ this is regular dynamic form feild but then I'll have a legendary form field
interface EnteringOptionTypes {
  getDataFunc: any
  children?: any
  overRideTextInput?: object
  textInputProps?: any
  initialInputFields: {
    [index: number]: {
      input: string | number | undefined
      name: string | number | undefined
    },
  },
  error: boolean 
  getInputDataEnabled?: boolean
}
const DynamicFormFields = ({
  initialInputFields,
  children,
  overRideTextInput,
  getDataFunc,
  textInputProps,
  getInputDataEnabled,
  error
}: EnteringOptionTypes) => {
  const [inputFields, setInputFields]: any = useState(initialInputFields)

  const _isUsernameValid = (value: string) => /^[a-zA-Z]*$/.test(value);
  const _isPasswordValid = (value: string) => undefined
  const _isEmailValid = (value: string) => undefined

  const onChangeHandler = (text: string, index: number) => {
    setInputFields((state: any) => {
      const list = state.map((item: string, i: number) => {
        if (i === index) {
          return { ...state[i], input: text }
        } else {
          return item
        }
      })
      return list
    })
  }

  const textInputOnPressHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //modifed
  }

  useEffect(() => {
    if (getInputDataEnabled) {
      getDataFunc(inputFields)
    }
  }, [getInputDataEnabled])

  return (
    <>
      {inputFields.map((item: any, index: number) =>
        <View key={index}>
          <TextInput
            // isFocused={(res: any) => console.log(res)}
            // error={() => {
            //   if (item.name === 'username') return _isUsernameValid(item.name)
            //   return false
            //   // if (item.name === 'password') _isPasswordValid(item.name)
            //   // if (item.name === 'email') _isEmailValid(item.name)
            // }}
            error={error} //~ style error
            underlineColor={Colors.green600}
            label={item.name}
            // placeholder={item.name}
            {...textInputProps}
            mode={'flat'}
            key={index}
            onFocus={() => textInputOnPressHandler()}
            multiline={true}
            style={{ ...styles.textInputStyle, ...overRideTextInput }}
            value={item.input}
            onChange={(properties: any) => onChangeHandler(properties.nativeEvent.text, index)} />
          {/* <HelperText
            type="error"
            visible={_isUsernameValid(item.input)}
          >
            Error: Only letters are allowed
        </HelperText> */}
        </View>
      )}
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
    height: 60,
    borderRadius: 5,
  }
})

export default DynamicFormFields
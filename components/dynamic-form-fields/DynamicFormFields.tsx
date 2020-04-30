import React, { useState, useEffect } from 'react'
import { StyleSheet, LayoutAnimation, View } from 'react-native'
import { TextInput, withTheme } from 'react-native-paper'
import { PaoThemeType } from '../../src/styles/theming'

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
  theme: PaoThemeType
  reset_error_mesg: () => void
}
const DynamicFormFields = ({
  initialInputFields,
  children,
  overRideTextInput,
  getDataFunc,
  textInputProps,
  getInputDataEnabled,
  error,
  theme,
  reset_error_mesg
}: EnteringOptionTypes) => {
  const [inputFields, setInputFields]: any = useState(initialInputFields)

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

  useEffect(() => {
    let amount_of_inputs_that_exists = []
    inputFields.forEach(collection => collection.input && amount_of_inputs_that_exists.push(0))
    if (amount_of_inputs_that_exists.length === inputFields.length) {
      reset_error_mesg()
    }
  }, [inputFields])

  const textInputOnPressHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  useEffect(() => {
    if (getInputDataEnabled) {
      getDataFunc(inputFields)
    }
  }, [getInputDataEnabled])

  const getKeyboardType = (whatInput: string) => {
    switch (whatInput) {
      case 'email':
        return 'email-address'
      case 'username':
        return 'default'
      case 'password':
        return 'default'
      default:
    }
  }


  return (
    <>
      {inputFields.map((item: any, index: number) => {
        const keyboardType = getKeyboardType(item.name)
        return (
          <View key={index}>
            <TextInput
              multiline={false}
              keyboardType={keyboardType}
              error={error} //~ style error
              underlineColor={theme.colors.primary}
              selectionColor="pink"
              label={item.name}
              mode={'flat'}
              key={index}
              onFocus={() => textInputOnPressHandler()}
              style={{
                ...styles.textInputStyle, ...overRideTextInput,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
              secureTextEntry={item.name === 'password' ? true : false}
              value={item.input}
              onChange={(properties: any) => onChangeHandler(properties.nativeEvent.text, index)}
            // {...textInputProps}
            // isFocused={(res: any) => console.log(res)}
            // error={() => {
            //   if (item.name === 'username') return _isUsernameValid(item.name)
            //   return false
            //   // if (item.name === 'password') _isPasswordValid(item.name)
            //   // if (item.name === 'email') _isEmailValid(item.name)
            // }}
            // placeholder={item.name}
            />
            {/* <HelperText
            type="error"
            visible={_isUsernameValid(item.input)}
            >
            Error: Only letters are allowed
          </HelperText> */}
          </View>

        )
      })}
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
    height: 60,
    borderRadius: 15,
  }
})

export default withTheme(DynamicFormFields)
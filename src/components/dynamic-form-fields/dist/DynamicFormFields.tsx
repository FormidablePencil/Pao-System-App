import React, { useState, useEffect } from 'react'
import { StyleSheet, LayoutAnimation } from 'react-native'
import { TextInput } from 'react-native-paper'

//@ this is regular dynamic form feild but then I'll have a legendary form feild
interface EnteringOptionTypes {
  getDataFunc: any
  children?: any
  overRideTextInput?: object
  textInputProps?: any
  initialInputFields: {
    [index: number]: {
      input: string | number
      placeholder: string | number
    },
  }
  placeholders?: {}
}
const DynamicFormFields = ({
  initialInputFields,
  children,
  overRideTextInput,
  getDataFunc,
  textInputProps,
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

  const textInputOnPressHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //modifed
  }

  useEffect(() => {
    // console.log(inputFields)
    if (getDataFunc) {
      getDataFunc(inputFields)
    }
  }, [getDataFunc])

  return (
    <>
      {inputFields.map((item: any, index: number) =>
        <TextInput
          // label={'username'}
          {...textInputProps}
          key={index}
          onFocus={() => textInputOnPressHandler()}
          style={{ ...styles.textInputStyle, ...overRideTextInput }}
          placeholder={item.placeholder}
          value={item.input}
          onChange={(properties: any) => onChangeHandler(properties.nativeEvent.text, index)} />
      )}
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
    height: 50,
    borderRadius: 5,
  }
})

export default DynamicFormFields
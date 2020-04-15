import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View } from 'react-native-tailwind'
import { StyleSheet, LayoutAnimation } from 'react-native'

//@ this is to be a reusable component. FormFields.
//@ this is regular dynamic form feild but then I'll have a legendary form feild
//these inputs are greate but I might have found even better input fields open source
interface EnteringOptionTypes {
  peristData?: any
  children?: any
  overRideTextInput?: object
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
  peristData
}: EnteringOptionTypes) => {
  const [inputFields, setInputFields]: any = useState(initialInputFields)

  const onChangeHandler = (text: string, index: number) => {
    setInputFields((state: any) => {
      const list = state.map((item: string, i: number) => {
        if (i === index) {
          return text
        } else {
          return item
        }
      })
      return list
    })
  }

  const textInputOnPressHandler = () => {
    console.log('333333')
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  if (peristData) {
    useEffect(() => {
      return () => {
        peristData(inputFields)
      }
    }, [])
  }

  return (
    <>
      {inputFields.map((item: any, index: number) =>
        <TextInput
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
    width: 200,
    marginVertical: 10,
    height: 35,
    borderRadius: 5,
    padding: 10,
  }
})

export default DynamicFormFields

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePaoItem } from '../actions/paoAc'
import { listMode } from '../constants/constants'

export interface Control {
  number: number | null
  name: any
  value: string | null
}

const useTextInputHandler = ({
  controlledInput,
  setControlledInput,
  tenPaoItemsArr,
}: {
  controlledInput: Control,
  setControlledInput: any,
  tenPaoItemsArr?: any,
}) => {
  const dispatch = useDispatch()

  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  })  //@
  const paoList: any = useSelector((state: any) => state.pao)  //@


  const saveControlledInputToReduxPaoList = async () => {
    let docExists: boolean | null = false
    paoList.forEach((document: any) => {
      if (document.number === controlledInput.number) {
        docExists = true
        if (document[controlledInput.name] === controlledInput.value) {
          docExists = null
        }
      }
    })
    if (controlledInput.value && docExists !== null) {
      dispatch(updatePaoItem(controlledInput, docExists))
    }
  } //@ move to PaginationMode & listMode (or have a useTextInputHandler)

  const onChangeTextHandler = ({ text, number, name }: any) => {
    setControlledInput({ ...controlledInput, value: text, number, name })
  } //@ move to PaginationMode & listMode

  const returnValueDependingOnWeatherItemsAreSame = ({ index, name, mode }: { index: number, name: string, mode: any }) => {
    if (mode === listMode.pagination) {
      return func1({ index, name })
    } else if (mode === listMode.wholeList) {
      return func2({ index, name })
    }
  } //@ move to PaginationMode
  const func1 = ({ index, name }: { index: number, name: string }) => {
    if (controlledInput.number === tenPaoItemsArr[index].number && controlledInput.name === name) {
      return controlledInput.value
    } else return tenPaoItemsArr[index][name]
  }
  const func2 = ({ index, name }: { index: number, name: string }) => {
    if (controlledInput.number === arr[index].number && controlledInput.name === name) {
      return controlledInput.value
    } else return arr[index][name]
  }



  // console.log(tenPaoItemsArr)

  return {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
    tenPaoItemsArr,
  } //@returning funcitons
}

export default useTextInputHandler

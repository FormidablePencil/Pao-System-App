import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePaoItem } from '../actions/paoAc'
import { listMode } from '../constants/constants'
import { putNewDoc, updateExistingDoc } from '../actions/paoActions'
import { UPDATE_PAO_LIST, ADD_TO_PAO_LIST } from '../actions/types'
import { PaoResponses } from '../actions/paoActions'
import paoSchemaGenerator from '../components/logic/paoSchemaGenerator'
import { refreshAccessToken } from '../actions/authActions'

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
  const paoListApprovedByServer = useSelector((state: any) => state.paoListApprovedByServer)
  const auth = useSelector((state: any) => state.auth)
  const paoList: any = useSelector((state: any) => state.pao)
  const arr = Array.from({ length: 100 }).map((collection, index) => {
    return { id: null, number: index, person: null, action: null, object: null }
  })

  const saveControlledInputToReduxPaoList = async () => {
    let docExists: boolean = false
    let docsAreSameNothingChanged: boolean = false
    paoList.forEach((document: any) => {
      if (document.number === controlledInput.number) {
        docExists = true
        const if_both_values_are_same = (document[controlledInput.name] === controlledInput.value)
        if (if_both_values_are_same) docsAreSameNothingChanged = true
      }
    })

    let paoDocModal = paoSchemaGenerator(controlledInput)
    let id
    paoListApprovedByServer.forEach(doc => doc.number === paoDocModal.number ? id = doc._id : null);
    paoDocModal['_id'] = id
    console.log(id, 'id@@');

    if (controlledInput.value && docExists === false) {
      console.log('K');
      // await dispatch({ type: ADD_TO_PAO_LIST, payload: paoDocModal })
      const response: any = await dispatch(putNewDoc({
        controlledInput,
        accessToken: auth.accessToken,
        paoListApprovedByServer
      }))
      console.log(response, 'responseresponse1');
      if (response === PaoResponses.token_invalid) {
        console.log('kk, token invalid');
        dispatch(refreshAccessToken({ refreshToken: auth.refreshToken }))
      }
      return response

    } else if (controlledInput.value && docExists === true) {
      console.log('KK');
      await dispatch({ type: UPDATE_PAO_LIST, payload: controlledInput })
      const response: any = await dispatch(updateExistingDoc({
        id,
        controlledInput,
        accessToken: auth.accessToken,
        paoListApprovedByServer
      }))
      if (response === PaoResponses.token_invalid) {
        console.log('kk, token invalid');
        dispatch(refreshAccessToken({ refreshToken: auth.refreshToken }))
      }
      return response

    } else if (controlledInput.value && docsAreSameNothingChanged === true) {
      return PaoResponses.value_is_no_diffrent_from_what_is_in_state
    }
  }


  const onChangeTextHandler = ({ text, number, name }: any) => {
    setControlledInput({ ...controlledInput, value: text, number, name })
  }


  const returnValueDependingOnWeatherItemsAreSame = ({ index, name, mode }: { index: number, name: string, mode: any }) => {
    if (mode === listMode.pagination) {
      return func1({ index, name })
    } else if (mode === listMode.wholeList) {
      return func2({ index, name })
    }
  }


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


  return {
    saveControlledInputToReduxPaoList,
    onChangeTextHandler,
    returnValueDependingOnWeatherItemsAreSame,
    tenPaoItemsArr,
  }
}

export default useTextInputHandler

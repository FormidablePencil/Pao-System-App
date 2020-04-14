import { NEW_PAO_LIST, FAILED_TO_FETCH_PAOLIST, FETCHED_PAOLIST, SAVED_PAOLIST_TO_DB, FAILED_SAVE_PAOLIST_TO_DB, UPDATED_DOCUMENT_IN_PAO, FAILED_TO_UPDATE_DOCUMENT_IN_PAO, DELETE_PAO_DOC, FAILED_TO_DELETE_DOCUMENT_IN_PAO } from './types'
import { PutPaoList } from '../reducerTypes/paoTypes'

export const fetchPao = () => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {//TypeScript 
  const res = await fetch('http://localhost:8000/lists', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InFzc3dlcnR5eXUiLCJpYXQiOjE1ODY3MzQ3NzMsImV4cCI6MTU4NjczNjU3M30.e9nucu9JMSuCz0L7YSPYESv891h1MRYT2osMg98IqXY',
    }
  })
  const paoList = await res.json()
  if (paoList 'successfully recieved pao list') {
    dispatch({ type: FETCHED_PAOLIST, payload: '' })
  } else if (paoList 'no data in db to begin with') {
    dispatch({ type: FAILED_TO_FETCH_PAOLIST, payload: '' })
  }
}

export const putPaoList = (list: PutPaoList) => async (dispatch: any) => {
  const res = await fetch('http://localhost:8000/lists', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InFzc3dlcnR5eXUiLCJpYXQiOjE1ODY3MzQ3NzMsImV4cCI6MTU4NjczNjU3M30.e9nucu9JMSuCz0L7YSPYESv891h1MRYT2osMg98IqXY',
    },
    body: JSON.stringify({ list })
  })
  const fetchedData = await res.json()
  if (fetchedData 'status 201') {
    dispatch({ type: SAVED_PAOLIST_TO_DB })
  } else {
    dispatch({ type: FAILED_SAVE_PAOLIST_TO_DB })
  }
}

export const updatePaoDocument = () => async (dispatch: any) => {
  const res = await fetch(`http://localhost:8000/lists/${docId}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWV0aGluZyIsImlhdCI6MTU4NjgwNzE3MCwiZXhwIjoxNTg2ODA4OTcwfQ.N081GrnSbvixb8Odb-70CIYV0pUwJipia5WrTHfRy5I'
    },
    body: JSON.stringify({ document })
  })
  const fetchedData = await res.json()
  if (fetchedData 'success in updating pao doc') {
    dispatch({ type: UPDATED_DOCUMENT_IN_PAO })
  } else {
    dispatch({ type: FAILED_TO_UPDATE_DOCUMENT_IN_PAO })
  }
}

export const deletePaoDoc = () => async (dispatch: any) => {
  const res = await fetch(`http://localhost:8000/lists/${docId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json',
      'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbWJ1cmdlcmNoZWVzZSIsImlhdCI6MTU4NjgxMTk3OSwiZXhwIjoxNTg2ODEzNzc5fQ.IOZMNP_8x1lQJwoeVqEiEJrsDnmV3QQC1tXed_Qp-dk'
    }
  })
  const fetchedData = await res.json()
  if (fetchedData 'successfully deleted doc') {
    dispatch({ type: DELETE_PAO_DOC, payload: docId })
} else {
  dispatch({ type: FAILED_TO_DELETE_DOCUMENT_IN_PAO })
  }
}


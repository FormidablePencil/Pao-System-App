import { FETCHED_PAOLIST, SAVED_PAOLIST_TO_DB_SUCCESS_MESG, SAVED_PAOLIST_TO_DB_FAILED_MESG, SAVED_PAOLIST_TO_DB_FAILED_NO_TOKEN_MESG } from './types'
import { PutPaoList } from '../reducerTypes/paoTypes'

export const fetchPao = ({ accessToken }: { accessToken: string }) => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {//TypeScript 
  console.log('paoList')
  const request = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  const res = await fetch('http://10.0.0.6:8000/lists', request)
  const paoList = await res.json()
  console.log(paoList.pao.list, 'paoList')
  if (paoList.pao.list) {
    dispatch({ type: FETCHED_PAOLIST, payload: paoList.pao.list }) //~ plug paoList to payload
  } else {
    console.log('fetchPao list failed')
    // dispatch({ type: FAILED_TO_FETCH_PAOLIST, payload: '' })
  }
}

//% save to redux first, then save to backend. 
//% If save to db fails then that's cause of the network error. Logout and notify the user or disable all editing action to their lists. 
export const putPaoList = ({ list, accessToken }: { list: PutPaoList, accessToken: string }) => async (dispatch: any) => {
  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ list })
  }
  const res = await fetch('http://10.0.0.6:8000/lists', request)
  const fetchedData = await res.json()

  console.log(fetchedData)

  if (fetchedData.message === 'completely replaced') {
    console.log('success putPaoList')
    dispatch({ type: SAVED_PAOLIST_TO_DB_SUCCESS_MESG })
  } else if (fetchedData.message === 'token does not exist') {
    dispatch({ type: SAVED_PAOLIST_TO_DB_FAILED_NO_TOKEN_MESG })
    console.log('failed putPaoList, token doesn\'t exist')

  } else {
    console.log('failed putPaoList')
    dispatch({ type: SAVED_PAOLIST_TO_DB_FAILED_MESG })
    // dispatch({ type: FAILED_SAVE_PAOLIST_TO_DB  })
  }
}

const putNewDocument = async () => {
  const request = {

  }
  const res = await fetch('http://localhost:8000/lists/', request)
}


// export const updatePaoDocument = () => async (dispatch: any) => {
//   const res = await fetch(`http://10.0.0.6:8000/lists/${docId}`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWV0aGluZyIsImlhdCI6MTU4NjgwNzE3MCwiZXhwIjoxNTg2ODA4OTcwfQ.N081GrnSbvixb8Odb-70CIYV0pUwJipia5WrTHfRy5I'
//     },
//     body: JSON.stringify({ document })
//   })
//   const fetchedData = await res.json()
//   if (fetchedData 'success in updating pao doc') {
//     dispatch({ type: UPDATED_DOCUMENT_IN_PAO })
//   } else {
//     dispatch({ type: FAILED_TO_UPDATE_DOCUMENT_IN_PAO })
//   }
// }

// export const deletePaoDoc = () => async (dispatch: any) => {
//   const res = await fetch(`http://10.0.0.6:8000/lists/${docId}`, {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": 'application/json',
//       'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbWJ1cmdlcmNoZWVzZSIsImlhdCI6MTU4NjgxMTk3OSwiZXhwIjoxNTg2ODEzNzc5fQ.IOZMNP_8x1lQJwoeVqEiEJrsDnmV3QQC1tXed_Qp-dk'
//     }
//   })
//   const fetchedData = await res.json()
//   if (fetchedData 'successfully deleted doc') {
//     dispatch({ type: DELETE_PAO_DOC, payload: docId })
// } else {
//   dispatch({ type: FAILED_TO_DELETE_DOCUMENT_IN_PAO })
//   }
// }
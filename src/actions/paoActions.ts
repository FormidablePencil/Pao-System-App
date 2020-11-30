import { FETCHED_PAOLIST } from './types'
import { PutPaoList } from '../reducerTypes/paoTypes'
import paoSchemaGenerator from '../components/logic/paoSchemaGenerator'
import { handle_update_and_create_pao_doc_server_responses } from './logic/useHandleServerResponses'

export enum PaoResponses {
  failed_to_save_pao_list_token_not_existent,
  success_saved_pao_list,
  save_pao_list_failed,
  value_is_no_diffrent_from_what_is_in_state,
  save_pao_item_failed,
  token_invalid,
  doc_by_num_exists,
  saved_updated_document,
  pushed_new_doc_and_saved_successfully,
}

export enum ServerPaoResponses {
  save_pao_item_failed = 'failed to save pao item',
  token_invalid = 'token does not exist',
  doc_by_num_exists = 'Document with that number exists.',
  saved_updated_document = 'saved updated document',
  pushed_new_doc_and_saved_successfully = 'pushed new document to collection and saved',
}

export const fetchPao = ({ accessToken }: { accessToken: string }) => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {//TypeScript 
  const request = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  const res = await fetch('http://10.0.0.7:4001/lists', request)
  const paoList = await res.json()

  if (paoList.pao.list) {
    dispatch({ type: FETCHED_PAOLIST, payload: paoList.pao.list }) //~ plug paoList to payload
  } else {
    // dispatch({ type: FAILED_TO_FETCH_PAOLIST, payload: '' })
  }
}









export const putNewDoc = ({
  accessToken,
  controlledInput,
  paoListApprovedByServer,
}: {
  accessToken
  controlledInput
  paoListApprovedByServer
}) => async (dispatch) => {

  const paoDocModal = paoSchemaGenerator(controlledInput)

  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      number: paoDocModal.number,
      person: paoDocModal.person,
      action: paoDocModal.action,
      object: paoDocModal.object,
    })
  }

  const res = await fetch('http://10.0.0.7:4001/lists/newdoc', request)
  const fetchedData = await res.json()

  const response = dispatch(handle_update_and_create_pao_doc_server_responses({
    fetchedData, paoListApprovedByServer
  }))
  return response
}









export const updateExistingDoc = ({
  accessToken,
  controlledInput,
  paoListApprovedByServer,
  id
}) => async (dispatch) => {

  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(controlledInput)
  }

  const res = await fetch(`http://10.0.0.7:4001/lists/update/${id}`, request)
  const fetchedData = await res.json()

  // console.log(paoListApprovedByServer)
  const response = dispatch(handle_update_and_create_pao_doc_server_responses({
    fetchedData, paoListApprovedByServer
  }))
  return response
}

// const putList = async () => {
//   const request = {

//   }
//   const res = await fetch('http://localhost:4001/lists/', request)

//   if (fetchedData.message === 'completely replaced') {
//     dispatch({ type: SAVED_PAOLIST_TO_DB_SUCCESS_MESG, payload: controlledInput })
//     return PaoResponses.success_saved_pao_list
//   } else if (fetchedData.message === 'token does not exist') {
//     dispatch({ type: SAVED_PAOLIST_TO_DB_FAILED_NO_TOKEN_MESG, payload: paoListApprovedByServer })
//     return PaoResponses.failed_to_save_pao_list_token_not_existent
//   } else {
//     dispatch({ type: FAILED_SERVER_CRUD_REQUEST, payload: paoListApprovedByServer })
//     return PaoResponses.save_pao_list_failed
//   }
// }


// export const updatePaoDocument = () => async (dispatch: any) => {
//   const res = await fetch(`http://10.0.0.7:4001/lists/${docId}`, {
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
//   const res = await fetch(`http://10.0.0.7:4001/lists/${docId}`, {
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
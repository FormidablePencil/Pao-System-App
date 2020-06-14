import { SIGNED_IN, SET_LOADING, SIGNED_UP, SIGNED_OUT, REFRESHED_TOKENS } from "./types"
import { form_res_msg } from "../hooks/useUserAuthentication"

export enum server_responses {
  invalid_credentials = 'invalid credentials',
  user_exists = 'user already exists',
  signed_out = 'successfully signed out',
  signed_out_with_err = 'signout failed. Token does not exist',
  successfully_refreshed_token = 'returned fresh new tokens',
}

export enum auth_responses {
  successfully_refreshed_token,
  failed_to_refreshed_token,
}

export const signUp = ({ username, password, email }) => async dispatch => {
  await dispatch({ type: SET_LOADING })
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, username, email })
  }
  const res = await fetch('http://10.0.0.6:4001/auth/signup', request)
  const fetchedData = await res.json()
  // console.log(fetchedData)

  if (fetchedData.accessToken && fetchedData.refreshToken) {
    dispatch({ type: SIGNED_UP, payload: { accessToken: fetchedData.accessToken, refreshToken: fetchedData.refreshToken, username } })
    return form_res_msg.signed_up
  } else if (fetchedData.message === server_responses.user_exists) {
    return form_res_msg.username_exists
  }
}

export const signIn = ({ username, password }) => async (dispatch) => {
  const res = await fetch('http://10.0.0.7:4001/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, username })
  })
  const fetchedData = await res.json()
  if (fetchedData.accessToken && fetchedData.refreshToken) {
    dispatch({ type: SIGNED_IN, payload: { username, accessToken: fetchedData.accessToken, refreshToken: fetchedData.refreshToken } })
    return form_res_msg.signed_in
  } else {
    return form_res_msg.invalid_credentials
  }
}

export const signOut = ({ refreshToken }) => async dispatch => { //? I know you don't pass in refreshToken to clear it from db upon loging out
  await dispatch({ type: SET_LOADING })
  // console.lo/g(refreshToken)
  const request = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  }
  const res = await fetch('http://10.0.0.7:4001/auth/signout', request)
  const fetchedData = await res.json()

  if (fetchedData.mesg === server_responses.signed_out) {
    dispatch({ type: SIGNED_OUT })
    return form_res_msg.signed_out
  } else if (fetchedData.mesg === server_responses.signed_out_with_err) {
    dispatch({ type: SIGNED_OUT })
    return form_res_msg.signed_out
  }

}

export const refreshAccessToken = ({ refreshToken }) => async (dispatch: any) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  }
  const res = await fetch('http://10.0.0.7:4001/auth/token', request)
  const fetchedData = await res.json()
  console.log(fetchedData, 'refreshed token')
  if (fetchedData.message = server_responses.successfully_refreshed_token) {
    dispatch({ action: REFRESHED_TOKENS, payload: fetchedData.accessToken })
    return server_responses.successfully_refreshed_token
  } else {
    return auth_responses.failed_to_refreshed_token
  }
}

// export const deleteAccount = (username: string, password: string, token: string) => async (dispatch: any) => {
//   const res = await fetch('http://10.0.0.6:8000/deleteaccount', {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbWJ1cmdlcmNoZWVzZSIsImlhdCI6MTU4NjgxMzIzMywiZXhwIjoxNTg2ODE1MDMzfQ.EhF41YJcH1-10ylFFU_W5U_cS6RR8H5DrmSmIWumlcc",
//     },
//     body: JSON.stringify({ username, password, token: 'eyJhbGciOiJIUzI1NiJ9.aGFtYnVyZ2VyY2hlZXNl.z9PxXPQaZ4T0JhIMZtC7Ba7FylfDMEcsTrh0pYgxTjI"' })
//   })
//   const fetchedData = await res.json()
//   if (fetchedData 'successfully deleted account') {
//     dispatch({ action: DELETED_ACCOUNT })
//   } else {
//     dispatch({ action: FAILED_TO_DELETED_ACCOUNT })
//   }
// }

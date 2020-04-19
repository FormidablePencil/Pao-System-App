import { SIGN_IN_FAILED_MESG, SIGNED_IN, SET_LOADING, SIGNED_UP, SIGN_UP_FAILED_MESG, SIGN_IN_SUCCESS_MESG, SIGNED_OUT, SIGN_OUT_FAILED } from "./types"

export const signUp = ({ username, password, email }: any) => async (dispatch: any) => {
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

  if (fetchedData.accessToken && fetchedData.refreshToken) {
    console.log('savigiginigning')
    return dispatch({ type: SIGNED_UP, payload: { accessToken: fetchedData.accessToken, refreshToken: fetchedData.refreshToken, username } })
  } else {
    return dispatch({ type: SIGN_UP_FAILED_MESG })
  }
}

export const signIn = ({ username, password }: any) => async (dispatch: any) => {
  console.log('signingign')
  const res = await fetch('http://10.0.0.6:4001/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, username })
  })
  const fetchedData = await res.json()
  //^ tokens or err message
  if (fetchedData.accessToken && fetchedData.refreshToken) {
    return dispatch({
      type: SIGNED_IN,
      payload: { username, accessToken: fetchedData.accessToken, refreshToken: fetchedData.refreshToken }
    })
  } else {
    return dispatch({ type: SIGN_IN_FAILED_MESG })
  }
}

export const signOut = ({ refreshToken }: any) => async (dispatch: any) => { //? I know you don't pass in refreshToken to clear it from db upon loging out
  await dispatch({ type: SET_LOADING })
  console.log(refreshToken)
  const request = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  }
  const res = await fetch('http://10.0.0.6:4001/auth/signout', request)
  const fetchedData = await res.json()

  if (fetchedData.mesg === 'successfully loggedout') {
    console.log('successfully loggedOut')
    dispatch({ type: SIGNED_OUT })
  } else if (fetchedData.mesg === 'signinFailed. Token does not exist') {
    console.log('failed to logout')
    dispatch({ type: SIGN_OUT_FAILED })
  }

}

// export const refreshAccessToken = () => async (dispatch: any) => {
//   const res = await fetch('http://10.0.0.6:4001/auth/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "token": "eyJhbGciOiJIUzI1NiJ9.c29tZXRoaW5n.nUvhqEQYVA46RgwetwGWYOWoFEnxkwllc3uvqu9BB_A" })
//   })
//   const fetchedData = await res.json()
//   if (fetchedData 'returned fresh new tokens') {
//     dispatch({ action: REFRESHED_TOKENS, payload: '' })
//   } else {
//     dispatch({ action: FAILED_TO_REFRESH_TOKENS, payload: '' })
//   }
// }

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

import { SIGNED_IN, SIGN_IN_FAILED, SIGN_UP_FAILED, SIGNED_UP, SIGNED_OUT, SIGN_OUT_FAILED, DELETED_ACCOUNT, FAILED_TO_DELETED_ACCOUNT, REFRESHED_TOKENS, FAILED_TO_REFRESH_TOKENS } from "./types"
import { SizeClassIOS } from "expo/build/ScreenOrientation/ScreenOrientation"

export const signUp = (username: string, password: string, email: string) => async (dispatch: any) => {
  const res = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, username, email })
  })
  const fetchedData = await res.json()

  dispatch()
  if (fetchedData 'contains tokens') {
    dispatch({ action: SIGNED_IN })
  } else {
    dispatch({ action: SIGN_IN_FAILED })
  }
}

export const signIn = (username: string, password: string) => async (dispatch: any) => {
  const res = await fetch('http://localhost:4001/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, username })
  })
  const fetchedData = await res.json()
  //^ tokens or err message
  if (fetchedData 'contains tokes') {
    dispatch({ action: SIGNED_UP })
  } else {
    dispatch({ action: SIGN_UP_FAILED })
  }
}

export const signOut = () => async (dispatch: any) => {
  const res = await fetch('http://localhost:4001/auth/signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "token": "eyJhbGciOiJIUzI1NiJ9.c29tZXRoaW5n.nUvhqEQYVA46RgwetwGWYOWoFEnxkwllc3uvqu9BB_A" })
  })
  const fetchedData = await res.json()
  if (fetchedData ' statuscode 200') {
    dispatch({ action: SIGNED_OUT, payload: '' })
  } else {
    dispatch({ action: SIGN_OUT_FAILED })
  }
}

export const refreshAccessToken = () => async (dispatch: any) => {
  const res = await fetch('http://localhost:4001/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "token": "eyJhbGciOiJIUzI1NiJ9.c29tZXRoaW5n.nUvhqEQYVA46RgwetwGWYOWoFEnxkwllc3uvqu9BB_A" })
  })
  const fetchedData = await res.json()
  if (fetchedData 'returned fresh new tokens') {
    dispatch({ action: REFRESHED_TOKENS, payload: '' })
  } else {
    dispatch({ action: FAILED_TO_REFRESH_TOKENS, payload: '' })
  }
}

export const deleteAccount = (username: string, password: string, token: string) => async (dispatch: any) => {
  const res = await fetch('http://localhost:8000/deleteaccount', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbWJ1cmdlcmNoZWVzZSIsImlhdCI6MTU4NjgxMzIzMywiZXhwIjoxNTg2ODE1MDMzfQ.EhF41YJcH1-10ylFFU_W5U_cS6RR8H5DrmSmIWumlcc",
    },
    body: JSON.stringify({ username, password, token: 'eyJhbGciOiJIUzI1NiJ9.aGFtYnVyZ2VyY2hlZXNl.z9PxXPQaZ4T0JhIMZtC7Ba7FylfDMEcsTrh0pYgxTjI"' })
  })
  const fetchedData = await res.json()
  if (fetchedData 'successfully deleted account'){
    dispatch({ action: DELETED_ACCOUNT})
  } else {
    dispatch({ action: FAILED_TO_DELETED_ACCOUNT})
  }
}

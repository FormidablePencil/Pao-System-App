import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RESET_SIGNIN_MESG, RESET_SIGNUP_MESG, SET_NOT_LOADING, RESET_SIGNED_OUT, RESET_SAVED_PAOLIST_TO_DB_MESG } from '../actions/types'
import { fetchPao } from '../actions/paoActions'
import { RootReducerT } from '../store'

const useHandleSystemMesgAuth = () => {
  const signin = useSelector((state: RootReducerT) => state.systemMessages.signin)
  const signup = useSelector((state: RootReducerT) => state.systemMessages.signup)
  const signedout = useSelector((state: RootReducerT) => state.systemMessages.signedout)
  const savedPaoToDb = useSelector((state: RootReducerT) => state.systemMessages.savedPaoToDb)
  const accessToken = useSelector((state: RootReducerT) => state.auth.accessToken)
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated]: any = useState(undefined)
  const [userSignedOut, setUserSignedOut]: any = useState(null)
  const [paoToDbSaved, setPaoToDbSaved]: any = useState(null)

  useEffect(() => {
    (async () => {
      if (signin === false || signup === false) {
        await setAuthenticated(false)
        dispatch({ type: RESET_SIGNIN_MESG })
        dispatch({ type: RESET_SIGNUP_MESG })
        dispatch({ type: SET_NOT_LOADING })
      }
      if (signin === true || signup === true) {
        await setAuthenticated(true)
        await dispatch(fetchPao({ accessToken }))
        dispatch({ type: RESET_SIGNIN_MESG })
        dispatch({ type: RESET_SIGNUP_MESG })
        dispatch({ type: SET_NOT_LOADING })
      }
      if (signin === undefined || signin === undefined) setAuthenticated(undefined)
    })()
  }, [signin, signup])

  useEffect(() => {
    (async () => {
      if (signedout === true || signedout === false) {
        await setUserSignedOut(signedout)
        dispatch({ type: RESET_SIGNED_OUT })
        dispatch({ type: SET_NOT_LOADING })
      }
      else if (signedout === null) setUserSignedOut(null)
    })()
  }, [signedout])

  useEffect(() => {
    (async () => {
      //~ replace true/false with enums sometime
      if (savedPaoToDb === true) {
        await setPaoToDbSaved(true)
        dispatch({ type: RESET_SAVED_PAOLIST_TO_DB_MESG })
      } else if (savedPaoToDb === false) {
        await setPaoToDbSaved(false)
        dispatch({ type: RESET_SAVED_PAOLIST_TO_DB_MESG })
      } else if (savedPaoToDb === 1) {
        setPaoToDbSaved('failed cause of token issues')
        dispatch({ type: RESET_SAVED_PAOLIST_TO_DB_MESG })
      }
    })()
  }, [savedPaoToDb])


  return { authenticated, userSignedOut, paoToDbSaved }
}

export default useHandleSystemMesgAuth
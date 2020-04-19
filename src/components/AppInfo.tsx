import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'

const AppInfo = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const { refreshToken } = useSelector((state: any) => state.auth)
  const loading = useSelector((state: any) => state.systemMessages.loading)
  const { userSignedOut } = useHandleSystemMesgAuth()

  useEffect(() => {
    if (userSignedOut === true || userSignedOut === false) {
      navigation.navigate('WelcomeScreen')
    }
  }, [userSignedOut])

  const handleOnPress = () => {
    dispatch(signOut({ refreshToken }))
  }


  return (
    <Button
      loading={loading}
      mode='contained'
      icon={userSignedOut && 'check-bold'}
      onPress={() => handleOnPress()}
    >
      Logout
    </Button>
  )
}

export default AppInfo

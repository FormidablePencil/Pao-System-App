import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../actions/authActions'
import useHandleSystemMesgAuth from '../hooks/useHandleSystemMesgAuth'
import { LayoutAnimation } from 'react-native'

const AppInfo = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const { refreshToken } = useSelector((state: any) => state.auth)
  const loading = useSelector((state: any) => state.systemMessages.loading)
  const { userSignedOut } = useHandleSystemMesgAuth()
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    if (userSignedOut === true || userSignedOut === false) {
      setLoadingComplete(true)
      setTimeout(() => {
        navigation.navigate('WelcomeScreen')
      }, 1150);
    }
  }, [userSignedOut])
  
  const handleOnPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(signOut({ refreshToken }))
  }
  return (
    <>
      <Button
        loading={loading}
        mode='contained'
        icon={loadingComplete && 'check'}
        onPress={() => handleOnPress()}
      >
        Logout
      </Button>
    </>
  )
}

export default AppInfo

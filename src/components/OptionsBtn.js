import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/global'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const OptionsBtn = ({ setModalOpen }) => {

  return (
    <View style={{ ...globalStyles.settingsIconImg }}>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Ionicons name="ios-options" color="rgba(24,24,20,1)" size={28} />
      </TouchableOpacity>
    </View>
  )
}

export default OptionsBtn

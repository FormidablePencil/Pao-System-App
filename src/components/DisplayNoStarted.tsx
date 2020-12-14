import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { reusableStyles } from '../styles/global'

const DisplayNoStarted = ({ itemExistsInFavOfCurrentRange, currentRenderItemsRange }) =>
  <View style={styles.container}>
    {!itemExistsInFavOfCurrentRange &&
      <View style={styles.txtContainer}>
        <Text style={reusableStyles.lgText}>Nothing stared</Text>
        <Text style={reusableStyles.lgText}> {currentRenderItemsRange} - {currentRenderItemsRange + 9}</Text>
      </View>
    }
  </View>

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
    top: '45%',
    zIndex: 1,
  },
  txtContainer: {
    alignItems: 'center'
    // flexDirection: column
  }
})


export default DisplayNoStarted
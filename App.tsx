import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { View, Text } from 'react-native-tailwind';
import * as Font from 'expo-font';
import TabNavigator from './routes/TabNavigator';
import ErrorBoundary from 'react-error-boundary';
import { Provider, useSelector } from 'react-redux'
import configureStore from './store';

//next update there will be support for multiple pao lists
const store = configureStore()

const App = () => {
  const [appReady, setAppReady] = useState(false)
  YellowBox.ignoreWarnings(['Require cycle', 'Warning: "RootErrorBoundary"'])

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({
          'rock-salt': require('./fonts/RockSalt-Regular.ttf'),
        });
        setAppReady(true)
      } catch (err) {
        console.warn(err)
      }
    })()
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        {appReady ?
          < TabNavigator />
          : <Text>Loading...</Text>
        }
      </ErrorBoundary>
    </Provider>
  )
}

export default App
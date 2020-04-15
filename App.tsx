import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, YellowBox, Platform, UIManager } from 'react-native';
import { View, Text } from 'react-native-tailwind';
import * as Font from 'expo-font';
import TabNavigator from './routes/TabNavigator';
import ErrorBoundary from 'react-error-boundary';
import { Provider, useSelector } from 'react-redux'
import configureStore from './store';
import StackNavigator from './routes/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

//next update there will be support for multiple pao lists
const store = configureStore()

const App = () => {
  const [appReady, setAppReady] = useState(false)
  YellowBox.ignoreWarnings(['Require cycle', 'Warning: "RootErrorBoundary"'])

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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
          <StackNavigator />
          : <Text>Loading...</Text>
        }
      </ErrorBoundary>
    </Provider>
  )
}

export default App
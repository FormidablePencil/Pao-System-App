import React, { useEffect, useState } from 'react';
import { YellowBox, Platform, UIManager } from 'react-native';
import { View, Text } from 'react-native-tailwind';
import * as Font from 'expo-font';
import ErrorBoundary from 'react-error-boundary';
import { Provider as StoreProvider, useSelector } from 'react-redux'
import configureStore from './store';
import StackNavigator from './routes/StackNavigator';
import { Provider as PaperProvider } from 'react-native-paper'

const store = configureStore()

const Index = () => {
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
          'rock-salt': require('./assets/fonts/RockSalt-Regular.ttf'),
        });
        setAppReady(true)
      } catch (err) {
        console.warn(err)
      }
    })()
  }, [])

  return (
    <PaperProvider>
      <StoreProvider store={store}>
        <ErrorBoundary>
          {appReady ?
            <StackNavigator />
            : <Text>Loading...</Text>
          }
        </ErrorBoundary>
      </StoreProvider>
    </PaperProvider>
  )
}

export default Index
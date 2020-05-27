import React, { useEffect, useState } from 'react';
import { YellowBox, Platform, UIManager, StatusBar, BackHandler } from 'react-native';
import { View, Text } from 'react-native-tailwind';
import * as Font from 'expo-font';
import ErrorBoundary from 'react-error-boundary';
import { Provider as StoreProvider, useSelector } from 'react-redux'
import configureStore from './store';
import StackNavigator from './routes/StackNavigator';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { PaoTheme } from './styles/theming';

const store = configureStore()

//~ fav a card/collection
//~ CRUD to the backend


const Index = () => {
  const [appReady, setAppReady] = useState(false)
  YellowBox.ignoreWarnings([
    'Require cycle',
    'Warning: "RootErrorBoundary"',
    'Warning: Function components cannot be given refs',
  ])

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
          'YesevaOne': require('./assets/fonts/YesevaOne-Regular.ttf'),
          'MontserratThin': require('./assets/fonts/Montserrat/Montserrat-Thin.ttf'),
          'MontserratLight': require('./assets/fonts/Montserrat/Montserrat-Light.ttf'),
          'MontserratReg': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
          'MontserratMed': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        });
        setAppReady(true)
      } catch (err) {
        console.warn(err)
      }
    })()
  }, [])

  return (
    <PaperProvider theme={PaoTheme}>
      <StatusBar translucent={true} backgroundColor={'transparent'}  />
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
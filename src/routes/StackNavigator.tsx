import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const StackNavigator = () => {
  
  return ( 
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigator

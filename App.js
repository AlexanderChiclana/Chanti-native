import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from './components/Tile.js'
import Sequencer from './components/Sequencer.js'
import MediaControls from './components/MediaControls.js'
import TilePage from './pages/TilePage.js'

import { colors } from '../chanti-native-client/theme.js'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
         <Tab.Navigator swipeEnabled={false}>
          <Tab.Screen name="Torah" component={TilePage} />
          <Tab.Screen name="Phrases" component={TilePage} />
        </Tab.Navigator>
      {/* </Stack.Navigator> */}
      
    </NavigationContainer>
  )
}

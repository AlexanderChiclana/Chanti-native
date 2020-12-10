import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import Header from './components/Header.js'

import TilePage from './pages/TilePage.js'
import PhrasePage from './pages/PhrasePage.js'
import DemoPage from './pages/DemoPage.js'

import { colors } from '../chanti-native-client/theme.js'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import systems from './data/systems.js'

const Drawer = createDrawerNavigator()

const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {systems.map((system, i) => {
          return (
            <Drawer.Screen
              key={i}
              name={system.name}
              component={TabView}
              initialParams={system}
            />
          )
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const TabView = ({ route, navigation }) => {
  // console.log(navigation)
  let system = route.params.name
  let symbols = route.params

  // destructure route params later
  return (
    <React.Fragment>
      <Header system={system} />
      <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          activeTintColor: 'white',
          indicatorStyle: {
            color: 'red',
            backgroundColor: colors.primaryLight
          },
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: colors.primary }
        }}
      >
        <Tab.Screen
          name="Symbols"
          component={TilePage}
          initialParams={symbols}
        />
        <Tab.Screen
          name="Phrases"
          component={PhrasePage}
          initialParams={route.params}
        />
                <Tab.Screen
          name="Demo"
          component={DemoPage}
          initialParams={route.params}
        />
        
      </Tab.Navigator>
    </React.Fragment>
  )
}

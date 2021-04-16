import React from 'react'
import Header from './components/Header.js'

import TilePageClass from './pages/TilePageClass.js'
import PhrasePage from './pages/PhrasePage.js'

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

const TabView = ({ route }) => {
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
          labelStyle: { fontSize: 14, fontFamily: 'Futura' },
          style: { backgroundColor: colors.primary }
        }}
      >
        <Tab.Screen
          name="Symbols"
          component={TilePageClass}
          initialParams={symbols}
        />
        <Tab.Screen
          name="Phrases"
          component={PhrasePage}
          initialParams={route.params}
        />      
      </Tab.Navigator>
    </React.Fragment>
  )
}

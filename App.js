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
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator swipeEnabled={false}>
          <Tab.Screen name="Torah" component={TilePage} />
          <Tab.Screen name="Phrases" component={TilePage} />
        </Tab.Navigator> */}

      <Drawer.Navigator>
        <Drawer.Screen name="Torah" component={TabView} initialParams={{systemName: 'Torah'}}/>
        <Drawer.Screen name="Haftarah" component={TabView} initialParams={{systemName: 'Hafrarah'}}/>
        <Drawer.Screen name="HHD" component={TabView} initialParams={{systemName: 'HHD'}}/>
        <Drawer.Screen name="Ruth" component={TabView} initialParams={{systemName: 'Ruth'}}/>
        <Drawer.Screen name="Lamentation" component={TabView} initialParams={{systemName: 'Lamentation'}}/>
        <Drawer.Screen name="Esther" component={TabView} initialParams={{systemName: 'Esther'}}/>

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const TabView = ({route}) => {
  let system = route.params.systemName
  return ( 
        <React.Fragment>
          {/* <SafeAreaView style={styles.navbar}>
            <Text>Hey</Text>
          </SafeAreaView> */}
        <Tab.Navigator swipeEnabled={false}>
           {/* <Tab.Screen name={'books'} component={TilePage} initialParams={system}/> */}
          <Tab.Screen name={system} component={TilePage} initialParams={system}/>
          <Tab.Screen name="Phrases" component={TilePage} initialParams={system}/>
        </Tab.Navigator> 
        </React.Fragment>
   );
}
 
const styles = StyleSheet.create({
  navbar: {
    height: 50,
  }
})
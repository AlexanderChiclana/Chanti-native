import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from './components/Tile.js'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tileContainer}>
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </View>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.sequencer}>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tileContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 100,
    // backgroundColor: '#68BEF6',
    // height: '80%'
  },
  sequencer: {
    width: '100%',
    // position: 'absolute',
    zIndex: 0,
    height: 200,
    backgroundColor: 'blue'
  }
})

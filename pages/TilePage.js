import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'

import {colors} from '../theme.js'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function TilePage({}) {
  const [sequencerPosition, setSequencerPosition] = useState(null)
  // const [sequencerColor, setSequencerColor] = useState('blue')

  const isDropZone = (gesture) => {
    const dz = sequencerPosition;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
}

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.tileContainer}>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
        <Tile isDropZone={isDropZone}/>
      </View>
      <View
        style={styles.sequencer}
        onLayout={event => setSequencerPosition(event.nativeEvent.layout)}
      >
        <Sequencer />
        <MediaControls />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.primaryLight,
    height: '100%',
  },
  tileContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    height: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    zIndex: 100,
  },
  sequencer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
  }
})

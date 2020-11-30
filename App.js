import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from './components/Tile.js'

export default function App() {
  const [sequencerPosition, setSequencerPosition] = useState(null)
  const [sequencerColor, setSequencerColor] = useState('blue')

  const isDropZone = (gesture) => {
    const dz = sequencerPosition;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tileContainer}>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        <Tile isDropZone={isDropZone} setSequencerColor={setSequencerColor}/>
        {/* <View style={{height: 60, width: 60}}/> */}
      </View>
      {/* <StatusBar style="auto" /> */}
      <View
        style={{...styles.sequencer, backgroundColor: sequencerColor}}
        onLayout={event => setSequencerPosition(event.nativeEvent.layout)}
      ></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  tileContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
    zIndex: 100
  },
  sequencer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    height: 200,
    // backgroundColor: 'blue'
  }
})

import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import AudioSequence from '../components/AudioSequence.js'

import { colors } from '../theme.js'

export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerPosition, setSequencerPosition] = useState(null)

  const isDropZone = gesture => {
    const dz = sequencerPosition
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height
  }

  // sequencing
  const [sequence, setSequence] = useState([null, null, null, null, null, null])

  // tile controls 
  const addSymbol = item => {
    const sequenceCopy = [...sequence]

    sequenceCopy[sequenceCopy.findIndex(space => space === null)] = {
      playCompletion: 0,
      symbol: item.symbol,
      sound: item.sound
    }
    setSequence(sequenceCopy)
  }

  const clearSequence = () => {
    setSequence([null, null, null, null, null, null])
  }


  return (
    <View style={styles.app}>
      <View style={styles.tileFlexContainer}>
        <View style={styles.tileContainer}>
          {symbols.map((symbol, i) => (
            <Tile key={i} isDropZone={isDropZone} addSymbol={addSymbol} {...symbol} />
          ))}
        </View>
      </View>
      <View
        style={styles.sequencer}
        onLayout={event => setSequencerPosition(event.nativeEvent.layout)}
      >
        <AudioSequence />
        <Sequencer sequence={sequence}/>
        <MediaControls clearSequence={clearSequence}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.primaryLight,
    height: '100%',
    flex: 1
  },
  tileFlexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 5,
    marginLeft: 5
  },
  sequencer: {
    width: '100%',
    bottom: 0,
    zIndex: 0,
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    alignSelf: 'stretch'
  }
})

import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import { Audio } from 'expo-av'

import { colors } from '../theme.js'

import SoundSequence from '../components/SoundSequence.js'

import { TouchableHighlight } from 'react-native-gesture-handler'

export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerPosition, setSequencerPosition] = useState(null)

  // sequence of symbols, each contains logo and audio file
  const [sequence, setSequence] = useState([])

  // audio player state
  const [playStatus, setPlayStatus] = useState('STOPPED')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [volume, setVolume] = useState(1.0)

  const handleStop = async () => {}

  const handlePlayPause = () => {
    if (playStatus === 'STOPPED' || playStatus === 'PAUSED') {
      setPlayStatus('PLAYING')
    } else {
      setPlayStatus('PAUSED')
    }
  }

  // tile controls
  const addSymbol = symbol => {
    setSequence(prevSequence => [...prevSequence, { ...symbol }])
  }

  const clearSequence = () => {
    //   handleStop()
    //   setSequence([])
  }

  // for determining tile drop zone
  const isDropZone = gesture => {
    const dz = sequencerPosition
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height
  }

  return (
    <View style={styles.app}>
      <View style={styles.tileFlexContainer}>
        <View style={styles.tileContainer}>
          {symbols.map((symbol, i) => (
            <Tile
              key={i}
              isDropZone={isDropZone}
              addSymbol={addSymbol}
              {...symbol}
            />
          ))}
        </View>
      </View>
      <View
        style={styles.sequencer}
        onLayout={event => setSequencerPosition(event.nativeEvent.layout)}
      >
        <Sequencer sequence={sequence} />
        <SoundSequence
          playStatus={playStatus}
          sequence={sequence}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <MediaControls
          clearSequence={clearSequence}
          handlePlayPause={handlePlayPause}
          handleStop={handleStop}
          playStatus={playStatus}
        />
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

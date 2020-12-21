import React, { useState, useEffect, Component, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'

import { colors } from '../theme.js'

import SoundSequence from '../components/SoundSequence.js'


export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerXY, setSequencerXY] = useState(null)

  // audio player state
  const [playStatus, setPlayStatus] = useState('STOPPED')
  const [currentIndex, setCurrentIndex] = useState(0)

  // audio player

  // sequence of symbols, each contains logo and audio file
  const [sequence, setSequence] = useState([])

  const calcIndex = () => {
    // increments index if it isnt the final in sequence
    currentIndex < sequence.length - 1
      ? setCurrentIndex(currentIndex + 1)
      : handleStop()
  }

  const handleStop = () => {
    setPlayStatus('STOPPED')
    setCurrentIndex(0)
  }

  const handlePlayPause = () => {
    if (sequence.length > 0) {
      playStatus === 'STOPPED' || playStatus === 'PAUSED'
        ? setPlayStatus('PLAYING')
        : setPlayStatus('PAUSED')
    }
  }

  // tile controls
  const addSymbol = symbol => {
   sequence.length < 6 && setSequence(prevSequence => [...prevSequence, { ...symbol }])
  }

  const clearSequence = () => {
    handleStop()
    setSequence([])
  }

  // for determining tile drop zone
  const isDropZone = gesture => {
    const dz = sequencerXY
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height
  }

  // ref created for the drop target zone 
  const layoutRef = useRef()
  
  // ref that uses react native ref method to location the position and size of the drop target, sets in state after layout occurs 
  const setLayoutRef = () => {
    layoutRef.current.measureInWindow((x, y, width, height) => {
      setSequencerXY({
          width: width,
          height: height,
          x: x,
          y: y
      })
    })
  }

  return (
    <View style={styles.app}      
    >
      <View 
        style={styles.tileFlexContainer}>
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
        ref={layoutRef}
        onLayout={() => setLayoutRef()}
      >
        <Sequencer sequence={sequence} playStatus={playStatus} currentIndex={currentIndex}/>
        <SoundSequence
          playStatus={playStatus}
          sequence={sequence}
          currentIndex={currentIndex}
          calcIndex={calcIndex}
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

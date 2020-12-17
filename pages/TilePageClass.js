import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import { Audio } from 'expo-av'

import { colors } from '../theme.js'

import Sound from '../components/Sound.js'
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerPosition, setSequencerPosition] = useState(null)

  // sequence of symbols, each contains logo and audio file
  const [sequence, setSequence] = useState([])

  // audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [volume, setVolume] = useState(1.0)
  //   const [isBuffering, setIsBuffering] = useState(true)

  // state for current playback item
  const [isFinished, setIsFinished] = useState(false)
  const [playbackPosition, setPlaybackPosition] = useState(0)
  // used for whenever a file finishes playing so that it can unload from memory

  // useEffect for mounting

  // new ones
  const [sound, setSound] = React.useState()

  const playSound = async () => {
    setIsPlaying(true)
    // console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      sequence[currentIndex].sound
    )
    setSound(sound)
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)

    // console.log('Playing Sound')
    await sound.playFromPositionAsync(playbackPosition)
    // await sound.unloadAsync()
  }

  // callback function that runs during playback, used to trigger audio unloading and incrementing after finishing
  const onPlaybackStatusUpdate = playbackStatus => {
    const isLast = (sequence.length - 1) === (currentIndex)

    console.log(isLast)

    if (playbackStatus.didJustFinish) {
      setIsFinished(true)
      console.log('did just finish')
      //   console.log(playbackStatus)
      setPlaybackPosition(0)
      if (!isLast) {
        setCurrentIndex(currentIndex + 1)
      } else {
        console.log('last one playing')
        // setCurrentIndex(currentIndex + 1)

        setCurrentIndex(0)
        setIsPlaying(false)
        handleStop()
      }
    } else {
      setPlaybackPosition(playbackStatus.positionMillis)
      setIsFinished(false)
    }
  }

  // hook for handling unloading whenever audio file finishes playing. Keeps async code consistent with react state
  useEffect(() => {
    isFinished && handleUnload()
  }, [isFinished])

  // async function for unloading the audio file. Checks to see if there is a sound in react state and then unloads that sound

  
  const handleUnload = async () => {
    if (sound) {
    //   console.log('unloading')
      await sound.unloadAsync()
    } else {
      ;('there is no sound')
    }
  }

  const handlePause = async () => {
    if (sound) {
      console.log('pausing')
      await sound.pauseAsync()
      setIsPlaying(false)
    } else {
      ;('there is no sound')
    }
  }

  const handleStop = async () => {
    if (sound) {
      console.log('stopping')
      await sound.stopAsync()
      setIsPlaying(false)
    } else {
      ;('there is no sound')
    }
  }

  useEffect(() => {
    if (isPlaying) {
      playSound()
    }
  }, [isPlaying])

  useEffect(() => {
    if (sound && isPlaying) {
        console.log('effect firing')
      playSound()
    }
  }, [currentIndex])

  const handlePlayPause = () => {

    if (isPlaying) {
      handlePause()
    } else {
      setIsPlaying(true)
  
    }

  }

  // tile controls
  const addSymbol = symbol => {
    setSequence(prevSequence => [...prevSequence, { ...symbol }])
    //   setCurrentIndex(0)
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
        <MediaControls
          clearSequence={clearSequence}
          handlePlayPause={handlePlayPause}
          handleStop={handleStop}
          isPlaying={isPlaying}
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

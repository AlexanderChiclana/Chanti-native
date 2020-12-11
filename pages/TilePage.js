import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import { Audio } from 'expo-av'

import { useIsMount } from '../hooks/useIsMount.js'

import systemsArr from '../data/systems.js'

import { colors } from '../theme.js'

// const temp = systemsArr[0].symbols[0].sound

export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerPosition, setSequencerPosition] = useState(null)

  // sequence of symbols, each contains logo and audio file
  const [sequence, setSequence] = useState([null, null, null, null, null, null])
  // audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackInstance, setPlaybackInstance] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [volume, setVolume] = useState(1.0)
  const [isBuffering, setIsBuffering] = useState(true)

  // useEffect for mounting
  useEffect(() => {
    ;(async function asyncUseEffect() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true
        })

        // loadAudio()
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const isMount = useIsMount()
  //useEffect for index changing
  useEffect(() => {
    if (isMount) {
      console.log('First Render')
    } else {
      console.log(`The sequence is ${JSON.stringify(sequence)}`)
      console.log(`The index is ${currentIndex}`)
      loadAudio()
      console.log('Subsequent Render')
    }
  }, [currentIndex])

  // audio functions
  const loadAudio = async () => {
    
      try {
        const playbackInstance = new Audio.Sound()
        // const source = audioBookPlaylist[currentIndex].uri
        // console.log('loading audio')
        const status = {
          shouldPlay: isPlaying,
          volume: volume
        }
        // console.log(systemsArr[0].symbols[0])

        playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        // console.log(`this guy right here ${sequence[currentIndex].sound} and ${currentIndex}`)

        // reference to file causing problems, fails to load audio when attempting to load a null value
        await playbackInstance.loadAsync(
          sequence[currentIndex].sound,
          // temp,
          status,
          false
        )

        setPlaybackInstance(playbackInstance)
        // console.log(sequence[0])
      } catch (e) {
        console.log('something went wrong while loading')
        console.log(e)
      }
    
  }

  const onPlaybackStatusUpdate = playbackStatus => {
    // console.log(playbackStatus)
    setIsBuffering(playbackStatus.isBuffering)

    if (playbackStatus.didJustFinish) {
      handleNextTrack()
    }
  }

  const handlePlayPause = async () => {
    // if the sequencer is empty, dont allow
    if (sequence[0] !== null) {
      isPlaying
        ? await playbackInstance.pauseAsync()
        : await playbackInstance.playAsync()

      setIsPlaying(!isPlaying)
    } else {
      console.log('sequence is empty')
    }
  }

  const handleNextTrack = () => {
    // will need to make reset
    setCurrentIndex(currentIndex + 1)
  }

  const handleStop = async () => {
    if (sequence[0] !== null) {
      setCurrentIndex(null)
      setIsPlaying(false)
      await playbackInstance.stopAsync()
    }
  }

  // tile controls
  const addSymbol = item => {
    const sequenceCopy = [...sequence]

    sequenceCopy[sequenceCopy.findIndex(space => space === null)] = {
      playCompletion: 0,
      symbol: item.symbol,
      sound: item.sound
    }
    setSequence(sequenceCopy)
    setCurrentIndex(0)
  }

  const clearSequence = () => {
    handleStop()
    setSequence([null, null, null, null, null, null])
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
          currentIndex={currentIndex}
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

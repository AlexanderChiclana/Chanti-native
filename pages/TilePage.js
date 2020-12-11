import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import AudioSequence from '../components/AudioSequence.js'
import { Audio } from 'expo-av'

import { colors } from '../theme.js'

const audioBookPlaylist = [
  {
    title: 'Hamlet - Act I',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: require('../assets/Braamamma.wav'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act II',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: require('../assets/Cello.wav'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act III',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: require('../assets/alien.wav'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act IV',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: require('../assets/Pulse.wav'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act V',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: require('../assets/Melting.wav'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  }
]

export default function TilePage({ route }) {
  const symbols = route.params.symbols

  const [sequencerPosition, setSequencerPosition] = useState(null)

  // sequence of symbols, each contains logo and audio file
  const [sequence, setSequence] = useState([null, null, null, null, null, null])
  // audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackInstance, setPlaybackInstance] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
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

        loadAudio()
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  //useEffect for index changing
  useEffect(() => {
    loadAudio()
  },[currentIndex])

  // audio functions
  const loadAudio = async () => {
    try {
      console.log('trying to load')
      const playbackInstance = new Audio.Sound()
      // const source = audioBookPlaylist[currentIndex].uri
      // console.log('loading audio')
      const status = {
        shouldPlay: isPlaying,
        volume: volume
      }
      // console.log(systemsArr[0].symbols[0])

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      await playbackInstance.loadAsync(
        audioBookPlaylist[currentIndex].uri,
        status,
        false
      )

      setPlaybackInstance(playbackInstance)
    } catch (e) {
      console.log('something went wrong')
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
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

    setIsPlaying(!isPlaying)
	}


	const handleNextTrack = () => {
    // will need to make reset
  
    setCurrentIndex(currentIndex + 1)
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
  }

  const clearSequence = () => {
    setSequence([null, null, null, null, null, null])
  }

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
        <MediaControls clearSequence={clearSequence} handlePlayPause={handlePlayPause}/>
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

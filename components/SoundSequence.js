import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import { Audio } from 'expo-av'

import { colors } from '../theme.js'

import systemsArr from '../data/systems.js'
import Sound from './Sound.js'

const SoundSequence = props => {
  const { sequence, playStatus, currentIndex, setCurrentIndex } = props
  console.log(sequence)
  return (
    <>
      {sequence.map((soundData, index) => {
        if (index === currentIndex && playStatus !== 'STOPPED') {
          return (
            <Sound
              playStatus={playStatus}
              file={soundData.sound}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              key={index}
            />
          )
        }
      })}
    </>
  )
}

export default SoundSequence

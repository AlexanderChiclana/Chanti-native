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
  const { sequence, isPlaying, currentIndex } = props

  return (
    <>
      <Sound />
    </>
  )
}

export default SoundSequence

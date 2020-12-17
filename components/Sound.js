import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tile from '../components/Tile.js'
import Sequencer from '../components/Sequencer.js'
import MediaControls from '../components/MediaControls.js'
import { Audio } from 'expo-av'

import { colors } from '../theme.js'

import systemsArr from '../data/systems.js'

class Sound extends Component {
  state = {
    sound: null
  }

  playFile = async () => {
    await this.state.sound.playAsync()
  }

  pauseFile = async () => {
    await this.state.sound.pauseAsync()
  }

  unloadFile = async () => {
    if (this.state.sound) {
      console.log('unloading')
      await this.state.sound.unloadAsync()
    } else {
      ;('there is no sound')
    }
  }

  onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      this.props.setCurrentIndex(this.props.currentIndex + 1)
      console.log('audio finished')
    }
  }

  componentDidMount() {
    const loadData = async () => {
      const { sound } = await Audio.Sound.createAsync(
        // systemsArr[0].symbols[0].sound
        this.props.file
      )
      this.setState({
        sound: sound
      })
      sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
    }
    loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { playStatus } = this.props
    if (this.state.sound && this.state.sound !== prevState.sound) {
      this.playFile()
    }

    if (playStatus !== prevProps.playStatus) {
      playStatus === 'PLAYING' ? this.playFile() : this.pauseFile()
    }
  }

  componentWillUnmount() {
    this.unloadFile()
  }

  render() {
    return <></>
  }
}

export default Sound

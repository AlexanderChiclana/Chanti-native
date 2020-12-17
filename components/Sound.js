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

  onPlaybackStatusUpdate = (playbackStatus) => {
      if (playbackStatus.didJustFinish){
          console.log('audio finished')
      }
  }

  componentDidMount() {
    const loadData = async () => {
      const { sound } = await Audio.Sound.createAsync(
        systemsArr[0].symbols[0].sound
      )
      this.setState({
        sound: sound
      })
        sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
    }
    loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.sound && this.state.sound !== prevState.sound) {
      this.playFile()
    }
  }

  componentWillUnmount(){
      this.unloadFile()
  }

  render() {
    return <></>
  }
}

export default Sound

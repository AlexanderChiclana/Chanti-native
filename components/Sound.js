import React, { Component } from 'react'

import { Audio } from 'expo-av'

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
      await this.state.sound.unloadAsync()
    } else {
        console.log('something went wrong with the unload')
    }
  }

  onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      this.props.calcIndex()
    }
  }

  componentDidMount() {
    const loadData = async () => {

      const { sound } = await Audio.Sound.createAsync(
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

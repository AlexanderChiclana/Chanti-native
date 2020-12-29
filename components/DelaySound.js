import React, { Component } from 'react'

import { Audio } from 'expo-av'

// convert to handle all sounds and sequnce play
class Sound extends Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      sound: null
    }
  }

  playFile = async () => {
    if (this._isMounted) {
        console.log('should be playing')
      await this.state.sound.playAsync()
    } else {
        console.log('something went wrong playing')
    }
  }

  stopFile = async () => {
    if (this._isMounted) {
      await this.state.sound.stopAsync()
    }
  }

  unloadFile = async () => {
    if (this._isMounted) {
      if (this.state.sound) {
        await this.state.sound.unloadAsync()
      } else {
        console.log('something went wrong with the unload')
      }
    }
  }

  componentDidMount() {
    this._isMounted = true
    //   console.log(this.props.file)
    const loadData = async () => {
      const { sound } = await Audio.Sound.createAsync(this.props.file)
      this.setState({
        sound: sound
      })
      //   sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
    }
    loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { playStatus } = this.props

    if (this._isMounted && this.state.sound && playStatus !== prevProps.playStatus) {
      playStatus === 'PLAYING' ? this.playFile() : this.stopFile()
    }
  }

  componentWillUnmount() {
    this.unloadFile()
    this._isMounted = false
  }

  render() {
    return <></>
  }
}

export default Sound

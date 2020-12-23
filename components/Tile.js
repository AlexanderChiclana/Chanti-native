import React, { useState, useRef, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  Animated
} from 'react-native'

import { tileSize, colors } from '../theme.js'

import Sound from './Sound.js'
import { Audio } from 'expo-av'

import * as Animatable from 'react-native-animatable'

class Tile extends Component {
  constructor(props) {
    super(props)
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: (event, gesture) => {
        this.setState({
          playStatus: 'PLAYING'
        })
        // this.playFile()
      },
      onPanResponderMove: (event, gesture) => {
        this.setState({
          zIndex: 999,
          isDragging: true,
          playStatus: 'STOPPED'
        })
        position.setValue({ x: gesture.dx, y: gesture.dy })
        // this.stopFile()

        // demo code for hovering confirm and firing off function
        // this.props.isDropZone(gesture)
        //   ? this.props.setSequencerColor('purple')
        //   : this.props.setSequencerColor('blue')
      },
      onPanResponderRelease: (evt, gesture) => {
        this.setState({
          zIndex: 0,
          isDragging: false
        })
        // console.log(gesture)
        // demo code for confirming drop target and firing off function
        // this.props.isDropZone(gesture) && this.props.setSequencerColor('red')
        // resetting the tile back to original position
        this.props.isDropZone(gesture) &&
          this.props.addSymbol({
            symbol: this.props.symbol,
            sound: this.props.sound
          })

        position.setValue({ x: 0, y: 0 })
      }
    })

    this.state = {
      panResponder,
      position,
      zIndex: 0,
      isDragging: false,
      playStatus: 'STOPPED',
      sound: null
    }
  }

  playFile = async () => {
    if (this.state.sound) {
      try {
        await this.state.sound.playAsync()
      } catch {
        console.log('something went wrong playing the file')
      }
    } else {
      console.log('there is no sound loaded')
    }
  }

  stopFile = async () => {
    if (this.state.sound) {
      try {
        await this.state.sound.stopAsync()
      } catch {
        console.log('something didnt stop right')
      }
    } else {
      console.log('there is no sound loaded')
    } 
  }
  
  unloadFile = async () => {
    try {
      if (this.state.sound) {
        await this.state.sound.unloadAsync()
      } else {
        console.log('something went wrong with the unload')
      }
    } catch {
      console.log('unload fail caught')
    }
  }

  // onPlaybackStatusUpdate = playbackStatus => {
  //   if (this.props.isSequential && playbackStatus.didJustFinish) {
  //     this.props.calcIndex()
  //   }
  // }

  componentDidMount() {
    const loadData = async () => {
      const { sound } = await Audio.Sound.createAsync(this.props.sound)
      this.setState({
        sound: sound
      })
      // sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
    }
    loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { playStatus, sound } = this.state

    if (sound && playStatus !== prevState.playStatus) {
      playStatus === 'PLAYING' ? this.playFile() : this.stopFile()
    } 
  }

  componentWillUnmount() {
    this.unloadFile()
  }

  render() {
    let handles = this.state.panResponder.panHandlers

    return (
      <View
        style={{
          ...styles.empty,
          zIndex: this.state.zIndex,
          opacity: this.state.isDragging ? 0.7 : 1
        }}
      >
        {/* { this.state.isPlaying &&
           <Sound
              playStatus={'PLAYING'}
              file={this.props.sound}
              isSequential={false}
                  />
        } */}
        <Animated.View
          style={[
            this.state.position.getLayout(),
            { zIndex: this.state.zIndex }
          ]}
          {...handles}
        >
          <View style={styles.container}>
            <Text style={styles.letter}>{this.props.symbol}</Text>
            <View style={styles.box} />
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default Tile

const styles = StyleSheet.create({
  empty: {
    height: tileSize.medium,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: tileSize.medium,
    width: tileSize.medium,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary
  },
  letter: {
    fontSize: 30
  }
})

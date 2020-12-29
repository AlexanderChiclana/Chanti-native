import React, { useState, useRef, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  PanResponder,
  Animated
} from 'react-native'

import { tileSize, colors } from '../theme.js'

import DelaySound from './DelaySound.js'

import { Audio } from 'expo-av'

import * as Animatable from 'react-native-animatable'

import ReactTimeout from 'react-timeout'

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
        // console.log('tap registered' + this.state.playStatus)
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

  stopPlay = () => {
    console.log('stopping play')
    this.setState({
      playStatus: 'STOPPED'
    })
  }

  componentWillUnmount() {
    this.setState({
      playStatus: 'STOPPED'
    })
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
        <DelaySound
          playStatus={this.state.playStatus}
          file={this.props.sound}
          stopPlay={this.stopPlay}
        />

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

export default ReactTimeout(Tile)

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

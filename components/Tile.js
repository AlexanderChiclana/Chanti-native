import React, { useState, useRef, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PanResponder,
  Animated
} from 'react-native'

import Draggable from 'react-native-draggable'

class Tile extends Component {
  constructor(props) {
    super(props)
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.setState({
          zIndex: 999,
        })
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (evt, gesture) => {
        this.setState({
          zIndex: 0
        })
        console.log(evt)
        position.setValue({ x: 0, y: 0 })
      },
    })

    this.state = { panResponder, position, zIndex: 0 }
  }

  render() {
    let handles = this.state.panResponder.panHandlers;

    return (
      <View style={{...styles.empty, zIndex: this.state.zIndex}}>
      <Animated.View
        style={[this.state.position.getLayout(), {zIndex: this.state.zIndex, position: 'absolute'}]}  
        {...handles}
      >
        <View style={styles.container}>
          <Text style={styles.letter}>A</Text>

          <View style={styles.box} />
        </View>
      </Animated.View>
      </View>
    )
  }
}

export default Tile

const styles = StyleSheet.create({
  empty:{
    height: 60,
    width: 60,
    margin: 5,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    width: 60,
    margin: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  letter: {
    fontSize: 30
  }
})

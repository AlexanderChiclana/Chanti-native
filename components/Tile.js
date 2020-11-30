import React, { useState, useRef, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PanResponder,
  Animated
} from 'react-native'

class Tile extends Component {
  constructor(props) {
    super(props)
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.setState({
          zIndex: 999
        })
        position.setValue({ x: gesture.dx, y: gesture.dy })
        // demo code for hovering confirm and firing off function
        this.props.isDropZone(gesture)
          ? this.props.setSequencerColor('purple')
          : this.props.setSequencerColor('blue')
      },
      onPanResponderRelease: (evt, gesture) => {
        this.setState({
          zIndex: 0
        })
        // console.log(gesture)
        // demo code for confirming drop target and firing off function
        this.props.isDropZone(gesture) && this.props.setSequencerColor('red')
        // resetting the tile back to original position
        position.setValue({ x: 0, y: 0 })
      }
    })

    this.state = { panResponder, position, zIndex: 0 }
  }

  render() {
    let handles = this.state.panResponder.panHandlers

    return (
      <View style={{ ...styles.empty, zIndex: this.state.zIndex }}>
        <Animated.View
          style={[
            this.state.position.getLayout(),
            { zIndex: this.state.zIndex }
          ]}
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
  empty: {
    height: 60,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    width: 60,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black'

  },
  letter: {
    fontSize: 30
  }
})

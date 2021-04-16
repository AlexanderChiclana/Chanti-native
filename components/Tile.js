import React, { useState, useRef, Component } from 'react'
import { StyleSheet, Text, View, PanResponder, Animated, ImageBackground } from 'react-native'

import { tileSize, colors } from '../theme.js'

import DelaySound from './DelaySound.js'
import Svg, { Circle, Rect, Path } from 'react-native-svg'
// import Merekha from '../assets/1-merekha.svg'
// import tileSVG from '../data/graphics.js'

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
      sound: null,
      // svg: null
    }
  }

  componentDidMount() {
    // this.setState({
    //   svg: tileSVG['segol']
    // })
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
            <ImageBackground source={this.props.symbol} style={{width: 50, height: 50 }}>
            <Text style={styles.letter}>
            {console.log(this.props.symbol)}
            {/* {tileSVG['merekha']} */}
            {/* {this.state.svg} */}
            
            </Text>
            {/* {this.props.symbol} */}
            {/* <Svg height="80%" width="80%" viewBox="0 0 100 100">
            
              {this.props.symbol}

            </Svg> */}
            <View style={styles.box} />
            </ImageBackground>
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
    // borderWidth: 1,
    // borderColor: colors.primary
  },
  letter: {
    fontSize: 30
  }
})

// const tileSVG = {
//   merekha: (
//     <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={50}
//     height={50}
//     viewBox="0 0 1299 1577"
//     stroke="#000"
//     fill="none"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     >
//       <Path
//         class="selected"
//         fill="#000000"
//         opacity="1.000000"
//         stroke="none"
//         d="
//  M897.130662 0.000001 C912.285889 32.273911 919.371048 67.684713 925.059777 102.883072 C950.889713 262.702890 950.004367 429.487102 899.173731 583.193984 C843.076434 752.826762 726.353591 900.803295 577.396701 999.464488 C428.439811 1098.125681 248.482161 1147.725807 69.837760 1144.833773 C46.558497 1027.535548 23.279248 910.237323 0.000000 792.939097 C90.719814 785.400675 181.307979 767.097148 264.333334 729.764837 C347.358689 692.432526 422.720376 635.244373 473.467171 559.668757 C560.696733 429.760531 566.286994 257.010028 517.036560 108.485494 C643.734595 72.323663 770.432626 36.161831 897.130657 -0.000000 z"
//       />
//     </Svg>
//   )
// }

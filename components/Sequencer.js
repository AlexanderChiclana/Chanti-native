import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native'
import { colors, borders } from '../theme.js'
import * as Animatable from 'react-native-animatable'

export default function Sequencer(props) {
  const { sequence, currentIndex, playStatus } = props
  return (
    <View style={styles.sequencerContainer}>
      {[...sequence, ...new Array(6 - sequence.length).fill(null)].map(
        (space, i) => (
          <Space
            key={i}
            index={i}
            currentIndex={currentIndex}
            playStatus={playStatus}
            {...space}
            isEmpty={space === null}
          />
        )
      )}
    </View>
  )
}

const Space = props => {
  const { index, currentIndex, playStatus, isEmpty } = props
  const isPlaying = index === currentIndex && playStatus !== 'STOPPED'
  const hasPlayed = index < currentIndex && playStatus !== 'STOPPED'

  const calcStyle = () => {
    if (isPlaying) {
      return {
        backgroundColor: colors.secondary
      }
    } else if (hasPlayed) {
      return {
        // backgroundColor: 'blue',
        opacity: 0.2
      }
    }
  }

  return (
    <>
      {isEmpty ? (
        <View style={{ ...styles.spaceContainer, ...styles.empty }}></View>
      ) : (
        <Animatable.View animation="bounceIn">
          <View
            style={{
              ...styles.spaceContainer,
              ...styles.filled,
              ...calcStyle()
            }}
          >
            <ImageBackground
              source={props.symbol}
              style={{ width: 40, height: 40 }}
            >
              {/* <Text style={{ fontSize: 30 }}>{props.symbol}</Text> */}
            </ImageBackground>
          </View>
        </Animatable.View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  spaceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    margin: 5,
    marginTop: 10,
    borderRadius: 5
  },
  filled: {
    backgroundColor: 'white'
  },
  empty: {
    // backgroundColor: 'rgba(255,255,255, .5)'
    backgroundColor: 'white',
    opacity: 0.5
  },
  sequencerContainer: {
    flexDirection: 'row-reverse'
  }
})

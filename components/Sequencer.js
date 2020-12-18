import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { colors, borders } from '../theme.js'

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
  // console.log(props)
  const { index, currentIndex, playStatus, isEmpty } = props
  const isPlaying = index === currentIndex && playStatus !== 'STOPPED'
  const hasPlayed = index < currentIndex && playStatus !== 'STOPPED'

  const calcStyle = () => {
    if (isPlaying) {
      return {
        backgroundColor: colors.secondaryLight
      }
    } else if (hasPlayed) {
      return {
        // backgroundColor: 'blue',
        opacity: .2,
      }
    }
  }

  return (
    <>
      {isEmpty ? (
        <View style={{ ...styles.spaceContainer, ...styles.empty }}></View>
      ) : (
        <View style={{ ...styles.spaceContainer, ...styles.filled, ...calcStyle()}}>
          <Text style={{ fontSize: 30 }}>{props.symbol}</Text>
        </View>
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
    opacity: .5
  },
  sequencerContainer: {
    flexDirection: 'row-reverse'
  }
})

import React from 'react'
import Sound from './Sound.js'
import { Audio } from 'expo-av'

// settings for all audio played through app 
Audio.setAudioModeAsync({
    playsInSilentModeIOS: true
})

const SoundSequence = props => {
  const { sequence, playStatus, currentIndex, calcIndex } = props
  return (
    <>
      {sequence.map((soundData, index) => {
        if (index === currentIndex && playStatus !== 'STOPPED') {
          return (
            <Sound
              playStatus={playStatus}
              file={soundData.sound}
              calcIndex={calcIndex}
              currentIndex={currentIndex}
              key={index}
            />
          )
        }
      })}
    </>
  )
}

export default SoundSequence

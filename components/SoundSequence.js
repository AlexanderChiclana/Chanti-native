import React from 'react'
import Sound from './Sound.js'

const SoundSequence = props => {
  const { sequence, playStatus, currentIndex, calcIndex } = props
  console.log(sequence)
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

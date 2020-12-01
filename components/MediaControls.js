import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import {
  colors,
  borders
} from '../theme.js'



// const Bar = styled.div`
//   padding: 0 10 0 10,
//   border-radius: 120,
//   border: ${borders.medium},
//   background-color: ${colors.primaryLight},
//   display: flex,
//   height: 115,
//   width: 100%,
//   align-items: center,
//   justify-content: space-between,
// `

// const PlayButton = styled.div`
//   background-color: ${colors.secondary},
//   border-radius: 50%,
//   border: ${borders.medium},
//   height: 200,
//   width: 200,
//   display: flex,
//   justify-content: center,
//   align-items: center,
// `


// const MediaButton = styled.div`
// background-color: ${colors.offBlack},
// border-radius: 50%,
// border: ${borders.medium},
// height: 80,
// width: 80,
// `

const MediaWidget = ({navigation}) => {
//   const { setSequencePlayStatus, sequencePlayStatus, setCurrentSound } = props

//   const handlePlayPause = () => {
//     if(sequencePlayStatus === 'PLAYING'){
//       setSequencePlayStatus('PAUSED')
//     } else {
//       setSequencePlayStatus('PLAYING')
//     }
//   }

//   const handleStop = () => {
//     console.log('stopping')
//     setCurrentSound(0)
//     setSequencePlayStatus('STOPPED')
//   }

// console.log(navigation)
  return (
    <View style={styles.mediaWidgetContainer}>
      <View style={styles.bar}>
        <View style={styles.mediaButton}/> 
        {/* <PlayButton sequencePlayStatus={sequencePlayStatus} onClick={() => handlePlayPause()}>
          {sequencePlayStatus}
        </PlayButton> */}
        <View style={styles.playButton}>

        </View>
        <View style={styles.mediaButton}/> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mediaWidgetContainer: {
        width: 220,
        justifyContent: 'center',
    },
    bar:{
        padding: 10,
        marginBottom: 10,
        borderRadius: 120,
        backgroundColor: colors.primaryLight,
        height: 60,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    sequencerContainer: {
        flexDirection: 'row',
    },
    mediaButton:{
        backgroundColor: colors.offBlack,
        borderRadius: 60,
        height: 50,
        width: 50,
    },
    playButton:{
        backgroundColor: colors.secondary,
        borderRadius: 50,
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
    }
  })
  

export default MediaWidget

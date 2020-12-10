import React, { Component, useEffect } from 'react'
// import {
//     Player,
//     Recorder,
//     MediaStates
// } from '@react-native-community/audio-toolkit';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity
} from 'react-native'

import { Audio } from 'expo-av'

class AudioSequence extends Component {
  async componentDidMount() {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/Braamamma.wav'));
      await soundObject.playAsync();
      await soundObject.setStatusAsync()
      // Your sound is playing!
      console.log(soundObject)
      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      await soundObject.unloadAsync();
    } catch (error) {
        console.log(error)
      // An error occurred!
    }
  }


  render() {
    return (
      <TouchableOpacity
        // onPress={() => this.playSound()}
        style={{ height: 100, width: 100, backgroundColor: 'red' }}
      >
        {/* <Button title="play" onPress={this.playSound.bind(this)} /> */}
      </TouchableOpacity>
    )
  }
}

// const AudioSequence = () => {
//     const mySound = new Audio.Sound()

//     useEffect(() => {
//         async function loadSound() {
//             console.log("Sound Initialized")
//             await mySound.loadAsync(require('../assets/Braam - Braamamma.wav'), {
//                 shouldPlay: false,
//                 isLooping: false,
//             })
//             // mySound.setOnPlaybackStatusUpdate()
//         }

//         loadSound()

//         // return async () => {
//         //     console.log('Sound destroyed')
//         //     await mySound.unloadAsync()
//         // }
//     })

//     return (
//               <TouchableOpacity
//         // onPress={() => this.playSound()}
//         style={{ height: 100, width: 100, backgroundColor: 'red' }}
//       >
//           {/* <Button title="play" onPress={this.playSound.bind(this)}/> */}
//       </TouchableOpacity>
//      );
// }

// class AudioSequence extends Component {
//     constructor() {
//       super();
//       this.state = {
//         disabled: false
//       };
//     }
//     // componentDidMount(){
//     //     const p = new Player("../assets/Braam - Retro Pulse.wav").play(() => console.log('in callback', p.isPlaying));
//     //     console.log('immediately after play', p.isPlaying);
//     // }

//     _onPress() {
//         console.log(new Player)
//         // new Player('../assets/Braam - Retro Pulse.wav').prepare().play()
//       }

//     render() {
//       return (

//         <TouchableHighlight disabled={this.state.disabled} onPress={() => this._onPress()}>
//           <Text>
//             Press me!
//           </Text>
//         </TouchableHighlight>
//       )
//     }
// }

export default AudioSequence

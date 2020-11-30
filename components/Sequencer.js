import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


export default function Sequencer() {
    const [sequence, setSequence] = useState([null, null, null, null, null, null])

    return(
        <View style={styles.sequencerContainer}>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
        </View>
    )
}

const Space = () => {
    return ( 
        <View style={styles.spaceContainer}>

        </View>
     );
}

const styles = StyleSheet.create({
    spaceContainer: {
        height: 50,
        width: 50,
        backgroundColor: 'rgba(255,255,255, .5)',
        margin: 5,
        marginTop: 10,
        borderRadius: 5,

    },
    sequencerContainer: {
        flexDirection: 'row',
    }
  })
  
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


export default function Sequencer(props) {

    return(
        <View style={styles.sequencerContainer}>
            {props.sequence.map((space, i) => <Space key={i} {...space} isEmpty={space === null}/>)}
        </View>
    )
}

const Space = (props) => {
    console.log(props)
    return ( 
        <>
       { props.isEmpty ? 
        <View style={{...styles.spaceContainer, ...styles.empty}}>

        </View>
        : 
        <View style={{...styles.spaceContainer, ...styles.filled}}>
            <Text style={{fontSize: 30}}>
                {props.symbol}
            </Text>
        </View>
        }
        </>
        
     );
}

const styles = StyleSheet.create({
    spaceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        margin: 5,
        marginTop: 10,
        borderRadius: 5,

    },
    filled:{
        backgroundColor: 'white',
    },
    empty:{
        backgroundColor: 'rgba(255,255,255, .5)',
    },
     sequencerContainer: {
        flexDirection: 'row-reverse',
    }
  })
  
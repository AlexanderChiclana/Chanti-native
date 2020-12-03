import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
// import Tile from '../components/Tile.js'
import Icon from 'react-native-vector-icons/FontAwesome'

import {colors} from '../theme.js'


export default function PhrasePage({}) {

  return (
    <ScrollView style={styles.app}>
        <Phrase />
        <Phrase />
        <Phrase />
        <Phrase /> 
        <Phrase />
        <Phrase />
    </ScrollView>
  )
}

const Phrase = () => {
    return ( 
        <View style={styles.phraseContainer}>
            <View style={styles.tileRow}>
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
            </View>
            <View style={styles.playRow}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Etnakhta</Text>
            <Icon name="play-circle" size={45} color={colors.secondary} />

            </View>
        </View>
     );
}

const Tile = () => {
    return ( 
        <View style={styles.tile}>
        </View>
     );
}
 

 

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.secondary,
    height: '100%',
  },
  phraseContainer:{
      backgroundColor: colors.secondaryLight,
      justifyContent: 'space-between',
      height: 140,
      margin: 10,
      marginBottom: 10,
      borderRadius: 25,
      padding: 15,

  
  },
  tileRow:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  tile:{
    borderRadius: 5,
    height: 50,
    width: 50,
    backgroundColor: 'white',

  },
  playRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  }
})

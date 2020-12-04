import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import {
  colors,
  borders
} from '../theme.js'
import Icon from 'react-native-vector-icons/FontAwesome'


const MediaWidget = ({navigation}) => {

  return (
    <View style={styles.mediaWidgetContainer}>
      <View style={styles.bar}>
        <View style={styles.mediaButton}>
        <Icon name="trash" size={30} color={'white'} />

            </View> 
    
        <View style={styles.playButton}>

        <Icon name="play-circle" size={90} color={colors.secondary} />

        </View>

        <View style={styles.mediaButton}>
        <Icon name="stop" size={25} color={'white'} />

            </View>         
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mediaWidgetContainer: {
        width: 260,
        justifyContent: 'center',
    },
    bar:{
        padding: 5,
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        height: 50,
        width: 50,
    },
    playButton:{
        backgroundColor: 'white',
        borderRadius: 50,
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
    }
  })
  

export default MediaWidget

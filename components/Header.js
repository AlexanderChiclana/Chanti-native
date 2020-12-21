import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import React, { useState, useContext } from 'react'
import { colors } from '../theme.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const Header = props => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity
        style={{ ...styles.iconContainer }}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Icon name="bars" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{props.system}</Text>
      <View style={{ ...styles.iconContainer, alignItems: 'flex-end' }}>
        <Icon name="info-circle" size={30} color="white" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'space-between'
    // borderColor: '#033454',
    // borderBottomWidth: 3
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600'
  },
  iconContainer: {
    width: 50,
    margin: 10
  }
})

export default Header

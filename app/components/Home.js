import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import general from '../styles/general';
import Navigation from './Navigation';

export default class Home extends React.Component {
  render() {
    return (
      <View style={general.containerFull}>
        <Navigation/>
      </View>
    );
  }
}
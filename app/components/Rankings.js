import React from 'react';
import { Text, View } from 'react-native';

import Navigation from './Navigation';
import general from '../styles/general';

export default class Home extends React.Component {
  render() {
    return (
      <View style={general.containerFull}>
        <View style={general.container}>
          <Text>Ранглиста</Text>
        </View>
        <Navigation/>
      </View>
    );
  }
}
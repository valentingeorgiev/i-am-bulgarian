import React from 'react';
import { Text, View } from 'react-native';

import general from '../styles/general';

export default class Home extends React.Component {
  render() {
    return (
      <View style={general.container}>
        <Text>Добре дошли!</Text>
      </View>
    );
  }
}
import React from 'react';
import { Text, View, Button } from 'react-native';

import Navigation from './Navigation';
import { logout } from '../utils/Logout';

import general from '../styles/general';

export default class Home extends React.Component {
  render() {
    return (
      <View style={general.containerFull}>
        <View style={general.container}>
          <Text>Потребител</Text>
          <Button
            title={'Изход'}
            onPress={() => {logout(), this.props.history.push('/login')}   
            }
          />
        </View>
        <Navigation/>
      </View>
    );
  }
}
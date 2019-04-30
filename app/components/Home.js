import React from 'react';
import { Text, View, Button } from 'react-native';
import { logout } from '../utils/Logout'

import general from '../styles/general';

export default class Home extends React.Component {
  render() {
    return (
      <View style={general.container}>
        <Text>Добре дошли!</Text>

        <Button
          title={'Изход'}
          onPress={() => {logout(), this.props.history.push('/login')}   
          }
        />
      </View>
    );
  }
}
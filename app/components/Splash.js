import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { AsyncStorage } from 'react-native';

import general from '../styles/general';

export default class Splash extends React.Component {
  
  componentDidMount () {
    AsyncStorage.getItem('user')
    .then(user => {
      user = JSON.parse(user)
      if(user) {
        setTimeout(() => this.props.history.push('/home'), 3000)
      } else {
        setTimeout(() => this.props.history.push('/login'), 3000)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={[general.container, general.flexCenter]}>
        <Image
          style={styles.splashImage}
          source={require('../assets/img/logo-splash-screen.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
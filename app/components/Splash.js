import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.splashImage}
          source={require('../assets/img/logo.png')}
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
    width: '80%',
    height: '40%',
    resizeMode: 'contain'
  }
});
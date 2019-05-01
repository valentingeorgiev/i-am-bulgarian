import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import { Font } from 'expo';

import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import Rankings from './components/Rankings';
import ARTag from './components/ARTag';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };
  
  async componentDidMount() {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-bold-italic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
      'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            <NativeRouter>
              <Route exact path="/home" component={Splash} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/rankings" component={Rankings} />
              <Route exact path="/ar-tag" component={ARTag} />
              <Route exact path="/user-profile" component={UserProfile} />
              <Route exact path="/" component={Home} />
            </NativeRouter>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
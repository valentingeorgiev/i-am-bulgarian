import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { AsyncStorage } from 'react-native';

import general from '../styles/general';
import forms from '../styles/forms';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      usernameError: 'Потребителско име',
      passwordError: 'Парола',
      errorColorUsername: 'black',
      errorColorPassword: 'black'
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={general.container} behavior="padding" enabled>
        <Image
          style={styles.logoImage}
          source={require('../assets/img/logo.png')}
        />
        <Text style={[styles.loginTitle, general.h1, general.bold]}>{'Опознай България'.toUpperCase()}</Text>
        
        <View style={forms.inputContainer}>
          <Image style={forms.inputIcon} source={require('../assets/img/icons/user-solid.png')}/>
          <TextInput style={forms.inputs}
            placeholder={this.state.usernameError}
            placeholderTextColor={this.state.errorColorUsername}
            onChangeText={(username) => this.setState({username})}
          />
        </View>
        
        <View style={forms.inputContainer}>
          <Image style={forms.inputIcon} source={require('../assets/img/icons/key-solid.png')}/>
          <TextInput style={forms.inputs}
            placeholder={this.state.passwordError}
            placeholderTextColor={this.state.errorColorPassword}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        
        <TouchableHighlight style={[general.button]} onPress={() => this.validate()}>
          <Text style={[general.buttonText, general.bold]}>{'Вход'.toUpperCase()}</Text>
        </TouchableHighlight>
        
        <Text style={[general.p, general.normal]}>Нямате акаунт?</Text>
        <Text style={{...general.p, ...general.normal, color: 'blue'}}
          onPress={() => this.props.history.push('/register')}>
          Регистрирайте се.
        </Text>
      </KeyboardAvoidingView>
    );
  }
  
  validate() {
    if(this.state.username && this.state.password) {
      this.login();
      this.setState({
        usernameError: 'Потребителско име',
        passwordError: 'Парола'
      });
    } else {
      if(!this.state.username) {
        this.setState({
          usernameError: 'Въведете потребителско име',
          errorColorUsername: 'red',
        });
      }
      
      if(!this.state.password) {
        this.setState({
          passwordError: 'Въведете парола',
          errorColorPassword: 'red',
        });
      }
    }
  }
  
  async login(){
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    
    try {
      const response = await fetch('https://i-am-bulgarian.000webhostapp.com/authentication.php', {
        method: 'POST',
        body: formData
      });

      const responseJson = await response.json();
      if(responseJson.wrong_username) {
        this.setState({
          usernameError: "Грешно потребителско име",
          errorColorUsername: 'red',
        });
      }
      
      if(responseJson.wrong_password) {
        this.setState({
          passwordError: "Грешна парола",
          errorColorPassword: 'red',
        });
      }
      
      if(responseJson.status && !responseJson.wrong_username && !responseJson.wrong_password) {
        let data = responseJson.data;
        if(this.saveToStorage(data)) {
          this.props.history.push('/home');
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  
  async saveToStorage(userData){
    if(userData) {
      await AsyncStorage.setItem('user', 
        JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }
    return false;
  }
}

const styles = StyleSheet.create({
  logoImage: {
    width: 381,
    height: 230,
    resizeMode: 'contain',
  },
  loginTitle: {
    marginTop: 30,
    marginBottom: 30
  },
});
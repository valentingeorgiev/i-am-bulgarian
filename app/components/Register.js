import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

import general from '../styles/general';
import forms from '../styles/forms';

export default class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: 'Потребителско име',
      emailError: 'Имейл',
      passwordError: 'Парола',
      errorColorUsername: 'black',
      errorColorEmail: 'black',
      errorColorPassword: 'black'
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={[general.container, general.flexCenter]} behavior="padding" enabled>

        <Text style={[styles.registerTitle, general.h1, general.bold]}>{'Регистрирай се'.toUpperCase()}</Text>
        
        <View style={{...forms.inputContainer, borderColor: this.state.errorColorUsername}}>
          <Image style={forms.inputIcon} source={require('../assets/img/icons/user-solid.png')}/>
          <TextInput style={forms.inputs}
            placeholder={this.state.usernameError}
            placeholderTextColor={this.state.errorColorUsername}
            onChangeText={(username) => this.setState({username})}
          />
        </View>

        <View style={{...forms.inputContainer, borderColor: this.state.errorColorEmail}}>
          <Image style={forms.inputIcon} source={require('../assets/img/icons/envelope-solid.png')}/>
          <TextInput style={forms.inputs}
            placeholder={this.state.emailError}
            placeholderTextColor={this.state.errorColorEmail}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        
        <View style={{...forms.inputContainer, borderColor: this.state.errorColorPassword}}>
          <Image style={forms.inputIcon} source={require('../assets/img/icons/key-solid.png')}/>
          <TextInput style={forms.inputs}
            placeholder={this.state.passwordError}
            placeholderTextColor={this.state.errorColorPassword}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        
        <TouchableHighlight style={[general.button]} onPress={() => this.validate()}>
          <Text style={[general.buttonText, general.bold]}>{'Регистрация'.toUpperCase()}</Text>
        </TouchableHighlight>
        
      </KeyboardAvoidingView>
    );
  }
  
  validate() {
    if(this.state.username && this.state.email && this.state.password) {
      this.register();
    } else {
      if(!this.state.username) {
        this.setState({
          usernameError: 'Въведете потребителско име',
          errorColorUsername: 'red',
        });
      } else {
        this.setState({
          errorColorUsername: 'black',
        });
      }
      
      if(!this.state.email) {
        this.setState({
          emailError: 'Въведете имейл',
          errorColorEmail: 'red',
        });
      } else {
        this.setState({
          errorColorEmail: 'black',
        });
      }
      
      if(!this.state.password) {
        this.setState({
          passwordError: 'Въведете парола',
          errorColorPassword: 'red',
        });
      } else {
        this.setState({
          errorColorPassword: 'black',
        });
      }
    }
  }
  
  async register() {
    let formData = new FormData();
    formData.append('type', 'register');
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    
    try {
      const response = await fetch('https://i-am-bulgarian.000webhostapp.com/authentication.php', {
        method: 'POST',
        body: formData
      });
      
      const responseJson = await response.json();
      if(responseJson.username_exists) {
        this.setState({
          usernameError: "Потребителското име е заето",
          errorColorUsername: 'red',
        });
      } else {
        this.setState({
          errorColorUsername: 'black',
        });
      }
      
      if(responseJson.email_exists) {
        this.setState({
          emailError: "Имейлът е зает",
          errorColorEmail: 'red',
        });
      } else {
        this.setState({
          errorColorEmail: 'black',
        });
      }
      
      if(responseJson.status && !responseJson.username_exists && !responseJson.email_exists) {
        this.props.history.push('/login');
      }
    }
    catch(error) {
      console.error(error);
    }
  }
}

const styles = StyleSheet.create({
  registerTitle: {
    marginTop: 30,
    marginBottom: 30
  },
});
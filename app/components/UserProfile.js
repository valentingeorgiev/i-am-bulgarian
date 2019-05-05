import React from 'react';
import { View, ScrollView, Text, TouchableHighlight, Image } from 'react-native';
import {AsyncStorage} from 'react-native';
import Navigation from './Navigation';

import { logout } from '../utils/Logout';
import { fetchIDsVisitedLandmarks } from '../utils/GetIDsVisitedLandmarks';
import { fetchUserPoints } from '../utils/GetUserPoints';

import general from '../styles/general';
import user from '../styles/userProfile';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userName: '',
      countVisitedLandmarks: 0,
      userPoints: 0,
      idsVisitedLandmarks: '',
      visitedLandmarks: []
    }
  }
  
  async componentWillMount() {
    let userID = 0;
    const user = await AsyncStorage.getItem('user');
    if(user) {
      userID = JSON.parse(user).id;
      this.setState({
        userName: JSON.parse(user).name
      });
    }
    
    fetchIDsVisitedLandmarks(userID).then((idsVisitedLandmarks) => {
      this.setState({
        countVisitedLandmarks: idsVisitedLandmarks.length,
        idsVisitedLandmarks: idsVisitedLandmarks.join()
      });
    });
    
    fetchUserPoints(userID).then((userPoints) => {
      this.setState({
        userPoints: userPoints
      });
    });
    
    this.fetchVisitedLandmarks();
  }
  
  async fetchVisitedLandmarks() {
    try {
      const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-json/wp/v2/landmark?include=' + this.state.idsVisitedLandmarks);
      const responseJson = await response.json();
      this.setState({ 
        visitedLandmarks: responseJson, 
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={general.containerFull}>
        <View style={general.container}>

          <View style={user.header}>
            <View style={user.nameLogut}>
              <Text style={user.name}>{this.state.userName}</Text>
              <TouchableHighlight style={[user.logout]} onPress={() => {logout(), this.props.history.push('/login')}}>
                <Image style={user.logoutIcon} source={require('../assets/img/icons/sign-out-alt-solid.png')}/>
              </TouchableHighlight>
            </View>
            
            <View style={user.numbers}>
              <View style={user.numberVisitedLandmarks}>
                <Text style={{...user.numbersText, fontFamily: 'roboto-bold'}}>{this.state.countVisitedLandmarks}</Text>
                <Text style={user.numbersText}>обекта</Text>
              </View>
              
              <View style={user.userPoints}>
                <Text style={{...user.numbersText, fontFamily: 'roboto-bold'}}>{this.state.userPoints}</Text>
                <Text style={user.numbersText}>точки</Text>
              </View>
            </View>
          </View>
          
          <Text style={user.lastVisitedLandmarksTitle}>Последно посетени</Text>
          <ScrollView style={{marginBottom: 60}}>
            {this.state.visitedLandmarks.map((landmark, index) => {
              return (
                <View  key={index} style={user.visitedLandmarks}>
                  <Image style={user.visitedLandmarksIcon} source={require('../assets/img/icons/map-marked-alt-solid.png')}/>
                  <Text style={user.visitedLandmarksName}>{landmark.title.rendered}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      <Navigation/>
    </View>
    );
  }
}
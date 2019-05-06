import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import Navigation from './Navigation';

import general from '../styles/general';
import list from '../styles/list';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mostVisitedRows: []
    }
  }
  async componentDidMount() {
    try {
      const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/most-visited-landmarks.php');
      
      const responseJson = await response.json();
      this.setState({ 
        mostVisitedRows: responseJson, 
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
          <Text style={general.screenTitle}>Най-посещавани обекти</Text>
          <ScrollView style={{marginTop: 16, marginBottom: 60}}>
            {this.state.mostVisitedRows.map((row, index) => {
              return (
                <View key={index} style={list.listRow}>
                  <View style={{width:'70%', flexDirection:'row', flex:1}}>
                    <Text style={list.position}>{index+1}.</Text>
                    <Text style={list.listRowName}>{row.landmark_name}</Text>
                  </View>
                  
                  <View style={{...list.visitsPoints, width:'30%'}}>
                    <Image style={list.visitsIcon} source={require('../assets/img/icons/eye-solid.png')}/>
                    <Text style={list.listRowMostVisits}>{row.count_visits}</Text>
                  </View>
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
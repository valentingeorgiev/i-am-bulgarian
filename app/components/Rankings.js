import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import Navigation from './Navigation';

import general from '../styles/general';
import list from '../styles/list';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rankingsRow: []
    }
  }
  async componentDidMount() {
    try {
      const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/rankings.php');
      
      const responseJson = await response.json();
      this.setState({ 
        rankingsRow: responseJson, 
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
          <Text style={general.screenTitle}>Ранглиста</Text>
          <ScrollView style={{marginTop: 16, marginBottom: 60}}>
            {this.state.rankingsRow.map((row, index) => {
              return (
                <View key={index} style={list.listRow}>
                  <View style={{width:'50%', flexDirection:'row', flex:1}}>
                    <Text style={list.position}>{index+1}.</Text>
                    <Text style={list.listRowName}>{row.user}</Text>
                  </View>
                  
                  <View style={{...list.visitsPoints, width:'50%'}}>
                    <Image style={list.pointsIcon} source={require('../assets/img/icons/eye-solid.png')}/>
                    <Text style={list.listRowCountVisits}>{row.count_visits}</Text>
                    
                    <Image style={list.visitsIcon} source={require('../assets/img/icons/medal-solid.png')}/>
                    <Text style={list.listRowPoints}>{row.points}</Text>
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
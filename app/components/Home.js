import React from 'react';
import { View } from 'react-native';
import { MapView, Location } from "expo";

import general from '../styles/general';
import Navigation from './Navigation';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      landmarks: [],
      location: null,
    };
  }
  
  componentDidMount() {
    this.fetchLandmarkData();
  }
  
  componentWillMount() {
    this._getLocationAsync();
  }
  
  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  
  fetchLandmarkData() {
    fetch('https://i-am-bulgarian.000webhostapp.com/wp-json/wp/v2/landmark')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        isLoading: false,
        landmarks: responseJson, 
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  render() {
    let latitude = 42.6953468;
    let longitude = 23.183863;
    if (this.state.location) {
      latitude = this.state.location.coords.latitude;
      longitude = this.state.location.coords.longitude;
    }
    
    return (
      <View style={general.containerFull}>
        <MapView 
          style={{ flex: 1 }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.isLoading ? null : this.state.landmarks.map((landmark, index) => {
            const coords = {
              latitude: parseFloat(landmark.acf.landmark_latitude),
              longitude: parseFloat(landmark.acf.landmark_longitude),
            };
            
            const metadata = landmark.acf.landmark_address;
            
            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={landmark.title.rendered}
                description={metadata}
              />
            );
          })}
        </MapView>

        <Navigation/>
      </View>
    );
  }
}
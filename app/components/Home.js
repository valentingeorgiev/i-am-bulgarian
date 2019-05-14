import React from 'react';
import { View } from 'react-native';
import { MapView, Permissions, Location } from "expo";

import general from '../styles/general';
import Navigation from './Navigation';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      landmarks: [],
      coords: null,
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
    const { status: locationPermission } = await Permissions.askAsync(Permissions.LOCATION);
    if(locationPermission === 'granted') {
      let location = await Location.getCurrentPositionAsync({accuracy : Location.Accuracy.Low});
      this.setState({ location });
    }
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

  getDirections(start, end) {
    const startString = `${start.longitude},${start.latitude}`;
    const endString = `${end.longitude},${end.latitude}`;

    let directionCoords = new Array();

    fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=API_KEY&start=${startString}&end=${endString}`)
    .then((response => response.json()))
    .then(responseJSON =>{
      responseJSON.features[0].geometry.coordinates.forEach(coord => {
        directionCoords.push({
          latitude: coord[1],
          longitude: coord[0]
        });
      });
      this.setState({coords: directionCoords.length !== 0 ? directionCoords : null});
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
                onPress={() => {
                  if(this.state.location !== null) {
                    this.getDirections(this.state.location.coords, coords);
                  }
                }}>
              </MapView.Marker>
            );
          })}

          {this.state.coords !== null && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor='red'/>}
            
        </MapView>

        <Navigation/>
      </View>
    );
  }
}
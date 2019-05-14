import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Permissions, Camera, Location, Accelerometer, Magnetometer } from 'expo';

import { ARLocation } from '../model/ARLocation';
import { Matrix } from '../utils/Matrix';
import { SensorUtilities } from '../utils/SensorUtilities';

import Navigation from './Navigation';

const z_near = 0.5;
const z_far = 2000;
const distanceThreshold = 100;

//TODO for testing remove
// const testPoints = [{name: "Съдебна палата", location: new ARLocation(42.95908283333333, 23.35125, 500), visited: false}];

/**
 * A component which shows where real-world locations are by
 * overlaying them over a camera view.
 */
export default class ARCamera extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hasCameraPermission: null,
        hasLocationPermission: null,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        projectionMatrix: new Array(16),
        accelerometerData: {x: 0, y: 0, z: 0},
        magnetometerData: {x: 0, y: 0, z: 0},
        //TODO Use gyroscope data to enable higher accuracy on high-end devices
        location: new ARLocation(0.0, 0.0, 0.0),
        //initial empty points
        arPoints: [{id: -1, name: "", location: new ARLocation(0.0, 0.0, 9000), visited: true, points: 0}],
        //initial empty coordinates
        arCoords: [{name: "", x: 0, y: 0}],
      };
    }

    async componentDidMount() {
      //camera permission
      const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: cameraPermission === 'granted' });

      //location permission
      const { status: locationPermission } = await Permissions.askAsync(Permissions.LOCATION);
      this.setState({ hasLocationPermission: locationPermission === 'granted' });

      if(locationPermission === 'granted') {
        //get initial location
        let pos = await Location.getCurrentPositionAsync({accuracy : Location.Accuracy.BestForNavigation});
        let location = new ARLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.altitude);

        //TODO for testing remove
        // let arPoints = this.getPointsInRadius(location, testPoints, z_far);

        // this.setState({
        //   location: location,
        //   arPoints: arPoints
        // });
        
        this.setState({location: location}, () => this.updateARPoints());
      }

      //subscribe to accelerometer service
      Accelerometer.setUpdateInterval(100);

      //subscribe to magnetometer service
      Magnetometer.setUpdateInterval(100);

      //subscribe to location updates
      this.locationSubscription = await Location.watchPositionAsync(
        {accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 5}, 
        result => this.onLocationUpdate(result));    
      }

    componentWillUnmount() {
      //unsubscribe from services
      Accelerometer.removeAllListeners();
      Magnetometer.removeAllListeners();
      this.locationSubscription.remove();

      //TODO Check if camera unmounts properly
    }

    render() {
      const { hasCameraPermission } = this.state;
      const { hasLocationPermission } = this.state;
      if (hasCameraPermission === null || hasLocationPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>Няма достъп до камерата.</Text>;
      } else if (hasLocationPermission === false) {
        return <Text>Няма достъп до Вашето местоположение.</Text>
      } else {
        let ARViews = this.state.arCoords.map(coord => {
          //display empty View for initial state while coordinates have yet to be set
          if(coord.name === ""){
            return (
              <View key={coord.name} />
            );
          }
  
          return (
            <View
            key={coord.name} 
            style={{
              position: "absolute",
              left: coord.x, 
              top: coord.y,
              zIndex: 1, 
              backgroundColor: coord.backgroundColor,
              borderWidth: 2,
              borderRadius: 20,
              borderColor: coord.borderColor}}>
  
              <TouchableOpacity onPress={() => this.onCoordPressed(coord)}>
                <Text style={{
                  textAlign: "center",
                  color: "#FFFFFF"}}>
                  {coord.name}{"\n"}{Math.floor(coord.distance)}М
                </Text>
              </TouchableOpacity>
            </View>
          )
        });
  
        return (
          <View style={{ flex: 1 }}>
  
            {/* AR Overlay */}
            {ARViews}
  
            {/* Camera as background */}
            {<Camera
            style={{ flex: 1, zIndex: 0, width: this.state.width, height: this.state.height }} 
            type={Camera.Constants.Type.back}
            onCameraReady={() => {
              this.generateProjectionMatrix();
  
              Accelerometer.addListener(result => {
                this.onAccelerometerUpdate(result);
              });
  
              Magnetometer.addListener(result =>{
                this.setState({ magnetometerData: result });
              });
            }}
            >
            {/* !!! REACT-NATIVE ANDROID ISSUE CAMERA COMPONENT MUST NOT HAVE CHILDREN !!! */}
            </Camera>}

            <Navigation/>
          </View>
        );
      }
    }

    /**
     * Called when the user touches an AR overlay element.
     */
    async onCoordPressed(coord) {
      //TODO for testing remove
      // const { arPoints } = this.state;
      // arPoints.forEach(arPoint => {
      //   if(coord.name === arPoint.name && coord.distance <= distanceThreshold){
      //     arPoint.visited = true;
      //   }
      // });

      const { arPoints } = this.state;
      arPoints.forEach(async (arPoint) => {
        if(arPoint.id === coord.id && coord.distance <= distanceThreshold){
          if(arPoint.visited === false){
            arPoint.visited = true;

            //get user ID
            let userID = '';
            const user = await AsyncStorage.getItem('user');
            if(user) {
              userID = JSON.parse(user).id;
            }
            
            //update visited landmarks and points
            let formData = new FormData();
            formData.append('user_id', userID);
            formData.append('landmark_id', arPoint.id);
            formData.append('landmark_points', arPoint.points);
            try {
              const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/update-visited-landmark.php', {
                method: 'POST',
                body: formData
              });
            
              const responseJson = await response.json();
              if(responseJson.status) {
                console.log(responseJson.status);
                //TODO Notify user that he has received points
              }
            }
            catch (error) {
              console.error(error);
            }
          }
        }
      });
    }

    /**
     * Updates the points of interest in the component state.
     */
    async updateARPoints(){
      //get user ID
      let userID = '';
      const user = await AsyncStorage.getItem('user');
      if(user) {
        userID = JSON.parse(user).id;
      }  
 
      //get visited landmark IDs
      let visitedIDs = new Array();

      let formData = new FormData();
      formData.append('user_id', userID);
      try {
        const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/visited-landmark.php', {
          method: 'POST',
          body: formData
        });

        const responseJson = await response.json();
        if(responseJson.status) {
          visitedIDs = responseJson.visited_landmarks;
        }
      }
      catch (error) {
        console.error(error);
      }

      //get landmarks
      let landmarks = new Array();

      try {
        const landmarkResponse = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-json/wp/v2/landmark');
        const landmarkJson = await landmarkResponse.json();
        landmarkJson.map(landmark => {
          landmarks.push({
            id: landmark.id,
            name: landmark.title.rendered,
            location: new ARLocation(Number(landmark.acf.landmark_latitude), 
                                     Number(landmark.acf.landmark_longitude),
                                     Number(landmark.acf.landmark_altitude)),
            visited: visitedIDs.includes(landmark.id.toString()),
            points: Number(landmark.acf.landmark_points)});
        });

        let arPoints = this.getPointsInRadius(this.state.location, landmarks, z_far);
        this.setState({arPoints: arPoints});
      }
      catch (error) {
        console.log(error);
      }
    }

    /**
     * Get the points of interest which are in a specified radius around the current location.
     */
    getPointsInRadius(location, points, radius) {
      let arPoints = new Array();
      points.forEach(point =>{
        if(ARLocation.distanceTo(location, point.location) <= radius){
          arPoints.push(point);
        }
      });
    
      return arPoints;
    }

    /**
     * Compute the default projection matrix of the device's camera.
     */
    generateProjectionMatrix() {
      //device aspect ratio
      let ratio = this.state.width / this.state.height;

      const offset = 0;
      const left =  -ratio;
      const right = ratio;
      const bottom = -1;
      const top = 1;

      Matrix.frustumM(this.state.projectionMatrix, offset, left, right, bottom, top, z_near, z_far);
    }

    /**
     * Updates the accelerometer values in the component state.
     * Called when the device receives an update from it's Accelerometer sensor.
     */
    onAccelerometerUpdate(accelerometerValue) {
      this.setState({ accelerometerData: accelerometerValue }, this.updateCoords());
    }

    /**
     * Updates the magnetometer values in the component state.
     * Called when the device receives an update from it's Magnetometer sensor.
     */
    onMagnetometerUpdate(magnetometerValue) {
      this.setState({ magnetometerData: magnetometerValue }, this.updateCoords());
    }

    /**
     * Updates the device's current location in the component state.
     * Called when the device receives a location update.
     */
    onLocationUpdate(newLocation) {
      this.setState({
        location: new ARLocation(newLocation.coords.latitude, newLocation.coords.longitude, newLocation.coords.altitude)
      }, this.updateCoords());
    }

    /**
     * Updates the coordinates of the augmented reality overlay in the component state.
     * Called when the device receives an update from it's Accelerometer or Magnetometer sensors or a location update.
     */
    updateCoords(){
      let gravity = [this.state.accelerometerData.x, this.state.accelerometerData.y, this.state.accelerometerData.z];
      let geomagnetic = [this.state.magnetometerData.x, this.state.magnetometerData.y, this.state.magnetometerData.z];
      let rotationMatrix = new Array(16);
      let projectionMatrix = this.state.projectionMatrix;
      let rotatedProjectionMatrix = new Array(16);

      //calculate device rotation matrix
      //null is passed as first argument as inclination matrix is not needed
      SensorUtilities.getRotationMatrix(null, rotationMatrix, gravity, geomagnetic);

      //camera projection matrix is the result of multiplying the original camera projection matrix and the rotation matrix
      Matrix.multiplyMM(rotatedProjectionMatrix, 0, projectionMatrix, rotationMatrix);

      let coords = new Array();
      const { location } = this.state;

      this.state.arPoints.forEach(arPoint => {
        let pointInENU = ARLocation.ECEFtoENU(location, arPoint.location);

        //to convert ENU coordinates to camera coordinates, the camera projection matrix is multiplied
        //with the ENU coordinate vector of the point of interest
        let cameraCoordinateVector = new Array(4);
        Matrix.multiplyMV(cameraCoordinateVector, 0, rotatedProjectionMatrix, 0, pointInENU, 0);

        //point is inside device's FOV
        if(cameraCoordinateVector[2] < 0) {
          let x  = (0.5 + cameraCoordinateVector[0] / cameraCoordinateVector[3]) * this.state.width;
          let y = (0.5 - cameraCoordinateVector[1] / cameraCoordinateVector[3]) * this.state.height;
          let distance = ARLocation.distanceTo(location, arPoint.location);

          //set the color of the overlay based on the distance to the point and
          //whether it has already been visited or not
          //TODO Styles can be moved
          let backgroundColor = "#5976FF"
          let borderColor = "#2B48D5";
          switch (true) {
            case (arPoint.visited === true):
              backgroundColor = "#8C8C8C";
              borderColor = "#4E4E4E";
              break;

            case (distance <= distanceThreshold):
              backgroundColor = "#4BA9AB";
              borderColor = "#225556";
              break;

            default:
              break;
          }

          coords.push({
            id: arPoint.id,
            name: arPoint.name,
            points: arPoint.points,
            x: x,
            y: y,
            distance: distance,
            backgroundColor: backgroundColor,
            borderColor: borderColor});
          this.setState({arCoords: coords});    
        }
      });   
    }
}
import React from 'react';
import { View, Text, Image} from 'react-native';
import { Link } from 'react-router-native';

import nav from '../styles/navigation';

export default class Navigation extends React.Component {
  render () {
    return (
      <View style={nav.navContainer}>

        <View style={nav.navLeft}>
          <Link to='/home' style={nav.navItem }>
            <Image style={nav.navIcon} source={require('../assets/img/icons/home-solid.png')}/>
          </Link>
          <Link to='/most-visited-landmarks' style={nav.navItem }>
            <Image style={nav.navIcon} source={require('../assets/img/icons/map-marked-alt-solid.png')}/>
          </Link>
        </View>
        
        <View style={nav.navCenter}>
          <View style={nav.navLeftBorder}></View>
          <View style={nav.navCenterBorder}>
            <Link to='/ar-camera' style={nav.arItem}>
              <Image style={nav.arNavIcon} source={require('../assets/img/icons/ar-tag.png')}/>
            </Link>
          </View>
          <View style={nav.navRightBorder}></View>
        </View>
        
        <View style={nav.navRight}>
          <Link to='/rankings' style={nav.navItem}>
            <Image style={nav.navIcon} source={require('../assets/img/icons/medal-solid.png')}/>
          </Link>
          <Link to='/user-profile' style={nav.navItem}>
            <Image style={nav.navIcon} source={require('../assets/img/icons/user-solid.png')}/>
          </Link>
        </View>
        
      </View>
    );
  }
}
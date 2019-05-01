import React from 'react';
import { View, Text, Image} from 'react-native';
import { Link } from 'react-router-native';

import nav from '../styles/navigation';

export default class Navigation extends React.Component {
  render () {
    return (
      <View style={nav.navContainer}>
        <Link to='/home' style={nav.navItem }>
          <Image style={nav.navIcon} source={require('../assets/img/icons/home-solid.png')}/>
        </Link>
        
        <Link to='/ar-tag' style={nav.navItem}>
          <Image style={nav.navIcon} source={require('../assets/img/icons/ar-tag.png')}/>
        </Link>
        
        <Link to='/rankings' style={nav.navItem}>
          <Image style={nav.navIcon} source={require('../assets/img/icons/medal-solid.png')}/>
        </Link>
        
        <Link to='/user-profile' style={nav.navItem}>
          <Image style={nav.navIcon} source={require('../assets/img/icons/user-solid.png')}/>
        </Link>
      </View>
    );
  }
}
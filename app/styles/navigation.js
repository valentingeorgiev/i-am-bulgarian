import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navContainer: {
    display: 'flex',
    alignItems: 'center',    
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  navItem: {
    width: 90,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
})
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: "white",
  },
  navLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: {
    width: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  navCenterBorder: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cacaca',
    borderRadius: 50,
  },
  arItem: {
    alignItems:'center',
    justifyContent:'center',
    width: 70,
    height: 70,
    backgroundColor: "#f7931e", 
    borderRadius: 50, 
  },
  arNavIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
})
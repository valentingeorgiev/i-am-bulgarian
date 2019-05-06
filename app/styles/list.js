import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderRightWidth: 1,
    borderTopColor: '#cacaca',
    borderBottomColor: '#cacaca',
    borderLeftColor: '#009b75',
    borderRightColor: '#cacaca',
  },
  listRowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  position: {
    marginRight: 2,
    fontFamily: 'roboto-bold',
    fontSize: 20,
  },
  listRowName: {
    fontFamily: 'roboto-regular',
    fontSize: 20,
  },
  visitsPoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pointsIcon:{
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 2,
  },
  listRowCountVisits: {
    marginRight: 10,
    paddingRight: 10,
    fontFamily: 'roboto-regular',
    fontSize: 20,
    borderRightWidth: 1,
    borderRightColor: '#cacaca', 
  },
  visitsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 2,
  },
  listRowPoints: {
    fontFamily: 'roboto-regular',
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  listRowMostVisits: {
    fontFamily: 'roboto-regular',
    fontSize: 20,
  }
})

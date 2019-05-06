import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#cacaca',
  },
  nameLogut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 36,
    marginRight: 20,
  },
  logout: {
    width: 30,
    height: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cacaca',
  },
  logoutIcon: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  numbers: {
    flexDirection: 'row',
    marginTop: 30,
  },
  numberVisitedLandmarks: {
    alignItems: 'center',
    marginRight: 20,
  },
  numbersText: {
    fontFamily: 'roboto-regular',
    fontSize: 24,
  },
  userPoints: {
    alignItems: 'center',
    marginLeft: 20,
  },
  lastVisitedLandmarksTitle: {
    marginTop: 20,
    marginBottom: 16,
    fontFamily: 'roboto-medium',
    fontSize: 24,
  }
})
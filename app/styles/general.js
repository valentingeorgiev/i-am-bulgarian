import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30
  },
  containerFull: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  normal: {
    fontFamily: 'roboto-regular'
  },
  bold: {
    fontFamily: 'roboto-bold'
  },
  h1: {
    fontSize: 24
  },
  h2: {
    fontSize: 20
  },
  h3: {
    fontSize: 19
  },
  h4: {
    fontSize: 18
  },
  h5: {
    fontSize: 17
  },
  h6: {
    fontSize: 16
  },
  p: {
    fontSize: 14
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#f7931e",
  },
  buttonText: {
    color: 'white',
  },
})
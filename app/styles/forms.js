import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 20,
  },
  inputs: {
    display: 'flex',
    flex: 1,
    height: 45,
    marginLeft: 16,
  },
  inputIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: 20,
    height: 20,
    marginLeft: 15,
    resizeMode: 'contain'
  },
})
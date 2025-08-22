import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH } from '../../Utils/dimension';

export const InitialSetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  subContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },

  headertext: {
    fontSize: 40,
    color: 'black',
    marginTop: HEIGHT / 9,
    marginBottom: HEIGHT / 18,
    fontWeight: '400',
  },

  text: {
    fontWeight: '300',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },

  input: {
    marginTop: HEIGHT / 15,
    marginBottom: HEIGHT / 20,
  },

  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop: 36,
  },

  error: {
    marginLeft: 20,
    color: 'red',
  },
});

export const IntroScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  text1: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '400',
  },

  text2: {
    fontSize: 18,
    color: '#2D1C1C',
    textAlign: 'center',
    fontWeight: '300',
  },

  image: {
    width: WIDTH,
    height: HEIGHT / 2.5,
  },

  heading1: {
    marginTop: HEIGHT / 14,
    paddingHorizontal: 36,
  },

  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:50,
    // paddingHorizontal:20,
    // width:WIDTH,
    // height:"100%",
    backgroundColor: '#FFFFFF',
    //backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  subContainer: {
    alignItems: 'center',
  },

  headertext: {
    fontSize: 40,
    color: 'black',
    marginTop: HEIGHT / 9,
    marginBottom: HEIGHT / 18,
    fontWeight: '400',
    textAlign: 'center',
  },

  text: {
    fontWeight: '300',
    color: 'black',
    fontSize: 20,
    width: WIDTH / 1.2,
    textAlign: 'center',
  },
  button: {
    //flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  fpText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginTop: HEIGHT / 30,
    marginBottom: HEIGHT / 30,
    textDecorationLine: 'underline',
  },

  input: {
    marginTop: HEIGHT / 15,
    marginBottom: HEIGHT / 20,
  },

  error: {
    marginLeft: 20,
    color: 'red',
  },
});

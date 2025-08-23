import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  mainContent: {
    flexDirection: 'row',
    marginVertical: HEIGHT / 45,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'white',
    paddingBottom: 10,
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headText: {
    color: 'black',
    fontSize: 20,
    marginLeft: WIDTH / 3,
  },
  closeButton: {
    marginLeft: WIDTH / 10,
  },
  closeText: {
    color: 'black',
    fontSize: 20,
    marginLeft: WIDTH / 5,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  separator: {
    marginVertical: 10,
  },

  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

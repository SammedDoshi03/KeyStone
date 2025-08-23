import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainContent: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: 'white',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    //borderRadius: 10,
    //height: '10%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  error: {
    marginLeft: 20,
    color: 'red',
  },
  btn: {
    //marginTop: HEIGHT-520
    marginTop: '35%',
    marginBottom: 10,
    //flex: 1,
    //justifyContent: 'flex-end',
    //marginBottom: 10
  },
});

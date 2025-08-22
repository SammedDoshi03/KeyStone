import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH } from '../../Utils/dimension';
import Config from '../../Utils/config.json';
export const AssignassetconfirmationStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  personalContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 16,
  },
  assetContent: {
    //marginHorizontal: 5,
  },
  descText: {
    color: '#979797',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    paddingTop: 16,
  },
  userText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 25,
  },
  dateText: {
    marginLeft: 20,
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    fontWeight: '500',
    letterSpacing: 1,
  },
  dateContent: {
    marginBottom: 16,
  },
  dateText1: {
    color: 'grey',
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 5,
  },
});

export const EditAssignedAssetStyles = StyleSheet.create({
  assetView: {
    width: WIDTH - 50,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    borderColor: '#fff',
    elevation: 8,
    shadowColor: 'black',
    backgroundColor: '#fff',
  },
  personalContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  btn: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  descText1: {
    color: '#979797',
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 16,
  },
  descText: {
    color: '#979797',
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 16,
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  userText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  userText1: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 10,
  },
  line: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export const SearchEmpStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textContainer: {
    fontSize: 20,
    padding: 15,
    width: WIDTH / 1.3,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.7,
  },
  secondText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#000000',
  },
  secondContainer: {
    marginTop: HEIGHT / 100,
  },
  searchContainer: {
    marginTop: HEIGHT / 100,
    marginBottom: HEIGHT / 20,
  },
  modalStyle: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '90%',
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export const SelectCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  personalContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 16,
  },
  assetContent: {
    marginBottom: 24,
  },
  descText: {
    color: '#979797',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
  },
  userText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 20,
  },
  categoryContent: {
    marginTop: 10,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 40,
  },
});

export const SpocDetailsStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Config.mainBackgroundColor,
  },
  personalContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  assetHeading: {
    marginHorizontal: 20,
    marginTop: 2,
    borderBottomColor: Config.lineBreakColor,
    borderBottomWidth: 0.5,
  },
  assetContent: {
    marginHorizontal: 20,
    marginTop: 8,
    //backgroundColor:'#c4c4c4'
  },
  descText: {
    color: Config.descHeadColor,
    fontWeight: '400',
    textAlign: 'left',
    fontSize: 16,
    marginVertical: 2,
  },
  userText: {
    color: 'black',
    fontWeight: '400',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
  },
  headingContainer: {
    backgroundColor: Config.headerBackgroundColor,
  },
  mainHeading: {
    color: Config.headerTextColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
  },
  subHeadings: {
    color: Config.primaryHeadingColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
    //flex:0.5,
    justifyContent: 'flex-end',
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 12,
    paddingTop: 8,
  },
  image: {
    marginTop: 40,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
});

export const SpocHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  subContainer: {
    marginTop: HEIGHT / 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  assetDisplay: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text1: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
  },
  text2: {
    color: 'grey',
    fontSize: 32,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  text1_1: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
  },
});

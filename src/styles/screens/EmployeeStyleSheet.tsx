import { StyleSheet } from 'react-native';
// import Config from './configuration'
import Config from '../../Utils/config.json';

const EmployeeStyleSheet = () => {
  const SingleAssetStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      flex: 1,
      flexDirection: 'column',
    },
    personalContent: {
      marginHorizontal: 20,
      marginVertical: 15,
      borderBottomColor: Config.lineBreakColor,
      borderBottomWidth: 1,
    },
    assetContent: {
      marginHorizontal: 20,
      marginVertical: 5,
    },
    descText: {
      color: Config.descHeadColor,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: 16,
    },
    userText: {
      color: Config.generalTextColor,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: 16,
      marginBottom: 25,
    },
    spocText: {
      color: Config.linktextColor,
      textDecorationLine: 'underline',
    },
    btn: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

  const EmployeeDetailStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      flex: 1,
    },
    personalContent: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    assetHeading: {
      marginHorizontal: 40,
      marginTop: 2,
      borderBottomColor: Config.lineBreakColor,
      borderBottomWidth: 0.5,
    },
    assetContent: {
      marginHorizontal: 40,
      marginTop: 2,
    },
    descText: {
      color: Config.descHeadColor,
      fontWeight: '400',
      textAlign: 'left',
      fontSize: 18,
      marginVertical: 2,
    },
    userText: {
      color: Config.generalTextColor,
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
      fontWeight: '400',
      fontSize: 18,
      marginVertical: 10,
      textAlign: 'center',
    },
    btn: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 12,
      paddingTop: 8,
    },
  });

  const EmployeeHomeStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      width: '100%',
      height: '100%',
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    text1: {
      fontSize: 24,
      color: Config.generalTextColor,
      textAlign: 'center',
      fontWeight: '400',
    },
    text2: {
      fontSize: 18,
      color: '#2D1C1C',
      fontWeight: '600',
      marginLeft: 20,
    },
    text2Heading: {
      color: Config.descHeadColor,
    },
    image: {
      width: '100%',
      height: '65%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    btn: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
  });

  const ViewAssetStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Config.mainBackgroundColor,
      padding: 8,
    },
    text: {
      color: Config.generalTextColor,
      fontSize: 20,
      margin: 7,
      paddingLeft: 8,
    },
    line: {
      borderBottomColor: Config.lineBreakColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 15,
      marginTop: 13,
      marginLeft: 10,
      marginRight: 10,
    },
    image: {
      marginTop: 60,
      resizeMode: 'contain',
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 20,
    },
  });

  return {
    ViewAssetStyles,
    EmployeeHomeStyles,
    EmployeeDetailStyles,
    SingleAssetStyles,
  };
};
export default EmployeeStyleSheet;

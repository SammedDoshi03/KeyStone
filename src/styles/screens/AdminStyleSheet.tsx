import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH } from '../../Utils/dimension';
import { useSelector } from 'react-redux';

const AdminHomeStylesSheet = () => {
  //@ts-ignore
  const Config = useSelector(state => state.config);

  const AddSpocStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      flex: 1,
      padding: 8,
    },
    email: {
      paddingTop: 20,
      marginBottom: HEIGHT / 22,
    },
    button_Position: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    date: {
      marginBottom: HEIGHT / 22,
    },
    error: {
      marginLeft: 20,
      color: Config.errorColor,
    },
    text: {
      color: Config.generalTextColor,
      paddingLeft: 20,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const AdminDetailsStyles = StyleSheet.create({
    container: {
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
      marginVertical: 10,
      //textAlign: 'center'
    },
    btn: {
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 12,
      paddingTop: 8,
    },
  });

  const AdminHomeStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      width: '100%',
      height: '100%',
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    mainContent: {
      marginLeft: 30,
      marginRight: 30,
      marginVertical: 50,
    },
    mainText: {
      color: Config.generalTextColor,
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 18,
      letterSpacing: 1.5,
    },
    mainText1: {
      fontWeight: 'bold',
    },
    spocText: {
      color: Config.descHeadColor,
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 50,
      letterSpacing: 1.5,
    },
    spocText1: {
      fontWeight: 'bold',
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: '40%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });

  const AdminManageSpocStyles = StyleSheet.create({
    container: {
      //flex: 1,
      height: '100%',
      width: '100%',
      //backgroundColor: Config.mainBackgroundColor,
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    text: {
      fontSize: 20,
      fontWeight: '400',
      marginBottom: 8,
      paddingHorizontal: 12,
      color: Config.generalTextColor,
      letterSpacing: 1,
    },
    text_location: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#3274AB',
      textDecorationLine: 'underline',
      letterSpacing: 1,
    },
    line: {
      borderBottomColor: Config.lineBreakColor,
      borderBottomWidth: 1,
      marginBottom: 20,
      marginTop: 12,
    },
    btn: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    image: {
      width: '85%',
      height: '45%',
      marginTop: 80,
      marginLeft: 40,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });

  const ViewSpocStyles = StyleSheet.create({
    container: {
      backgroundColor: Config.mainBackgroundColor,
      flex: 1,
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    personalContent: {
      marginVertical: HEIGHT / 60,
      borderBottomColor: Config.lineBreakColor,
      borderBottomWidth: 1,
    },
    assetContent: {
      marginVertical: HEIGHT / 90,
    },
    descText: {
      color: Config.descHeadColor,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: 16,
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    endDate: {
      flex: 1,
      color: Config.generalTextColor,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: 16,
      marginBottom: 25,
    },
    userText: {
      color: Config.generalTextColor,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: 16,
      marginBottom: 25,
    },
  });
  return {
    AddSpocStyles,
    AdminDetailsStyles,
    AdminManageSpocStyles,
    AdminHomeStyles,
    ViewSpocStyles,
  };
};

export default AdminHomeStylesSheet;

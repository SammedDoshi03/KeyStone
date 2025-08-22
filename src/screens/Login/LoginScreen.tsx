import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import CustomPasswordTextInput from '../../components/CustomPasswordTextInput';
import {userLogin} from '../../firebase/authentication';
import ForgotPassModal from '../../components/ForgotPassModal';
import {addUser} from '../../redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {LoginScreenStyles} from '../../styles/screens/LoginStyleSheet';
import {useIsFocused} from '@react-navigation/native';
import CustomLoader from '../../components/CustomLoader';
import {loginSaga} from '../../redux/reducers/authReducer';
import remoteConfig from '@react-native-firebase/remote-config';
import {Config} from '../../redux/reducers/configReducer';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [prevPassword, setPrevPassword] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [pressed, setPressed] = useState(false);
  const [click, setClick] = useState(false);
  const isFocused = useIsFocused();
  const [change, setChange] = useState(false);
  const [loadConfig, setLoadConfig] = useState(false);

  const dispatch = useDispatch();
  //@ts-ignore
  const auth = useSelector(state => state.auth.loginSuccess);
  //@ts-ignore
  const login = useSelector(state => state.login);
  const firstRender = useRef(true);
  //@ts-ignore
  const Configure = useSelector(state => state.config);

  const updateEmail = (value: string) => {
    setEmail(value);
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    setChange(true);
  };

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };

  const loadConfiguration = () => {
    const parameters = remoteConfig().getAll();
    // @ts-ignore
    if (parameters != undefined && parameters != {}) {
      // @ts-ignore
      const configJson = JSON.parse(parameters.config._value);
      dispatch(Config(configJson));
    }
  };

  const renderEmailError = () => {
    if (error === 'Wrong Email') {
      return (
        <Text style={LoginScreenStyles.error}>
          Please enter the correct email ID
        </Text>
      );
    } else if (error === 'No Email') {
      return <Text style={LoginScreenStyles.error}>Required</Text>;
    }
  };

  const renderPasswordError = () => {
    if (error === 'Wrong Password') {
      return (
        <Text style={LoginScreenStyles.error}>
          Please enter the correct password
        </Text>
      );
    } else if (error === 'No Password') {
      return <Text style={LoginScreenStyles.error}>Required</Text>;
    }
  };

  const loadData = async () => {
    if (firstRender.current) {
      //@ts-ignore
      dispatch(loginSaga({email: login.email, password: login.password}));
      firstRender.current = false;
    }
    const res = auth;
    if (res[0] == true) {
      if (res[1] === 'admin') {
        navigation.navigate('AdminHome');
      } else if (res[1] === 'spoc') {
        navigation.navigate('SpocHome', {res});
      } else if (res[1] === 'emp') {
        navigation.navigate('EmployeeHome', {res});
      }
    }
  };

  const signIn = () => {
    if (email === '') {
      setError('No Email');
    } else if (password === '') {
      setError('No Password');
    } else {
      setPressed(true);
      if (auth != undefined && auth.length == 0) {
        //@ts-ignore
        dispatch(loginSaga({email: email, password: password}));
      }
      const res = auth;
      if (res[0] != 'Wrong Email' && res[0] != 'Wrong Password') {
        if (res[0] == true && res[3] !== false) {
          if (res[1] === 'admin') {
            navigation.navigate('AdminHome');
            dispatch(
              addUser({
                email: email,
                password: password,
                isLoggedIn: true,
                accountType: 'admin',
              }),
            );
          } else if (res[1] === 'spoc') {
            navigation.navigate('SpocHome', {res});
            dispatch(
              addUser({
                email: email,
                password: password,
                isLoggedIn: true,
                accountType: 'spoc',
              }),
            );
          } else if (res[1] === 'emp') {
            navigation.navigate('EmployeeHome', {res});
            dispatch(
              addUser({
                email: email,
                password: password,
                isLoggedIn: true,
                accountType: 'emp',
              }),
            );
          }
        } else if (res[3] === false) {
          navigation.navigate('InitialSetPassword');
        }
      } else {
        setPressed(false);
        if (auth[0] === 'Wrong Email') {
          setError(auth[0]);
        } else if (auth[0] === 'Wrong Password') {
          setError(auth[0]);
        }
      }
    }
    setPrevEmail(email);
    setPrevPassword(password);
    setClick(false);
  };

  useEffect(() => {
    remoteConfig()
      .fetchAndActivate()
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
        loadConfiguration();
      });
  }, []);

  useEffect(() => {}, [error]);

  useEffect(() => {
    setClick(false);
  }, [isFocused]);

  useEffect(() => {
    console.log('click', click);
    if (click || auth.length > 0) {
      signIn();
    }
  }, [auth,click]);

  useEffect(() => {
    console.log('auto', auth);
    if (login.isLoggedIn) {
      console.log('auto true');
      setError('');
      loadData();
    } else if (auth.length == 0) {
      console.log('auto false');
      setChange(false);
      setPressed(false);
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isFocused, auth]);

  if (!login.isLoggedIn) {
    return (
      <ScrollView style={LoginScreenStyles.container}>
        <ImageBackground
          style={LoginScreenStyles.background}
          source={require('../../assets/LoginBackground1.png')}>
          <StatusBar backgroundColor="#3274AB" hidden={false} />
          <View>
            <View style={LoginScreenStyles.subContainer}>
              <Text style={LoginScreenStyles.headertext}>
                Signin to get started
              </Text>
            </View>
            <View style={LoginScreenStyles.subContainer}>
              <Text style={LoginScreenStyles.text}>
                Enter Your Corp email id and password to signin
              </Text>
            </View>
            <View style={LoginScreenStyles.input}>
              <CustomTextInput
                label="Capgemini Mail ID"
                updateValue={updateEmail}
                error={
                  error === 'Wrong Email' ||
                  error === 'No Email' ||
                  error === 'No Both'
                }></CustomTextInput>
              <>{renderEmailError()}</>
            </View>
            <View>
              <CustomPasswordTextInput
                label="Password"
                updateValue={updatePassword}
                error={
                  error === 'Wrong Password' ||
                  error === 'No Password' ||
                  error === 'No Both'
                }></CustomPasswordTextInput>
              <>{renderPasswordError()}</>
            </View>
            <TouchableOpacity onPress={() => changeModalVisibility(true)}>
              <Text style={LoginScreenStyles.fpText}>Forgot Password?</Text>
              <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}>
                <ForgotPassModal
                  changeModalVisibility={changeModalVisibility}
                />
              </Modal>
            </TouchableOpacity>
            <View style={LoginScreenStyles.button}>
              {change == true && (
                <CustomButton
                  text="Sign In"
                  onPress={() => {
                    setClick(true);
                  }}
                  backgroundColor={Configure.primaryAffiramtionButtonColor}
                  textColor="white"></CustomButton>
              )}
              {pressed == true && <CustomLoader />}
              {change == false && (
                <CustomButton
                  text="Sign In"
                  disabled
                  backgroundColor={Configure.primaryDisableduttonColor}
                  textColor="#979797"
                />
              )}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  } else {
    return <></>;
  }
};

export default LoginScreen;

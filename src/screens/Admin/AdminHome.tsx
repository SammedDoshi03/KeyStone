import {
  Alert,
  Text,
  View,
  Dimensions,
  Modal,
  Image,
  BackHandler,
} from 'react-native';
import React from 'react';
import AdminLogo from '../../components/atoms/icons/admin-logo';
import CustomButton from '../../components/atoms/custom-button';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  DetailsSkeleton,
  ListDetailsComponent,
  TitleTextSkeleton,
} from '../../components/SkeletonComonents';
import CustomModal from '../../components/CustomModal';
import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/reducers/userDataReducer';
import { fetchSpocAmount } from '../../redux/reducers/spocReducer';
import AdminHomeStylesSheet from '../../styles/screens/AdminStyleSheet';

const AdminHome = ({ navigation }: any) => {
  const [location, setlocation] = useState();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [spocData, setSpocData] = useState();
  const AdminHomeStyles = AdminHomeStylesSheet().AdminHomeStyles;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //@ts-ignore
  const data = useSelector(state => state.userData.userData);
  //@ts-ignore
  const spocData2 = useSelector(state => state.spoc.spocAmount);
  //@ts-ignore
  const Config = useSelector(state => state.config);

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };
  const setData = (option: any) => {
    setlocation(option);
  };

  const loadData = () => {
    try {
      dispatch(fetchUser());
      dispatch(fetchSpocAmount());
      //@ts-ignore
      const userData2 = data;
      //@ts-ignore
      setSpocData(spocData2);
      if (userData2) {
        // setUserData(userData2.name.split(' ').slice(0, 1).join(' '));
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await notifee.requestPermission();

      const data = remoteMessage;
      //@ts-ignore
      const { title, body } = data ? data.notification : '';
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      // Display a notification
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId,
        },
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadData();
    setlocation(undefined);
  }, [isLoading, isFocused, spocData2]);

  useEffect(() => {
    if (location) {
      navigation.navigate('AdminManageSpoc', { location });
    }
  }, [location]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return isLoading || Object.keys(data).length == 0 ? (
    <View style={{ flex: 1, justifyContent: 'flex-start', margin: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TitleTextSkeleton />
      </View>
      <ListDetailsComponent />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{ flex: 1, height: 1, backgroundColor: 'grey', margin: 14 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TitleTextSkeleton />
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
        <DetailsSkeleton />
        <DetailsSkeleton />
        <DetailsSkeleton />
        <DetailsSkeleton />
      </View>
    </View>
  ) : (
    <View style={AdminHomeStyles.container}>
      <AdminLogo style={AdminHomeStyles.image} />
      <View style={AdminHomeStyles.mainContent}>
        <Text style={AdminHomeStyles.mainText}>
          Hello <Text style={AdminHomeStyles.mainText1}>{userData.split(' ').slice(0, 1).join(' ')}</Text>, welcome to Admin board. You can now add/remove/edit SPOC details with respect to location.</Text>
        <Text style={AdminHomeStyles.spocText}>
          Total number of SPOC: <Text style={AdminHomeStyles.spocText1}>{spocData}</Text></Text>
      </View>
      <View style={AdminHomeStyles.button}>
        <Modal
          transparent={true}
          animationType='fade'
          visible={isModalVisible}
          onRequestClose={() => changeModalVisibility(false)}>
          <CustomModal changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>
        <CustomButton text='Manage SPOC' borderColor={Config.primaryButtonColor} backgroundColor="#fff" textColor={Config.primaryButtonColor} onPress={() => changeModalVisibility(true)} />
      </View>
    </View>
  );
};

export default AdminHome;

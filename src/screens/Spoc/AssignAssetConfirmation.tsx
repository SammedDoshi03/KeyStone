import { Alert, FlatList, ScrollView, StatusBar, Text, ToastAndroid, View } from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomDatepicker from '../../components/CustomDatePicker';
import {AssignassetconfirmationStyles} from '../../styles/screens/SpocStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser, fetchUserId} from '../../redux/reducers/userDataReducer';
import { addAssets } from '../../redux/reducers/assetReducer';

const AssignAssetConfirmation = ({navigation, route}: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const str = route.params.assetData[2].split('/');
  const [spocID, setSpocID] = useState('');
  const [isLoading, setIsLoaded] = useState(true);
  const [change, setChange] = useState(false);
  const [location, setLocation] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  // @ts-ignore
  const Config = useSelector(state => state.config);
  //@ts-ignore
  const user = useSelector(state => state.userData.userData);
  //@ts-ignore
  const id = useSelector(state => state.userData.userId);

  const updatestartDate = (value: Date) => {
    setStartDate(value);
  };

  const updateEndDate = (value: Date) => {
    setEndDate(value);
    setChange(true);
  };

  const renderItem = asset => {
    if (asset.index % 2 === 0) {
      return (
        <Text style={AssignassetconfirmationStyles.descText}>{asset.item}</Text>
      );
    } else {
      return (
        <Text style={AssignassetconfirmationStyles.userText}>{asset.item}</Text>
      );
    }
  };

  const assignMessage = (serialNumber, email) => {
    Alert.alert(
      'Are You Sure ?',
      `Allocate Asset ${serialNumber} to  ${email}`,
      [
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Agree',
          onPress: async () => {
            //@ts-ignore
            dispatch(addAssets({assetData: [...route.params.assetData, startDate, endDate, email, spocID]}))
            setTimeout(() => {
              navigation.navigate('SpocHome', location);
            }, 2000);
          },
        },
      ],
    );
  };
  const spocDataLoader = () => {
    try {
      if (firstRender.current) {
        dispatch(fetchUser());
        dispatch(fetchUserId());
        firstRender.current = false;
      }
        //@ts-ignore
        setSpocID(id);
        //@ts-ignore
        setLocation(user.location);
        setIsLoaded(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (showToast) {
        ToastAndroid.showWithGravity(
            "Asset assigned successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    setShowToast(false);
  }, [showToast])

  useEffect(() => {
    spocDataLoader();
  }, [isLoading]);
  
  return (
    <ScrollView
      persistentScrollbar={true}
      indicatorStyle="black"
      showsVerticalScrollIndicator={true}
      style={AssignassetconfirmationStyles.container}>
      <StatusBar backgroundColor="#3274AB" />
      <View style={AssignassetconfirmationStyles.personalContent}>
        <Text style={AssignassetconfirmationStyles.descText}>
          Employee Name
        </Text>
        <Text style={AssignassetconfirmationStyles.userText}>
          {route.params.empData.name}
        </Text>
        <Text style={AssignassetconfirmationStyles.descText}>
          Employee Mail Id
        </Text>
        <Text style={AssignassetconfirmationStyles.userText}>
          {route.params.empData.email}
        </Text>
        <Text style={AssignassetconfirmationStyles.descText}>Employee ID</Text>
        <Text style={AssignassetconfirmationStyles.userText}>
          {route.params.empData.empId}
        </Text>
        <Text style={AssignassetconfirmationStyles.descText}>Project Name</Text>
        <Text style={AssignassetconfirmationStyles.userText}>
          {route.params.assetData[0]}
        </Text>
        <FlatList data={str} renderItem={renderItem} />
        <Text style={AssignassetconfirmationStyles.descText}>
          Serial Number
        </Text>
        <Text style={AssignassetconfirmationStyles.userText}>
          {route.params.assetData[1]}
        </Text>
      </View>
      <View style={AssignassetconfirmationStyles.line}></View>
      <View style={AssignassetconfirmationStyles.assetContent}>
        <Text style={AssignassetconfirmationStyles.dateText}>
          Set asset allocation time frame
        </Text>
        <View style={AssignassetconfirmationStyles.dateContent}>
          <Text style={AssignassetconfirmationStyles.dateText1}>FROM: </Text>
          <CustomDatepicker
            iconName="calendar-start"
            label="Select"
            updateValue={updatestartDate}></CustomDatepicker>
        </View>
        <View style={AssignassetconfirmationStyles.dateContent}>
          <Text style={AssignassetconfirmationStyles.dateText1}>TO: </Text>
          <CustomDatepicker
            iconName="calendar-end"
            label="Select"
            updateValue={updateEndDate}></CustomDatepicker>
        </View>
      </View>
      <View style={AssignassetconfirmationStyles.button}>
        {change == true && (
          <CustomButton
            text="Assign"
            backgroundColor="#9BC354"
            textColor="#FFFFFF"
            onPress={() =>
              assignMessage(
                route.params.assetData[1],
                route.params.empData.email,
              )
            }
          />
        )}
        {change == false && (
          <CustomButton
            text="Assign"
            disabled
            backgroundColor={Config.primaryDisableduttonColor}
            textColor="#979797"
          />
        )}
        {/* <CustomButton text='Assign' textColor='white' backgroundColor='#9BC354' onPress={
                    () => assignMessage(route.params.assetData[1], route.params.empData.email)
                }></CustomButton> */}
      </View>
    </ScrollView>
  );
};

export default AssignAssetConfirmation;

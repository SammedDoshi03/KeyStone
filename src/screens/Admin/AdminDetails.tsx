import React, {useEffect, useRef, useState} from 'react';
import CustomButton from '../../components/atoms/custom-button';
import {useDispatch, useSelector} from 'react-redux';
import AdminHomeStylesSheet from '../../styles/screens/AdminStyleSheet';
import {fetchUser, purgeUserData} from '../../redux/reducers/userDataReducer';
import {getAssets} from '../../redux/reducers/assetReducer';
import {logoutSaga, purgeAuth} from '../../redux/reducers/authReducer';
import { Alert, FlatList, ScrollView, StatusBar, Text, ToastAndroid, View } from 'react-native'
import { removeUser, logout } from "../../redux/reducers/userReducer"
import Config from '../../Utils/config.json'

const AdminDetails = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData]: any = useState();
  const [assetData, setAssetData]: any = useState();
  const [config, setConfig]: any[] = useState([]);
  const [click, setClick] = useState(false);
  const [showToast, setShowToast] = useState(false);
  //@ts-ignore
  const data = useSelector(state => state.userData.userData);
  //@ts-ignore
  const assetInfo = useSelector(state => state.asset.assetDataList);
  //@ts-ignore
  const isLoggedOut = useSelector(state => state.auth.isLoggedOut);
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const AdminDetailsStyles = AdminHomeStylesSheet().AdminDetailsStyles;

  const loadData = () => {
    try {
      if (firstRender.current) {
        dispatch(fetchUser());
        firstRender.current = false;
      }
      //@ts-ignore
      const userData2 = data;
      setUserData(userData2);
      if (userData2.email && assetInfo.length == 0) {
        //@ts-ignore
        dispatch(getAssets({email: userData2.email}));
      }
      const superArr: any[] = [];
      if (assetInfo) {
        //@ts-ignore
        for (let i = 0; i < assetInfo.length; i++) {
          const arr: any[] = [];
          //@ts-ignore
          for (let key in assetInfo[i]) {
            //@ts-ignore
            if (assetInfo[i].hasOwnProperty(key)) {
              if (
                ![
                  'category',
                  'startDate',
                  'endDate',
                  'serialNumber',
                  'isAllocated',
                  'projectName',
                  'status',
                  'spoc',
                  'request',
                  'path',
                ].includes(key)
              ) {
                //@ts-ignore
                let val = assetInfo[i][key];
                key = key[0].toUpperCase() + key.substring(1);
                arr.push({key, val});
              }
            }
          }
          superArr.push(arr);
        }
        setConfig(superArr);
        //@ts-ignore
        setAssetData(assetInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptanceTC = () =>
        Alert.alert(
            "Log out?",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { setShowToast(true); LogOut(); } }
            ]
        );
  useEffect(() => {
    if (showToast) {
        ToastAndroid.showWithGravity(
            "Logout successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    setShowToast(false);
  }, [showToast])

  const renderSubItem = items => {
    return (
      <>
        <Text style={AdminDetailsStyles.descText}>{items.item.key}</Text>
        <Text style={AdminDetailsStyles.userText}>{items.item.val}</Text>
      </>
    );
  };

  const renderItem = arr => {
    return (
      <View>
        <Text style={AdminDetailsStyles.descText}>Category</Text>
        <Text style={AdminDetailsStyles.userText}>{arr.item.category}</Text>
        <FlatList data={config[arr.index]} renderItem={renderSubItem} />

        <Text style={AdminDetailsStyles.descText}>Serial Number</Text>
        <Text style={AdminDetailsStyles.userText}>{arr.item.serialNumber}</Text>
      </View>
    );
  };

  const LogOut = () => {
    dispatch(removeUser({}));
    dispatch(purgeAuth());
    dispatch(purgeUserData());
    dispatch(logout({}));
    navigation.navigate('LoginScreen');
    setClick(false);
  };

  useEffect(() => {
    loadData();
  }, [dispatch, data, assetInfo]);

  useEffect(() => {
    if (click) {
      acceptanceTC();
    }
  }, [click, isLoggedOut]);

  return !isLoading ? (
    <>
      <StatusBar backgroundColor="#3274AB" />
      <View style={AdminDetailsStyles.headingContainer}>
        <Text style={AdminDetailsStyles.mainHeading}>Admin Details</Text>
      </View>
      <View style={AdminDetailsStyles.personalContent}>
        <Text style={AdminDetailsStyles.descText}>Name</Text>
        {/* @ts-ignore */}
        <Text style={AdminDetailsStyles.userText}>{userData.name}</Text>
        <Text style={AdminDetailsStyles.descText}>Corp Mail</Text>
        {/* @ts-ignore */}
        <Text style={AdminDetailsStyles.userText}>{userData.email}</Text>
        <Text style={AdminDetailsStyles.descText}>Location</Text>
        {/* @ts-ignore */}
        <Text style={AdminDetailsStyles.userText}>{userData.location}</Text>
      </View>
      {assetData ? (
        <>
          <View style={AdminDetailsStyles.assetHeading}>
            <Text style={AdminDetailsStyles.subHeadings}>Asset Details</Text>
          </View>

          <ScrollView
            persistentScrollbar={true}
            indicatorStyle="black"
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            style={AdminDetailsStyles.container}>
            <View style={AdminDetailsStyles.assetContent}>
              <FlatList data={assetData} renderItem={renderItem} />
            </View>
          </ScrollView>
        </>
      ) : (
        <></>
      )}
      <View style={AdminDetailsStyles.btn}>
        <CustomButton
          text="Log Out"
          backgroundColor="white"
          borderColor={Config.primaryRejectionOutlineButtonColor}
          textColor="black"
          onPress={() => {
            setClick(true);
          }}></CustomButton>
      </View>
    </>
  ) : (
    <></>
  );
};

export default AdminDetails;

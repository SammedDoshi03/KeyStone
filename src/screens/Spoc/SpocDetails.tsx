import { FlatList, ScrollView, StatusBar, Text, View, Image, ToastAndroid, Alert } from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, logout} from '../../redux/reducers/userReducer';
import {SpocDetailsStyles} from '../../styles/screens/SpocStyleSheet';
import {purgeAuth} from '../../redux/reducers/authReducer';
import {fetchUser, purgeUserData} from '../../redux/reducers/userDataReducer';
import {getAssets} from '../../redux/reducers/assetReducer';

const SpocDetails = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData]: any = useState();
  const [assetData, setAssetData]: any = useState();
  const [config, setConfig]: any[] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [click, setClick] = useState(false);

  // @ts-ignore
  const Config = useSelector(state => state.config);
  //@ts-ignore
  const data = useSelector(state => state.userData.userData);
  //@ts-ignore
  const assetInfo = useSelector(state => state.asset.assetDataList);
  //@ts-ignore
  const isLoggedOut = useSelector(state => state.auth.isLoggedOut);

  const dispatch = useDispatch();
  const firstRender = useRef(true);
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

  const renderSubItem = items => {
    return (
      <>
        <Text style={SpocDetailsStyles.descText}>{items.item.key}</Text>
        <Text style={SpocDetailsStyles.userText}>{items.item.val}</Text>
      </>
    );
  };

  const renderItem = arr => {
    return (
      <View
        style={{
          borderBottomColor: '#979797',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}>
        <Text style={SpocDetailsStyles.descText}>Category</Text>
        <Text style={SpocDetailsStyles.userText}>{arr.item.category}</Text>
        <FlatList data={config[arr.index]} renderItem={renderSubItem} />

        <Text style={SpocDetailsStyles.descText}>Serial Number</Text>
        <Text style={SpocDetailsStyles.userText}>{arr.item.serialNumber}</Text>
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

  const acceptanceTC = () =>
        Alert.alert(
            "Log out?",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { setShowToast(true); LogOut() } }
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
      <View style={SpocDetailsStyles.headingContainer}>
        <Text style={SpocDetailsStyles.mainHeading}>SPOC Details</Text>
      </View>
      <View style={SpocDetailsStyles.personalContent}>
        <Text style={SpocDetailsStyles.descText}>Name</Text>
        {/* @ts-ignore */}
        <Text style={SpocDetailsStyles.userText}>{userData.name}</Text>
        <Text style={SpocDetailsStyles.descText}>Corp Mail</Text>
        {/* @ts-ignore */}
        <Text style={SpocDetailsStyles.userText}>{userData.email}</Text>
        <Text style={SpocDetailsStyles.descText}>Location</Text>
        {/* @ts-ignore */}
        <Text style={SpocDetailsStyles.userText}>{userData.location}</Text>
      </View>
      {assetData ? (
        <>
          <View style={SpocDetailsStyles.assetHeading}>
            <Text style={SpocDetailsStyles.subHeadings}>Asset Details</Text>
          </View>

          <ScrollView
            persistentScrollbar={true}
            indicatorStyle="black"
            showsVerticalScrollIndicator={true}
            style={SpocDetailsStyles.container}>
            <View style={SpocDetailsStyles.assetContent}>
              <FlatList data={assetData} renderItem={renderItem} />
            </View>
          </ScrollView>
        </>
      ) : (
        <></>
      )}
      <View style={SpocDetailsStyles.btn}>
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

export default SpocDetails;

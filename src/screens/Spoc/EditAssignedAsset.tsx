import { Dimensions, StatusBar, ScrollView, Text, View, TouchableOpacity, Alert, FlatList, Animated, ToastAndroid } from 'react-native'
import React, {useEffect, useState} from 'react';
import CustomSmallButton from '../../components/CustomSmallButton';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import { getUserAssets, removeAsset, updateAsset } from '../../redux/reducers/assetReducer';
import { ListDetailsComponent, DetailsSkeleton } from '../../components/SkeletonComonents'
import { ScalingDot } from "react-native-animated-pagination-dots";
import { EditAssignedAssetStyles } from '../../styles/screens/SpocStyleSheet'

const WIDTH = Dimensions.get('window').width;

const EditAssignedAsset = ({navigation, route}: any) => {
  const item = route.params?.item;
  const location = item.location;
  const [details, setDetails] = useState<any>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [config, setConfig]: any[] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const dispatch = useDispatch();
  //   @ts-ignore
  const assetInfo = useSelector(state => state.asset.allocatedAssetUserAssetDataList);
  const scrollX = React.useRef(new Animated.Value(0)).current;


  const fetchUserAsset = async () => {
    if (item) {
      dispatch(getUserAssets({email: item.email}));
    }
    
    const respone = assetInfo;
    if (respone.length > 0 && respone !== null) {
      const superArr: any[] = [];
      for (let i = 0; i < respone.length; i++) {
        const arr: any[] = [];
        //@ts-ignore
        for (let key in respone[i]) {
          //@ts-ignore
          if (respone[i].hasOwnProperty(key)) {
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
              let val = respone[i][key];
              key = key[0].toUpperCase() + key.substring(1);
              arr.push({key, val});
            }
          }
        }
        superArr.push(arr);
      }
      setConfig(superArr);
      setDetails(respone);
      setShowToast1(true);
      setIsLoading(false);
    }
  };

  const AlretMessage = (email, date) => {
    Alert.alert(
      'Are You Sure ?',
      `New End Date : ${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })} `,
      [
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Agree',
          onPress:  () => {
            // @ts-ignore
           dispatch(updateAsset({email: email, endDate: date,index: index}));
            setShowToast(true);
            if (item) {
              dispatch(getUserAssets({email: item.email}));
            }
          },
        },
      ],
    );
  };

  const UnAssignMessage = (serialNumber, email, path) => {
    Alert.alert(
      'Are You Sure ?',
      `Remove Asset Allocation of ${serialNumber} for ${email}`,
      [
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Agree',
          onPress: () => {
          // @ts-ignore
          dispatch(removeAsset({email:email,serialNumber: serialNumber, path:path})),
          navigation.navigate('AllocatedAssets', {location});
          },
        },
      ],
    );
  };

  const renderSubItem = items => {
    return (
      <>
        <Text style={EditAssignedAssetStyles.descText}>{items.item.key}</Text>
        <Text style={EditAssignedAssetStyles.userText}>{items.item.val}</Text>
      </>
    );
  };

  const renderItem = (arr) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <View style={EditAssignedAssetStyles.assetView}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 8, textTransform: 'capitalize' }}>{arr.item.category}</Text>
                <View style={EditAssignedAssetStyles.line}></View>
                <View style={{ marginBottom: 0, height: 265}}>
                    <ScrollView style={{}}>
                        <Text style={EditAssignedAssetStyles.descText}>Project Name : <Text style={EditAssignedAssetStyles.userText}>{arr.item.projectName.length > 13 ? arr.item.projectName.slice(0, 13) + '...' : arr.item.projectName}</Text></Text>

                        {/* <Text style={EditAssignedAssetStyles.descText}>Category : <Text style={EditAssignedAssetStyles.userText}>{arr.item.category}</Text></Text> */}

                        {/* <FlatList
                            data={config[arr.index]}
                            renderItem={renderSubItem} /> */}
                        <Text style={EditAssignedAssetStyles.descText}>Serial Number :<Text style={EditAssignedAssetStyles.userText}>{arr.item.serialNumber}</Text></Text>

                        <Text style={EditAssignedAssetStyles.descText}>Status :<Text style={EditAssignedAssetStyles.userText}>{arr.item.status}</Text></Text>

                        <Text style={EditAssignedAssetStyles.descText}>Request :<Text style={EditAssignedAssetStyles.userText}>{(arr.item.request) ? arr.item.request : 'No Request'}</Text></Text>

                        <Text style={EditAssignedAssetStyles.descText}>Start Date :<Text style={EditAssignedAssetStyles.userText}> {details[arr.index].startDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })} </Text></Text>

                        <View style={{ flex: 1, flexDirection:'row',justifyContent:'space-between' }}>
                            <View>
                                <Text style={EditAssignedAssetStyles.descText}>End Date :
                                    <Text style={EditAssignedAssetStyles.userText}>
                                        {details[arr.index].endDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}
                                    </Text>
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{ paddingLeft: 0 }}
                                    onPress={() => { setOpen(true); setIndex(arr.index) }}>
                                    <Text style={{ fontSize: 16, color: 'blue' }}> Change</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={EditAssignedAssetStyles.btn}>
                        <CustomSmallButton
                            text='Unassign' textColor='#000' backgroundColor='#fff' borderColor='#DD535D'
                            onPress={() => UnAssignMessage(details[arr.index].serialNumber, item.email, details[arr.index].path)}></CustomSmallButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

  useEffect(() => {
    if (isLoading) {
      fetchUserAsset();
    }
  }, [open, date, isLoading,assetInfo]);

  useEffect(() => {
    if (showToast) {
      ToastAndroid.showWithGravity(
        'Changes are saved successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }, [showToast]);
  
  useEffect(() => {
    if (showToast1) {
        ToastAndroid.showWithGravity(
            "Changes saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    setShowToast1(false);
  }, [showToast1])

  useEffect(() => {}, [details, config]);

  return (assetInfo != null && assetInfo.length > 0) ? (
    <>
      <ScrollView
        persistentScrollbar={true}
        indicatorStyle="black"
        showsVerticalScrollIndicator={true}
        style={EditAssignedAssetStyles.container}>
        <StatusBar backgroundColor="#3274AB" />
        <View style={EditAssignedAssetStyles.personalContent}>
          <Text style={EditAssignedAssetStyles.descText}>Employee Mail Id</Text>
          <Text style={EditAssignedAssetStyles.userText}>{item.email}</Text>
          <Text style={EditAssignedAssetStyles.descText}>Employee ID</Text>
          <Text style={EditAssignedAssetStyles.userText}>{item.empId}</Text>
          <View style={EditAssignedAssetStyles.line}></View>
        </View>
        <FlatList
          data={assetInfo}
          horizontal={true}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          ItemSeparatorComponent={() => {
            return <View style={{marginHorizontal: 4}} />;
          }}
          key = {assetInfo[index]}
        />
        <View style={{marginTop: 20}}>
          <ScalingDot
            data={assetInfo}
            activeDotColor={'#4DABD7'}
            scrollX={scrollX}
          />
        </View>
        <DatePicker
          modal
          open={open}
          date={assetInfo[index].endDate.toDate()}
          mode={'date'}
          minimumDate={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            AlretMessage(item.email, date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>
    </>
  ) : (
    <View style={{flex: 1, justifyContent: 'flex-start', margin: 12}}>
      <ListDetailsComponent />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
        <DetailsSkeleton />
        <DetailsSkeleton />
      </View>
    </View>
  );
};

export default EditAssignedAsset;

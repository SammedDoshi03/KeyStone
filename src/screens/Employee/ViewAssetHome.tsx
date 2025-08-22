import React, { useEffect, useRef, useState } from 'react';
import ViewAcceptedAsset from './ViewAcceptedAsset';
import ViewPendingAsset from './ViewPendingAsset';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ListComponet, { TitleTextSkeleton } from '../../components/SkeletonComonents';
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../../redux/reducers/assetReducer';


const Tab = createMaterialBottomTabNavigator()

const ViewAssetHome = ({ navigation, route }: any) => {
  LogBox.ignoreAllLogs();

  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [acceptedAssetData, setAcceptedAssetData]: any = useState();
  const [pendingAssetData, setPendingAssetData]: any = useState();
  const dispatch = useDispatch();
  //@ts-ignore
  const assetInfo = useSelector(state => state.asset.assetDataList);
  const firstRender = useRef(true);

  const loadData = () => {
    console.log('render = ', firstRender.current)
    if (firstRender.current) {
      //@ts-ignore
      dispatch(getAssets({ email: route.params.email }));
      firstRender.current = false;
    }
    console.log('assetInfo = ', assetInfo)
    const accepted: any[] = [];
    const pending: any[] = [];
    if (assetInfo) {
      for (let i = 0; i < assetInfo.length; i++) {
        if (assetInfo[i].status === 'accepted') {
          accepted.push(assetInfo[i]);
        }
        else if (assetInfo[i].status === 'pending') {
          pending.push(assetInfo[i]);
        }
      }
      setAcceptedAssetData(accepted);
      setPendingAssetData(pending);

    }
    if (assetInfo.length > 0) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    firstRender.current = true;
  }, [isFocused])

  useEffect(() => {
    loadData();
  }, [isFocused, assetInfo])

  if (!isLoading) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          //@ts-ignore
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Accepted Assets') {
              iconName = 'check-circle-outline';
              size = focused ? 25 : 20;
              color = focused ? '#3274AB' : '#979797';
            } else if (route.name === 'Pending Assets') {
              iconName = 'alert-circle-outline';
              size = focused ? 25 : 20;
              color = focused ? '#3274AB' : '#979797';
            }
            return (
              <Icon name={iconName} size={size} color={color} />
            )
          }
        })}
        activeColor='#000'
        inactiveColor='#3e2465'
        barStyle={{ backgroundColor: '#fff', borderTopColor: '#c4c4c4', borderTopWidth: 1, height: 60 }}
        initialRouteName='Accepted Assets'
      >
        <Tab.Screen name="Accepted Assets" children={() => <ViewAcceptedAsset navigation={navigation} location={route.params.location} assetData={acceptedAssetData} email={route.params.email}></ViewAcceptedAsset>} />
        <Tab.Screen name="Pending Assets" children={() => <ViewPendingAsset navigation={navigation} location={route.params.location} assetData={pendingAssetData} email={route.params.email}></ViewPendingAsset>} />
      </Tab.Navigator>


    )
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", margin: 12 }}>
      <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: "center" }}>
        <TitleTextSkeleton />
        <TitleTextSkeleton />
      </View>
      <View style={{ flex: 0.75, flexDirection: 'column', justifyContent: 'space-between', }}>
        <ListComponet />
        <ListComponet />
        <ListComponet />
        <ListComponet />
        <ListComponet />
      </View>
    </View>
  )
}

export default ViewAssetHome;
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, BackHandler } from "react-native";
import CustomAssetCount from "../../components/CustomAssetCount";
import CustomButton from "../../components/CustomButton";
import HomeSpocSkeletonScreen from "./HomeSpocSkeletonScreen";
import { SpocHomeStyles } from "../../styles/screens/SpocStyleSheet";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from "react-redux"
import { fetchCategory, purgeCategoryData } from "../../redux/reducers/categoryReducer";
import { fetchUserCountValue } from "../../redux/reducers/userDataReducer";

const SpocHome = ({ navigation, route }) => {
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userCount, setUserCount] = useState(0);
    const isFocused = useIsFocused();
    const location = route.params.location;
    //@ts-ignore
    const Config = useSelector(state => state.config)
    //@ts-ignore
    const data = useSelector(state => state.category.CategoryData);
    //@ts-ignore
    const count = useSelector(state => state.userData.userCount)
    const dispatch = useDispatch();
        
            
    const CategoryData = () => {
        try {
           if(data.length == 0){  
            dispatch(fetchCategory());
            dispatch(fetchUserCountValue({location}))
            setCategoryData(data)
            setUserCount(count);
           
           }
           if(data.length >0){
            setIsLoaded(true);
        }
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(()=>{
        dispatch(purgeCategoryData());
    },[isFocused])
    
    useEffect(() => {    
        CategoryData();
    }, [ isFocused, data, count, navigation])


    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () => backHandler.remove()
    // }, [])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            await notifee.requestPermission()

            const data = remoteMessage
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
    
    return (
        (isLoaded && data.length > 0 ) ?
            <View style={SpocHomeStyles.container}>
                <View style={SpocHomeStyles.subContainer}>
                    <Text style={SpocHomeStyles.text1}>Number of Employees</Text>
                    <Text style={SpocHomeStyles.text2}>{count}</Text>
                </View>
                <View style={SpocHomeStyles.subContainer1}>
                    <Text style={SpocHomeStyles.text1_1}>Assets Available By Category</Text>
                </View>
                <View style={SpocHomeStyles.assetDisplay}>
                    {
                        data.map((ele, index) => {
                            return (
                                <View style={{ flexDirection: 'row', width: '33%' }} key={index}>
                                    <CustomAssetCount key={index} assetCount={ele.value.count} assetType={ele.key} assetDisplay={ele.value.display_view_all} />
                                </View>
                            )
                        })
                    }
                </View>
                <View style={SpocHomeStyles.btn}>
                    <CustomButton text="Assign New Asset" backgroundColor={Config.primaryButtonColor} textColor="#FFFFFF" onPress={() => navigation.navigate('SearchEmp', { location })} />
                    <CustomButton text=" View Allocated Assets" backgroundColor='#FFFFFF' textColor={Config.primaryButtonColor} borderColor={Config.primaryButtonColor} onPress={() => navigation.navigate('AllocatedAssets', { location })} />

                </View>
            </View> :
            <HomeSpocSkeletonScreen />
    )
}

export default SpocHome;

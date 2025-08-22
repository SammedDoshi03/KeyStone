import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StatusBar, Dimensions, Image, BackHandler } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import notifee from '@notifee/react-native';
import { useIsFocused } from '@react-navigation/native'
import { fetchUser } from '../../redux/reducers/userDataReducer'
import userFetch from '../../firebase/userFetch'
import { DetailsSkeleton, ImageComponent, TitleTextSkeleton } from '../../components/SkeletonComonents'
import  EmployeeStyleSheet from '../../styles/screens/EmployeeStyleSheet'
import messaging from '@react-native-firebase/messaging';

export const HEIGHT = Dimensions.get('window').height;

const EmployeeHome = ({ navigation, route }: any) => {

    const words = [
        { text: 'Have a Nice Day 😎', key: 1 },
        { text: 'Namaste 🙏', key: 2 },
        { text: 'Technology is best when it brings people together', key: 3 },
        { text: 'Stay hungry. Stay foolish', key: 4 },
        { text: 'Everything you can imagine is real', key: 5 },
        { text: 'It\'s not a faith in technology. It\'s faith in people', key: 6 }]
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const firstRender = useRef(true);
    const EmployeeHomeStyles = EmployeeStyleSheet().EmployeeHomeStyles
    //@ts-ignore
    const data = useSelector(state => state.userData.userData);
    const [userData, setUserData] = useState()
    const [textValue, setTextValue] = useState('');

    const loadData = () => {
        if(firstRender.current) {
            //@ts-ignore
            dispatch(fetchUser());
            firstRender.current = false;
        }
        console.log(data);
        if(Object.keys(data).length){
            console.log('render flag')
            setIsLoading(false);
        }
    }

    const changeTextValue = () => {
        const len = words.length;
        setTextValue(words[Math.floor(Math.random() * len)].text)
    }

    useEffect(() => {
        loadData();
    }, [isLoading, isFocused, data])

    useEffect(()=>{
        changeTextValue();
    },[userData])

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () => backHandler.remove()
    // }, [])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            await notifee.requestPermission()
                const notificationData =  remoteMessage
                //@ts-ignore
                const {title, body} = notificationData ? notificationData.notification : '';

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
        (!isLoading) ?
            <View style={EmployeeHomeStyles.container}>
                <StatusBar backgroundColor='#3274AB' hidden={false} />
                <Image style={EmployeeHomeStyles.image} source={require('../../assets/EmployeeLogo.png')} />
                <View style={{ marginTop: HEIGHT / 27 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={EmployeeHomeStyles.text1}>Welcome, </Text>
                        {/* @ts-ignore */}
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>{userData.name.split(' ').slice(0, 1).join(' ')}</Text>
                    </View>
                    <Text style={{ textAlign: 'center', color: 'grey', fontSize: 18, marginTop: 10, fontWeight: '400' }}>{textValue}</Text>
                </View>
                <View style={EmployeeHomeStyles.btn}>
                    <CustomButton text='View Assets' borderColor='#1C0E3A' backgroundColor='#fff' textColor='#1C0E3A' onPress={
                        () => {
                            // @ts-ignore
                            navigation.navigate('ViewAssetHome', { location: data.location, email: data.email });
                        }}></CustomButton>
                </View>
            </View>


            :
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
                <View style={{ flex: 0.5 }}>
                    <ImageComponent />
                </View>

                <View style={{ flex: 0.5 }}>
                    <View style={{ flex: 0.2 }}><TitleTextSkeleton /></View>
                    <View style={{ flex: 0.2, justifyContent: "flex-start" }}>
                        <DetailsSkeleton />
                    </View>
                    <View>
                        <DetailsSkeleton />
                    </View>
                </View>

            </View>
    )
}

export default EmployeeHome;

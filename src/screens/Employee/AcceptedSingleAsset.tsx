import { Alert, Dimensions, FlatList, Modal, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import SpocDetailsModal from '../../components/SpocDetailsModal'
import CustomSmallButton from '../../components/CustomSmallButton'
import EmpModalAccepted from '../../components/EmpModalAccepted'
import  EmployeeStyleSheet from '../../styles/screens/EmployeeStyleSheet'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpocDetails } from '../../redux/reducers/spocReducer'
import { removeAsset, updateAssetStatus } from '../../redux/reducers/assetReducer'

const SingleAsset = ({ navigation, route }: any) => {

    const [userData, setUserData] = useState<any>()
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [config, setConfig]: any[] = useState([]);
    const [requestType, setRequestType] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const SingleAssetStyles = EmployeeStyleSheet().SingleAssetStyles; 
    //@ts-ignore
    const data = useSelector(state => state.spoc.manageSpocDetailData);
    const dispatch = useDispatch();
    const firstRender = useRef(true);
    
    const loadData2= () => {
        try {
            if(firstRender.current) {
                //@ts-ignore
                dispatch(fetchSpocDetails({id: route.params.assetData.spoc}))
                firstRender.current = false;
            }
            //@ts-ignore 
            const spocUser = data;
            if (data) {
                setUserData(spocUser);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const changeModalVisibility = (bool: boolean) => {
        setisModalVisible(bool)
    }
    const [isModalVisibleSPOC, setisModalVisibleSPOC] = useState(false);

    const changeModalVisibilitySPOC = (bool: boolean) => {
        setisModalVisibleSPOC(bool)
        if (!bool) {

        }
    }

    const loadData = () => {
        const arr: any[] = [];
        try {
            const assetInfo = route.params.assetData;
            //@ts-ignore
            for (let key in assetInfo) {
                //@ts-ignore
                if (assetInfo.hasOwnProperty(key)) {
                    if (!(['category', 'startDate', "endDate", 'serialNumber', "isAllocated", 'projectName', 'status', 'spoc', 'request', 'path'].includes(key))) {
                        //@ts-ignore
                        let val = assetInfo[key];
                        key = key[0].toUpperCase() + key.substring(1);
                        arr.push({ key, val });
                    }
                }
            }
            setConfig(arr);
        } catch (e) {
            console.log(e);
        }
    }

    const renderItem = (items) => {
        return (
            <>
                <Text style={SingleAssetStyles.descText}>{items.item.key}</Text>
                <Text style={SingleAssetStyles.userText}>{items.item.val}</Text>
            </>
        )
    }

    const acceptAsset = () => {
        Alert.alert('Confirmation',
        'Are you sure you want to accept the asset?',
        [
            {
                text: "Disagree",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Agree", onPress: () => {
                    //updateAssetStatus(route.params.assetData.serialNumber, 'accepted');
                    //@ts-ignore
                    dispatch(updateAssetStatus({serialNumber: route.params.assetData.serialNumber, status: 'accepted'}));
                    navigation.navigate('ViewAssetHome', { location: route.params.location, email: route.params.email });
                }
            }
            ]
        )
    }

    const rejectAsset = () => {
        Alert.alert('Confirmation',
            'Are you sure you want to reject the asset?',
            [
                {
                    text: "Disagree",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Agree", onPress: () => {
                        // removeAssets(route.params.email, route.params.assetData.serialNumber, route.params.assetData.path)
                        //@ts-ignore
                        dispatch(removeAsset({email: route.params.email, assetRef: route.params.assetData.serialNumber, assetPath: route.params.assetData.path}));
                        navigation.navigate('ViewAssetHome', { location: route.params.location, email: route.params.email });
                    }
                }
            ]
        )
    }

    useEffect(() => {
        if (showToast) {
            ToastAndroid.showWithGravity(
                "Asset accepted",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        setShowToast(false);
    }, [showToast])

    useEffect(() => {
        if (showToast1) {
            ToastAndroid.showWithGravity(
                "Asset rejected",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        setShowToast1(false);
    }, [showToast1])



    

    useEffect(() => {
        if (isLoading) {
            loadData();
        }
        loadData2();
    }, [isLoading, data])

    useEffect(() => {
        if (!isModalVisible) {
            setRequestType('')
        }
    }, [isModalVisible])

    return (
        <ScrollView
            persistentScrollbar={true}
            indicatorStyle="black"
            showsVerticalScrollIndicator={true}
            style={SingleAssetStyles.container}>
            <StatusBar backgroundColor='#3274AB' />
            <View style={SingleAssetStyles.personalContent}>
                <Text style={SingleAssetStyles.descText}>
                    Category
                </Text>
                <Text style={SingleAssetStyles.userText}>
                    {route.params.assetData.category}
                </Text>
                <FlatList
                    data={config}
                    renderItem={renderItem} />
                <Text style={SingleAssetStyles.descText}>
                    Serial Number
                </Text>
                <Text style={SingleAssetStyles.userText}>
                    {route.params.assetData.serialNumber}
                </Text>
            </View>
            <View style={SingleAssetStyles.assetContent}>
                <Text style={SingleAssetStyles.descText}>
                    Start Date
                </Text>
                <Text style={SingleAssetStyles.userText}>
                    {route.params.assetData.startDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}
                </Text>
                <Text style={SingleAssetStyles.descText}>
                    End Date
                </Text>
                <Text style={SingleAssetStyles.userText}>
                    {route.params.assetData.endDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={SingleAssetStyles.userText}>Assigned By : </Text>
                    <TouchableOpacity onPress={() => changeModalVisibilitySPOC(true)}>
                        <Text style={SingleAssetStyles.spocText}>{(userData) ? userData.name : "NA"}</Text>
                        <Modal
                            transparent={true}
                            animationType='slide'
                            visible={isModalVisibleSPOC}
                            onRequestClose={() => changeModalVisibilitySPOC(false)}>
                            <SpocDetailsModal changeModalVisibility={changeModalVisibilitySPOC} id={route.params.assetData.spoc} />
                        </Modal>
                    </TouchableOpacity>
                </View>
            </View>
            {(route.params.assetData.status === 'accepted') ?
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomSmallButton text='Request Return' textColor='#1C0E3A' borderColor='#1C0E3A' backgroundColor='white' onPress={() => {
                            setRequestType('return');
                            changeModalVisibility(true)
                        }} />
                        <CustomSmallButton text='Request Extension' textColor='#1C0E3A' borderColor='#1C0E3A' backgroundColor='white' onPress={() => changeModalVisibility(true)} />
                        <Modal
                            transparent={true}
                            animationType='slide'
                            visible={isModalVisible}
                            onRequestClose={() => changeModalVisibility(false)}>
                            <EmpModalAccepted serialNumber={route.params.assetData.serialNumber} changeModalVisibility={changeModalVisibility} title={(requestType === 'return') ? 'Request Return' : 'Request Extension'} />
                        </Modal>
                    </View>
                </>
                :
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomSmallButton text='Accept' textColor='#1C0E3A' borderColor='#9BC354' backgroundColor='white' onPress={() => { acceptAsset() }} />
                        <CustomSmallButton text='Reject' textColor='#1C0E3A' borderColor='#DD535D' backgroundColor='white' onPress={() => { rejectAsset() }} />
                        <Modal
                            transparent={true}
                            animationType='slide'
                            visible={isModalVisible}
                            onRequestClose={() => changeModalVisibility(false)}>
                            <EmpModalAccepted serialNumber={route.params.assetData.serialNumber} changeModalVisibility={changeModalVisibility} title={(requestType === 'return') ? 'Request Return' : 'Request Extension'} />
                        </Modal>
                    </View>

                </>}
        </ScrollView>
    )
}

export default SingleAsset;

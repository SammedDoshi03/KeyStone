import { Alert, StatusBar, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, logout } from "../../redux/reducers/userReducer"
import  EmployeeStyleSheet from '../../styles/screens/EmployeeStyleSheet'
import { fetchUser } from '../../redux/reducers/userDataReducer'
import { purgeAuth } from '../../redux/reducers/authReducer'

const EmployeeDetails = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData]: any = useState();
    const [click, setClick] = useState(false);
    //@ts-ignore
    const data = useSelector(state => state.userData.userData);
    //@ts-ignore
    const isLoggedOut = useSelector(state => state.auth.isLoggedOut);
    const dispatch = useDispatch();
    const firstRender = useRef(true);
    const EmployeeDetailStyles =  EmployeeStyleSheet().EmployeeDetailStyles
    // @ts-ignore
    const Config = useSelector(state => state.config)
    const [showToast, setShowToast] = useState(false);

    const loadData = () => {
        try {
            if(firstRender.current) {
                //@ts-ignore
                dispatch(fetchUser());
                firstRender.current = false;
            }
            //@ts-ignore
            const userData2 = data;
            setUserData(userData2);

            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const LogOut = () => {
        dispatch(removeUser({}));
        dispatch(purgeAuth());
        dispatch(logout({}));
        navigation.navigate("LoginScreen");
        setClick(false);
    }
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
    }, [dispatch, data])

    useEffect(() => {
        if(click) {
            acceptanceTC();
        }
    }, [click, isLoggedOut])

    return (
        (!isLoading) ?
            <><StatusBar backgroundColor='#3274AB' /><View style={EmployeeDetailStyles.headingContainer}>
                <Text style={EmployeeDetailStyles.mainHeading}>Employee Details</Text>
            </View>
                <View style={EmployeeDetailStyles.personalContent}>
                    <Text style={EmployeeDetailStyles.descText}>Name</Text>
                    {/* @ts-ignore */}
                    <Text style={EmployeeDetailStyles.userText}>{userData.name}</Text>
                    <Text style={EmployeeDetailStyles.descText}>Corp Mail</Text>
                    {/* @ts-ignore */}
                    <Text style={EmployeeDetailStyles.userText}>{userData.email}</Text>
                    <Text style={EmployeeDetailStyles.descText}>Location</Text>
                    {/* @ts-ignore */}
                    <Text style={EmployeeDetailStyles.userText}>{userData.location}</Text>
                </View>
                <View style={EmployeeDetailStyles.btn}>
                    <CustomButton text='Log Out' backgroundColor='white' borderColor={Config.primaryRejectionOutlineButtonColor} textColor='black' onPress={() => { setClick(true) }}></CustomButton>
                </View>
            </>
            :
            <></>
    )
}

export default EmployeeDetails;

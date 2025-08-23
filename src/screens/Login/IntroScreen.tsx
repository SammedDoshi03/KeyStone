import { Text, View, Image, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import CustomButton from '../../components/atoms/custom-button'
import IntroLogo from '../../components/atoms/icons/intro-logo'
import { introHandle } from '../../redux/reducers/userReducer'
import { useDispatch,useSelector } from "react-redux"
import { IntroScreenStyles } from '../../styles/screens/LoginStyleSheet'

const IntroScreen = ({navigation}:any) => {

    const dispatch = useDispatch();
    //@ts-ignore
    const Config = useSelector(state => state.config)
    
    return (
        <View style={IntroScreenStyles.container}>
            <StatusBar backgroundColor='#3274AB' hidden={false} />
            <View>
                <IntroLogo style={IntroScreenStyles.image} />
            </View>
            <View style={IntroScreenStyles.heading1}>
                <Text style={IntroScreenStyles.text1}>Welcome to Assets Management System</Text>
            </View>
            <View style={IntroScreenStyles.heading1}>
                <Text style={IntroScreenStyles.text2}>
                    Allowing you to track and monitor every asset in one central location
                </Text>
            </View>
            <View style={IntroScreenStyles.button}>
                <CustomButton text='Get Started' textColor={Config.primaryButtonTextColor} backgroundColor={Config.primaryButtonColor} borderColor='#1C0E3A' onPress={()=>{
                    //@ts-ignore
                    dispatch(introHandle());
                    navigation.navigate('LoginScreen')
                }} />
            </View>
        </View>
    )
}

export default IntroScreen;

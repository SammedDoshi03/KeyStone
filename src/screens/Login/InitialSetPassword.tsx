import React, { useState } from "react"
import { View, Text, ScrollView, StatusBar, Alert, ActivityIndicator, ImageBackground } from "react-native"
import CustomButton from "../../components/CustomButton"
import CustomPasswordTextInput from "../../components/CustomPasswordTextInput"
import { useSelector } from "react-redux"
import { passUpdate } from "../../firebase/authentication"
import { InitialSetPasswordStyles } from '../../styles/screens/LoginStyleSheet'
import CustomLoader from "../../components/CustomLoader"
import { useDispatch } from 'react-redux';
import { passwordUpdateSaga } from "../../redux/reducers/authReducer"

type InitialSetPasswordProps = {
    name: string;
}

const InitialSetPassword = ({ navigation }: any, { name }: InitialSetPasswordProps) => {

    const [password, setPassword] = useState('');
    const [prevPassword, setPrevPassword] = useState('');
    const [error, setError] = useState('');
    const [change, setChange] = useState(false);
    const [pressed, setPressed] = useState(false);
    const dispatch = useDispatch();
    // @ts-ignore
    const Config = useSelector(state => state.config)
    
    const updatePassword = (value: string) => {
        setPassword(value);
        setChange(true)
    }

    const updatePrevPassword = (value: string) => {
        setPrevPassword(value);
    }

    const renderPrevPasswordError = () => {
        if (error === 'No PrevPassword') {
            return (
                <Text style={InitialSetPasswordStyles.error}>Required</Text>
            )
        }
    }

    const renderPasswordError = () => {
        if (error === 'Wrong Password') {
            return (
                <Text style={InitialSetPasswordStyles.error}>Password need to be same</Text>
            )
        }
        else if (error === 'No Password') {
            return (
                <Text style={InitialSetPasswordStyles.error}>Required</Text>
            )
        }
    }

    const updatePass = () => {
        if(prevPassword===''){
            setError('No PrevPassword')
        }
        else if (password === '') {
            setError('No Password')
        }
        else if(password===prevPassword) {
            setPressed(true)
            //@ts-ignore
            dispatch(passwordUpdateSaga({password: password}));
            navigation.pop();
        }
        else{
            setError('Wrong Password')
        }
    }


    return (
        <ScrollView style={InitialSetPasswordStyles.container}>
            {/* <ImageBackground style={InitialSetPasswordStyles.background} source={require('../../assets/SigninBackground.png')}> */}
                <StatusBar backgroundColor='#3274AB' hidden={false} />
                <View>
                    <View style={InitialSetPasswordStyles.subContainer}>
                        <Text style={InitialSetPasswordStyles.headertext}>Hello {name}</Text>
                    </View>
                    <View style={InitialSetPasswordStyles.subContainer}>
                        <Text style={InitialSetPasswordStyles.text}>Set Your Password, You are just a step away to get started</Text>
                    </View>
                    <View style={InitialSetPasswordStyles.input}>
                        <CustomPasswordTextInput label="New Password" updateValue={updatePrevPassword} error={(error === 'No PrevPassword')}></CustomPasswordTextInput>
                        <>{(prevPassword === '') ? renderPrevPasswordError() : <></>}</>
                    </View>
                    <View>
                        <CustomPasswordTextInput label="Confirm Password" updateValue={updatePassword} error={(error === 'No Password' || error === 'Wrong Password')}></CustomPasswordTextInput>
                        <>{renderPasswordError()}</>
                    </View>
                    <View style={InitialSetPasswordStyles.button}>
                        {change == true && <CustomButton text="Continue" backgroundColor={Config.primaryAffiramtionButtonColor} textColor="white" onPress={() => { updatePass() }}></CustomButton>}
                        {pressed == true && <CustomLoader />}
                        {change == false && <CustomButton text='Continue' disabled backgroundColor={Config.primaryDisableduttonColor} textColor='#979797' />}
                    </View>

                </View>
            {/* </ImageBackground> */}
        </ScrollView>
    )
}

export default InitialSetPassword;

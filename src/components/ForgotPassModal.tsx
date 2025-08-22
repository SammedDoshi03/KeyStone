import { firebase } from "@react-native-firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import Config from '../Utils/config.json'
import Icon from 'react-native-vector-icons/Feather';
import { HEIGHT } from "../Utils/dimension";

type CustomModalProps = {
    changeModalVisibility: (bool: boolean) => void;
}

const ForgotPassModal = ({ changeModalVisibility }: CustomModalProps) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false);
    const [change, setChange] = useState(false)
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const onSubmit = async () => {
        let flag = true
        if (email === '') {
            setError('Wrong Email');
        }
        else {
            await firebase.auth().sendPasswordResetEmail(email).catch(error => {
                if (error.code === "auth/invalid-email" || "auth/user-not-found") {
                    flag = false
                    Alert.alert(error.code);
                    setError('Wrong Email');
                }
                else {
                    Alert.alert('error.code')
                }
            })
            if (flag == true) {
                Alert.alert('Password reset link has been sent to your mail ID')
            }
            changeModalVisibility(!flag)
        }
    }

    const updateEmail = (value: string) => {
        setEmail(value)
        setChange(true)
    }

    const renderEmailError = () => {
        if (error === 'Wrong Email') {
            return (
                <Text style={styles.error}>Please enter the correct email ID</Text>
            )
        }
    }

    useEffect(() => { }, [error])

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.mainContent}>
                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', paddingLeft: 12 }}>Forgot Password</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 4 }}
                        onPress={() => { changeModalVisibility(false) }}
                    >
                        <Icon name="x" size={30} color="#000000" />
                    </TouchableOpacity>
                </View>
                <CustomTextInput label="Enter Email ID..." updateValue={updateEmail} error={(error != '')}></CustomTextInput>
                <>{renderEmailError()}</>

                <View style={styles.btn}>
                    {/* <CustomButton text='Confirm' backgroundColor={Config.primaryButtonColor} textColor='#ffffff' onPress={onSubmit} /> */}
                    {change == true && <CustomButton text='Confirm' backgroundColor={Config.mainBackgroundColor} borderColor={Config.primaryUpdateButtonColor} textColor={Config.generalTextColor} onPress={onSubmit} />}
                    {change == false && <CustomButton text='Confirm' disabled backgroundColor={Config.primaryDisableduttonColor} textColor='#979797' />}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'flex-end',
        flexDirection:'row',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    mainContent: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        backgroundColor: 'white',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        //borderRadius: 10,
        //height: '10%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    error: {
        marginLeft: 20,
        color: 'red'
    },
    btn: {
        //marginTop: HEIGHT-520
        marginTop:'35%',
        marginBottom:10
        //flex: 1,
        //justifyContent: 'flex-end',
        //marginBottom: 10
    }
});

export default ForgotPassModal;
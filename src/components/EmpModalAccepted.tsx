import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, Alert, ToastAndroid, } from "react-native";
import { addRequest } from "../firebase/assets";
import AddCommentInput from "./AddCommentsInput";
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/Feather';
import Config from '../Utils/config.json'

type EmpModalProps = {
    changeModalVisibility: (bool: boolean) => void;
    serialNumber: any;
    title: string;
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EmpModal = ({ changeModalVisibility, serialNumber, title }: EmpModalProps) => {

    const [comment, setComment] = useState('');
    const [change, setChange] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);

    const updateComment = (value: string) => {
        setChange(true);
        setComment(value)
    }

    const requestExt = async () => {
        addRequest(serialNumber, 'Extension')
    }

    const requestRet = async () => {
        addRequest(serialNumber, 'Return')
    }

    const acceptanceReturn = () =>
        Alert.alert(
            "Warning",
            "Changes made after this won't be reverted.",
            [
                {
                    text: "Disagree",
                    onPress: () => { changeModalVisibility(false) },
                    style: "cancel"
                },
                { text: "Agree", onPress: () => { requestRet(), setShowToast(true), changeModalVisibility(false) } }
            ]
        );

    const acceptanceExtend = () =>
        Alert.alert(
            "Warning",
            "Changes made after this won't be reverted.",
            [
                {
                    text: "Disagree",
                    onPress: () => { changeModalVisibility(false) },
                    style: "cancel"
                },
                { text: "Agree", onPress: () => { requestExt(), setShowToast1(true), changeModalVisibility(false) } }
            ]
        );

    useEffect(() => {
        if (showToast) {
            ToastAndroid.showWithGravity(
                "Return request raised successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        setShowToast(false);
    }, [showToast])

    useEffect(() => {
        if (showToast1) {
            ToastAndroid.showWithGravity(
                "Extension request raised successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        setShowToast1(false);
    }, [showToast1])


    useEffect(() => { }, [comment]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.modal}>
                <View style={styles.mainContent}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}> {title}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 4 }}
                        onPress={() => { changeModalVisibility(false) }}
                    >
                        <Icon name="x" size={30} color="#000000" />
                    </TouchableOpacity>
                </View>
                <AddCommentInput label="Add Comments" updateValue={updateComment}></AddCommentInput>
                <View style={styles.btn}>
                    {change == true && <CustomButton text='Confirm' backgroundColor={Config.mainBackgroundColor} borderColor={Config.primaryUpdateButtonColor} textColor={Config.generalTextColor} onPress={() => {
                        if (comment === '') {
                            Alert.alert('Please add comment for the request');
                            setChange(false)
                        }
                        else {
                            (title === 'Request Extension') ? acceptanceExtend() : acceptanceReturn()
                        }
                    }} />}
                    {change == false && <CustomButton text='Confirm' disabled backgroundColor={Config.primaryDisableduttonColor} textColor='#979797' />}
                </View>
            </KeyboardAvoidingView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        //borderRadius: 10,
        //height: '50%'
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    btn: {
        marginTop:'30%',
        marginBottom:10
        //flex: 1,
        //justifyContent: 'flex-end',
        //marginBottom: 10
    }

});

export default EmpModal;

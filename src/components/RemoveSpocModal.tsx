import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Alert, ToastAndroid } from "react-native";
import { removeSPOC } from "../firebase/manageSpoc";
import { HelperText, TextInput } from 'react-native-paper'
import Config from '../Utils/config.json'
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import { HEIGHT } from "../Utils/dimension";

type CustomModalProps = {
    changeModalVisibility: (bool: boolean) => void;
    email: string,
    removedSPOC: (bool: boolean) => void;
}

const RemoveSpocModal = ({ changeModalVisibility, email, removedSPOC }: CustomModalProps) => {

    const [text, setText] = React.useState('');
    const [change, setChange] = React.useState(false);
    const [showToast, setShowToast] = useState(false);

    const onChangeText = (input: string) => {
        setChange(true);
        setText(input);
    }

    const hasErrors = () => {
        if (text === null || text === '') { return true }
        else { return false }
    };

    const acceptanceTC = () =>
        Alert.alert(
            "Warning",
            "Changes made after this won't be reverted.",
            [
                {
                    text: "Disagree",
                    onPress: () => { changeModalVisibility(false) },
                    style: "cancel"
                },
                { text: "Agree", onPress: () => { setShowToast(true), changeModalVisibility(false), removeSPOC(email), removedSPOC(true) } }
            ]
        );

    const validateComment = (comment) => {
        var re = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
        return re.test(comment);
    };

    const onSubmit = (comment) => {
        if (!validateComment(comment)) {
            alert("Please enter a valid comment !!")
        } else {
            acceptanceTC()
        }
    }

    useEffect(() => {
        if (showToast) {
            ToastAndroid.showWithGravity(
                "SPOC removed successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        setShowToast(false);
    }, [showToast])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.modal}>
                <View style={styles.mainContent}>
                    <Text style={{ color: 'black', fontSize: 20 }}> Remove SPOC</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 4 }}
                        onPress={() => { changeModalVisibility(false) }}
                    >
                        <Icon name="x" size={30} color="#000000" />
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 3,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    <TextInput
                        label="Add Comment"
                        mode="outlined"
                        activeOutlineColor={Config.textInputBorderColor}
                        onChangeText={onChangeText}
                    />
                    <HelperText type="error" visible={hasErrors()}>
                        *This Field is Mandatory
                    </HelperText>
                </View>
                <View style={styles.btn}>
                {change == true && <CustomButton text='Confirm' backgroundColor={Config.mainBackgroundColor} borderColor={Config.primaryUpdateButtonColor} textColor={Config.generalTextColor} onPress={() => { onSubmit(text) }} />}
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
        justifyContent: 'space-between'
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

export default RemoveSpocModal;

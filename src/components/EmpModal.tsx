import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, Alert, } from "react-native";
import AddCommentInput from "./AddCommentsInput";
import CustomButton from "../atoms/custom-button";

type EmpModalProps = {
    changeModalVisibility: (bool: boolean) => void;
    title: string;
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EmpModal = ({ changeModalVisibility, title }: EmpModalProps) => {
    
    const acceptanceTC = () =>
        Alert.alert(
            "Warning",
            "Changes made after this won't be reverted.",
            [
                {
                    text: "Disagree",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Agree", onPress: () => { changeModalVisibility(false) } }
            ]
        );

    return (
        <>
            <KeyboardAvoidingView style={styles.modal}>
                <View style={styles.mainContent}>
                    <View style={{justifyContent:'center'}}>
                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}> {title}</Text>
                    </View>
                    <View>
                    <TouchableOpacity
                        onPress={() => changeModalVisibility(false)}
                    >
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            marginLeft: WIDTH / 5,
                        }}>X</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                {/* <AddCommentInput label="Add Comments"></AddCommentInput> */}
                <View style={{ marginTop: 30 }}>
                    <CustomButton text='Confirm' backgroundColor='#9BC354' textColor='#ffffff' onPress={() => { acceptanceTC() }} />
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    mainContent: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: 'white',
        padding:10 ,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        height: '50%'
    },

});

export default EmpModal;

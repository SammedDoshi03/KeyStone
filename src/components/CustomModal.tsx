import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton, TextInput } from 'react-native-paper';

type CustomModalProps = {
    changeModalVisibility: (bool: boolean) => void;
    setData: (option: string) => void;
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CustomModal = ({ changeModalVisibility, setData }: CustomModalProps) => {

    
    const [value, setValue] = React.useState("Select Location");

    const updateSnap = (value: string) => {
        setData(value);
        changeModalVisibility(false);
    }

    return (
        <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold',color:'#000000' }}>Location</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 4 }}
                        onPress={() => { changeModalVisibility(false) }}
                    >
                        <Icon name="x" size={30} color="#000000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.panelHandle}></View>
                <View>
                    <RadioButton.Group onValueChange={value => updateSnap(value)} value={value}>
                        <RadioButton.Item label="Mumbai" value="Mumbai" />
                        <RadioButton.Item label="Hyderabad" value="Hyderabad" />
                        <RadioButton.Item label="Bangalore" value="Bangalore" />
                        <RadioButton.Item label="Chennai" value="Chennai" />
                        <RadioButton.Item label="Pune" value="Pune" />
                        <RadioButton.Item label="Noida" value="Noida" />
                    </RadioButton.Group>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    panelHandle: {
        width: '100%',
        height: 1,
        backgroundColor: '#00000040',
        marginTop: 15
    },
})

export default CustomModal;
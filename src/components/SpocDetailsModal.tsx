import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, } from "react-native";
import { getDetails, getSPOC } from "../firebase/manageSpoc";
import CustomButton from "../atoms/custom-button";
import Icon from 'react-native-vector-icons/Feather';

type EmpModalProps = {
    id: string,
    changeModalVisibility: (bool: boolean) => void;
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SpocDetailsModal = ({ id, changeModalVisibility }: EmpModalProps) => {

    const [userData, setUserData] = useState<any>()

    const loadData = async () => {
        try {
            const data = await getDetails(id);
            //@ts-ignore 
            const spocUser = data._data
            if (data) {
                setUserData(spocUser);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        (userData !== undefined) ?
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.modal}>
                    <View style={styles.mainContent}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}> SPOC Details</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 4 }}
                                onPress={() => { changeModalVisibility(false) }}
                            >
                                <Icon name="x" size={30} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.personalContent}>
                        <Text style={styles.descText}>Name</Text>
                        <Text style={styles.userText}>{userData.name}</Text>
                        <Text style={styles.descText}>Corp Mail</Text>
                        <Text style={styles.userText}>{userData.email}</Text>
                        <Text style={styles.descText}>Location</Text>
                        <Text style={styles.userText}>{userData.location}</Text>
                    </View>
                    
                        <TouchableOpacity style={styles.btn} onPress={() => { changeModalVisibility(false) }}>
                        <Icon name="arrow-left-circle" size={50} color="grey"/>
                        </TouchableOpacity>
                    
                        {/* <CustomButton text='Go Back' backgroundColor='#FFFFFF' textColor='#000000' borderColor="#1C0E3A" onPress={() => { changeModalVisibility(false) }} /> */}
                    
                </KeyboardAvoidingView>
            </View>
            : <></>
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
        paddingLeft:12
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    descText: {
        color: '#979797',
        fontWeight: '400',
        textAlign: 'left',
        fontSize: 18,
    },
    userText: {
        color: 'black',
        fontWeight: '400',
        textAlign: 'left',
        fontSize: 18,
        marginBottom: 20,
    },
    personalContent: {
        paddingLeft:16,
        paddingTop:8
    },
    btn: {
        alignSelf:'center',
        marginTop:'15%',
        marginBottom:10
    }
});

export default SpocDetailsModal;

import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5"

type CustomEmployeeAssetListProps = {
    navigation: any;
    borderColor?: string;
    iconName: string;
    assetData: any;
    email: string;
    location: string;
};

const CustomEmployeeAssetList = ({ navigation, borderColor, iconName, assetData, email, location }: CustomEmployeeAssetListProps) => {

    return (
        <View>
            <View style={[styles.root,
            {
                borderColor: borderColor ? borderColor : "#C4C4C4",
            }]}>
                <TouchableOpacity
                    disabled
                    style={styles.image}>
                    <Icon1 name={iconName} size={30} color='#C4C4C4'></Icon1>
                </TouchableOpacity>
                <View style={styles.rightContainer}>
                    <Text style={styles.assetName}>{assetData.category}</Text>
                    <Text style={styles.serialNumber}>{assetData.serialNumber}</Text>
                    <Text style={styles.dates}>{assetData.startDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}  to  {assetData.endDate.toDate().toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</Text>
                </View>
                <View>
                    {
                        // @ts-ignore
                        <TouchableOpacity
                            style={{ paddingHorizontal: 15 }}
                            onPress={() => { navigation.navigate('SingleAsset', { assetData, email: email, location: location }) }}
                        >
                            <Icon name="arrow-right" size={30} color="#979797" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10,
        margin: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginVertical: 5

    },
    image: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 60,
        marginLeft: 10,
        marginRight: 10
    },
    assetName: {
        fontSize: 18,
        marginBottom: 1,
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'capitalize'
    },
    serialNumber: {
        fontSize: 13,
        color: 'black',
        marginBottom: 1,
        //textDecorationLine:'underline'
    },
    dates: {
        fontSize: 13,
        color: 'black',
    },
    rightContainer: {
        padding: 2,
        flex: 1,
        justifyContent: 'space-between'
    }
})

export default CustomEmployeeAssetList;
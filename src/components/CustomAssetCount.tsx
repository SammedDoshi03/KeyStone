import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type CustomAssetCountProps ={
    assetCount : number | string;
    assetType : string;
    assetDisplay: boolean;
};


const CustomAssetCount = ({assetCount,assetType, assetDisplay}:CustomAssetCountProps) =>{

    if(assetDisplay) {
        return(
            <View style={styles.container}>
                <View style={styles.squareView}>
                    <Text style={styles.countText}>{assetCount}</Text>
                    <Text style={styles.typeText}>{assetType}</Text>
                </View>
            </View>
        )
    }
    else{
        return(<></>)
    }
    

}

const styles=StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:35,
    },
    squareView :{
        paddingTop:20,
        width:76,
        height:76,
        borderRadius:150/8,
        borderColor:'#000',
        borderWidth:1,
    },
    countText:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold',
        color:'black'
    },
    typeText:{
        textAlign:'center',
        marginTop:29,
        fontSize:12,
        fontWeight:'bold',
        color:'black',
        textTransform: 'capitalize'
    }
})

export default CustomAssetCount;
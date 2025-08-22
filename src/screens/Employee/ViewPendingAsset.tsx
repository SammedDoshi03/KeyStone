import React from "react";
import { View, Text, FlatList,Image } from "react-native";
import CustomEmployeeAssetList from "../../components/CustomEmployeeAssetList";
import  EmployeeStyleSheet from '../../styles/screens/EmployeeStyleSheet'

type ViewAcceptedAssetProps = {
    navigation: any;
    location: string;
    assetData: any[];
    email: string;
}

const ViewPendingAsset = ({ navigation, location, assetData, email }: ViewAcceptedAssetProps) => {

    let someDate = new Date();
    const ViewAssetStyles = EmployeeStyleSheet().ViewAssetStyles;

    const renderItem = (asset) => {
        return (
            <CustomEmployeeAssetList
                navigation={navigation}
                borderColor={(asset.item.endDate.toDate() <= someDate.getTime() + (7 * 24 * 60 * 60 * 1000)) ? "red" : "#C4C4C4"}
                iconName={(asset.item.category === "headphone") ? "headphones" : asset.item.category}
                assetData={asset.item}
                email={email}
                location={location}
            />
        )
    }

    return (
        <View style={ViewAssetStyles.container}>
            <View>
                <Text style={ViewAssetStyles.text}>Location: {location}</Text>
                <Text style={ViewAssetStyles.text}>Number of Assets: {(assetData !== undefined) ? assetData.length : 0}</Text>
            </View>
            <View style={ViewAssetStyles.line} />
            <View>
                <FlatList
                    data={assetData}
                    renderItem={renderItem}
                />
                {
                    (assetData==undefined||assetData.length == 0) ? <Image style={ViewAssetStyles.image} source={require('../../assets/EmptyAsset.png')} /> : <></>
                }
            </View>
        </View>
    )
}

export default ViewPendingAsset;
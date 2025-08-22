import { View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListComponet from '../../components/SkeletonComonents';
import { List, Card } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetAllocatedUsers } from '../../redux/reducers/assetReducer';

const AllocatedAssets = ({ navigation, route }: any) => {

    const [userInfo, setUserInfo] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    //@ts-ignore
    const data = useSelector(state => state.asset.allocatedAssetUserList)
    const firstRender = useRef(true)

    const UserInfo = () => {
        try {
            let location = route.params.location;
            if(firstRender.current) {
                //@ts-ignore
                dispatch(fetchAssetAllocatedUsers({location}));
                firstRender.current = false;
            }
            setUserInfo(data)
            if (userInfo) {
                setIsLoaded(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        UserInfo();
    }, [isLoaded, isFocused, data])

    useEffect(() => {
        firstRender.current = true;
    },[isFocused])

    var istrue = true;

    return (
        (userInfo != undefined && userInfo.length != 0) ?
            <View style={{ flex: 1, justifyContent: "flex-start", margin: 12 }}>
                {userInfo.map((item, index) => {
                    if(item.assetInfo.length != 0) {
                        istrue = false;
                    return (
                    <Card style={{ marginTop:8,marginBottom:2,marginLeft:16,marginRight:16 }}>
                        <List.Item
                            key={index}
                            title={item.email}
                            description={`Assets Count : ${item.assetInfo.length}`}
                            // style ={{ margin:5}}
                            right={props => <List.Icon {...props} icon="arrow-right" />}
                            onPress={() => navigation.navigate("AssignAsset", { item })}
                        />
                    </Card>
                    )}
                })}
                {                
                (istrue)
                ? <View> 
                    <Image style={{ width: '85%',height: '45%',marginTop: 80,marginLeft: 40,resizeMode: 'contain',alignSelf: 'center',}} source={require('../../assets/EmptyManageSpoc.png')} /> 
                  </View>
                : <></>}
                </View>
           :
            <View>
                <ListComponet />
                <ListComponet />
                <ListComponet />
                <ListComponet />
                <ListComponet />
                <ListComponet />
                <ListComponet />
                <ListComponet />
            </View>
    )
}

export default AllocatedAssets

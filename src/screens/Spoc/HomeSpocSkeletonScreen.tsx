import { View } from 'react-native'
import React from 'react'
import {  RectangleComponent, SquareComponent, TitleTextSkeleton } from '../../components/SkeletonComonents';


const HomeSpocSkeletonScreen = ({navigation}: any) => {
    return (
        <View style={{ flex: 1, justifyContent: "flex-start", margin:12  }}>
           <View style={{flex:0.15, flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
                <View>
                    <TitleTextSkeleton />
                    <View>
                        <RectangleComponent />
                    </View>
                </View>
            </View>
            <View style={{flex:0.15, flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
                <TitleTextSkeleton />
            </View>
            <View style={{ flex:0.4, flexDirection: 'column', justifyContent: "space-around"  }}>
                <View style={{ flexDirection: 'row',  justifyContent: "space-around", alignItems:"flex-start"}}>
                    <SquareComponent />
                    <SquareComponent />
                    <SquareComponent />
                </View>
                <View style={{ flexDirection: 'row',  justifyContent: "space-around", alignItems:"flex-start"}}>
                    <SquareComponent />
                    <SquareComponent />
                    <SquareComponent />
                </View>
            </View>
        </View>
    )
}

export default HomeSpocSkeletonScreen

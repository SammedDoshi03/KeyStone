import React from "react"
import { StyleSheet, View } from 'react-native'
import { Card } from "react-native-paper"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

const ListComponet = () =>{
    return(
        <Card mode="outlined">
        <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={62} height={62} borderRadius={40} margin={14} />
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4}/>
            <SkeletonPlaceholder.Item marginTop={6} width={210} height={20} borderRadius={4}/>
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginLeft={10}>
            {/* <SkeletonPlaceholder.Item width={30} height={20} borderRadius={4} />  */}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      </Card>
    )
}

export const TitleTextSkeleton = () => {
  return (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item margin={10} >
            <SkeletonPlaceholder.Item width={200} height={22} borderRadius={6} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
  )
}

export const DetailsSkeleton = () => {
  return (
        <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item width={200} height={22} borderRadius={4} />
            <SkeletonPlaceholder.Item marginTop={6} width={120} height={20} borderRadius={4}/>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
  )
}

export const ListDetailsComponent = () => {

  return (
    <View style={{ flex: 0.3 ,flexDirection: 'column', justifyContent: "space-evenly"  }}>
      <DetailsSkeleton />
      <DetailsSkeleton />
      <DetailsSkeleton />
    </View>
  )
}

export const CircleComponent = () => {
  return (
    <View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
    <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={45} height={45} borderRadius={25} />
    </SkeletonPlaceholder>
    </View>
  )
}

export const RectangleComponent = () => {
  return (
    <View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
    <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={60} height={50} borderRadius={10} />
    </SkeletonPlaceholder>
    </View>
  )
}
export const ImageComponent = () => {
  return (
    <View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
    <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={280} height={280} borderRadius={10} />
    </SkeletonPlaceholder>
    </View>
  )
}

export const SquareComponent = () => {
  return(
    <View>
        <View style={styles.square}>
            <CircleComponent/>
        </View>
      <View>
         <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item marginTop={12} marginLeft={2} marginRight={2} >
            <SkeletonPlaceholder.Item width={75} height={18} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  square: {
    width: 80,
    height: 80,
    backgroundColor: "transparent",
    borderRadius: 10,
    //borderColor:"black",
    //borderWidth:1,

  },
});

export default ListComponet;
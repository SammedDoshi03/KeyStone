import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5";
type CustomSpocListProps = {
  email: string;
  name: string;
  onPress?: () => void;
  startDate: string;
  endDate: string
};

const CustomSpocList = ({ name, email, onPress, startDate, endDate }: CustomSpocListProps) => {
  return (
    <View>
      <View style={styles.root}>
        <View style={styles.parentContainer}>
          <View style={styles.image}>
            <Icon1 name="user" size={25} color='#979797'></Icon1>
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.dates}>{startDate}  to  {endDate}</Text>
          </View>
        </View>
        <View>
          <Pressable onPress={onPress}>
            <Icon name='arrow-right' size={30} color='#979797' style={{ paddingTop: 18, marginRight: 8 }}></Icon>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 5,
    justifyContent: 'space-between',
    shadowColor: 'black',
    elevation: 5
  },
  image: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 60,
    marginLeft: 10,
    marginRight: 10,
    // marginLeft: 14,
    // alignSelf: 'center',
    // marginRight:16,
  },
  name: {
    fontSize: 18,
    marginBottom: 1,
    fontWeight: '500',
    color: '#000'
  },
  email: {
    fontSize: 12,
    color: '#3274AB',
    marginBottom: 1,
    fontWeight: 'bold'
  },
  dates: {
    fontSize: 14,
    color: '#000'
  },

  parentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default CustomSpocList;
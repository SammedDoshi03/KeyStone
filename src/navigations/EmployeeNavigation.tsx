import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import EmployeeDetails from "../screens/Employee/EmployeeDetails";
import EmployeeHome from "../screens/Employee/EmployeeHome";

const Drawer = createDrawerNavigator();

const EmployeeNavigation = ({navigation}) => {

    return (
      <Drawer.Navigator
            screenOptions={{drawerStyle: {width: Dimensions.get('window').width-40}, headerTintColor: 'white'}}
            //@ts-ignore
            drawerContent={props => <EmployeeDetails navigation={navigation}
            />}>
        <Drawer.Screen name="EmployeeHome2" component={EmployeeHome} 
        options={{
            drawerLabel:'Employee Details',
            headerStyle:{backgroundColor:'#3274AB'},
            headerTitle:'Employee Board',
            headerTitleStyle:{color:'white'}
        }} />
      </Drawer.Navigator>
    )
}

export default EmployeeNavigation;
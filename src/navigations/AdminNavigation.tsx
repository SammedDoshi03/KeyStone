import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AdminDetails from "../screens/Admin/AdminDetails";
import AdminHome from "../screens/Admin/AdminHome";

const Drawer = createDrawerNavigator();

const AdminNavigation = ({navigation}) => {

    return (
      <Drawer.Navigator
            screenOptions={{drawerStyle: {width: Dimensions.get('window').width-40}, headerTintColor: 'white'}}
            //@ts-ignore
            drawerContent={props => <AdminDetails navigation={navigation}
            />}>
        <Drawer.Screen name="AdminHome2" component={AdminHome} 
        options={{
            drawerLabel:'Admin Details',
            headerStyle:{backgroundColor:'#3274AB'},
            headerTitle:'Admin Board',
            headerTitleStyle:{color:'white'}
        }} />
      </Drawer.Navigator>
    )
}

export default AdminNavigation;
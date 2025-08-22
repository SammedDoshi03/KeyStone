import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
import SpocDetails from "../screens/Spoc/SpocDetails";
import SpocHome from "../screens/Spoc/SpocHome";

const Drawer = createDrawerNavigator();

const SpocNavigation = (props) => {
  let location = "";
  if (typeof (props.route.params) === "string") {
    console.log('if true')
    location = props.route.params.location
  }
  else {
    console.log('nav loc',props.route.params)
    location = props.route.params.res[2];
  }


  return (
    <Drawer.Navigator
      screenOptions={{ drawerStyle: { width: Dimensions.get('window').width - 40 }, headerTintColor: 'white' }}
      //@ts-ignore
      drawerContent={props => <SpocDetails navigation={props.navigation} />}>
      <Drawer.Screen name="SpocHome2" component={SpocHome} initialParams={{ location }} options={{
        drawerLabel: 'Spoc Details',
        headerStyle: { backgroundColor: '#3274AB' },
        headerTitle: 'SPOC Board',
        headerTitleStyle: { color: 'white' }
      }} />
    </Drawer.Navigator>
  )
}

export default SpocNavigation;
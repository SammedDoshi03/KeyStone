import React from 'react';
import IntroScreen from '../screens/Login/IntroScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHome from '../screens/Admin/AdminHome';
import AdminManageSpoc from '../screens/Admin/AdminManageSpoc';
import AddSpoc from '../screens/Admin/AddSpoc';
import ViewSpoc from '../screens/Admin/ViewSpoc';
import SpocHome from '../screens/Spoc/SpocHome';
import SearchEmp from '../screens/Spoc/SearchEmp';
import SpocNavigation from './SpocNavigation';
import AllocatedAssets from '../screens/Spoc/AllocatedAssets';
import EditAssignedAsset from '../screens/Spoc/EditAssignedAsset';
import { LogBox } from 'react-native';
import {useSelector} from 'react-redux'
import AdminNavigation from './AdminNavigation';
import SelectCategory from '../screens/Spoc/SelectCategory';
import AssignAssetConfirmation from '../screens/Spoc/AssignAssetConfirmation';
import InitialSetPassword from '../screens/Login/InitialSetPassword';
import EmployeeHome from '../screens/Employee/EmployeeHome';
import ViewAssetHome from '../screens/Employee/ViewAssetHome';
import SingleAsset from '../screens/Employee/AcceptedSingleAsset';
import EmployeeNavigation from './EmployeeNavigation';
import BackNav from '../assets/BackNav';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createNativeStackNavigator();

function AuthStack() {
    //@ts-ignore
    const firstTime = useSelector(state => state.login.firstTime);
    LogBox.ignoreAllLogs();
    return (
            <Stack.Navigator initialRouteName={(firstTime)?'IntroScreen':'LoginScreen'} screenOptions={{headerTintColor: 'white'}}>
                <Stack.Screen name="IntroScreen" component={IntroScreen} options={{headerShown:false}} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="InitialSetPassword" component={InitialSetPassword} options={{headerShown:false}}/>
                <Stack.Screen name="AdminHome"component={AdminNavigation} options={{headerShown: false}} />
                <Stack.Screen name="AdminManageSpoc" component={AdminManageSpoc} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Manage SPOC',headerTitleStyle:{color:'white'}}} />
                <Stack.Screen name="AddSpoc" component={AddSpoc} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Add New SPOC',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="ViewSpoc" component={ViewSpoc} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'View SPOC',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="SearchEmp" component={SearchEmp} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Search Employee',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="AllocatedAssets" component={AllocatedAssets} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Allocated Assets',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="AssignAsset" component={EditAssignedAsset} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Modify Assets',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="SpocHome" component={SpocNavigation}  options={{headerShown: false}}/>
                <Stack.Screen name="SelectCategory" component={SelectCategory} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Select Category',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="AssignAssetConfirmation" component={AssignAssetConfirmation} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Select Duration',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="EmployeeHome" component={EmployeeNavigation} options={{headerShown:false,headerBackVisible: false, headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Home',headerTitleStyle:{color:'white'}}}/>
                {/* @ts-ignore */}
                <Stack.Screen name="ViewAssetHome" component={ViewAssetHome} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'Assets',headerTitleStyle:{color:'white'}}}/>
                <Stack.Screen name="SingleAsset" component={SingleAsset} options={{headerStyle:{backgroundColor:'#3274AB'},headerTitle:'View Asset',headerTitleStyle:{color:'white'}}}/>
            </Stack.Navigator>
    );
}

export default AuthStack;
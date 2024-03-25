import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Messages from '../screens/Messages'
import Forum from '../screens/Forum'
import FoodBankHome from './FoodBankHome'
import DonorHome from './DonorHome'
import ViewDonors from '../screens/viewDonors';
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import LoginScreen from '../screens/LoginScreen.js'
import SignUpScreen from '../screens/SignUpScreen.js'
import {useContext} from 'react'
import {globalContext} from '../globalContext.js'

const Stack = createNativeStackNavigator()

function StackScreens() {

    return (

        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="FoodBankHome" component={FoodBankHome} options={{headerShown:false}} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} options={{headerShown:false}} />
        </Stack.Navigator>

    )

}

const Navigation = () => {
    
    return(
        
        <NavigationContainer>
            <StackScreens />
        </NavigationContainer>

    )
 
}

export default Navigation
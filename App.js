import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, StatusBar, Image, StyleSheet, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsTab from "./views/SettingsTab";
import ReportingTab from "./views/ReportingTab";
import LoginScreen from "./views/LoginScreen";
import TwoFactorScreen from "./views/TwoFactorScreen";

import { observable } from 'mobx';
import { observer, useObserver } from "mobx-react";
import { GREEN, GRAY, centeredViewStyle, viewStyle } from './assets/Styles';
import {GLOBAL_STATE} from './io/Store';
import DashboardTab from './views/DashboardTab';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PassivTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: GREEN,
    card: GRAY,
    text: '#ffffff',
    border: '#000000',
  }
}

export default function App({navigation}) {
  return useObserver(() => {
    if (!GLOBAL_STATE.loggedIn) {
      return (
        <NavigationContainer theme = {PassivTheme}>
          <StatusBar backgroundColor = {GRAY} barStyle = "light-content"></StatusBar>
          <Stack.Navigator>
            <Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{
              title: "Welcome to Passiv"
            }}></Stack.Screen>
            <Stack.Screen name = "TwoFactorScreen" component = {TwoFactorScreen} options = {{
              title: "SMS Verification"
            }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer theme = {PassivTheme}>
          
          <Tab.Navigator screenOptions = {({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              var iconName = "ios-warning";
              if (route.name === "Dashboard") iconName = "dashboard";
              if (route.name === "Settings") iconName = "setting";
              if (route.name === "Reporting") iconName = "linechart";
              return <AntDesign name={iconName} size={size} color = {color}/>;
            }
          })}>
            <Tab.Screen name = "Dashboard" component = {DashboardTab}/>
            <Tab.Screen name = "Reporting" component = {ReportingTab}/>
            <Tab.Screen name = "Settings" component = {SettingsTab}/>
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  });
}
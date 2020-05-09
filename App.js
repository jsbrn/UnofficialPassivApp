import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsTab from "./views/SettingsTab";
import ReportingTab from "./views/ReportingTab";
import LoginScreen from "./views/LoginScreen";

import { observable } from 'mobx';
import { observer, useObserver } from "mobx-react";
import { GREEN, GRAY } from './assets/Styles';
import DashboardTab from './views/DashboardTab';

const Tab = createBottomTabNavigator();

export const globalState = observable({
  loggedIn: false,
  portfolioGroups: ["Group One", "Group Two", "Group Three"]
});

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
    if (!globalState.loggedIn) {
      return (
        <LoginScreen globalState = {globalState}></LoginScreen>
      );
    } else {
      return (
        <NavigationContainer theme = {PassivTheme}>
          <StatusBar backgroundColor = {GRAY} barStyle = "light-content"></StatusBar>
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
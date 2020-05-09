import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OverviewTab from "./views/OverviewTab";
import SettingsTab from "./views/SettingsTab";
import PerformanceTab from "./views/PerformanceTab";
import LoginScreen from "./views/LoginScreen";

import { observable } from 'mobx';
import { observer, useObserver } from "mobx-react";

const Tab = createBottomTabNavigator();

const globalState = observable({
  loggedIn: false
});

const PassivTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    card: '#3d4852',
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
          <StatusBar backgroundColor = "#3d4852"></StatusBar>
          <Tab.Navigator screenOptions = {({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              var iconName = "ios-warning";
              if (route.name === "Overview") iconName = "dashboard";
              if (route.name === "Settings") iconName = "setting";
              if (route.name === "Performance") iconName = "linechart";
              return <AntDesign name={iconName} size={size} color = {color}/>;
            }
          })}>
            <Tab.Screen name = "Overview" component = {OverviewTab}/>
            <Tab.Screen name = "Performance" component = {PerformanceTab}/>
            <Tab.Screen name = "Settings" component = {SettingsTab}/>
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  });
}
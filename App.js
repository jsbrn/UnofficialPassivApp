import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OverviewTab from "./components/OverviewTab";
import SettingsTab from "./components/SettingsTab";
import LoginScreen from "./components/LoginScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    return (
      <NavigationContainer theme = {PassivTheme}>
        <StatusBar barStyle="light-content" backgroundColor = '#3d4852'/>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name = "Login" component = {LoginScreen}></Stack.Screen>
          <Stack.Screen name = "MainApp" component = {Tabs} options = {{
            headerLeft: null
          }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

function Tabs({ navigation }) {
  return (
    <Tab.Navigator screenOptions = {({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        var iconName = "ios-warning";
        if (route.name === "Overview") iconName = "md-home";
        if (route.name === "Settings") iconName = "md-settings";
        return <Ionicons name={iconName} size={size} color = {color}/>;
      }
    })}>
      <Tab.Screen name = "Overview" component = {OverviewTab}/>
      <Tab.Screen name = "Settings" component = {SettingsTab}/>
    </Tab.Navigator>
  );
}
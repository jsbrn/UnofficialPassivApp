import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OverviewTab from "./views/OverviewTab";
import SettingsTab from "./views/SettingsTab";
import LoginScreen from "./views/LoginScreen";

import { observable } from 'mobx';
import { observer } from "mobx-react";

const Stack = createStackNavigator();
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
    return (
      <GlobalContainer></GlobalContainer>
    );
}

@observer
class GlobalContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!globalState.loggedIn) {
      return (
        <LoginScreen globalState = {globalState}></LoginScreen>
      );
    } else {
      return (
        <NavigationContainer theme = {PassivTheme}>
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
        </NavigationContainer>
      );
    }
  }

}
import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
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
      <GlobalContainer navigation = {navigation}></GlobalContainer>
    );
}

class GlobalContainer extends React.Component {

  constructor(props) {
    super(props);
    Alert.alert(JSON.stringify(this.props));
    this.state = {
      loggedIn: false
    };
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <LoginScreen globalState = {this.state} navigation = {this.props.navigation}></LoginScreen>
      );
    } else {
      return (
        <Tab.Navigator screenOptions = {({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            var iconName = "ios-warning";
            if (route.name === "Overview") iconName = "md-home";
            if (route.name === "Settings") iconName = "md-settings";
            return <Ionicons name={iconName} size={size} color = {color}/>;
          }
        })}>
          <StatusBar hidden = {true}></StatusBar>
          <Tab.Screen name = "Overview" component = {OverviewTab}/>
          <Tab.Screen name = "Settings" component = {SettingsTab}/>
        </Tab.Navigator>
      );
    }
  }

}
import React from 'react';
import { View, TouchableOpacity, Text, Switch, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {viewStyle, centeredTextStyle, GREEN, textStyle, centeredViewStyle} from '../assets/Styles';

const Stack = createStackNavigator();

const ReportingTab = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Reporting" component = {Content} options = {
            {headerLeft: () => (<Image style = {{width: 30, height: 30, marginLeft: 20}}source = {require('../assets/icon.png')}></Image>)}    
        }></Stack.Screen>
    </Stack.Navigator>
);

function Content() {
    return (
        <View style = {viewStyle}>
            <Text style = {StyleSheet.compose(centeredTextStyle, {marginTop: 20})}>Coming soon!</Text>
        </View>
    );
}

export default ReportingTab;
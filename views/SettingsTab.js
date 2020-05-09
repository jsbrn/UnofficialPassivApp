import React from 'react';
import { View, Button, Text, Switch, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {viewStyle, centeredTextStyle, GREEN, cardStyle} from '../assets/Styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const SettingsTab = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Settings" component = {Content} options = {
            {headerLeft: () => (<Image style = {{width: 30, height: 30, marginLeft: 20}}source = {require('../assets/icon.png')}></Image>)}    
        }></Stack.Screen>
    </Stack.Navigator>
);

function Content() {
    return (
        <View style = {viewStyle}>
            <TouchableWithoutFeedback style = {cardStyle}>
                
            </TouchableWithoutFeedback>
        </View>
    );
}

export default SettingsTab;
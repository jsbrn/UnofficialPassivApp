import React from 'react';
import { View, Button, Text, Switch, Image, StyleSheet, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {viewStyle, headerStyle, centeredTextStyle, GREEN, cardStyle, textStyle, centeredViewStyle, buttonStyle, shadow, redButtonStyle} from '../assets/Styles';
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBAL_STATE } from '../assets/Store';

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
        <ScrollView style = {viewStyle}>
            <View style = {centeredViewStyle}>

                <Text style = {StyleSheet.compose(centeredTextStyle, {marginTop: 10})}>General</Text>
                <TouchableWithoutFeedback style = {cardStyle}>
                    <Text style = {textStyle}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Text>
                </TouchableWithoutFeedback>

                <Text style = {StyleSheet.compose(centeredTextStyle, {marginTop: 10})}>Notifications</Text>
                <TouchableWithoutFeedback style = {cardStyle}>
                    <Text style = {textStyle}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Text>
                </TouchableWithoutFeedback>

                <Text style = {StyleSheet.compose(centeredTextStyle, {marginTop: 10})}>Connections</Text>
                <TouchableWithoutFeedback style = {cardStyle}>
                    <Text style = {textStyle}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Text>
                </TouchableWithoutFeedback>

                <Text style = {StyleSheet.compose(centeredTextStyle, {marginTop: 10})}>Accounts</Text>
                <TouchableWithoutFeedback style = {cardStyle}>
                    <Text style = {textStyle}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Text>
                </TouchableWithoutFeedback>

                <TouchableOpacity 
                    style = {redButtonStyle} 
                    activeOpacity = {0.7}
                    onPress = {() => { GLOBAL_STATE.loggedIn = false; }}>
                        <Text style = {centeredTextStyle}>LOG OUT</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default SettingsTab;
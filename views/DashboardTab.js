import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Alert, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { centeredViewStyle, textStyle, headerStyle, cardHeaderStyle, cardStyle, shadow, viewStyle } from '../assets/Styles';
import { useObserver } from 'mobx-react';
import App from '../App';

const Stack = createStackNavigator();

const PortfolioGroupDetails = ({route, navigation}) => {
    const { number } = route.params;
    return (
        <View style = {viewStyle}>
            <Text>{number}</Text>
        </View>
    );
}

function DashboardTab({route, navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Dashboard" component = {Content} options = {
                {headerLeft: () => (<Image style = {{width: 30, height: 30, marginLeft: 20}}source = {require('../assets/icon.png')}></Image>)}    
            }></Stack.Screen>
            <Stack.Screen name = "PortfolioDetails" component = {PortfolioGroupDetails} options = {({route}) => ({title: route.params.title, number: route.params.number})}></Stack.Screen>
        </Stack.Navigator>
    );
}

function Content({route, navigation}) {
    return useObserver(() => {
        /** Pull from global state (make sure global state is updated from refresh button or login) */
        var cards = [];
        for (var i = 0; i < 5; i++) {
            var number = i+1;
            var title = "Portfolio #"+(number);
            cards.push(
                <TouchableOpacity style = {StyleSheet.compose(cardStyle, shadow)} onPress = { () => { 
                    navigation.navigate("PortfolioDetails", {index: number, title: title});
                }}>
                    <Text style = {cardHeaderStyle}>{title}</Text>
                    <Text style = {textStyle}>{'Value: $'+Math.floor(Math.random() * 10000) + " - Accuracy: 95% - " + "Cash: $32.34"}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView style = {{width: "100%"}}>
                <View style = {centeredViewStyle}>
                    <Text style = {StyleSheet.compose(headerStyle, {
                        marginTop: 10,
                        fontSize: 48
                    })}>$10,334</Text>
                    <Text style = {textStyle}>5 Portfolios</Text>
                    {cards}
                </View>
            </ScrollView>
        );
    });
}

export default DashboardTab;
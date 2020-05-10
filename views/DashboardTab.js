import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Alert, Image, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { centeredViewStyle, textStyle, headerStyle, cardHeaderStyle, cardStyle, shadow, viewStyle, GRAY } from '../assets/Styles';
import { useObserver } from 'mobx-react';
import { GLOBAL_STATE } from '../io/Store';
import { request, refreshDashboard } from '../io/Network';

const Stack = createStackNavigator();

const PortfolioGroupDetails = ({route, navigation}) => {
    const { number } = route.params;
    return (
      <View style = {viewStyle}>

      </View>
    );
}

function DashboardTab({route, navigation}) {
    return (
        <Stack.Navigator screenOptions = {{
            animationEnabled: false
        }}>
            <Stack.Screen name = "Dashboard" component = {Content} options = 
            {
                {
                    headerLeft: () => (<Image style = {{width: 30, height: 30, marginLeft: 20}} source = {require('../assets/icon.png')}></Image>),
                }    
            }></Stack.Screen>
            <Stack.Screen name = "PortfolioDetails" component = {PortfolioGroupDetails} options = {({route}) => ({title: route.params.title})}></Stack.Screen>
        </Stack.Navigator>
    );
}

function Content({route, navigation}) {
    return useObserver(() => {
        /** Pull from global state (make sure global state is updated from refresh button or login) */
        let cards = [];
        for (var i = 0; i < GLOBAL_STATE.portfolios.length; i++) {
            let title = GLOBAL_STATE.portfolios[i].title;
            let ii = i;
            cards.push(
                <TouchableOpacity activeOpacity = {0.7} style = {StyleSheet.compose(cardStyle, shadow)} onPress = { () => { 
                    navigation.navigate("PortfolioDetails", {title: title});
                }}>
                    <Text style = {cardHeaderStyle}>{title}</Text>
                    <Text style = {textStyle}>{'Value: $'+Math.floor(Math.random() * 10000) + " - Accuracy: 95% - " + "Cash: $32.34"}</Text>
                </TouchableOpacity>
            );
        }

        const [refreshing, setRefreshing] = React.useState(false);
        const onRefresh = React.useCallback(() => {
            refreshDashboard();
            setRefreshing(false);
        });

        return (
            <ScrollView style = {viewStyle} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style = {centeredViewStyle}>
                    <Text style = {StyleSheet.compose(headerStyle, {
                        marginTop: 10,
                        fontSize: 48
                    })}>$10,334</Text>
                    <Text style = {textStyle}>Total (CAD)</Text>
                    {cards}
                </View>
            </ScrollView>
        );
    });
}

export default DashboardTab;
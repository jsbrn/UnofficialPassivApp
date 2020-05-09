import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { autorun } from 'mobx';

const Stack = createStackNavigator();

const Styles = {
    textStyle: StyleSheet.compose({color: "#ffffff", fontWeight: "bold"}),
    headerStyle: StyleSheet.compose({color: "#04a287", fontWeight: "bold", fontSize: 32}),
    cardHeaderStyle: StyleSheet.compose({color: "#ffffff", fontWeight: "bold", fontSize: 24}),
    viewStyle: StyleSheet.compose({ flex: 1, alignItems: 'center'}, {
        backgroundColor: '#3d4852'
    }),
    cardStyle: StyleSheet.compose({
        backgroundColor: '#606f7b',
        marginTop: 10,
        marginBottom: 10,
        width: "95%",
        marginLeft: 5,
        marginRight: 5,
        padding: 15,
        shadowColor: 'rgba(0,0,0, .6)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    })
};

const PortfolioGroupDetails = ({route, navigation}) => {
    const { index } = route.params;
    return (
        <View>
            <Text>{index}</Text>
        </View>
    );
}

const OverviewTab = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen name = "Dashboard" component = {Content}></Stack.Screen>
        <Stack.Screen name = "PortfolioDetails" component = {PortfolioGroupDetails}></Stack.Screen>
    </Stack.Navigator>
);

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentText: "default",
            OtherThing: "2"
        };
    }
    render() {
        /** Pull from global state (make sure global state is updated from refresh button or login) */
        var cards = [];
        for (var i = 0; i < 5; i++)
            cards.push(
                <TouchableOpacity style = {Styles.cardStyle} onPress = { () => { 
                    Alert.alert(JSON.stringify(this.props));
                }}>
                    <Text style = {Styles.cardHeaderStyle}>{'Index Fund Portfolio '+i}</Text>
            <Text style = {Styles.textStyle}>{'Value: $'+Math.floor(Math.random() * 10000) + " - Accuracy: 95% - " + "Cash: $32.34"}</Text>
                </TouchableOpacity>
            );
        return (
            <ScrollView style = {{width: "100%"}}>
                <View style = {Styles.viewStyle}>
                    <Text style = {StyleSheet.compose(Styles.headerStyle, {
                        marginTop: 10,
                        fontSize: 48
                    })}>$10,334</Text>
                    <Text style = {Styles.textStyle}>5 Accounts</Text>
                    {cards}
                </View>
            </ScrollView>
        );
    }
}

export default OverviewTab;
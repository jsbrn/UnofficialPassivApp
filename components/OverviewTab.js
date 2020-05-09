import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Styles = {
    textStyle: StyleSheet.compose({color: "#ffffff", fontWeight: "bold"}),
    viewStyle: StyleSheet.compose({ flex: 1, alignItems: 'center'}, {
        backgroundColor: '#3d4852'
    })
};

const OverviewTab = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Overview" component = {Content}></Stack.Screen>
    </Stack.Navigator>
);

class Content extends Component {
    constructor() {
        super();
        this.state = {
            contentText: "default",
            OtherThing: "2"
        };
    }
    render() {
        return (
            <View style = {Styles.viewStyle}>
                <Text style = {Styles.textStyle}>{this.state.contentText}</Text>
                <Text style = {Styles.textStyle}>{this.state.OtherThing}</Text>
                <Button title = "change" onPress = {() => {
                    this.setState({contentText: "fat dog it"});
                }}>
                </Button>
            </View>
        );
    }
}

export default OverviewTab;
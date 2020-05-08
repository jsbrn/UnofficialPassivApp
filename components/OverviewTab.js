import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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

function Content() {
    return (
        <View style = {Styles.viewStyle}>
            <Text style = {Styles.textStyle}>Overview content</Text>
        </View>
    );
}

export default OverviewTab;
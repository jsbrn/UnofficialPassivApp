import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

var Styles = {
    textStyle: StyleSheet.compose({color: "#ffffff", fontWeight: "bold", textAlign: 'center'}),
    viewStyle: StyleSheet.compose({ flex: 1, alignItems: 'stretch', justifyContent: 'center' }, {
        backgroundColor: '#3d4852'
    }),
    textFieldStyle: StyleSheet.compose({
        backgroundColor: 'rgba(255, 255, 255, 125)',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        maxWidth: 400,
        height: 55,
        borderColor: "#000000",
        borderStyle: 'solid',
        borderRadius: 10,
        marginTop: 10,
        fontSize: 20,
        padding: 5,
        paddingLeft: 10,
    }),
    buttonStyle: StyleSheet.compose({
        backgroundColor: '#04a287',
        alignItems: 'center',
        padding: 15,
        margin: 20,
        maxWidth: 400,
        borderRadius: 10,
        borderColor: 'black',
        borderStyle: 'solid'
    })
};

const LoginScreen = ( {navigation} ) => (
    <View style = {Styles.viewStyle}>
        <View style = {{justifyContent: 'center', alignItems: 'center'}}>
            <Image source = {require("../assets/icon.png")} style = {{width: 50, height: 50, marginBottom: 20}}></Image>
        </View>
        <Text style = {Styles.textStyle}>Sign into your Passiv Account</Text>
        <TextInput autoCompleteType = "email" keyboardType = "email-address" placeholder = "Email address" style = {Styles.textFieldStyle}></TextInput>
        <TextInput secureTextEntry = {true} autoCompleteType = "password" placeholder = "Password" style = {Styles.textFieldStyle}></TextInput>
        <></>
        <TouchableOpacity
            onPress={()=>{ 
                navigation.navigate("MainApp");
            }}
            style = {Styles.buttonStyle}
        >
            <Text style = {Styles.textStyle}>SIGN IN</Text>
        </TouchableOpacity>
    </View>
);

export default LoginScreen;
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { textStyle, buttonStyle, textFieldStyle, viewStyle, shadow, centeredTextStyle, GRAY } from '../assets/Styles';
import { GLOBAL_STATE } from '../io/Store';
import { Network, refreshDashboard } from '../io/Network';

function TwoFactorScreen({route, navigation}) {
    var smsCode;
    return (
        <View style = {StyleSheet.compose(viewStyle, {})}>
            <StatusBar backgroundColor = {GRAY} barStyle = "light-content"></StatusBar>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Image source = {require("../assets/icon.png")} style = {{width: 60, height: 60, marginBottom: 20, marginTop: 40}}></Image>
            </View>
            <Text style = {centeredTextStyle}>Please enter the code we sent to {route.params.phone}</Text>
            <TextInput 
                returnKeyType = "go" 
                autoCompleteType = "email" 
                keyboardType = "number" 
                placeholder = "2FA SMS Code"
                autoFocus = {true}
                style = {textFieldStyle}
                onChangeText = {(text) => smsCode = text}
                onSubmitEditing = {() => {
                    sendCode(route.params.state, smsCode);
                }}
            ></TextInput>
            <TouchableOpacity activeOpacity = {0.7}
                onPress={()=>{ 
                    sendCode(route.params.state, smsCode);
                }}
                style = {StyleSheet.compose(buttonStyle, shadow)}
            >
                <Text style = {centeredTextStyle}>SUBMIT CODE</Text>
            </TouchableOpacity>
        </View>
    );
}

function sendCode(state, code) {
    fetch('https://getpassiv.com/api/v1/auth/login', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: code,
            state: state
        })
    })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(response => {
            if (response.status == 200) {
                GLOBAL_STATE.loggedIn = true;
                GLOBAL_STATE.JWT = response.body.token;
                refreshDashboard();
            } else if ('detail' in response.body) {
                Alert.alert("Error", response.body.detail);
            } else {
                Alert.alert(response.status+"", JSON.stringify(response.body)+" (state: "+state+", code: "+code+")");
            }
        })
        .catch((error) => {
            Alert.alert("Network error", error.message);
            signingIn = false;
        });
}

export default TwoFactorScreen;
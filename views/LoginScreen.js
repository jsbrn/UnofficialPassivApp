import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { textStyle, buttonStyle, textFieldStyle, viewStyle, shadow, centeredTextStyle, GRAY } from '../assets/Styles';
import { GLOBAL_STATE } from '../io/Store';

function LoginScreen({route, navigation}) {
    var emailInput;
    var passwordInput;
    var signingIn;
    var signInText = "SIGN IN";
    return (
        <View style = {StyleSheet.compose(viewStyle, {})}>
            <StatusBar backgroundColor = {GRAY} barStyle = "light-content"></StatusBar>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Image source = {require("../assets/icon.png")} style = {{width: 60, height: 60, marginBottom: 20, marginTop: 40}}></Image>
            </View>
            <TextInput 
                returnKeyType = "next" 
                autoCompleteType = "email" 
                keyboardType = "email-address" 
                placeholder = "Email address"
                autoFocus = {true}
                style = {textFieldStyle}
                onChangeText = {(text) => emailInput = text}
            ></TextInput>
            <TextInput 
                returnKeyType = "go" 
                secureTextEntry = {true} 
                autoCompleteType = "password" 
                placeholder = "Password" 
                style = {textFieldStyle}
                onChangeText = {(text) => passwordInput = text}
            ></TextInput>
            <TouchableOpacity activeOpacity = {0.7}
                onPress={signingIn ? ()=>{} : ()=>{ 
                    signingIn = true;
                    fetch('https://getpassiv.com/api/v1/auth/login', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: emailInput,
                            password: passwordInput
                        })
                    })
                        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
                        .then(response => {
                            if (response.status == 200) {
                                if ('mfa_required' in response.body) {
                                    navigation.navigate("TwoFactorScreen", {state: response.body.mfa_required.state, phone: response.body.mfa_required.phone_number});
                                } else {
                                    GLOBAL_STATE.loggedIn = true;
                                }
                            } else {
                                if (('email' in response.body) || ('password' in response.body)) {
                                    Alert.alert("Error", "You are missing one or more fields.");
                                } else if ('non_field_errors' in response.body) {
                                    Alert.alert("Error", response.body.non_field_errors.reduce((t, c) => t + c + " "));
                                }
                            }
                        })
                        .catch((error) => {
                            Alert.alert("Network error", error.message);
                            signingIn = false;
                        });
                    
                }}
                style = {StyleSheet.compose(buttonStyle, shadow)}
            >
                <Text style = {centeredTextStyle}>{signingIn ? "SIGNING IN" : "SIGN IN"}</Text>
            </TouchableOpacity>
            <Text style = {centeredTextStyle}>Questions?</Text>
        </View>
    );
}

export default LoginScreen;
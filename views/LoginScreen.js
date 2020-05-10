import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { textStyle, buttonStyle, textFieldStyle, viewStyle, shadow, centeredTextStyle, GRAY } from '../assets/Styles';
import { GLOBAL_STATE } from '../assets/Store';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInText: "SIGN IN",
            emailInput: "",
            passwordInput: "",
            signingIn: false
        }
    }
    render() {
        return (
            <View style = {StyleSheet.compose(viewStyle, {justifyContent: 'center'})}>
                <StatusBar backgroundColor = {GRAY} barStyle = "light-content"></StatusBar>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source = {require("../assets/icon.png")} style = {{width: 60, height: 60, marginBottom: 20, marginTop: 40}}></Image>
                </View>
                <Text style = {centeredTextStyle}>Sign into your Passiv Account</Text>
                <TextInput 
                    returnKeyType = "next" 
                    autoCompleteType = "email" 
                    keyboardType = "email-address" 
                    placeholder = "Email address"
                    autoFocus = {true}
                    style = {textFieldStyle}
                    onChangeText = {(text) => this.setState({emailInput: text})}
                ></TextInput>
                <TextInput 
                    returnKeyType = "go" 
                    secureTextEntry = {true} 
                    autoCompleteType = "password" 
                    placeholder = "Password" 
                    style = {textFieldStyle}
                    onChangeText = {(text) => this.setState({passwordInput: text})}
                ></TextInput>
                <TouchableOpacity activeOpacity = {0.7}
                    onPress={this.state.signingIn ? ()=>{} : ()=>{ 
                        this.setState({signInText: "SIGNING IN...", signingIn: true});
                        fetch('https://getpassiv.com/api/v1/auth/login', {
                            method: 'POST',
                            headers: {
                                "Authentication": 'API_KEY'
                            },
                            body: JSON.stringify({
                                "email": this.state.emailInput,
                                "password": this.state.passwordInput
                            })
                        })
                            .then((response) => {
                                var status = response.status;
                                Alert.alert("Server Response", status+"");
                                //if (status == 200) {
                                    GLOBAL_STATE.loggedIn = true;
                                //}
                                this.setState({signInText: "SIGN IN", signingIn: false});
                            })
                            .catch((error) => {
                                Alert.alert("Error", error.message);
                                this.setState({signInText: "SIGN IN", signingIn: false});
                            });
                        
                    }}
                    style = {StyleSheet.compose(buttonStyle, shadow)}
                >
                    <Text style = {centeredTextStyle}>{this.state.signInText}</Text>
                </TouchableOpacity>
                <Text style = {centeredTextStyle}>Questions?</Text>
            </View>
        );
    }
}
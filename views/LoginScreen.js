import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { textStyle, buttonStyle, textFieldStyle, viewStyle, shadow, centeredTextStyle, GRAY } from '../assets/Styles';

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
            <View style = {viewStyle}>
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
                <TouchableOpacity
                    onPress={this.state.signingIn ? ()=>{} : ()=>{ 
                        this.setState({signInText: "SIGNING IN...", signingIn: true});
                        fetch('https://virtserver.swaggerhub.com/passiv/PassivAPI/v1/auth/login', {
                            method: 'POST',
                            headers: {
                                "X-API-KEY": '8186fa0099f913c06db9ae3c9b6e15351bbf28b4'
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
                                    this.props.globalState.loggedIn = true;
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
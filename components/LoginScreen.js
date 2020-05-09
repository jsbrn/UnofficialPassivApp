import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

var Styles = {
    textStyle: StyleSheet.compose({color: "#ffffff", fontWeight: "bold", textAlign: 'center'}),
    viewStyle: StyleSheet.compose({ flex: 1, alignItems: 'stretch' }, {
        backgroundColor: '#3d4852'
    }),
    textFieldStyle: StyleSheet.compose({
        backgroundColor: 'rgba(255, 255, 255, 125)',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
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
        borderRadius: 10,
        borderColor: 'black',
        borderStyle: 'solid'
    })
};

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
            <View style = {Styles.viewStyle}>
                <StatusBar backgroundColor = "#3d4852"></StatusBar>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source = {require("../assets/icon.png")} style = {{width: 60, height: 60, marginBottom: 20, marginTop: 40}}></Image>
                </View>
                <Text style = {Styles.textStyle}>Sign into your Passiv Account</Text>
                <TextInput 
                    returnKeyType = "next" 
                    autoCompleteType = "email" 
                    keyboardType = "email-address" 
                    placeholder = "Email address"
                    autoFocus = {true}
                    style = {Styles.textFieldStyle}
                    onChangeText = {(text) => this.setState({emailInput: text})}
                ></TextInput>
                <TextInput 
                    returnKeyType = "go" 
                    secureTextEntry = {true} 
                    autoCompleteType = "password" 
                    placeholder = "Password" 
                    style = {Styles.textFieldStyle}
                    onChangeText = {(text) => this.setState({passwordInput: text})}
                ></TextInput>
                <TouchableOpacity
                    onPress={this.state.signingIn ? ()=>{} : ()=>{ 
                        this.setState({signInText: "SIGNING IN...", signingIn: true});
                        fetch('https://getpassiv.com/api/v1/auth/login', {
                            method: 'POST',
                            body: JSON.stringify({
                                "email": this.state.emailInput,
                                "password": this.state.passwordInput
                            })
                        })
                            .then((response) => {
                                Alert.alert("Server Response", JSON.stringify(response));
                                this.setState({signInText: "SIGN IN", signingIn: false});
                            })
                            .catch((error) => {
                                Alert.alert("Error", error.message);
                                this.setState({signInText: "SIGN IN", signingIn: false});
                            });
                        
                    }}
                    style = {Styles.buttonStyle}
                >
                    <Text style = {Styles.textStyle}>{this.state.signInText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
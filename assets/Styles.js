import {StyleSheet} from 'react-native';

export const GREEN = "#04a287", GRAY = '#3d4852', LIGHT_GRAY = '#606f7b';

export const centeredViewStyle = StyleSheet.compose({ flex: 1, alignItems: 'center', backgroundColor: GRAY});

export const viewStyle = StyleSheet.compose({flex: 1, backgroundColor: GRAY});

export const textStyle = StyleSheet.compose({color: "#ffffff", fontWeight: "bold"});

export const centeredTextStyle = StyleSheet.compose(textStyle, {textAlign: 'center'});

export const headerStyle = StyleSheet.compose({color: GREEN, fontWeight: "bold", fontSize: 32});

export const cardHeaderStyle = StyleSheet.compose({color: "#ffffff", fontWeight: "bold", fontSize: 24});

export const textFieldStyle = StyleSheet.compose({
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
});

export const buttonStyle = StyleSheet.compose({
    backgroundColor: GREEN,
    alignItems: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid'
});

export const cardStyle = StyleSheet.compose({
    backgroundColor: LIGHT_GRAY,
    marginTop: 10,
    marginBottom: 5,
    width: "95%",
    marginLeft: 5,
    marginRight: 5,
    padding: 15,
    borderRadius: 10
});

export const shadow = StyleSheet.compose({
    shadowColor: 'rgba(0,0,0, .6)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
});
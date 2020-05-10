import { observable } from "mobx";
import { GREEN, GRAY } from "../assets/Styles";
import { Alert } from "react-native";

export const GLOBAL_STATE = observable({
    loggedIn: false,
    JWT: "",
    portfolios: [{
        title: "Index Fund Portfolio",
        accuracy: 96,
        split: [{percentage: 10, color: "#C70039"}, {percentage: 60, color: GREEN}, {percentage: 30, color: GRAY}]
    }]
});